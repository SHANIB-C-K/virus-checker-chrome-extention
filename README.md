# 🛡️ Download Virus Checker & Site Scanner

> A powerful Chrome extension that automatically scans downloaded files and checks websites for viruses using VirusTotal API with automatic threat protection.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=google-chrome)](https://github.com)
[![Version](https://img.shields.io/badge/version-1.2.0-blue)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-orange)](LICENSE)
[![VirusTotal](https://img.shields.io/badge/Powered%20by-VirusTotal-purple)](https://www.virustotal.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Configuration](#-configuration)
- [Protection Features](#-protection-features)
- [Troubleshooting](#-troubleshooting)
- [Privacy & Security](#-privacy--security)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔒 Automatic Protection
- **🗑️ Auto-Delete Malicious Files** - Dangerous downloads are automatically deleted from your system
- **🚫 Auto-Block Malicious Websites** - Harmful sites are instantly blocked with warning pages
- **⚡ Zero-Click Security** - No user action required for maximum protection

### 📥 File Scanning
- **Automatic Download Scanning** - Every file you download is automatically scanned
- **70+ Antivirus Engines** - Powered by VirusTotal's comprehensive database
- **Real-time Results** - Get scan results in 10-20 seconds
- **Scan History** - Track all your scanned files with detailed results

### 🌐 Website Checking
- **Manual URL Scanner** - Check any website before visiting
- **Right-Click Context Menu** - Scan links instantly from any page
- **Current Page Scanning** - Verify the site you're currently on
- **Blocklist Management** - View and manage blocked malicious sites

### 🎨 User Experience
- **Beautiful UI** - Modern purple gradient design
- **Desktop Notifications** - Instant alerts for threats
- **Detailed Reports** - See results from multiple security vendors
- **Easy Configuration** - Simple setup with visual feedback

---

## 🚀 Installation

### Prerequisites
- **Google Chrome** or **Chromium-based browser** (Chrome, Brave, Edge, Opera, Vivaldi)
- VirusTotal API key (free)

**Note:** For Firefox/Tor Browser, see [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md)

### Step 1: Download the Extension

```bash
# Clone this repository
git clone https://github.com/yourusername/virus-checker-extension.git

# Or download as ZIP and extract
```

### Step 2: Get VirusTotal API Key

1. Visit [VirusTotal.com](https://www.virustotal.com/)
2. Sign up for a free account (or log in)
3. Go to your profile → Settings → API Key
4. Copy your API key

### Step 3: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `virus checker` folder
5. Extension should now appear in your extensions list

### Step 4: Configure Extension

1. Click the extension icon 🛡️ in your toolbar
2. Click **⚙️ Settings**
3. Paste your VirusTotal API key
4. Click **💾 Save Settings**
5. You should see: "Settings saved successfully! ✓"

---

## 🎯 Getting Started

### Quick Start (5 Minutes)

#### 1. Install & Configure
```
✓ Load extension in Chrome
✓ Get VirusTotal API key
✓ Enter API key in Settings
✓ Save settings
```

#### 2. Test File Scanning
```
✓ Download any file
✓ Wait for scan notification
✓ Check results in popup
```

#### 3. Test URL Scanning
```
✓ Open extension popup
✓ Enter URL to scan
✓ Click "Scan" button
✓ View results
```

#### 4. Test Right-Click Menu
```
✓ Go to any webpage
✓ Right-click on a link
✓ Select "Check this URL for viruses"
✓ Get instant results
```

### First Time Setup Checklist

- [ ] Extension installed
- [ ] API key obtained from VirusTotal
- [ ] API key entered in settings
- [ ] Settings saved successfully
- [ ] Status shows "Protection Active"
- [ ] Tested file download scan
- [ ] Tested manual URL scan
- [ ] Tested right-click context menu

---

## 📖 How to Use

### Automatic File Scanning

Files are scanned automatically when downloaded:

1. **Download a file** from any website
2. **Automatic scan begins** - You'll see: "🔍 Scanning File"
3. **Wait for results** (10-20 seconds)
4. **View notification**:
   - ✅ **Clean** - File is safe
   - ⚠️ **Suspicious** - Proceed with caution
   - 🚨 **Malicious** - File automatically deleted (if auto-delete enabled)

### Manual Website Checking

#### Method 1: Extension Popup

1. Click the extension icon 🛡️
2. Enter URL in the "Check a Website" field
3. Click **Scan** or press Enter
4. Wait for results notification
5. Check scan history

#### Method 2: Right-Click Context Menu

1. Right-click any link on a webpage
2. Select "Check this URL for viruses"
3. Wait for results notification
4. Site is blocked if malicious

#### Method 3: Current Page

1. Right-click anywhere on current page
2. Select "Check this URL for viruses"
3. Current page URL is scanned
4. Results shown in notification

### Understanding Results

#### Clean Result ✅
```
✅ File is Clean
filename.pdf
✓ No threats detected
75 security vendors checked
```
**Meaning:** Safe to use, no threats found

#### Suspicious Result ⚠️
```
⚠️ Suspicious File
filename.exe
2 vendor(s) marked as suspicious.
Proceed with caution.
```
**Meaning:** Some concerns, investigate before using

#### Malicious Result 🚨
```
🚨 THREAT DETECTED!
virus.exe
5 vendor(s) flagged this as MALICIOUS!
🗑️ FILE AUTOMATICALLY DELETED!
```
**Meaning:** Dangerous file, automatically removed

---

## ⚙️ Configuration

### Settings Page

Access via: Extension Icon → ⚙️ Settings

#### API Configuration

**VirusTotal API Key** (Required)
- Enter your personal API key
- Get from: [virustotal.com](https://www.virustotal.com/)
- Free tier limits: 4 requests/minute, 500/day

#### Threat Protection Settings

**🚫 Auto-Block Malicious Websites** ✅ (Recommended)
- Automatically blocks sites flagged as malicious
- Shows warning page instead of loading site
- Can be unblocked if needed
- Default: Enabled

**🗑️ Auto-Delete Malicious Files** ✅ (Recommended)
- Automatically deletes downloads flagged as malicious
- Permanent deletion (no recovery)
- Protects your system instantly
- Default: Enabled

### Rate Limits

Free VirusTotal API limits:
- **4 requests per minute**
- **500 requests per day**

Tip: Space out manual scans if you hit rate limits.

---

## 🛡️ Protection Features

### Automatic Threat Protection

#### File Protection

**How it works:**
1. File downloads → Automatic scan
2. VirusTotal analyzes (70+ engines)
3. If malicious → **Auto-delete enabled**
4. File removed from system
5. Notification: "🗑️ FILE AUTOMATICALLY DELETED!"

**What gets deleted:**
- Files flagged as "malicious" by VirusTotal
- Multiple antivirus engines detected threat
- Permanent deletion (no undo)

**How to disable:**
- Settings → Uncheck "Auto-Delete Malicious Files"

#### Website Protection

**How it works:**
1. You visit URL → Check blocklist
2. If blocked → Redirect to warning page
3. Manual scan → If malicious → Add to blocklist
4. Future visits automatically blocked

**What gets blocked:**
- Sites flagged as malicious by VirusTotal
- Phishing/scam sites
- Malware distribution sites
- Sites you manually scan and are malicious

**How to unblock:**
- Extension popup → Blocked Sites → Click "Unblock"
- Confirm twice (warning given)

### Blocked Sites Management

View blocked sites:
1. Click extension icon
2. Scroll to "🚫 Blocked Sites" section
3. See count and list of blocked sites
4. Click "Unblock" to remove from list
5. Click "View All Blocked Sites" for complete list

### Warning Page

When you try to access a blocked site:

**Features:**
- Large warning icon
- Blocked URL displayed
- Reasons for blocking
- "Go Back to Safety" button
- "Unblock Site" option (with warnings)

---

## 🔍 Troubleshooting

### Common Issues

#### Extension Not Scanning Files

**Problem:** Downloaded files are not being scanned

**Solutions:**
1. Check API key is configured (Settings page)
2. Reload the extension:
   - Go to `chrome://extensions/`
   - Find extension
   - Click reload icon (🔄)
3. Check console logs:
   - `chrome://extensions/`
   - Click "service worker"
   - Look for `[Virus Checker]` messages
4. Verify status shows "Protection Active"

#### "API Key Required" Error

**Problem:** Extension shows "API Key Required"

**Solutions:**
1. Go to Settings page
2. Enter your VirusTotal API key
3. Click "Save Settings"
4. Verify you copied the entire key (64 characters)

#### "Rate Limit Exceeded" Error

**Problem:** Getting rate limit errors

**Solutions:**
1. Wait a few minutes (free API: 4 requests/minute)
2. Space out your scans
3. Check daily limit (500 requests/day)
4. Consider upgrading VirusTotal account

#### Context Menu Not Showing

**Problem:** Right-click menu option missing

**Solutions:**
1. Reload the extension
2. Refresh the webpage
3. Try right-clicking again
4. Check extension is enabled

#### File Not Being Deleted

**Problem:** Malicious file not automatically deleted

**Solutions:**
1. Check Settings → "Auto-Delete" is enabled
2. File must be flagged as "malicious" (not just suspicious)
3. Check console for deletion logs
4. Reload extension if needed

### Debugging

#### Enable Console Logging

1. Go to `chrome://extensions/`
2. Find "Download Virus Checker & Site Scanner"
3. Click "service worker" or "Inspect views"
4. Console opens with detailed logs
5. All actions logged with `[Virus Checker]` prefix

Example logs:
```
[Virus Checker] Extension initialized. API key configured: true
[Virus Checker] Download started: example.pdf
[Virus Checker] Download completed: /path/to/example.pdf
[Virus Checker] Starting scan for: example.pdf
[Virus Checker] VirusTotal response status: 200
[Virus Checker] File is clean
```

#### Check Permissions

Extension needs these permissions:
- Downloads
- Storage
- Notifications
- Context Menus
- Active Tab
- Web Navigation
- Tabs

Verify in: `chrome://extensions/` → Extension Details → Permissions

---

## 🔐 Privacy & Security

### Data Privacy

**What is stored:**
- ✅ VirusTotal API key (locally only)
- ✅ Scan history (last 50 scans, locally)
- ✅ Blocked URLs list (locally)
- ❌ No browsing history
- ❌ No personal information
- ❌ No third-party sharing

**What is sent to VirusTotal:**
- ✅ File download URLs (for scanning)
- ✅ URLs you manually scan
- ❌ Not actual file contents
- ❌ Not personal information

### Security Features

**Local Storage:**
- API key stored in Chrome sync storage (encrypted)
- Scan history in local storage
- Never sent to external servers

**HTTPS Only:**
- All VirusTotal API calls use HTTPS
- Encrypted communication
- Secure data transmission

**Open Source:**
- Full source code available
- Transparent operation
- Community auditable

---

## 🏗️ Technical Details

### Built With

- **Manifest V3** - Latest Chrome extension format
- **VirusTotal API v3** - Malware scanning service
- **Vanilla JavaScript** - No external dependencies
- **Chrome APIs** - Downloads, Storage, Notifications, Context Menus

### Architecture

```
┌─────────────────────────────────────────┐
│         Chrome Extension                │
├─────────────────────────────────────────┤
│                                         │
│  Background Service Worker              │
│  ├─ Download monitoring                │
│  ├─ URL scanning                       │
│  ├─ VirusTotal API calls               │
│  ├─ Threat protection                  │
│  └─ Blocklist management               │
│                                         │
│  Popup Interface                       │
│  ├─ URL scanner input                  │
│  ├─ Scan history display               │
│  ├─ Blocked sites list                 │
│  └─ Settings access                    │
│                                         │
│  Options Page                          │
│  ├─ API key configuration              │
│  ├─ Auto-protection settings           │
│  └─ Feature documentation              │
│                                         │
│  Warning Page                          │
│  └─ Malicious site blocker             │
│                                         │
└─────────────────────────────────────────┘
           ↓ HTTPS
┌─────────────────────────────────────────┐
│      VirusTotal API v3                  │
│  ├─ File URL scanning                   │
│  ├─ Website URL analysis                │
│  └─ 70+ antivirus engines               │
└─────────────────────────────────────────┘
```

### File Structure

```
virus-checker/
├── manifest.json              # Extension configuration
├── background.js              # Main background service worker
├── popup.html                 # Extension popup interface
├── popup.css                  # Popup styling
├── popup.js                   # Popup functionality
├── options.html               # Settings page
├── options.css                # Settings styling
├── options.js                 # Settings functionality
├── blocked.html               # Warning page for blocked sites
├── icons/                     # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md                  # This file
```

---

## 💡 Usage Tips

### Best Practices

1. **Keep Auto-Protection ON** - Maximum security by default
2. **Scan Suspicious Links** - Before clicking unknown URLs
3. **Check Shortened URLs** - bit.ly, tinyurl, etc.
4. **Review Scan History** - Regularly check for threats
5. **Trust the System** - 70+ antivirus engines rarely wrong
6. **Watch Rate Limits** - Free API has limits
7. **Update Regularly** - Keep extension up to date

### When to Scan URLs

**Always scan:**
- 🔗 Shortened URLs (bit.ly, tinyurl)
- 📧 Links in unexpected emails
- 💬 Links from unknown senders
- 🎁 "Free prize" or "urgent action" links
- 💰 Cryptocurrency/financial links

**Good to scan:**
- 🛍️ Unfamiliar shopping sites
- 📥 Before downloading anything
- 🔐 Before entering passwords
- 💳 Before entering payment info

**Don't spam scan:**
- ✋ Known safe sites (google.com, etc.)
- ✋ Internal/localhost URLs
- ✋ Private network addresses
- ✋ Same URL repeatedly

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/virus-checker-extension.git

# Load in Chrome
# chrome://extensions/ → Load unpacked → Select folder

# Make changes
# Test thoroughly

# Submit PR
```

---

## 📝 Changelog

### Version 1.2.0 (Current)
- ✨ Added automatic file deletion for malicious downloads
- ✨ Added automatic website blocking for malicious sites
- ✨ Added malicious site warning page
- ✨ Added blocked sites management
- ✨ Added auto-protection settings
- 🎨 Enhanced UI with blocked sites section
- 🎨 Added DELETED/BLOCKED badges to scan history

### Version 1.1.0
- ✨ Added manual website/URL scanning
- ✨ Added right-click context menu for URL scanning
- ✨ Added scan type badges (File/URL)
- 🎨 Improved UI with gradient URL scanner
- 🐛 Enhanced error handling and logging

### Version 1.0.0
- 🎉 Initial release
- ✨ Automatic download scanning
- ✨ VirusTotal API integration
- ✨ Scan history tracking
- ✨ Desktop notifications

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Developed by [Shanib C K](https://www.shanibck.me/)**

- 🌐 Website: [shanibck.me](https://www.shanibck.me/)
- 📧 Email: dev.shanibck@gmail.com
- 💼 LinkedIn: [Shanib C K](https://www.linkedin.com/in/shanibck/)
- 🐙 GitHub: [shanibck](https://github.com/shanibck)
- 📍 Location: Malappuram, Kerala, India

*MERN Stack Developer specializing in building high-performance web applications and browser extensions.*

---

## 🙏 Acknowledgments

- **VirusTotal** - For providing the excellent malware scanning API
- **Chrome Extensions Team** - For the powerful extension platform
- **Contributors** - Thank you to everyone who helps improve this extension

---

## 📞 Support

### Need Help?

- 📖 Read the [Troubleshooting](#-troubleshooting) section
- 🐛 Open an [Issue](https://github.com/yourusername/virus-checker-extension/issues)
- 💬 Start a [Discussion](https://github.com/yourusername/virus-checker-extension/discussions)

### Useful Links

- [VirusTotal API Documentation](https://developers.virustotal.com/reference)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Report a Bug](https://github.com/yourusername/virus-checker-extension/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/yourusername/virus-checker-extension/issues/new?template=feature_request.md)

---

## ⭐ Star This Repository

If you find this extension helpful, please give it a star! It helps others discover this project.

---

<div align="center">

**🛡️ Stay Safe Online! 🛡️**

Made with ❤️ by [Shanib C K](https://www.shanibck.me/)

[![Portfolio](https://img.shields.io/badge/Portfolio-shanibck.me-blue)](https://www.shanibck.me/)
[![Email](https://img.shields.io/badge/Email-dev.shanibck%40gmail.com-red)](mailto:dev.shanibck@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shanib%20CK-0077B5?logo=linkedin)](https://www.linkedin.com/in/shanibck/)

[⬆ Back to Top](#-download-virus-checker--site-scanner)

</div>
