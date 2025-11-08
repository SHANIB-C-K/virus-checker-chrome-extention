# 🧅 Using Virus Checker with Tor Browser

## ⚠️ Important Information

**Tor Browser is based on Firefox, NOT Chrome.**

This means:
- ❌ Chrome extensions (.crx) **do NOT work** on Tor Browser
- ✅ You need a **Firefox version** of the extension
- ⚠️ Tor Browser has **strict security policies** that limit extensions

---

## 🔧 Solutions

### Option 1: Convert to Firefox Extension (Recommended)

The good news: Most Chrome Manifest V3 extensions can work on Firefox with minor changes!

#### Steps to Convert:

1. **Update manifest.json** for Firefox compatibility:

```json
{
  "manifest_version": 3,
  "name": "Download Virus Checker & Site Scanner",
  "version": "1.2.0",
  "description": "Automatically scans downloaded files and checks websites for viruses using VirusTotal API",
  
  // Add Firefox-specific fields
  "browser_specific_settings": {
    "gecko": {
      "id": "virus-checker@yourdomain.com",
      "strict_min_version": "109.0"
    }
  },
  
  "permissions": [
    "downloads",
    "storage",
    "notifications",
    "contextMenus",
    "activeTab",
    "webNavigation",
    "tabs"
  ],
  
  // Firefox uses different permission format
  "host_permissions": [
    "https://www.virustotal.com/*",
    "<all_urls>"
  ],
  
  "background": {
    "scripts": ["background.js"],
    "type": "module"
  },
  
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  
  "options_ui": {
    "page": "options.html",
    "open_in_tab": true
  },
  
  "web_accessible_resources": [{
    "resources": ["blocked.html"],
    "matches": ["<all_urls>"]
  }]
}
```

2. **Test in Firefox Developer Edition** first:
   - Download: https://www.mozilla.org/en-US/firefox/developer/
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select your `manifest.json`

3. **Make any necessary code adjustments**:
   - Most code should work as-is
   - Chrome APIs are compatible with Firefox WebExtensions
   - Test all features

4. **Package for Firefox**:
   ```bash
   # Create a ZIP file
   zip -r virus-checker-firefox.zip * -x "*.git*" -x "node_modules/*"
   ```

5. **Install in Firefox/Tor Browser**:
   - Go to `about:addons`
   - Click gear icon → "Install Add-on From File"
   - Select your .zip file

---

### Option 2: Use Brave Browser with Tor

**Brave Browser** supports Chrome extensions AND has built-in Tor:

1. Download Brave Browser: https://brave.com/
2. Install extension normally (same as Chrome)
3. Open a "New Private Window with Tor"
4. Extension works in Tor mode!

**Advantages:**
- ✅ Chrome extension compatibility
- ✅ Built-in Tor support
- ✅ Easy to use
- ✅ No conversion needed

---

### Option 3: Use Regular Firefox Instead

If you don't specifically need Tor:

1. Convert extension to Firefox (Option 1)
2. Use regular Firefox browser
3. Much easier than Tor Browser restrictions

---

## 🔒 Tor Browser Limitations

### Why Tor Browser Restricts Extensions:

1. **Privacy Protection**
   - Extensions can leak your identity
   - They can track your activity
   - May compromise anonymity

2. **Security Concerns**
   - Extensions can have vulnerabilities
   - They increase attack surface
   - May expose your IP address

3. **Fingerprinting**
   - Unique extensions make you identifiable
   - Goes against Tor's anonymity goals

### What Tor Browser Allows:

- ✅ NoScript (pre-installed)
- ✅ HTTPS Everywhere (pre-installed)
- ⚠️ Very few other extensions
- ❌ Most third-party extensions

---

## 🎯 Recommended Approach

### For Privacy-Focused Users:

**Use Brave Browser with Tor Mode:**
```
1. Install Brave Browser
2. Load this Chrome extension
3. Use "New Private Window with Tor"
4. Get Tor privacy + extension functionality
```

### For Maximum Anonymity:

**Use Tor Browser WITHOUT extensions:**
```
1. Use Tor Browser for anonymous browsing
2. Use Chrome/Brave for file downloads with extension
3. Separate activities for maximum security
```

### For General Use:

**Convert to Firefox:**
```
1. Follow Option 1 above
2. Create Firefox version
3. Use in regular Firefox
4. Easier and more compatible
```

---

## 📝 Step-by-Step: Install in Brave Browser

### Step 1: Install Brave
```bash
# Visit: https://brave.com/
# Download and install Brave Browser
```

### Step 2: Load Extension
```
1. Open Brave
2. Go to: brave://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select your extension folder
6. Extension installed!
```

### Step 3: Use Tor Mode
```
1. Click Brave menu (hamburger icon)
2. Select "New private window with Tor"
3. Extension works in Tor window!
4. You have privacy + virus scanning!
```

---

## 🔧 Firefox Conversion Checklist

If converting to Firefox:

### Required Changes:
- [ ] Add `browser_specific_settings` to manifest
- [ ] Add unique extension ID
- [ ] Change `options_page` to `options_ui`
- [ ] Test all permissions work
- [ ] Test downloads API
- [ ] Test notifications
- [ ] Test context menus
- [ ] Test storage APIs

### Optional Changes:
- [ ] Update icons for Firefox
- [ ] Add Firefox-specific styling
- [ ] Update README for Firefox

### Testing:
- [ ] Test in Firefox Developer Edition
- [ ] Test in regular Firefox
- [ ] Test in Tor Browser (if allowed)
- [ ] Test all features work

---

## 💡 Additional Tips

### For VirusTotal API in Tor:

**Consider:**
- Tor requests may be slower
- Some APIs block Tor exit nodes
- VirusTotal might rate-limit Tor IPs
- Test API accessibility through Tor

### Alternative: Use VPN Instead:

```
1. Use VPN for privacy
2. Use Chrome/Brave with extension
3. Simpler than Tor
4. Better extension compatibility
```

---

## 🚨 Security Warning

**If using this extension on Tor Browser:**

⚠️ **Understand the risks:**
- Extension sends URLs to VirusTotal
- This could potentially compromise anonymity
- VirusTotal might log your requests
- Exit nodes could see your API key

**Recommendation:**
- Don't use with sensitive/anonymous browsing
- Use separate browser for downloads
- Keep Tor Browser "clean" for anonymity

---

## 📞 Support

### For Brave Browser Issues:
- Brave Community: https://community.brave.com/
- Extension should work like Chrome

### For Firefox Issues:
- Firefox Add-ons: https://addons.mozilla.org/
- WebExtensions API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions

### For Tor Browser:
- Tor Project: https://www.torproject.org/
- Note: They don't support custom extensions

---

## ✅ Summary

**Can I use this on Tor Browser?**
- ❌ Not directly - it's a Chrome extension
- ✅ Yes, if converted to Firefox format
- ⚠️ But Tor Browser limits extensions

**Best Solution:**
1. **Easiest:** Use Brave Browser with Tor mode
2. **Most Compatible:** Convert to Firefox extension
3. **Most Private:** Use Tor Browser separately without extensions

**Quick Answer:**
```
For most users → Use Brave Browser with Tor mode
For developers → Convert to Firefox extension
For max privacy → Use Tor Browser alone, Chrome for downloads
```

---

**Choose the option that best fits your needs! 🎯**

