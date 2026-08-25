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
- **Colors/Fonts:** Modify CSS variables in `css/style.css` (`:root` section)
- **Add New Section:** Copy existing section structure and update IDs
- **Projects, Skills, Experience, Education, Testimonials:** Edit `data/content.json` — these sections are rendered client-side by `js/script.js`, not hardcoded in `index.html`

### 3. Add Images
```
assets/images/
├── myphoto.jpg          # profile photo (nav avatar, popover, OG image)
├── male_icon.jpg        # testimonial avatar
├── favicon.svg          # browser tab icon (modern browsers)
├── favicon.png          # browser tab icon (fallback)
└── apple-touch-icon.png # iOS/home-screen icon
```
Reference new images by path from `data/content.json` (testimonials) or directly in `index.html`.

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
Project cards are rendered from `data/content.json`, not written directly in `index.html`. Add a new object to the `projects` array:
```json
{
  "id": 7,
  "title": "Project Title",
  "client": "Client Name",
  "duration": "Year",
  "description": "Description...",
  "tech": ["Tech 1", "Tech 2"]
}
```
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
├── assets/
│   └── images/         # Photos, testimonial avatars, favicon assets
├── data/
│   └── content.json    # Projects, skills, experience, education, testimonials
├── sitemap.xml          # SEO: page listing for search engines
├── robots.txt           # SEO: crawler rules
├── README.md            # Project overview
├── SETUP.md             # This file
├── .gitignore           # Git ignore rules
```
---

## 🔐 Security

- ✅ No sensitive data in code (emails used are public)
- ✅ No backend vulnerabilities (static site)
- ✅ HTTPS enabled by default (GitHub Pages)
- ✅ Only external scripts are Google Fonts and GoatCounter (privacy-friendly analytics, no cookies)

---

## 📈 Performance Tips

- Images are optimized (JPEG, resized to display size)
- No build/minify step — CSS and JS are served as-authored
- JavaScript uses passive event listeners
- Smooth scrolling uses CSS (not JS)
- Below-the-fold images (`loading="lazy"`) are lazy-loaded

---
---

## 📞 Support & Questions

If something breaks:
1. Check browser console (F12)
2. Look at existing similar sections as examples
3. Test in different browser

---

