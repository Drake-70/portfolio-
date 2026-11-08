# Assets to prepare

What already exists here vs. what you still need to supply.

## ✅ Already in the project

| Asset | File |
| --- | --- |
| Project screenshots (CVBoost, Nexora, WardWatch, HSC SMS, AgencyHub) | converted to optimized JPGs in `public/images/` |
| Profile photo (cut-out version) | `public/images/profile.png` |
| OG / social-share image (1200×630, navy + gold) | `public/og-image.jpg` |
| Favicon | `public/favicon.svg` |
| Placeholder CV PDF | `public/cv/Agbor-Thomas-CV.pdf` |

## 🔧 TODO — you supply these

| # | Asset | Where it goes | Notes |
| --- | --- | --- | --- |
| 1 | **Real CV PDF** | `public/cv/Agbor-Thomas-CV.pdf` (overwrite) | A4, ≤ 1 MB, filename with your name. The current file is a placeholder that says TODO inside. |
| 2 | **Final domain** | `index.html`, `public/robots.txt`, `public/sitemap.xml` | All marked `TODO agborthomas.dev`. |
| 3 | **Contact details** | `src/data/content.js` → `contact` | Email, WhatsApp number (international, digits only, e.g. `2376…`), LinkedIn URL, GitHub URL. Buttons appear automatically once filled. |
| 4 | **StreamBox screenshot** | `public/images/streambox.jpg` + set `image` in `content.js` | Until then a branded navy placeholder is shown. |
| 5 | **Better screenshots (optional but recommended)** | `public/images/*.jpg` | Current ones are first-pass captures. Even, high-contrast desktop captures (1280×800+) with FR **and** EN variants would look strongest. ≤150 KB each. |
| 6 | **Professional studio-style profile photo (optional)** | `public/images/profile.png` | Current cut-out works; a deliberate portrait (neutral background, good lighting) will read more senior. Keep the file square, ~800×800. |
| 7 | **Internship details** | `src/data/content.js` → `experience` | ETS-NTECH role + dates are marked TODO. |
| 8 | **One-line descriptions** | `src/data/content.js` → HSC SMS API, AgencyHub, StreamBox | Written sensible defaults — confirm/adjust (marked TODO). |
| 9 | **Apple touch icon (optional)** | `public/apple-touch-icon.png` | 180×180. Uncomment the links in `index.html`. |
