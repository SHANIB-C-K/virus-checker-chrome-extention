# Contributing to Download Virus Checker & Site Scanner

First off, thank you for considering contributing to this Chrome extension! It's people like you that make this extension better for everyone.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 10, macOS 13]
 - Browser: [e.g. Chrome 119]
 - Extension Version: [e.g. 1.2.0]

**Console Logs**
Include any relevant console logs from chrome://extensions/ → Service Worker

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Feature Request Template:**
```markdown
**Is your feature request related to a problem? Please describe.**
A clear description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
6. **Push to the branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

#### Pull Request Guidelines

- Follow the existing code style
- Update documentation as needed
- Add tests if applicable
- Ensure all existing tests pass
- Keep pull requests focused on a single feature/fix
- Write clear commit messages

## 💻 Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/virus-checker-extension.git
cd virus-checker-extension

# Create a branch for your feature
git checkout -b feature/my-new-feature

# Make your changes

# Load extension in Chrome for testing
# 1. Open chrome://extensions/
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the extension directory

# Test your changes thoroughly

# Commit and push
git add .
git commit -m "Add my new feature"
git push origin feature/my-new-feature
```

## 📝 Code Style Guide

### JavaScript

- Use modern ES6+ syntax
- Use `const` and `let`, never `var`
- Use arrow functions when appropriate
- Use template literals for string interpolation
- Add comments for complex logic
- Use meaningful variable names

```javascript
// Good
const scanResult = await performScan(fileUrl);
const isClean = scanResult.malicious === 0;

// Bad
var x = performScan(fileUrl);
var y = x.malicious == 0;
```

### HTML/CSS

- Use semantic HTML5 elements
- Keep CSS organized and modular
- Use consistent naming conventions
- Comment complex CSS rules

### Console Logging

- Prefix all logs with `[Virus Checker]`
- Use appropriate log levels (log, warn, error)
- Include relevant context in logs

```javascript
console.log('[Virus Checker] Scanning file:', fileName);
console.error('[Virus Checker] Failed to scan:', error);
```

## 🧪 Testing

Before submitting a pull request, test these scenarios:

### File Scanning
- [ ] Download a safe file
- [ ] Download a suspicious file
- [ ] Download a malicious file (test file)
- [ ] Auto-delete works for malicious files
- [ ] Notifications appear correctly

### URL Scanning
- [ ] Manual URL scan from popup
- [ ] Right-click context menu scan
- [ ] Current page scan
- [ ] Auto-block works for malicious URLs
- [ ] Warning page displays correctly

### Settings
- [ ] API key can be saved
- [ ] Auto-block toggle works
- [ ] Auto-delete toggle works
- [ ] Settings persist after reload

### UI
- [ ] Popup displays correctly
- [ ] Scan history shows results
- [ ] Blocked sites list works
- [ ] All buttons functional
- [ ] Responsive design

## 📚 Documentation

When adding new features:

1. Update README.md
2. Add comments in code
3. Update CHANGELOG section
4. Add screenshots if UI changes
5. Update any related documentation files

## 🐛 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

## 🔒 Security

If you discover a security vulnerability, please email [your-email@example.com] instead of using the issue tracker. All security vulnerabilities will be promptly addressed.

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 📞 Questions?

Feel free to:
- Open an issue
- Start a discussion
- Contact the maintainers

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Special mentions for significant contributions

Thank you for contributing! 🙏

