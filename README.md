# Pranit Sawant — Portfolio

Personal portfolio website showcasing projects, experience, and technical skills.

Live demo
- https://pranitsawant80.github.io  

Summary
- Simple, responsive single-page portfolio built with HTML, CSS and vanilla JavaScript.
- Focused on Generative AI, Agentic AI, RAG, and cloud-native AI engineering work.

Tech stack
- HTML5
- CSS (custom properties, responsive layout)
- JavaScript (vanilla)
- Google Fonts
- GoatCounter (privacy-friendly analytics + visitor count)

Repository structure
- `index.html` — main site markup
- `css/style.css` — global styles, light/dark theme tokens
- `js/script.js` — interactive behavior (theme toggle, nav, reveal animations, dynamic content rendering, visitor counter)
- `data/content.json` — projects, skills, experience, education, and testimonials, rendered client-side
- `assets/images/` — profile photo, testimonial avatars, and favicon assets
- `sitemap.xml` / `robots.txt` — SEO crawling files

Run locally
1. Open `index.html` directly in your browser. 
2. Or serve via a local HTTP server (recommended to avoid font/CORS issues):

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

Deployment
- GitHub Pages: push to the `main` branch and enable Pages from repository settings.
- For a production build (minified/optimized assets), add a simple build step and deploy the output.

