# 🌐 Browser Compatibility Guide

## Supported Browsers

### ✅ Fully Supported (No Changes Needed)

#### Google Chrome
- **Version:** 109+
- **Installation:** Load unpacked extension
- **Status:** ✅ Primary target browser

#### Microsoft Edge
- **Version:** 109+
- **Installation:** Same as Chrome
- **Status:** ✅ Full compatibility
- **Note:** Chromium-based, works perfectly

#### Brave Browser
- **Version:** Latest
- **Installation:** Same as Chrome
- **Status:** ✅ Full compatibility
- **Bonus:** Has built-in Tor mode!

#### Opera
- **Version:** Latest
- **Installation:** Same as Chrome
- **Status:** ✅ Full compatibility
- **Note:** Chromium-based

#### Vivaldi
- **Version:** Latest
- **Installation:** Same as Chrome
- **Status:** ✅ Full compatibility
- **Note:** Chromium-based

---

## ⚠️ Requires Conversion

### Mozilla Firefox
- **Status:** ⚠️ Needs minor changes
- **Compatibility:** 90% compatible
- **Required Changes:**
  - Update manifest.json
  - Add `browser_specific_settings`
  - Test WebExtensions APIs

**See:** TOR_BROWSER_GUIDE.md for conversion steps

---

## ❌ Not Supported

### Tor Browser
- **Status:** ❌ Not directly compatible
- **Reason:** Firefox-based, not Chrome
- **Security:** Tor limits custom extensions
- **Alternative:** Use Brave with Tor mode

**See:** TOR_BROWSER_GUIDE.md for solutions

### Safari
- **Status:** ❌ Not compatible
- **Reason:** Different extension format
- **Requires:** Complete rewrite for Safari

---

## 📊 Compatibility Matrix

| Browser | Compatible | Changes Needed | Difficulty |
|---------|-----------|----------------|------------|
| Chrome | ✅ Yes | None | ✅ Easy |
| Edge | ✅ Yes | None | ✅ Easy |
| Brave | ✅ Yes | None | ✅ Easy |
| Opera | ✅ Yes | None | ✅ Easy |
| Vivaldi | ✅ Yes | None | ✅ Easy |
| Firefox | ⚠️ Mostly | Manifest | ⚠️ Medium |
| Tor Browser | ⚠️ Indirect | Convert to Firefox | 🔴 Hard |
| Safari | ❌ No | Complete rewrite | 🔴 Very Hard |

---

## 🚀 Installation by Browser

### Chromium-Based Browsers (Chrome, Edge, Brave, Opera, Vivaldi)

**All use the same method:**

```bash
1. Open browser
2. Navigate to extensions page:
   - Chrome: chrome://extensions/
   - Edge: edge://extensions/
   - Brave: brave://extensions/
   - Opera: opera://extensions/
   - Vivaldi: vivaldi://extensions/

3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select extension folder
6. Done! ✅
```

---

## 🔄 Converting to Firefox

### Quick Conversion Steps:

1. **Copy your extension folder:**
```bash
cp -r "virus checker" "virus checker firefox"
cd "virus checker firefox"
```

2. **Update manifest.json:**

Add this section:
```json
"browser_specific_settings": {
  "gecko": {
    "id": "virus-checker@yourdomain.com",
    "strict_min_version": "109.0"
  }
},
```

Change this:
```json
// From:
"options_page": "options.html"

// To:
"options_ui": {
  "page": "options.html",
  "open_in_tab": true
}
```

Update background:
```json
// From:
"background": {
  "service_worker": "background.js"
}

// To:
"background": {
  "scripts": ["background.js"]
}
```

3. **Test in Firefox:**
```bash
1. Open Firefox
2. Go to: about:debugging#/runtime/this-firefox
3. Click "Load Temporary Add-on"
4. Select manifest.json
5. Test all features
```

4. **Package for distribution:**
```bash
zip -r virus-checker-firefox.xpi * -x "*.git*"
```

---

## 💡 Recommended Setup by Use Case

### For Regular Users:
**Use Google Chrome or Brave**
- Easiest setup
- Full compatibility
- No changes needed

### For Privacy-Conscious Users:
**Use Brave Browser**
- Chrome extension support
- Built-in Tor mode
- Privacy features
- Best of both worlds

### For Firefox Users:
**Convert to Firefox**
- Follow conversion guide
- Takes 10-15 minutes
- Works on all Firefox-based browsers

### For Tor Users:
**Use Brave with Tor Mode**
- Don't modify Tor Browser
- Use Brave's Tor feature
- Extension works normally
- Good privacy balance

---

## 🔒 Privacy Considerations

### Chrome/Brave/Edge:
- Extension works perfectly
- Standard privacy policies apply
- VirusTotal receives URLs you scan

### Firefox:
- Similar privacy to Chrome
- Extension has same permissions
- Same data sent to VirusTotal

### Tor Browser:
- ⚠️ **Not recommended** for anonymous browsing
- Extension could compromise anonymity
- VirusTotal logs might identify you
- Use separate browser for downloads

---

## 📝 Testing Checklist

When using on a new browser:

- [ ] Extension loads without errors
- [ ] API key saves correctly
- [ ] File downloads trigger scans
- [ ] Manual URL scanning works
- [ ] Right-click context menu appears
- [ ] Notifications display correctly
- [ ] Blocked sites feature works
- [ ] Settings page accessible
- [ ] Scan history saves
- [ ] Auto-delete works (if enabled)
- [ ] Auto-block works (if enabled)

---

## 🐛 Browser-Specific Issues

### Chrome:
- **Issue:** None known
- **Status:** ✅ Stable

### Brave:
- **Issue:** None known
- **Status:** ✅ Stable
- **Note:** Disable Brave Shields if issues occur

### Edge:
- **Issue:** None known
- **Status:** ✅ Stable

### Opera:
- **Issue:** May need to allow downloads permission again
- **Fix:** Check settings if downloads not scanning

### Firefox (after conversion):
- **Issue:** Service worker vs background scripts
- **Fix:** Use background.scripts instead of service_worker

---

## 💬 Support

### For Chrome/Brave/Edge/Opera:
- Follow main README.md
- Extension works as documented

### For Firefox Conversion:
- See TOR_BROWSER_GUIDE.md
- Mozilla WebExtensions docs
- Firefox Add-ons forum

### For Tor Browser:
- See TOR_BROWSER_GUIDE.md
- Consider alternatives (Brave + Tor)

---

## 🎯 Quick Decision Guide

**Pick your browser:**

```
Want easiest setup?
└─ Use Chrome ✅

Want privacy + extension support?
└─ Use Brave with Tor mode ✅

Already use Firefox?
└─ Convert extension (15 min) ⚠️

Need maximum anonymity?
└─ Use Tor Browser alone
   + Chrome for downloads ✅

Want built-in ad blocking?
└─ Use Brave ✅

Corporate environment?
└─ Use Edge ✅
```

---

## 📞 Getting Help

**Browser-Specific Issues:**
- Chrome: https://support.google.com/chrome/
- Firefox: https://support.mozilla.org/
- Brave: https://community.brave.com/
- Edge: https://support.microsoft.com/microsoft-edge

**Extension Issues:**
- Check README.md troubleshooting
- Open GitHub issue
- Check browser console for errors

---

**Choose the browser that fits your needs! 🚀**

