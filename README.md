# Sujith Srinivas G — Portfolio

An industry-standard React portfolio for **Sujith Srinivas G**, Software Engineer.
Built with React 18 + Vite + Framer Motion. Recreates several premium Framer
Marketplace components in pure React for full control and zero licensing dependency.

## ✨ Features

- **TextVideoMask** — Hero text masking a gradient/video background
- **GlassyButton** — Liquid glass buttons with mouse-tracking refraction
- **ShowcaseCard** — 3D-tilting About card with parallax depth layers
- **CursorMaskReveal** — Cursor "punches a hole" revealing hidden content
- **Unfocused** — Hover any skill card; others blur into background
- **RadiusOnScroll** — Container border-radius animates on scroll
- **FFMap3D** — Stylized 3D-perspective world map showing career locations
- **Book3D** — Flippable 3D book components for career chapters
- **ExpandedMask** — Click-to-expand project cards with shared-layout animation
- **Marquee** — Infinite horizontal scroll of the tech stack
- **Custom cursor** + **grain overlay** + **smooth scroll** (Lenis)
- **Preloader** with progress + phase messaging
- Fully responsive · accessible · production-ready

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **Framer Motion 11** (animations, shared layouts)
- **Lenis** (smooth scrolling)
- **Tailwind CSS** (utilities)
- **Lucide React** (icons)

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## 🚀 Deployment

The `dist/` folder after `npm run build` is fully static and can be deployed to:

- **Vercel** — connect repo, framework "Vite", deploy
- **Netlify** — drag `dist/` into the Netlify dashboard
- **GitHub Pages** — push `dist/` to `gh-pages` branch
- **Cloudflare Pages** — connect repo, build command `npm run build`, output `dist`
- **AWS S3 + CloudFront** — upload `dist/` to S3, point CloudFront at it

### Vercel one-click

```bash
npm install -g vercel
vercel
```

### Netlify drag-and-drop

```bash
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Big masked text hero
│   ├── Marquee.jsx           # Infinite tech stack scroll
│   ├── About.jsx             # ShowcaseCard + CursorMaskReveal
│   ├── Journey.jsx           # FFMap3D — career locations
│   ├── Skills.jsx            # Unfocused skill grid
│   ├── Architecture.jsx      # System diagram with RadiusOnScroll
│   ├── Projects.jsx          # ExpandedMask case studies
│   ├── Experience.jsx        # 3D Books per company
│   ├── Contact.jsx           # Terminal + form
│   ├── Footer.jsx
│   ├── Navigation.jsx
│   ├── Preloader.jsx
│   ├── Cursor.jsx
│   │
│   ├── TextVideoMask.jsx     # ↓ Framer component recreations
│   ├── GlassyButton.jsx
│   ├── ShowcaseCard.jsx
│   ├── CursorMaskReveal.jsx
│   ├── Unfocused.jsx
│   ├── RadiusOnScroll.jsx
│   ├── FFMap3D.jsx
│   ├── Book3D.jsx
│   └── ExpandedMask.jsx
├── hooks/
│   └── useSmoothScroll.js
├── styles/
│   └── index.css             # Tailwind + custom CSS variables
├── App.jsx
└── main.jsx
```

## 🎨 Customization

### Update personal info
- **Hero copy** — `src/components/Hero.jsx` (PHRASES array)
- **About text** — `src/components/About.jsx`
- **Projects** — `src/components/Projects.jsx` (PROJECTS array)
- **Experience** — `src/components/Experience.jsx` (EXPERIENCE array)
- **Map locations** — `src/components/FFMap3D.jsx` (LOCATIONS array)
- **Contact info** — `src/components/Contact.jsx`

### Theme colors
Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --bg: #0A0A0A;        /* page background */
  --cream: #F5F1EA;     /* primary text */
  --amber: #FF6B1A;     /* primary accent */
  --electric: #00FFB2;  /* secondary accent */
  --violet: #7C5CFC;    /* tertiary accent */
}
```

Also mirror them in `tailwind.config.js` under `theme.extend.colors`.

### Fonts
- **Display**: Instrument Serif (italic option)
- **Sans**: Geist
- **Mono**: JetBrains Mono

Swap them in `index.html` and `src/styles/index.css`.

## 🧪 Component Usage Examples

```jsx
// TextVideoMask — text with gradient/video masking
<TextVideoMask
  text="HELLO"
  videoSrc="/myvideo.mp4"  // optional
/>

// GlassyButton
<GlassyButton href="#contact" variant="amber" size="lg">
  Get in touch
</GlassyButton>

// ExpandedMask — click to expand project case study
<ExpandedMask
  index={0}
  badge="FINTECH"
  title="My project"
  thumbBg="linear-gradient(...)"
  thumbnail={<MyThumb />}
  expandedContent={<DetailComponent />}
/>

// Unfocused — others blur on hover
<Unfocused>
  <Card1 />
  <Card2 />
  <Card3 />
</Unfocused>
```

## 📝 License

Personal portfolio code — feel free to use as reference but please don't
publish a verbatim copy.

## 📬 Contact

**Sujith Srinivas G**
- 📧 sujithsrinivasg8@gmail.com
- 📞 (513) 258-3186
- 📍 Cincinnati, OH, USA

---

## 🔧 Git Deployment Quickstart

### 1. Initialize and push to GitHub

```bash
cd sujith-portfolio
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 2. Pick a host

**Option A — GitHub Pages (zero config, included workflow)**
1. Push to `main` (the included `.github/workflows/deploy.yml` runs automatically)
2. In your repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. Site goes live at `https://<your-username>.github.io/<repo-name>/`

**Option B — Vercel**
1. Go to vercel.com → New Project → import your repo
2. Framework preset auto-detects **Vite** (config in `vercel.json`)
3. Deploy — done. Auto-redeploys on every push.

**Option C — Netlify**
1. Go to netlify.com → Add new site → import your repo
2. Build settings auto-detected from `netlify.toml`
3. Deploy — done. Auto-redeploys on every push.

### 3. Local development

```bash
npm install      # install dependencies
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## 📋 Requirements

- **Node.js 20+** (pinned in `.nvmrc`)
- **npm** (or pnpm/yarn — adjust lockfile accordingly)

## 🗂 Deploy Config Files Included

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel build + SPA rewrites |
| `netlify.toml` | Netlify build + SPA redirects |
| `.github/workflows/deploy.yml` | GitHub Pages auto-deploy |
| `.nvmrc` | Node version pin (20) |
| `.gitignore` | Excludes node_modules, dist, env files |

---

## ⚠️ Before you deploy — replace placeholders

The site ships with **placeholder GitHub/LinkedIn URLs** you must update with your real profiles. Search and replace across the project:

```bash
# Replace these strings everywhere (Hero, Contact, Footer, index.html):
your-username   →  your real GitHub username
your-handle     →  your real LinkedIn handle
```

Files containing them: `src/components/Contact.jsx`, `src/components/Footer.jsx`, `index.html`.

Also update in `index.html` (used for SEO + link previews):
- `https://sujithsrinivas.dev/` → your real deployed URL (canonical + og:url + og:image)

### Assets included
- `public/Sujith_Srinivas_G.pdf` — your résumé (downloadable from Hero, Contact, Footer)
- `public/og-image.png` — 1200×630 social preview image (LinkedIn/Twitter/Slack unfurls)
- `public/favicon.svg` — site icon

To regenerate the résumé link with a newer PDF, just replace `public/Sujith_Srinivas_G.pdf` (keep the same filename, or update the `href` in the three components).
