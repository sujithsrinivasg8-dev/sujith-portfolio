<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Sujith%20Srinivas%20G&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Software%20Engineer%20%7C%20React%20%7C%20Framer%20Motion&descAlignY=55&descSize=18" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=FF6B1A&center=true&vCenter=true&multiline=true&width=600&height=80&lines=⚡+React+18+%2B+Vite+%2B+Framer+Motion;🎨+Premium+UI+Components+from+Scratch;🚀+Industry-Standard+Portfolio)](https://git.io/typing-svg)

<p align="center">
  <a href="mailto:sujithsrinivasg8@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>a>
    <img src="https://img.shields.io/badge/Location-Cincinnati%2C%20OH-00FFB2?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Location"/>
      <img src="https://img.shields.io/badge/Status-Open%20To%20Work-brightgreen?style=for-the-badge&logo=statuspal&logoColor=white" alt="Status"/>
        <a href="https://sujithsrinivasg8-dev.github.io/sujith-portfolio/"><img src="https://img.shields.io/badge/Live%20Demo-FF6B1A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/></a>a>
</p>p>

</div>

---

## ✨ Features

<div align="center">

| Component | Description |
|-----------|-------------|
| 🎬 **TextVideoMask** | Hero text masking a gradient/video background |
| 💎 **GlassyButton** | Liquid glass buttons with mouse-tracking refraction |
| 🃏 **ShowcaseCard** | 3D-tilting About card with parallax depth layers |
| 🔦 **CursorMaskReveal** | Cursor "punches a hole" revealing hidden content |
| 🌫️ **Unfocused** | Hover any skill card; others blur into background |
| 🌀 **RadiusOnScroll** | Container border-radius animates on scroll |
| 🗺️ **FFMap3D** | Stylized 3D-perspective world map — career locations |
| 📖 **Book3D** | Flippable 3D book components for career chapters |
| 🚀 **ExpandedMask** | Click-to-expand project cards with shared-layout animation |
| 🎡 **Marquee** | Infinite horizontal scroll of the tech stack |
| 🖱️ **Custom Cursor** | Grain overlay + smooth scroll (Lenis) |
| ⏳ **Preloader** | Progress + phase messaging |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite%205-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Animation & Styling
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-7C5CFC?style=for-the-badge)

### Icons & Assets
![Lucide](https://img.shields.io/badge/Lucide%20React-F56040?style=for-the-badge&logo=lucide&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/sujithsrinivasg8-dev/sujith-portfolio.git
cd sujith-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> The dev server runs at **http://localhost:5173**
>
> ---
>
> ## 🚀 Deployment
>
> <div align="center">

| Platform | Steps |
|----------|-------|
| ![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white&style=flat-square) **Vercel** | Connect repo → Framework: Vite → Deploy |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white&style=flat-square) **Netlify** | Drag `dist/` into the Netlify dashboard |
| ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?logo=github&logoColor=white&style=flat-square) **GitHub Pages** | Push `dist/` to `gh-pages` branch |
| ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white&style=flat-square) **Cloudflare Pages** | Build cmd: `npm run build`, output: `dist` |
| ![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white&style=flat-square) **AWS S3 + CloudFront** | Upload `dist/` to S3, point CloudFront at it |

</div>

### One-Click Deploys

```bash
# Vercel
npm install -g vercel && vercel

# Netlify drag-and-drop
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

---

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

---

## 🎨 Customization

### Update Personal Info

| File | What to Edit |
|------|-------------|
| `src/components/Hero.jsx` | `PHRASES` array — hero copy |
| `src/components/About.jsx` | About section text |
| `src/components/Projects.jsx` | `PROJECTS` array |
| `src/components/Experience.jsx` | `EXPERIENCE` array |
| `src/components/FFMap3D.jsx` | `LOCATIONS` array |
| `src/components/Contact.jsx` | Contact info |

### Theme Colors

```css
:root {
  --bg:       #0A0A0A;  /* page background  */
  --cream:    #F5F1EA;  /* primary text     */
  --amber:    #FF6B1A;  /* primary accent   */
  --electric: #00FFB2;  /* secondary accent */
  --violet:   #7C5CFC;  /* tertiary accent  */
}
```

> Mirror them in `tailwind.config.js` under `theme.extend.colors`.
>
> ### Fonts
>
> | Role | Font |
> |------|------|
> | Display | Instrument Serif *(italic option)* |
> | Sans | Geist |
> | Mono | JetBrains Mono |
>
> Swap them in `index.html` and `src/styles/index.css`.
>
> ---
>
> ## 🧪 Component Usage
>
> ```jsx
> // TextVideoMask — text with gradient/video masking
> <TextVideoMask text="HELLO" videoSrc="/myvideo.mp4" />
>
> // GlassyButton
> <GlassyButton href="#contact" variant="amber" size="lg">
>   Get in touch
> </GlassyButton>
>
> // ExpandedMask — click to expand project case study
> <ExpandedMask
>   index={0}
>   badge="FINTECH"
>   title="My project"
>   thumbBg="linear-gradient(...)"
>   thumbnail={<MyThumb />}
>   expandedContent={<DetailComponent />}
> />
>
> // Unfocused — others blur on hover
> <Unfocused>
>   <Card1 /> <Card2 /> <Card3 />
> </Unfocused>
> ```
>
> ---
>
> ## 🗂️ Deploy Config Files
>
> <div align="center">

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel build + SPA rewrites |
| `netlify.toml` | Netlify build + SPA redirects |
| `.github/workflows/deploy.yml` | GitHub Pages auto-deploy |
| `.nvmrc` | Node version pin (20) |
| `.gitignore` | Excludes node_modules, dist, env files |

</div>

---

## ⚠️ Before You Deploy

Replace these placeholders everywhere:

```bash
your-username  →  your real GitHub username
your-handle    →  your real LinkedIn handle
```

Files: `src/components/Contact.jsx`, `src/components/Footer.jsx`, `index.html`

Also update in `index.html`:

```
https://sujithsrinivas.dev/  →  your real deployed URL
```

### Public Assets

| Asset | Purpose |
|-------|---------|
| `public/Sujith_Srinivas_G.pdf` | Downloadable résumé (Hero, Contact, Footer) |
| `public/og-image.png` | 1200×630 social preview (LinkedIn / Twitter / Slack) |
| `public/favicon.svg` | Site icon |

---

## 📋 Requirements

![Node](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

---

## 📬 Contact

<div align="center">

| | |
|---|---|
| 👤 **Name** | Sujith Srinivas G |
| 📧 **Email** | [sujithsrinivasg8@gmail.com](mailto:sujithsrinivasg8@gmail.com) |
| 📞 **Phone** | (513) 258-3186 |
| 📍 **Location** | Cincinnati, OH, USA |

</div>

---

## 📝 License

> Personal portfolio code — feel free to use as **reference** but please don't publish a verbatim copy.
>
> ---
>
> <div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=twinkling" width="100%"/>

**Made with ❤️ by [Sujith Srinivas G](mailto:sujithsrinivasg8@gmail.com)**

![Profile Views](https://komarev.com/ghpvc/?username=sujithsrinivasg8-dev&color=FF6B1A&style=for-the-badge&label=Profile+Views)

</div>
