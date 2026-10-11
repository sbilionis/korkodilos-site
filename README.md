# Korkodilos — website

Ceramic studio website (Ogust, 2026). Greek at `/`, English at `/en/`.
Built with **Eleventy** on **Netlify**; Alex edits it in **/admin** (Sveltia CMS, Decap-compatible);
enquiries go through **Netlify Forms**. The booking system is a separate project (later).

## How it fits together

| What | Where |
|---|---|
| Page templates (one per page, built in GR + EN) | `src/*.njk`, frame in `src/_includes/layouts/base.njk` |
| **Content** (what Alex edits) | `src/_data/*.json` — each file is `{ "el": {...}, "en": {...} }` |
| Interface words (buttons, day names, form labels) | `src/_data/ui.json` |
| Admin config | `src/admin/config.yml` (Sveltia CMS 0.221.1, pinned in `src/admin/index.html`) |
| Photos (Alex's media library) | `src/assets/img/uploads/` |
| Logo, map, icons, the animated K | `src/assets/img/` (not in the admin on purpose) |
| Styles / scripts | `src/css/site.css`, `src/js/site.js` (header, footer, the mouth), `src/js/programme.js` |
| Build | `npm run build` → `_site/` · `npm start` → http://localhost:8052 |

**Fonts** are licensed and are NOT in this (public) repository: they are served from https://unrivaled-queijadas-404cd2.netlify.app (Netlify project `unrivaled-queijadas-404cd2`, source folder `CREATIVE CODING/korkodilos-fonts`). To change a font: update that folder and drag it onto that Netlify project's Deploys page.

Rules carried over from the prototype (see `korkodilos-website/HANDOVER.md`): Greek in the sans is drawn by
Aeonik Pro (Monument has no Greek); the K symbol SVG is used exactly as delivered (only the clip id changes per copy);
never end a page on a dark section (KORKO/–DILOS are ink).

## One-time setup (Stavros)

1. ✅ **GitHub** — done 11 Oct 2026: **public** repo github.com/sbilionis/korkodilos-site (public so Netlify doesn't bill each editor as a "Git contributor"; no fonts, passwords or private data in it). `gh` CLI is installed and logged in as sbilionis, so pushes work from the terminal.
2. ~~Admin config~~ — done: `backend.repo` is `sbilionis/korkodilos-site`.
3. ✅ **Netlify** — done: korkonew deploys from GitHub `main` (Netlify GitHub app limited to this one repository).
   Build settings come from `netlify.toml` (build `npm run build`, publish `_site`). From now on every push (and every save in the admin) redeploys.
4. ✅ **Forms** — done: detection on, forms `contact` + `enquiry` active, email notification to korkodilos20@gmail.com for any form. Two forms appear: `enquiry` (Corporate / Clay Party, field `type` says which) and `contact`.
   *Forms → Form notifications → Add notification → Email notification* → `korkodilos20@gmail.com` (any form).
5. **Admin login (GitHub OAuth)**
   - GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*: Homepage `https://korkonew.netlify.app`, Authorization callback `https://api.netlify.com/auth/done`. Copy the Client ID and generate a Client secret.
   - Netlify → *Site configuration → Access & security → OAuth → Install provider* → GitHub → paste both.
6. **Alex** — he creates a free GitHub account; you add him in GitHub → repository → *Settings → Collaborators* (Write access).

Note: Netlify Identity / Git Gateway (the old way to log in to a CMS) is deprecated since Feb 2025, which is why we use GitHub login.

## For Alex — how to edit (Ελληνικά)

1. Πήγαινε στο **https://korkonew.netlify.app/admin** → *Sign In with GitHub*.
2. Αριστερά: **Σελίδες** (Αρχική, Studio, Classes, Calendar, Contact), **Πρόγραμμα & Ειδικά**, **Δάσκαλοι**, **Ρυθμίσεις**.
3. Κάθε πεδίο έχει **Ελληνικά και Αγγλικά δίπλα-δίπλα**. Γράψε και τα δύο.
4. **Έντονα γράμματα**: γράψε `**λέξη**`. Σύνδεσμος: `[κείμενο](calendar.html)`.
5. **Φωτογραφίες**: πάτα το πεδίο φωτογραφίας → διάλεξε από τη βιβλιοθήκη ή ανέβασε νέα (καλύτερα έως 1600px, JPG).
6. **Ειδικά** (workshops, events, νέες σειρές): πρόσθεσε νέο με ημερομηνία· όσα έχουν περάσει κρύβονται μόνα τους.
7. Πάτα **Save**. Η σελίδα ενημερώνεται σε περίπου 1 λεπτό.

## Checks after changes

```bash
npm run build          # must finish without warnings like "[imgsize] cannot read …"
```
Then open every page in GR and EN at 390px and 1440px.
