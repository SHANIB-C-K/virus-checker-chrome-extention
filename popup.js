// Check API key status on load
document.addEventListener('DOMContentLoaded', async () => {
  await checkStatus();
  await loadScanHistory();
  await loadBlockedSites();
  
  // Set up event listeners
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
  document.getElementById('scanUrlBtn').addEventListener('click', scanUrl);
  document.getElementById('viewBlockedBtn').addEventListener('click', viewBlockedSites);
  
  // Allow Enter key to scan URL
  document.getElementById('urlInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      scanUrl();
    }
  });
});

// Check if API key is configured
async function checkStatus() {
  const statusText = document.getElementById('statusText');
  const statusBadge = document.getElementById('status');
  
  chrome.storage.sync.get(['apiKey'], (result) => {
    if (result.apiKey && result.apiKey.length > 0) {
      statusText.textContent = 'Protection Active';
      statusBadge.style.background = '#d4edda';
      statusBadge.querySelector('.status-icon').textContent = '✓';
    } else {
      statusText.textContent = 'API Key Required';
      statusBadge.style.background = '#fff3cd';
      statusBadge.querySelector('.status-icon').textContent = '⚠️';
    }
  });
}

// Load scan history
async function loadScanHistory() {
  chrome.runtime.sendMessage({ action: 'getScanHistory' }, (response) => {
    const historyContainer = document.getElementById('scanHistory');
    const history = response.history || [];
    
    if (history.length === 0) {
      historyContainer.innerHTML = '<p class="no-scans">No scans yet. Download a file to begin scanning.</p>';
      return;
    }
    
    historyContainer.innerHTML = '';
    history.forEach(item => {
      const scanItem = createScanItem(item);
      historyContainer.appendChild(scanItem);
    });
  });
}

// Scan a URL
async function scanUrl() {
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value.trim();
  
  if (!url) {
    alert('Please enter a URL to scan');
    return;
  }
  
  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    alert('Please enter a valid URL (e.g., https://example.com)');
    return;
  }
  
  // Check if API key is configured
  const result = await chrome.storage.sync.get(['apiKey']);
  if (!result.apiKey) {
    alert('Please configure your VirusTotal API key in Settings first');
    openSettings();
    return;
  }
  
  // Send message to background to scan URL
  chrome.runtime.sendMessage({ action: 'scanUrl', url: url }, (response) => {
    if (response && response.error) {
      alert('Error: ' + response.error);
    } else {
      // Clear input and show success
      urlInput.value = '';
      // Notification will be shown by background script
    }
  });
  
  // Close popup (optional)
  // window.close();
}

// Create scan item element
function createScanItem(item) {
  const div = document.createElement('div');
  div.className = 'scan-item';
  
  const malicious = item.stats.malicious || 0;
  const suspicious = item.stats.suspicious || 0;
  const harmless = item.stats.harmless || 0;
  const undetected = item.stats.undetected || 0;
  
  let resultClass = 'clean';
  let resultText = 'Clean';
  
  if (malicious > 0) {
    resultClass = 'threat';
    resultText = 'Threat';
  } else if (suspicious > 0) {
    resultClass = 'suspicious';
    resultText = 'Suspicious';
  }
  
  const isUrl = item.type === 'url';
  const icon = isUrl ? '🌐' : '📄';
  const typeLabel = isUrl ? 'URL' : 'File';
  
  const fileName = item.fileName.length > 35 
    ? '...' + item.fileName.slice(-32) 
    : item.fileName;
  
  const timestamp = new Date(item.timestamp).toLocaleString();
  
  const deletedBadge = item.deleted ? '<span class="deleted-badge">DELETED</span>' : '';
  const blockedBadge = item.blocked && !item.deleted ? '<span class="blocked-badge">BLOCKED</span>' : '';
  
  div.innerHTML = `
    <div class="scan-item-header">
      <span class="scan-filename" title="${item.fileName || item.url}">${icon} ${fileName}${deletedBadge}${blockedBadge}</span>
      <span class="scan-result ${resultClass}">${resultText}</span>
    </div>
    <div class="scan-details">
      <span class="scan-type-badge ${isUrl ? 'url' : 'file'}">${typeLabel}</span>
      ${malicious > 0 ? `⚠️ ${malicious} malicious` : ''}
      ${suspicious > 0 ? `⚠️ ${suspicious} suspicious` : ''}
      ${malicious === 0 && suspicious === 0 ? `✓ ${harmless + undetected} vendors checked` : ''}
    </div>
    <div class="scan-timestamp">${timestamp}</div>
  `;
  
  // Add click handler to open URL if it's a URL scan
  if (isUrl && item.url) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      if (confirm(`Open this URL?\n${item.url}`)) {
        chrome.tabs.create({ url: item.url });
      }
    });
  }
  
  return div;
}

// Open settings page
function openSettings() {
  chrome.runtime.openOptionsPage();
}

// Clear scan history
function clearHistory() {
  if (confirm('Are you sure you want to clear all scan history?')) {
    chrome.storage.local.set({ scanHistory: [] }, () => {
      loadScanHistory();
    });
  }
}

// Load blocked sites
async function loadBlockedSites() {
  chrome.runtime.sendMessage({ action: 'getBlockedUrls' }, (response) => {
    const blockedList = document.getElementById('blockedList');
    const blockedCount = document.getElementById('blockedCount');
    const blockedUrls = response.blockedUrls || [];
    
    blockedCount.textContent = blockedUrls.length;
    
    if (blockedUrls.length === 0) {
      blockedList.innerHTML = '<p class="no-blocked">No blocked sites yet.</p>';
      return;
    }
    
    // Show first 3 blocked sites
    blockedList.innerHTML = '';
    const displayCount = Math.min(3, blockedUrls.length);
    
    for (let i = 0; i < displayCount; i++) {
      const blockedItem = createBlockedItem(blockedUrls[i]);
      blockedList.appendChild(blockedItem);
    }
    
    if (blockedUrls.length > 3) {
      const moreText = document.createElement('p');
      moreText.textContent = `... and ${blockedUrls.length - 3} more`;
      moreText.style.cssText = 'text-align: center; color: #999; font-size: 11px; padding: 10px;';
      blockedList.appendChild(moreText);
    }
  });
}

// Create blocked site item
function createBlockedItem(url) {
  const div = document.createElement('div');
  div.className = 'blocked-item';
  
  const urlText = document.createElement('span');
  urlText.className = 'blocked-url-text';
  urlText.title = url;
  
  const shortUrl = url.length > 30 ? url.substring(0, 27) + '...' : url;
  urlText.textContent = shortUrl;
  
  const unblockBtn = document.createElement('button');
  unblockBtn.className = 'btn-unblock';
  unblockBtn.textContent = 'Unblock';
  unblockBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to unblock this site?\n\n' + url + '\n\nThis site was blocked because it was flagged as malicious.')) {
      chrome.runtime.sendMessage({ action: 'unblockUrl', url: url }, () => {
        loadBlockedSites();
      });
    }
  });
  
  div.appendChild(urlText);
  div.appendChild(unblockBtn);
  
  return div;
}

// View all blocked sites
function viewBlockedSites() {
  chrome.runtime.sendMessage({ action: 'getBlockedUrls' }, (response) => {
    const blockedUrls = response.blockedUrls || [];
    
    if (blockedUrls.length === 0) {
      alert('No blocked sites.');
      return;
    }
    
    const list = blockedUrls.map((url, i) => `${i + 1}. ${url}`).join('\n\n');
    alert(`Blocked Sites (${blockedUrls.length}):\n\n${list}`);
  });
}

