# Harshit Rathaur — Portfolio

A premium, production-ready personal portfolio built with pure **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build step — works the moment you open `index.html`.

## ✨ Features

- **Hero** — animated typing effect, canvas particle field with mouse interaction, floating stat badges
- **Sticky glass navigation** — shrinks on scroll, highlights the active section, mobile hamburger menu
- **About** — animated counters, two-column layout
- **Skills** — interactive 3D-tilt technology cards grouped by category
- **Experience** — animated vertical timeline with company logos and achievements
- **Projects** — premium cards with hover overlay, GitHub/Live Demo links, and category filtering
- **Certifications** — responsive grid with verified/award badges
- **Education** — timeline-style cards with institution logos
- **Contact** — Netlify Forms integration with client-side validation, social links, Google Maps button, resume download
- **Footer** — back-to-top button, quick links

### Polish & motion
Custom cursor, scroll progress bar, page loader, scroll-reveal animations, magnetic buttons, parallax aurora background, animated grid, glassmorphism throughout, glow effects, and a custom 404 page.

### SEO & Performance
Meta tags, Open Graph, Twitter Cards, JSON-LD structured data, `robots.txt`, `sitemap.xml`, semantic HTML, lazy-loaded images, and `prefers-reduced-motion` support.

## 📁 File Structure

```
harshit-portfolio/
├── index.html        # Main page
├── style.css          # All styles
├── script.js          # All interactivity
├── 404.html           # Custom error page
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    └── images/        # Place local images here (optional — currently pulling from live site)
```

## 🚀 Deploying to Netlify

1. Drag and drop the `harshit-portfolio` folder onto [Netlify Drop](https://app.netlify.com/drop), **or**
2. Push this folder to a GitHub repo and connect it via Netlify's "Import from Git" flow.
3. No build command is needed — this is a static site. Leave the build command blank and set the publish directory to `/`.

### Contact form setup
The contact form uses **Netlify Forms** (`data-netlify="true"`). Once deployed on Netlify, form submissions will automatically appear in your Netlify dashboard under **Forms** — no backend code required. A honeypot field (`bot-field`) is included for spam protection.

## 🖼️ Images

This build currently references your existing hosted images (hero photo, project screenshots, company/education logos) directly from `contactharshit.netlify.app` so everything renders immediately. To make the site fully self-contained:

1. Download each image referenced in `index.html`.
2. Place them in `assets/images/`, `assets/images/projects/`, and `assets/images/educat/` (matching the original structure).
3. Update the `src` paths in `index.html` to point to your local copies.

## 🎨 Customization

- **Colors** — edit the CSS custom properties at the top of `style.css` (`:root` block).
- **Typing phrases** — edit the `phrases` array in `script.js`.
- **Content** — all text content lives directly in `index.html`, organized by section with clear comment headers.

## 🌐 Browser Support

Tested on the latest versions of Chrome, Firefox, Safari, and Edge. Gracefully degrades on touch devices (custom cursor and tilt effects are disabled automatically).

---

Built with ⚡ by Harshit Rathaur.
