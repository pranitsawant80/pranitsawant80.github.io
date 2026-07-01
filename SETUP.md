# Setup & Development Guide

## 📋 Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Optional: Node.js & npm (for future tooling)

---

## 🚀 Quick Start

### 1. Local Development
```bash
# Clone the repository
git clone https://github.com/pranitsawant80/pranitsawant80.github.io.git
cd pranit-portfolio

# Option A: Open directly in browser
open index.html

# Option B: Run a local server (requires http-server or Python)
npx http-server
# or
python -m http.server 8000
# Visit http://localhost:8000
```

### 2. Update Content
- **Text/Bio:** Edit directly in `index.html`
- **Colors/Fonts:** Modify CSS variables in `style.css` (`:root` section)
- **Add New Section:** Copy existing section structure and update IDs

### 3. Add Images
```
images/
├── male_icon.png
├── female_icon.png
└── myphoto.png

```

---

## 🎨 Customization

### Change Color Scheme
```css
/* In style.css, modify :root variables */
:root {
  --accent: #4f8ef7;        /* Primary color */
  --accent2: #7c3aed;       /* Secondary color */
}
```

### Add New Navigation Link
```html
<!-- In index.html, add to nav-links -->
<li><a href="#section-id">Section Name</a></li>

<!-- Then create the section -->
<section id="section-id">
  <!-- Your content -->
</section>
```

### Add New Project Card
```html
<!-- Copy structure from existing project-card -->
<div class="project-card">
  <div class="project-meta">
    <span class="project-client">Client Name</span>
    <span class="project-duration">Year</span>
  </div>
  <div class="project-title">Project Title</div>
  <p class="project-desc">Description...</p>
  <div class="project-tech">
    <span class="tech-badge">Tech 1</span>
    <span class="tech-badge">Tech 2</span>
  </div>
</div>
```

---

## 📦 Build & Deployment

### GitHub Pages (Current Setup)
1. Push changes to `main` branch
2. GitHub Actions automatically deploys to gh-pages branch
3. Live at: `https://pranitsawant80.github.io`

### Custom Domain
1. Add `CNAME` file with your domain name
2. Update DNS records to point to GitHub Pages
3. Enable HTTPS in repository settings

### Manual Build (for optimization)
```bash
# This is optional - currently no build process
npm run build  # (when configured)
```

---

## 🔍 Testing

### Checklist Before Deployment
- [ ] All links work (no 404s)
- [ ] Images load correctly
- [ ] Dark/light theme toggles properly
- [ ] Mobile responsive (test on phone/tablet)
- [ ] No browser console errors (F12)
- [ ] Profile image modal works
- [ ] All sections scroll smoothly

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in HTML
- Ensure `images/` folder exists
- Verify file names match (case-sensitive on Linux/Mac)

### Theme Not Persisting
- Clear browser cache (Ctrl+Shift+Del)
- Check localStorage: Open DevTools > Application > Local Storage

### Navigation Active Link Not Updating
- Ensure section has `id` attribute
- Check that `<a href="#section-id">` matches

### Mobile Menu Not Working
- Clear browser cache
- Check `script.js` for errors (F12 > Console)

---

## 📚 File Structure

```
.
├── index.html          # Main HTML structure
├── css/                # All styling files
│   └── style.css
├── js/                 # JavaScript functionality
│   └── script.js
├── assets/             # Static assets (images, icons)
├── data/               # Optional content/data files
├── README.md           # Project overview
├── SETUP.md            # This file
├── .gitignore          # Git ignore rules
```
---

## 🔐 Security

- ✅ No sensitive data in code (emails used are public)
- ✅ No backend vulnerabilities (static site)
- ✅ HTTPS enabled by default (GitHub Pages)
- ✅ No external scripts (except Google Fonts)

---

## 📈 Performance Tips

- Images are optimized
- CSS is minified in production
- JavaScript uses passive event listeners
- Smooth scrolling uses CSS (not JS)
- Lazy loading ready (for future)

---
---

## 📞 Support & Questions

If something breaks:
1. Check browser console (F12)
2. Review CODEBASE_REVIEW.md for architecture
3. Look at existing similar sections as examples
4. Test in different browser

---

