// VirusTotal API configuration
const VIRUSTOTAL_API_URL = 'https://www.virustotal.com/api/v3';
let apiKey = '';
let autoBlockEnabled = true;
let autoDeleteEnabled = true;
let blockedUrls = new Set();

// Initialize settings
async function initializeApiKey() {
  const result = await chrome.storage.sync.get(['apiKey', 'autoBlockEnabled', 'autoDeleteEnabled']);
  apiKey = result.apiKey || '';
  autoBlockEnabled = result.autoBlockEnabled !== false; // Default true
  autoDeleteEnabled = result.autoDeleteEnabled !== false; // Default true
  
  console.log('[Virus Checker] Extension initialized. API key configured:', !!apiKey);
  console.log('[Virus Checker] Auto-block enabled:', autoBlockEnabled);
  console.log('[Virus Checker] Auto-delete enabled:', autoDeleteEnabled);
  
  if (!apiKey) {
    console.warn('[Virus Checker] No API key found. Please configure in settings.');
  }
  
  // Load blocked URLs
  const blockedData = await chrome.storage.local.get(['blockedUrls']);
  if (blockedData.blockedUrls) {
    blockedUrls = new Set(blockedData.blockedUrls);
    console.log('[Virus Checker] Loaded', blockedUrls.size, 'blocked URLs');
  }
}

// Initialize on startup
initializeApiKey();

// Create context menu for URL scanning
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'scanUrl',
    title: 'Check this URL for viruses',
    contexts: ['link', 'page']
  });
  console.log('[Virus Checker] Context menu created');
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'scanUrl') {
    const urlToScan = info.linkUrl || info.pageUrl;
    console.log('[Virus Checker] Context menu scan requested for:', urlToScan);
    
    if (!apiKey) {
      showNotification('Virus Checker: API Key Required', 
        'Please set your VirusTotal API key in the extension settings.');
      return;
    }
    
    scanUrl(urlToScan);
  }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.apiKey) {
    apiKey = changes.apiKey.newValue;
    console.log('[Virus Checker] API key updated');
  }
  if (changes.autoBlockEnabled !== undefined) {
    autoBlockEnabled = changes.autoBlockEnabled.newValue;
    console.log('[Virus Checker] Auto-block updated:', autoBlockEnabled);
  }
  if (changes.autoDeleteEnabled !== undefined) {
    autoDeleteEnabled = changes.autoDeleteEnabled.newValue;
    console.log('[Virus Checker] Auto-delete updated:', autoDeleteEnabled);
  }
});

// Block malicious URLs
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // Only check main frame
  
  const url = details.url;
  
  // Check if URL is in blocklist
  if (isUrlBlocked(url)) {
    console.log('[Virus Checker] 🚫 Blocking navigation to malicious site:', url);
    
    // Redirect to blocked page
    chrome.tabs.update(details.tabId, {
      url: chrome.runtime.getURL('blocked.html') + '?url=' + encodeURIComponent(url)
    });
  }
});

// Check if URL is blocked
function isUrlBlocked(url) {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Check exact URL
    if (blockedUrls.has(url)) return true;
    
    // Check domain
    for (const blocked of blockedUrls) {
      try {
        const blockedUrl = new URL(blocked);
        if (blockedUrl.hostname === domain) return true;
      } catch (e) {
        // Skip invalid URLs in blocklist
      }
    }
    
    return false;
  } catch (e) {
    return false;
  }
}

// Add URL to blocklist
async function blockUrl(url) {
  blockedUrls.add(url);
  await chrome.storage.local.set({ 
    blockedUrls: Array.from(blockedUrls) 
  });
  console.log('[Virus Checker] Added to blocklist:', url);
}

// Remove URL from blocklist
async function unblockUrl(url) {
  blockedUrls.delete(url);
  await chrome.storage.local.set({ 
    blockedUrls: Array.from(blockedUrls) 
  });
  console.log('[Virus Checker] Removed from blocklist:', url);
}

// Track download states to prevent duplicate scans
const scannedDownloads = new Set();

// Listen for download creation
chrome.downloads.onCreated.addListener((downloadItem) => {
  console.log('[Virus Checker] Download started:', downloadItem.filename);
});

// Listen for download completion
chrome.downloads.onChanged.addListener(async (downloadDelta) => {
  console.log('[Virus Checker] Download changed:', downloadDelta);
  
  if (downloadDelta.state && downloadDelta.state.current === 'complete') {
    const downloadId = downloadDelta.id;
    
    // Prevent duplicate scans
    if (scannedDownloads.has(downloadId)) {
      console.log('[Virus Checker] Download already scanned:', downloadId);
      return;
    }
    scannedDownloads.add(downloadId);
    
    // Get download information
    try {
      const downloads = await chrome.downloads.search({ id: downloadId });
      if (downloads.length === 0) {
        console.warn('[Virus Checker] Download not found:', downloadId);
        return;
      }
      
      const download = downloads[0];
      console.log('[Virus Checker] Download completed:', download.filename);
      
      // Only scan if we have an API key
      if (!apiKey) {
        console.warn('[Virus Checker] Cannot scan - no API key configured');
        showNotification('Virus Checker: API Key Required', 
          'Please set your VirusTotal API key in the extension settings.');
        return;
      }
      
      // Get file name
      const fileName = download.filename.split(/[/\\]/).pop();
      
      // Show scanning notification
      console.log('[Virus Checker] Starting scan for:', fileName);
      showNotification('🔍 Scanning File', 
        `Scanning: ${fileName}`);
      
      // Scan the file
      await scanDownloadedFile(download);
      
    } catch (error) {
      console.error('[Virus Checker] Error handling download:', error);
    }
  }
});

// Function to scan a downloaded file
async function scanDownloadedFile(download) {
  try {
    const fileName = download.filename.split(/[/\\]/).pop();
    console.log('[Virus Checker] Scanning file:', fileName);
    console.log('[Virus Checker] Download URL:', download.url);
    console.log('[Virus Checker] Download ID:', download.id);
    
    // Submit URL to VirusTotal for scanning
    const uploadResult = await submitUrlToVirusTotal(download.url, fileName);
    
    if (uploadResult.error) {
      console.error('[Virus Checker] Scan error:', uploadResult.error);
      showNotification('❌ Scan Error', uploadResult.error);
      return;
    }
    
    console.log('[Virus Checker] URL submitted successfully, analysis ID:', uploadResult.data.id);
    
    // Get scan results
    const analysisId = uploadResult.data.id;
    await waitForScanResults(analysisId, fileName, download.id);
    
  } catch (error) {
    console.error('[Virus Checker] Error scanning file:', error);
    showNotification('❌ Scan Error', 'An error occurred during scanning: ' + error.message);
  }
}

// Function to submit URL to VirusTotal
async function submitUrlToVirusTotal(url, fileName) {
  try {
    console.log('[Virus Checker] Submitting URL to VirusTotal:', url);
    
    // Create form data
    const formData = new FormData();
    formData.append('url', url);
    
    const response = await fetch(`${VIRUSTOTAL_API_URL}/urls`, {
      method: 'POST',
      headers: {
        'x-apikey': apiKey
      },
      body: formData
    });
    
    console.log('[Virus Checker] VirusTotal response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.error?.message || errorMessage;
        console.error('[Virus Checker] VirusTotal error:', error);
      } catch (e) {
        console.error('[Virus Checker] Could not parse error response');
      }
      
      if (response.status === 401) {
        return { error: 'Invalid API key. Please check your settings.' };
      } else if (response.status === 429) {
        return { error: 'Rate limit exceeded. Please wait a moment and try again.' };
      }
      
      return { error: `API Error: ${errorMessage}` };
    }
    
    const result = await response.json();
    console.log('[Virus Checker] VirusTotal submission successful:', result);
    return result;
    
  } catch (error) {
    console.error('[Virus Checker] Error submitting to VirusTotal:', error);
    return { error: 'Failed to submit URL for scanning: ' + error.message };
  }
}

// Function to wait for and retrieve scan results
async function waitForScanResults(analysisId, fileName, downloadId = null) {
  const maxAttempts = 25;
  let attempts = 0;
  
  console.log('[Virus Checker] Waiting for scan results...');
  
  const checkResults = async () => {
    try {
      attempts++;
      console.log(`[Virus Checker] Checking results (attempt ${attempts}/${maxAttempts})...`);
      
      const response = await fetch(`${VIRUSTOTAL_API_URL}/analyses/${analysisId}`, {
        headers: {
          'x-apikey': apiKey
        }
      });
      
      if (!response.ok) {
        console.error('[Virus Checker] Failed to retrieve scan results, status:', response.status);
        showNotification('❌ Scan Error', 'Failed to retrieve scan results.');
        return;
      }
      
      const result = await response.json();
      const status = result.data.attributes.status;
      
      console.log('[Virus Checker] Scan status:', status);
      
      if (status === 'completed') {
        console.log('[Virus Checker] Scan completed, results:', result.data.attributes.stats);
        // Display results with downloadId for deletion
        await displayScanResults(result.data.attributes.stats, fileName, downloadId);
      } else if (attempts < maxAttempts) {
        // Wait and try again (3 seconds between attempts)
        setTimeout(checkResults, 3000);
      } else {
        console.warn('[Virus Checker] Scan timeout after', maxAttempts, 'attempts');
        showNotification('⏱️ Scan Timeout', 'Scan is taking longer than expected. Results may appear later.');
      }
      
    } catch (error) {
      console.error('[Virus Checker] Error checking results:', error);
      showNotification('❌ Scan Error', 'Failed to retrieve scan results: ' + error.message);
    }
  };
  
  // Start checking after a brief delay (5 seconds)
  setTimeout(checkResults, 5000);
}

// Function to display scan results
async function displayScanResults(stats, fileName, downloadId = null) {
  const malicious = stats.malicious || 0;
  const suspicious = stats.suspicious || 0;
  const harmless = stats.harmless || 0;
  const undetected = stats.undetected || 0;
  const total = malicious + suspicious + harmless + undetected;
  
  console.log('[Virus Checker] Results for', fileName + ':', {
    malicious,
    suspicious,
    harmless,
    undetected,
    total
  });
  
  const isThreat = malicious > 0;
  const isSuspicious = suspicious > 0;
  
  // AUTO-DELETE malicious files
  if (isThreat && autoDeleteEnabled && downloadId) {
    console.log('[Virus Checker] 🗑️ AUTO-DELETING malicious file:', fileName);
    try {
      await chrome.downloads.removeFile(downloadId);
      await chrome.downloads.erase({ id: downloadId });
      console.log('[Virus Checker] ✅ Malicious file deleted and removed from history');
    } catch (error) {
      console.error('[Virus Checker] Failed to delete file:', error);
    }
  }
  
  // Store results
  const result = {
    fileName,
    type: 'file',
    timestamp: Date.now(),
    stats,
    threat: isThreat || isSuspicious,
    blocked: isThreat && autoDeleteEnabled,
    deleted: isThreat && autoDeleteEnabled
  };
  
  // Save to storage
  chrome.storage.local.get(['scanHistory'], (data) => {
    const history = data.scanHistory || [];
    history.unshift(result);
    // Keep only last 50 scans
    if (history.length > 50) history.pop();
    chrome.storage.local.set({ scanHistory: history });
    console.log('[Virus Checker] Scan result saved to history');
  });
  
  // Show notification
  if (malicious > 0) {
    console.log('[Virus Checker] THREAT DETECTED!');
    const deleteMsg = autoDeleteEnabled ? '\n🗑️ FILE AUTOMATICALLY DELETED!' : '\n⚠️ DELETE THIS FILE IMMEDIATELY!';
    showNotification('🚨 THREAT DETECTED!', 
      `${fileName}\n${malicious} vendor(s) flagged this as MALICIOUS!${deleteMsg}`, 
      true);
  } else if (suspicious > 0) {
    console.log('[Virus Checker] Suspicious file detected');
    showNotification('⚠️ Suspicious File', 
      `${fileName}\n${suspicious} vendor(s) marked as suspicious.\nProceed with caution.`);
  } else {
    console.log('[Virus Checker] File is clean');
    showNotification('✅ File is Clean', 
      `${fileName}\n✓ No threats detected\n${total} security vendors checked`);
  }
}

// Function to show notifications
function showNotification(title, message, requireInteraction = false) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/icon128.png'),
    title: title,
    message: message,
    priority: requireInteraction ? 2 : 1,
    requireInteraction: requireInteraction
  });
}

// Function to scan a URL
async function scanUrl(url) {
  try {
    console.log('[Virus Checker] Scanning URL:', url);
    
    // Show scanning notification
    showNotification('🔍 Scanning URL', 
      `Checking: ${url.substring(0, 50)}...`);
    
    // Submit URL to VirusTotal for scanning
    const uploadResult = await submitUrlToVirusTotal(url, url);
    
    if (uploadResult.error) {
      console.error('[Virus Checker] URL scan error:', uploadResult.error);
      showNotification('❌ Scan Error', uploadResult.error);
      return;
    }
    
    console.log('[Virus Checker] URL submitted successfully, analysis ID:', uploadResult.data.id);
    
    // Get scan results
    const analysisId = uploadResult.data.id;
    await waitForUrlScanResults(analysisId, url);
    
  } catch (error) {
    console.error('[Virus Checker] Error scanning URL:', error);
    showNotification('❌ Scan Error', 'An error occurred during scanning: ' + error.message);
  }
}

// Function to wait for URL scan results
async function waitForUrlScanResults(analysisId, url) {
  const maxAttempts = 25;
  let attempts = 0;
  
  console.log('[Virus Checker] Waiting for URL scan results...');
  
  const checkResults = async () => {
    try {
      attempts++;
      console.log(`[Virus Checker] Checking URL results (attempt ${attempts}/${maxAttempts})...`);
      
      const response = await fetch(`${VIRUSTOTAL_API_URL}/analyses/${analysisId}`, {
        headers: {
          'x-apikey': apiKey
        }
      });
      
      if (!response.ok) {
        console.error('[Virus Checker] Failed to retrieve URL scan results, status:', response.status);
        showNotification('❌ Scan Error', 'Failed to retrieve scan results.');
        return;
      }
      
      const result = await response.json();
      const status = result.data.attributes.status;
      
      console.log('[Virus Checker] URL scan status:', status);
      
      if (status === 'completed') {
        console.log('[Virus Checker] URL scan completed, results:', result.data.attributes.stats);
        // Display results
        displayUrlScanResults(result.data.attributes.stats, url);
      } else if (attempts < maxAttempts) {
        // Wait and try again (3 seconds between attempts)
        setTimeout(checkResults, 3000);
      } else {
        console.warn('[Virus Checker] URL scan timeout after', maxAttempts, 'attempts');
        showNotification('⏱️ Scan Timeout', 'Scan is taking longer than expected. Results may appear later.');
      }
      
    } catch (error) {
      console.error('[Virus Checker] Error checking URL results:', error);
      showNotification('❌ Scan Error', 'Failed to retrieve scan results: ' + error.message);
    }
  };
  
  // Start checking after a brief delay (5 seconds)
  setTimeout(checkResults, 5000);
}

// Function to display URL scan results
async function displayUrlScanResults(stats, url) {
  const malicious = stats.malicious || 0;
  const suspicious = stats.suspicious || 0;
  const harmless = stats.harmless || 0;
  const undetected = stats.undetected || 0;
  const total = malicious + suspicious + harmless + undetected;
  
  const shortUrl = url.length > 50 ? url.substring(0, 47) + '...' : url;
  
  console.log('[Virus Checker] URL results for', url + ':', {
    malicious,
    suspicious,
    harmless,
    undetected,
    total
  });
  
  const isThreat = malicious > 0;
  
  // AUTO-BLOCK malicious URLs
  if (isThreat && autoBlockEnabled) {
    console.log('[Virus Checker] 🚫 AUTO-BLOCKING malicious URL:', url);
    await blockUrl(url);
  }
  
  // Store results
  const result = {
    fileName: shortUrl,
    url: url,
    type: 'url',
    timestamp: Date.now(),
    stats,
    threat: isThreat || suspicious > 0,
    blocked: isThreat && autoBlockEnabled
  };
  
  // Save to storage
  chrome.storage.local.get(['scanHistory'], (data) => {
    const history = data.scanHistory || [];
    history.unshift(result);
    // Keep only last 50 scans
    if (history.length > 50) history.pop();
    chrome.storage.local.set({ scanHistory: history });
    console.log('[Virus Checker] URL scan result saved to history');
  });
  
  // Show notification
  if (malicious > 0) {
    console.log('[Virus Checker] MALICIOUS URL DETECTED!');
    const blockMsg = autoBlockEnabled ? '\n🚫 SITE AUTOMATICALLY BLOCKED!' : '\n⚠️ DO NOT VISIT THIS SITE!';
    showNotification('🚨 MALICIOUS SITE DETECTED!', 
      `${shortUrl}\n${malicious} vendor(s) flagged this site as MALICIOUS!${blockMsg}`, 
      true);
  } else if (suspicious > 0) {
    console.log('[Virus Checker] Suspicious URL detected');
    showNotification('⚠️ Suspicious Site', 
      `${shortUrl}\n${suspicious} vendor(s) marked as suspicious.\nProceed with caution.`);
  } else {
    console.log('[Virus Checker] URL is clean');
    showNotification('✅ Site is Safe', 
      `${shortUrl}\n✓ No threats detected\n${total} security vendors checked`);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getScanHistory') {
    chrome.storage.local.get(['scanHistory'], (data) => {
      sendResponse({ history: data.scanHistory || [] });
    });
    return true; // Keep channel open for async response
  } else if (request.action === 'scanUrl') {
    if (!apiKey) {
      sendResponse({ error: 'API key not configured' });
      return false;
    }
    scanUrl(request.url);
    sendResponse({ success: true });
    return false;
  } else if (request.action === 'getBlockedUrls') {
    sendResponse({ blockedUrls: Array.from(blockedUrls) });
    return false;
  } else if (request.action === 'unblockUrl') {
    unblockUrl(request.url).then(() => {
      sendResponse({ success: true });
    });
    return true;
  } else if (request.action === 'blockUrl') {
    blockUrl(request.url).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

