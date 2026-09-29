# ROBONEURA DYNAMICS PRIVATE LIMITED: company website

Marketing website for ROBONEURA Dynamics (robotics · drones · automation · computer vision), built with **React 19 + Vite**.
It implements the approved design for Home, About, Solutions and Contact, plus Industries, Technology (interactive
system architecture and technology stack), Careers, Privacy Policy, Terms and a 404 page.

## Quick start

Requires **Node.js 20.19+ or 22.12+** (Node 24 LTS recommended).

```bash
npm install        # once
npm run dev        # development server with hot reload → http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build → http://localhost:4173
npm run lint       # ESLint (React + React Compiler rules)
```

> Windows PowerShell: if `npm` is blocked by the execution policy, use `npm.cmd run dev` etc.

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero with the animated 3D drone, capabilities, solutions (with Learn More pop-ups), industries, why choose us, stats, meet the owner, case studies, video, process, testimonials, news, FAQ |
| `/about` | Who we are, mission/vision/values, figures, meet the owner, team, awards, open roles (`/about#careers`) |
| `/owner` | Owner profile, message from the owner, leadership principles, areas of focus |
| `/solutions` | Robotics, Drone Solutions, Automation Systems, Computer Vision, capabilities, sectors, process |
| `/industries` | Eight industries with use cases (each has an anchor, e.g. `/industries#agriculture`) and case studies |
| `/technology` | Interactive **System Architecture** (Physical → Edge → Cloud → Application), capabilities, **technology stack**, process |
| `/careers` | Why join, open roles with team filter, hiring process |
| `/contact` | Contact cards, validated enquiry form, map, office hours |
| `/privacy-policy`, `/terms` | Legal pages (template text) |

## Editing content

Almost everything you will want to change lives in **data files**. No component code needs to change.

| What | Where |
|---|---|
| Phone, emails, address, office hours, map, social links, company video, feature flags | `src/config/site.js` (the address is also in the JSON-LD block of `index.html`) |
| Owner: name, designation, photo, bio, message, principles | `src/data/owner.js` |
| Solutions (cards, pop-ups, Solutions page, contact-form options) | `src/data/solutions.js` |
| Industries | `src/data/industries.js` |
| Capability strip / capability cards | `src/data/capabilities.js` |
| Why-choose reasons, stats, mission/vision/values, awards, client names | `src/data/company.js` |
| Case studies | `src/data/projects.js` |
| Testimonials, news posts, FAQ, team | `src/data/content.js` |
| Open roles, departments, careers perks | `src/data/jobs.js` |
| Process and hiring steps | `src/data/process.js` |
| Architecture layers and tech stack | `src/data/architecture.js`, `src/data/techStack.js` |
| Privacy Policy / Terms text | `src/data/legal.js` |
| Colours, fonts, spacing, shadows | `src/styles/tokens.css` |

### Colours

Every colour on the site comes from `src/styles/tokens.css`. The palette uses the **ROBONEURA logo colours** in the
layout of the [Altech reference site](https://html-demo.themetechmount.com/altech/header-style-03.html): a white header
and footer, pale blue-grey sections and deep navy dark sections.
- **Logo blue** `#233e98`: buttons and links on light backgrounds.
- **Logo yellow** `#fec603`: highlighted words and buttons on dark backgrounds.
- **All five logo colours** (blue, yellow, magenta `#d20d81`, cyan `#0b9dd9`, purple `#6e2d8c`): the logo stripe along
  the top of the header and the footer, and the short bar under every section title.
- **Icons are one colour**: black on light backgrounds, white on dark ones (tokens `--icon`, `--icon-bg`,
  `--icon-on-dark`).

Optional colour-coded icons: add `data-icons="color"` to the `<html>` tag in `index.html` and icons use the logo colours
instead. Each solution gets its own colour (robotics blue, drones cyan, automation magenta, computer vision purple),
and lists such as industries, process steps and architecture layers cycle through the five colours.

Three alternative palettes are kept in the same file. To switch, add `data-theme="steel"` (steel blue + slate, the
reference site's colours), `data-theme="orange"` (midnight + orange) or `data-theme="teal"` (the original design) to
the `<html>` tag in `index.html`.

### Home hero: 3D drone

The drone on the right of the home hero is a live 3D model built with [three.js](https://threejs.org) and
[React Three Fiber](https://r3f.docs.pmnd.rs) (`src/pages/home/DroneScene.jsx`). It is made of simple shapes in code,
so there is no model file. It hovers, turns slowly, leans towards the mouse and spins its propellers, and it carries the
logo on its top.
- **Loading:** three.js is large (about 240 kB compressed), so the scene is a separate file that loads after the page
  appears. Until then the still render `public/images/drone-3d.webp` is shown.
- **Fallback:** the still render stays for visitors who turn off animations or whose browser has no WebGL.
- **Pausing:** the scene stops rendering while the hero is scrolled out of view.
- **Version pin:** `three` is pinned to 0.182.0, because newer versions print a deprecation warning that React Three
  Fiber 9.8 triggers. Update it once React Three Fiber supports `THREE.Timer`.

If you change the model, re-render the still image to match: take a screenshot of the drone on a transparent
background, at 1000 × 900 px.

### Fonts

- **Poppins** everywhere, in four weights: 400 body text, 500 menu, 600 headings, buttons and labels, 700 hero
  titles and large figures (tokens `--fw-regular` … `--fw-bold` in `tokens.css`).
- **Playfair Display italic** for the accent word of section titles, as on the reference site. In a title, wrap the
  word in asterisks: `title="Case Studies from the *Field*"`.
- Both are self-hosted (Fontsource packages, loaded in `src/main.jsx`), so no request goes to Google Fonts.

### Header info bar

An info bar with the address, email, office hours and social links can appear above the menu on screens 1200 px and
wider (it folds away when the page scrolls). It is switched off; set `flags.showHeaderInfoBar` to `true` in
`src/config/site.js` to show it.

### Logo & icons

Generated from the supplied logo (white-background PNG) with transparent backgrounds:

| File | Use |
|---|---|
| `public/images/brand/logo-mark.png`, `logo-wordmark.png` | Full-colour logo: header, footer and loading screen |
| `public/images/brand/logo-mark-light.png`, `logo-wordmark-light.png` | Versions for dark backgrounds (the blue parts are white), used in the share image |
| `public/images/brand/logo-full.png` | Complete stacked logo (used as the company logo for search engines) |
| `public/favicon.ico` (16/32/48 px), `favicon-32x32.png` | Browser tab icon |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` | Phone home-screen icons |
| `public/og-image.jpg` | Preview image when the site is shared on WhatsApp, LinkedIn, etc. |

To update the logo, replace these files and keep the same names and proportions. A vector (SVG) version of the logo
would give even sharper results, if one is available.

### Images

Photos live in `public/images/` and are referenced by file name from the data files. To swap a photo, replace the
file **keeping the same name** (e.g. `ind-agriculture.webp`), or change the file name in the data file.
If a file is missing, the site shows a branded placeholder instead of a broken image.

- Team photos: add e.g. `public/images/team-ceo.webp` and set `photo: img('team-ceo.webp')` in `src/data/content.js`.
- Owner photo: add a portrait (about 900 × 1100 px) as e.g. `public/images/owner.webp` and set `photo: img('owner.webp')`
  in `src/data/owner.js`.
- Recommended: WebP or JPG, about 1200 px wide for cards, 1600 px for wide banners, under 250 KB each.
- Sources and licences of the current photos: see `IMAGE-CREDITS.md`.

### Icons

Icons are from [Phosphor](https://phosphoricons.com). Only the icons listed in `src/components/ui/icons.js` are
bundled. To use a new one, add a line there (e.g. `export { WrenchIcon } from '@phosphor-icons/react/dist/csr/Wrench';`).

### Placeholder notes

Figures that still need verified data (stats, 98 % satisfaction, client names, awards, sample roles, …) show a small
"* Placeholder" note. Once real data is in, set `flags.showPlaceholderNotes` to `false` in `src/config/site.js`.

## Contact & newsletter forms

Forms validate in the browser. To receive submissions by email, connect any service that accepts a JSON POST, such as
[Formspree](https://formspree.io), Getform or Web3Forms, or your own API:

1. Create a form endpoint at the provider.
2. Copy `.env.example` to `.env.local` and set, for example:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   VITE_NEWSLETTER_ENDPOINT=https://formspree.io/f/efghwxyz
   ```
3. Rebuild (`npm run build`).

Without an endpoint:
- `npm run dev` shows a demo success message (nothing is sent).
- A production build asks the visitor to send the message from their email app, with the text already filled in, so no enquiry is lost.

## Company video

Set `videoUrl` in `src/config/site.js` to a YouTube embed URL (`https://www.youtube-nocookie.com/embed/VIDEO_ID`) or
an `.mp4` placed in `public/`. Until then, "Watch Video" shows a poster with a "Book a demo" button.

## Deployment

`npm run build` creates `dist/`. It is a static site: upload the **contents** of `dist/` to any web host.

### Apache / cPanel (e.g. with FileZilla)

1. `npm run build`
2. Upload everything inside `dist/` to `public_html/` (or the site's folder).
   In FileZilla, turn on **Server → Force showing hidden files** so `.htaccess` is uploaded too.
3. `.htaccess` (included) makes direct links and page refreshes such as `/about` work, sets caching and enables compression.
   It requires Apache's `mod_rewrite` (on by default at most hosts; in WAMP enable `rewrite_module`).

**Sub-folder hosting** (e.g. `https://example.com/roboneura/`): build with the folder set, e.g. in PowerShell
`$env:VITE_BASE='/roboneura/'; npm run build`, or put `VITE_BASE=/roboneura/` in `.env.local`.

**Other hosts**: Netlify, Vercel, Cloudflare Pages and Firebase all work. Configure "rewrite all routes to `/index.html`".

### Domain

The site address is set in `.env` (`VITE_SITE_URL`, used for canonical and share tags), `public/robots.txt` and
`public/sitemap.xml`. All three currently use `https://roboneura.com`. Update them if the domain differs.

## Replace before launch

- [ ] Phone number (`+91 522 123 4567` is a placeholder) and social media links (`#`) in `src/config/site.js`
- [ ] Stats, client satisfaction, client names/logos, awards and certifications
- [ ] Testimonials 2 and 3 (placeholders), case-study results
- [ ] Owner's name, designation, photo, message and LinkedIn link (`src/data/owner.js`)
- [ ] Team names, photos and LinkedIn links
- [ ] Open roles and careers perks
- [ ] News posts: link each to its article (or remove the section)
- [ ] Company video URL
- [ ] Technology stack and architecture copy: confirm with the engineering team
- [ ] Privacy Policy and Terms: legal review
- [ ] Form endpoint (`VITE_FORM_ENDPOINT`) and domain (`VITE_SITE_URL`, robots.txt, sitemap.xml)
- [ ] Then set `flags.showPlaceholderNotes = false`

## Project structure

```
public/            static files copied as-is (.htaccess, favicon, images/, robots.txt, sitemap.xml)
src/
  config/site.js   company details, navigation, flags
  data/            all page content
  styles/          design tokens, base styles, animations
  hooks/           scroll reveal, count-up, card tilt, media queries, scroll lock, …
  lib/             helpers (form submission, validation, asset paths, shared observer, preloader)
  components/
    layout/        header, mobile menu, footer, newsletter, back-to-top
    ui/            buttons, sections, headings, images, modal, accordion, filters, icons, …
    shared/        sections reused across pages (page hero, CTA, process, stats, case studies, …)
  pages/           one folder per page, with its page-only sections and styles
  router.jsx       routes (pages other than Home load on demand)
```

Accessibility and motion: keyboard navigation, skip link, visible focus, labelled controls, modals built on the native
`<dialog>`, and every animation is switched off for visitors who ask their device for reduced motion.
