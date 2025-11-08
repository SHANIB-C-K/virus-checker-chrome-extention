// Load saved settings on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  // Set up event listeners
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  document.getElementById('toggleApiKey').addEventListener('click', toggleApiKeyVisibility);
  
  // Save on Enter key
  document.getElementById('apiKey').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveSettings();
    }
  });
});

// Load settings from storage
function loadSettings() {
  chrome.storage.sync.get(['apiKey', 'autoBlockEnabled', 'autoDeleteEnabled'], (result) => {
    if (result.apiKey) {
      document.getElementById('apiKey').value = result.apiKey;
    }
    
    // Set checkbox states (default to true if not set)
    document.getElementById('autoBlockEnabled').checked = result.autoBlockEnabled !== false;
    document.getElementById('autoDeleteEnabled').checked = result.autoDeleteEnabled !== false;
  });
}

// Save settings to storage
function saveSettings() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const autoBlockEnabled = document.getElementById('autoBlockEnabled').checked;
  const autoDeleteEnabled = document.getElementById('autoDeleteEnabled').checked;
  const statusDiv = document.getElementById('saveStatus');
  
  if (!apiKey) {
    showStatus('Please enter an API key', 'error');
    return;
  }
  
  // Basic validation - VirusTotal API keys are 64 characters
  if (apiKey.length < 32) {
    showStatus('API key appears to be invalid. Please check and try again.', 'error');
    return;
  }
  
  // Save to storage
  chrome.storage.sync.set({ 
    apiKey: apiKey,
    autoBlockEnabled: autoBlockEnabled,
    autoDeleteEnabled: autoDeleteEnabled
  }, () => {
    showStatus('Settings saved successfully! ✓', 'success');
    
    // Clear status after 3 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  });
}

// Toggle API key visibility
function toggleApiKeyVisibility() {
  const apiKeyInput = document.getElementById('apiKey');
  const toggleBtn = document.getElementById('toggleApiKey');
  
  if (apiKeyInput.type === 'password') {
    apiKeyInput.type = 'text';
    toggleBtn.textContent = '🙈';
  } else {
    apiKeyInput.type = 'password';
    toggleBtn.textContent = '👁️';
  }
}

// Show status message
function showStatus(message, type) {
  const statusDiv = document.getElementById('saveStatus');
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;
  statusDiv.style.display = 'block';
}

