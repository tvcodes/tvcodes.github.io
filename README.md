# ME-NIVERSE 🌌

> A personal corner of the internet for stories, reflections, films, books, music, and everything in between.

**🌐 Live Site:** https://tvcodes.github.io

---

## About

**ME-NIVERSE** is my personal blog — a deep-space, glassmorphism-inspired space where I write about the things that shape who we are.

Every post belongs to one of three dimensions:

* 🌱 **To Live** — reflections on everyday life.
* 🌑 **To Die** — thoughts on endings, loss, and letting go.
* ✨ **To Remember** — memories, nostalgia, and moments worth keeping.

Whether it's a favourite film, a meaningful book, a song on repeat, or a quiet thought at midnight, this is where I leave pieces of myself.

---

## Features

* 🌌 Glassmorphism-inspired space theme
* ⭐ Animated starfield background
* 📝 Markdown-powered blog posts with Astro Content Collections
* 🗂 Dynamic category pages
* 📱 Responsive design
* ⚡ Fast static site generation with Astro
* 🚀 Automatic deployment to GitHub Pages via GitHub Actions

---

## Tech Stack

* 🚀 **Astro** — Static site framework
* 📝 **Content Collections** — Markdown content management with Zod schema validation
* 🎨 **Vanilla CSS** — Custom styling and glassmorphism UI
* ✨ **Vanilla JavaScript** — Starfield animation and client-side interactions
* ⚙️ **GitHub Actions** — Continuous deployment to GitHub Pages

---

## Project Structure

```text
src/
├── components/          # Reusable Astro components
├── content/
│   └── blog/            # Markdown blog posts
├── layouts/             # Shared layouts
├── pages/
│   ├── blog/
│   │   ├── category/    # Dynamic category pages
│   │   └── [slug].astro # Blog post pages
│   ├── about.astro
│   ├── thanks.astro
│   └── index.astro
├── scripts/             # Client-side JavaScript
└── styles/              # Global styles
```

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

The site is automatically built and deployed to **GitHub Pages** whenever changes are pushed to the `main` branch using **GitHub Actions**.

Deployment workflow:

```
Push → GitHub Actions → Astro Build → GitHub Pages
```

---

## Roadmap

Planned improvements:

* [ ] Search functionality
* [ ] Reading time estimation
* [ ] Tags system
* [ ] RSS Feed
* [ ] Pagination
* [ ] Related posts
* [ ] Sitemap improvements
* [ ] Accessibility enhancements
* [ ] Performance optimisations

---

## License

The source code is licensed under the **MIT License**. See the `LICENSE` file for details.

Blog posts, writing, and images are © **tvcodes**. All rights reserved. They may not be reproduced or redistributed without permission.

---

Built with 🌙 by **tvcodes**
