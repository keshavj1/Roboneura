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
| `/` | Home: hero with the animated 3D drone, capabilities, solutions (with Learn More pop-ups), industries, why choose us (3D robot, rover and drone), stats, meet the owners (directors), case studies, video, process, testimonials, news, FAQ |
| `/about` | Who we are, mission/vision/values, figures, meet the owners, team, awards, open roles (`/about#careers`) |
| `/owner` | The directors (Aarna Sahai, Swapnashree Rath), message from the directors, leadership principles, areas of focus |
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
| Owners / directors: names, designations, photos, message, principles | `src/data/owner.js` |
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

### Home page 3D scenes

The home page has two live 3D scenes built with [three.js](https://threejs.org) and
[React Three Fiber](https://r3f.docs.pmnd.rs), in `src/pages/home/three/`. All models are made of simple shapes in code,
so there are no model files.

| Scene | Where | What it shows |
|---|---|---|
| `DroneScene.jsx` | Hero (right side) | The ROBONEURA drone (logo on top) hovering over a glowing pad, leaning towards the mouse |
| `FleetScene.jsx` | "Why Choose ROBONEURA?" | A four-legged robot that turns on the spot, a wheeled rover with a crate driving round the platform, and the drone taking off from the robot's back, circling and landing again (the robot watches it) |

Shared parts: `DroneModel.jsx` (the drone), `RobotModels.jsx` (robot and rover), `kit.js` (helpers) and
`../LazyScene.jsx` (loading and fallback).
- **Loading:** three.js is large (about 240 kB compressed), so the scenes are separate files that load after the page
  appears. Until then a still render is shown (`public/images/drone-3d.webp`, `fleet-3d.webp`).
- **Fallback:** the still render stays for visitors who turn off animations or whose browser has no WebGL.
- **Pausing:** each scene stops rendering while it is scrolled out of view.
- **Version pin:** `three` is pinned to 0.182.0, because newer versions print a deprecation warning that React Three
  Fiber 9.8 triggers. Update it once React Three Fiber supports `THREE.Timer`.

If you change a model, re-render its still image to match: a screenshot of the scene on a transparent background,
1000 px wide.

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

Generated from the supplied logo (circuit semicircle + "ROBONEURA" + "DYNAMICS", 2000 × 2000 PNG on white) with
transparent backgrounds. The logo's colours (blue `#2347bf`, yellow `#e9c311`, magenta `#ce148b`, light blue
`#4386dd`, purple `#7616d4`) are also the site's brand colours in `tokens.css`.

| File | Use |
|---|---|
| `public/images/brand/logo-full.png` | The complete logo as supplied: footer, and the company logo for search engines |
| `public/images/brand/logo-full-sm.png`, `logo-full-sm@2x.png` | Header and footer: the complete logo, pre-sized to 140 px / 280 px wide so the fine circuit lines stay crisp; `@2x` also in the Board of Directors panel (on a white tile) |
| `public/images/brand/logo-wordmark.png` | "ROBONEURA" lettering (for the optional horizontal logo layout) |
| `public/images/brand/logo-mark.png` | Circuit mark, loading screen |
| `public/images/brand/logo-mark-light.png`, `logo-wordmark-light.png`, `logo-full-light.png` | Versions for dark backgrounds (dark blue and lettering white): share image, building sign |
| `public/images/brand/logo-icon.png` | The rings of the mark: logo on the 3D drone |
| `public/favicon.ico` (16/32/48 px), `favicon-32x32.png` | Browser tab icon (the rings) |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` | Phone home-screen icons (circuit mark on white) |
| `public/og-image.jpg` | Preview image when the site is shared on WhatsApp, LinkedIn, etc. |

The header and the footer both show the complete stacked logo at the **same size**: 140 × 104 px on desktop and
110 × 82 px on phones and tablets (`--logo-w` in `tokens.css`). The header is 120 px tall on desktop (98 px on
phones) to fit it; once the page scrolls, the header becomes compact and the logo shrinks to 100 px wide. `BrandLogo` also has a horizontal layout (mark
beside the lettering) for tight spaces. To update the logo, replace these files and keep the same names and
proportions. A vector (SVG) version of the logo would give even sharper results, if one is available.

### Images

Photos live in `public/images/` and are referenced by file name from the data files. To swap a photo, replace the
file **keeping the same name** (e.g. `ind-agriculture.webp`), or change the file name in the data file.
If a file is missing, the site shows a branded placeholder instead of a broken image.

- Team photos: add e.g. `public/images/team-ceo.webp` and set `photo: img('team-ceo.webp')` in `src/data/content.js`.
- Directors are shown by name only (no photos), in the "Board of Directors" panel; edit them in `src/data/owner.js`.
- Recommended: WebP or JPG, about 1200 px wide for cards, 1600 px for wide banners, under 250 KB each.
- Sources and licences of the current photos: see `IMAGE-CREDITS.md`.

### Icons

Icons are from [Phosphor](https://phosphoricons.com). Only the icons listed in `src/components/ui/icons.js` are
bundled. To use a new one, add a line there (e.g. `export { WrenchIcon } from '@phosphor-icons/react/dist/csr/Wrench';`).

### Placeholder notes

Content that still needs verified data (stats, 98 % satisfaction, client names, awards, sample roles, articles, the
directors' message, legal text, …) can show small "* Placeholder" notes. They are **hidden** at the moment
(`flags.showPlaceholderNotes: false` in `src/config/site.js`); set it to `true` to see which content is still an
example. Replace that content before launch (checklist below).

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
- [ ] The directors' approval of the draft message (`src/data/owner.js`)
- [ ] Team names, photos and LinkedIn links
- [ ] Open roles and careers perks
- [ ] News posts: link each to its article (or remove the section)
- [ ] Company video URL
- [ ] Technology stack and architecture copy: confirm with the engineering team
- [ ] Privacy Policy and Terms: legal review
- [ ] Form endpoint (`VITE_FORM_ENDPOINT`) and domain (`VITE_SITE_URL`, robots.txt, sitemap.xml)
- [x] Placeholder notes hidden (`flags.showPlaceholderNotes = false`); the items above are still example content

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
