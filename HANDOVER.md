# Korkodilos website — handover for the next chat

> Paste into a new chat: **"Read `CREATIVE CODING/korkodilos-site/HANDOVER.md` and continue the Korkodilos website (design amendments + new content)."**
> Written 11 Oct 2026, end of the setup chat. The design history (why things look the way they do) is in `CREATIVE CODING/korkodilos-website/HANDOVER.md` — read §3–4h there only when a design question comes up.

## 1. Where we are (in one paragraph)
The site is **live at https://korkonew.netlify.app** (Greek at `/`, English at `/en/`), built by Netlify from the **public GitHub repo github.com/sbilionis/korkodilos-site** every time something is pushed. **Alex** (owner, Αλέξανδρος Ντούρας) will edit texts, prices, the weekly programme, workshops, tutors and photos himself at **https://korkonew.netlify.app/admin** (Sveltia CMS, GitHub login). **Enquiry forms** (Corporate / Clay Party / Contact) arrive by email at korkodilos20@gmail.com. Stavros (Ogust) is the designer; we work on design changes together in chat. The **booking system** (students + "Korkodilos HQ") is a separate project for the coming weeks: `CREATIVE CODING/korkodilos website booking/HANDOVER-NEXT-CHAT.md`.

## 2. Stavros's working rules (important)
- **Show before applying.** For any design change: make options, show them (side-by-side desktop + 375px), let Stavros pick, apply only the picks. Direct, explicit requests ("make X smaller") can be applied straight away.
- **Simple, straightforward site.** No extra features without asking.
- **Audit every round:** navigation, UX rough edges, responsiveness at 360–1680px (incl. 390/430 iPhone, and in-between widths like 640/880). Check text never runs into images.
- Explain in plain words. Stavros is a designer, not a developer: say what each step does, do as much as possible yourself (his Mac + his Chrome), and only hand him the steps that need his login/approval.
- Never handle secrets (passwords, tokens, the GitHub client secret): Stavros pastes those himself.

## 3. Accounts & services (what each one does)
| Service | What it is for us | Details |
|---|---|---|
| **GitHub** `sbilionis/korkodilos-site` | The "box" with every file + history | **Public** on purpose: Netlify bills private-repo committers as "Git contributors"; public = free. No secrets or fonts in it. |
| **Netlify** project `korkonew` (team OGUST, paid) | Builds + hosts the site, receives forms | Deploys `main` automatically (~30 s). Forms: `contact`, `enquiry` → email korkodilos20@gmail.com. Netlify GitHub app limited to this one repo. |
| **Netlify** project `unrivaled-queijadas-404cd2` | Serves the **licensed fonts** only | https://unrivaled-queijadas-404cd2.netlify.app/fonts/… — source folder `CREATIVE CODING/korkodilos-fonts` (drag onto that project's Deploys page to update). Copy of fonts + note in `~/Downloads/Korkodilos fonts`. Production visibility = public, previews private. |
| **GitHub OAuth app** "Korkodilos admin" (Client ID `Ov23li57Fr3wE3Wu9A2P`) | Lets people sign in to /admin | Installed in Netlify → korkonew → Configuration → Security → OAuth → GitHub. Callback `https://api.netlify.com/auth/done`. |
| **gh CLI** on Stavros's Mac | Lets Claude push from the terminal | Installed with Homebrew, logged in as `sbilionis`. |

## 4. How a change gets live
- **Design/code change (Claude):** `git pull` FIRST (Alex may have saved in the admin) → edit in `korkodilos-site/` → `npm run build` → preview with launch config **`korkodilos-site`** (serves `_site/` on http://localhost:8052; rebuild after each change) → show Stavros → when OK: commit + `git push` → live in ~30 s. Commit messages end with the Co-Authored-By line.
- **Content change (Alex/Stavros):** /admin → edit → Save → commits to GitHub → live in ~1 min.
- **Preview on a phone before going live (optional, not set up yet):** turn on Netlify branch deploys (korkonew → Configuration → Build & deploy → Branches), push to a branch like `preview`, Netlify gives a `preview--korkonew.netlify.app` link.

## 5. The code (where things are)
| What | Where |
|---|---|
| Templates (one per page, built in el + en) | `src/index.njk`, `studio.njk`, `classes.njk`, `calendar.njk`, `contact.njk`, `thanks.njk`; frame `src/_includes/layouts/base.njk`; partials in `src/_includes/partials/` (K symbol, paragraphs, form) |
| **Content** (what the admin edits) | `src/_data/{home,studio,classes,calendar,contact,programme,tutors}.json` — each `{ "el": {...}, "en": {...} }`; `site.json` (email/phone/socials, not bilingual) |
| Interface words (buttons, day names, form labels, "nothing special" message) | `src/_data/ui.json` — **not in the admin yet** (only Claude edits it) |
| Admin config | `src/admin/config.yml` (Sveltia CMS **0.221.1**, pinned in `src/admin/index.html`) |
| Photos (admin media library) | `src/assets/img/uploads/` (40 photos; the film photos are `kNN.jpg` = photo NN of `Desktop/1. CURRENT PROJECTS/111. KORKO/05. PHOTOS/KORKO WEB PHOTOS`, sorted, resized ≤1600px) |
| Logo, map, icons, animated K | `src/assets/img/` (`korko-mouth.svg` + `korko-mouth-HANDOFF.md`: use exactly as delivered, only rename the clip id per copy) |
| Styles / scripts | `src/css/site.css` (one file, sections by round), `src/js/site.js` (header/footer/the mouth/book pill/dialogs, GR/EN strings), `src/js/programme.js` (hides past specials, adds weekdays) |
| Build config | `eleventy.config.mjs` (filters `mdi` markdown-inline, `imgsize`, `ratio`), `netlify.toml`, `package.json` (Eleventy 3.1.6, markdown-it 14.1.0, image-size 2.0.2 — exact versions) |

## 6. Gotchas we hit (don't repeat)
- **Sveltia i18n:** every file entry needs `i18n: true` (not just the collection), otherwise the admin shows empty fields — and **saving then would wipe the content**. If the admin ever looks empty: don't save, check config.
- Admin YAML is written out in full (no anchors/merges); validate with `node -e` + `js-yaml` (in node_modules) before pushing, and check every data key has a field.
- **Fonts never go into the repo** (`src/assets/fonts/` is in `.gitignore`). Font URLs point to the fonts project.
- Netlify "pending review / Git contributor" emails: don't approve (would add a paid seat). Only happened while the repo was private.
- Eleventy doesn't clean `_site/`: `rm -rf _site` before a final check.
- In-app browser preview: screenshots/rAF/IntersectionObserver are throttled when the pane is hidden → measure with JS before "fixing".
- iOS: the closed oval menu must stay `visibility:hidden` (it caused sideways panning); `html,body{overflow-x:clip}`; the mobile menu uses `svh`.
- Never end a page on an ink section (KORKO/–DILOS are ink); keep the space above –DILOS inside the last section.
- `CREATIVE CODING/.claude/launch.json` holds many projects — add entries with Edit, never overwrite. (`korkodilos-netlify-check` is obsolete.)

## 7. Open items / next steps
**Setup leftovers**
1. **Make a fresh GitHub client secret** (the current one appeared in a screenshot in chat): GitHub → Settings → Developer settings → OAuth Apps → Korkodilos admin → *Generate a new client secret* → Netlify → korkonew → Security → OAuth → GitHub → edit → paste → then delete the old secret on GitHub. Stavros does the copy/paste.
2. **Invite Alex:** he makes a free GitHub account → repo Settings → Collaborators → add him (Write). He signs in at /admin.
3. **Greek one-page guide for Alex** (log in, change a text, Greek↔English switch top-left of the form, add a workshop, change the weekly programme, change a photo). Offered, not written yet.
4. Real domain (korkodilos.gr / korkodilosathens.gr) when ready: Netlify → Domain management; then update `site_url`/`display_url` in `src/admin/config.yml` and the OAuth app's Homepage URL.

**Design decisions still open (ask Stavros)**
- Studio layout: A = text + photo side by side alternating, B = two-column grid (see `korkodilos-website/_proposals/round5.html`).
- Calendar: remove the pink "all levels" band and fold the line into the intro?
- "Τι κάνουμε": which photos go in the three grey boxes (Alex can set them in the admin: Αρχική → Τι κάνουμε → Φωτογραφία).
- "Ειδικά" when empty: keep the message (current) or hide the section; and should Alex be able to edit that message (move `ui.json` strings into the admin)?
- Audit leftovers: event-specific booking box; burger menu has no Home / repeats the top menu on desktop; dead ends at the end of Studio/Contact; swallow effect on phones.

**Content still placeholder (from Alex)**
Phone number (+30 210 000 0000), prices 2–3 month packages + workshops (€XX), tutor bios + photos (Ariadni, Georgia), the 7 copy issues in `korkodilos-website/ALEX-CONTENT-2026-10-11.md`, approval of the shortened Greek texts and of the English translation, Aeonik web licence check.

**Booking system** (separate project, coming weeks): students + studio ("Korkodilos HQ"); needs a shared database + real logins + emails; the website's "Κλείσε μάθημα" pill (placeholder dialog in `site.js`) and the "Κλείσε θέση" buttons on Calendar will link to it.

## 8. Calendar (how it works now)
- Weekly programme = `programme.json → week.{mon…sun}`: list of `{time, title}`. Title "Monthly 4×3" shows time only; **any other title shows its name under the time in a pink slot** (added 11 Oct, for new weekly classes). Alex edits it in *Πρόγραμμα & Ειδικά → Εβδομαδιαίο πρόγραμμα*.
- Specials = `programme.json → specials[]` {type workshop|event|series, date, price, time, title, text}. Past dates hide themselves (browser-side); none left → "nothing special right now… Instagram" message.
- Hours set by Stavros: Mon–Thu 19–22, Fri 11–14, Sat–Sun 12–15 & 18–21.

## 9. Round 6 (11 Oct 2026, later)
- Options page: `_proposals/round6.html` (git-ignored; copy into `_site/_proposals/` after a build to view it at localhost:8052/_proposals/round6.html). Picks: 1B, 2B, 3A, 4A (burger stays on desktop), 5B (Home oval), 6B.
- Alex's email applied: €190 / €265 + "everything included, 24% VAT" note, φιλιέρα, Wed 11:00–14:00, mobile +30 698 796 4159, 5′ from both metros, new "all levels" sentence (now in the Calendar intro).
- New photos from `~/Downloads/KORKO NEW PHOTOS` → `uploads/korko-NNNN.jpg` (NNNN = DSCF number), turned upright + resized to 1600px with a small Swift helper (no ImageMagick on this Mac).
- **Every interface word is now in the admin:** new collection "Κείμενα μενού & κουμπιών" = `ui.json` (incl. `chrome`: menu labels, booking pill, footer). `site.js` reads them from `#ui-json` in `base.njk`; phone/email/maps/socials come from `site.json`.
- Specials: when all dates have passed, the whole section hides itself (no message any more).

## 10. Round 7 (11 Oct 2026) — pushed to korkonew.netlify.app
- Options: `_proposals/round7.html` (candidates in `_proposals/cand/`, both git-ignored). Picks: green stays #006837; Studio first photo = DSCF4929 (Alex may change it); Classes = photo per section (`monthly/corporate/parties.image`, in admin) + photo strip (`levels.photos`).
- Direct fixes: specials button smaller (bug: `.special__side span` enlarged the button text — now `> span`), desktop oval menu fills the screen, no "Developed by", Home pink runs to –DILOS, Studio first photo always cropped 3:2 / 4:5.
- **Typesetting transform** in `eleventy.config.mjs`: short words (ο, και, με, the…) glue to the next word with a no-break space; the last word of p/h/li never sits alone. `text-wrap:pretty` in CSS.
- **OPEN: title/text size scale** — options A/B/C in round7 §1 (recommended A). Stavros decides after checking on his phone.
- Specials prices still €XX (Alex's email only had the 2/3-month package prices). English translation: OK for now.

## 11. Rounds 8–9 (11 Oct 2026) — all on korkonew.netlify.app
- Oval menu: words drawn above all ovals (ovals = `a::before`, word = `a>span`); desktop stack fills the screen (`--mh`); opens with fade + ovals dropping in (option B).
- Type scale A applied (`--fs-l` max 34, `--fs-m` max 20, one 13px sans).
- Calendar: whole workshop row opens a pop-up (`#sp-N`; fields `details`, `image`, `image_alt` in admin); page ends with the photo inside the margins (`.calendar-end`).
- Classes: price pills = links to booking, black on hover. Phones: pink "Κλείσε θέση", small strip arrows, pop-ups full width (`.cv{max-width:none}` — the UA max-width is 100%-2em and 1em = 50px here).
- Privacy policy / Terms pages (`legal.json`, el/en, empty) linked in the footer.
- Option pages are published at /_proposals/ (noindex) — remove before the real domain goes live.
- NEXT: domain details from Stavros → QA/debug pass → switch domain.

## 12. QA pass (11 Oct 2026, evening) — done by Claude, on korkonew
- Scanned 12 pages × 12 widths (320–1680): no sideways scroll, nothing off-screen, no text over photos. All internal links + language switches OK; no console errors.
- Added: 404.html (el+en, `<base href="/">`), robots.txt, sitemap.xml (`site.url` in site.json → change it with the domain), absolute og:image/og:url, canonical, noindex on thanks/404.
- Photos: Eleventy transform adds width/height to every `<img>`; on Netlify builds (`NETLIFY=true`) photos go through the Netlify Image CDN with srcset (Home 5.5 MB → ~0.9 MB on a phone). Local builds keep the plain files.
- Facebook link updated (old one redirects to /people/Korkodilos/100066326360344/). Privacy link under every form.
- 3 test form messages sent to korkodilos20@gmail.com ("TEST Claude QA …") — waiting for Stavros/Alex to confirm they arrived.
- Admin validator now also walks lists and exits non-zero on any missing field — run it before every push.

## 13. Mobile speed (11 Oct 2026, late)
- Jaw "swallow" is now ONE band (`.jaw-veil`, painted with the colours of the sections behind it) instead of moving masks on every paragraph/photo (that made iPhone scrolling heavy).
- Caching (netlify.toml): photos 1 week, CSS/JS 1 year with `?v=` build number (`src/_data/build.js`), pages 2 min + stale-while-revalidate; admin always no-cache (rule kept LAST — last matching rule wins).
- site.js fetches the menu pages in the background after load (skipped with Save-Data) → menu taps open instantly. First photo of Home/Studio has fetchpriority=high.

## 14. Photos: build-time versions (11 Oct 2026, late) — replaces the Netlify Image CDN
- The on-the-fly Netlify Image CDN added ~0.5 s per photo and its cache reset on every deploy → slower on phones. Removed.
- Now `eleventy.config.mjs` makes 480/800/1200/1600px WebP versions of every file in `src/assets/img/uploads` with **sharp 0.35.4** (devDependency, exact) into `.cache/img` (git-ignored) → copied to `/assets/img/r/`. Build ~4 s. Works for Alex's uploads automatically.
- The `imgsizes` transform adds width/height + srcset to every uploads `<img>`; templates give their own `sizes` (strips 70vw/30vw, tutors 50vw/30vw, pop-ups 100vw/220px, Classes section photos 100vw/560px; default 100vw/60vw).
- Phone (375px) photo weight: Home ≈ 0.5 MB, Studio ≈ 0.1 MB, Classes ≈ 0.25 MB.

## 15. Domain (checked 11 Oct 2026 from public DNS — no logins used)
- **korkodilosathens.gr** = the current WordPress site (by Bracket). Registered at **Papaki** (Alex's account), but its **DNS is at Cloudflare** (nameservers harlee/felipe.ns.cloudflare.com) — so DNS changes are made in Cloudflare unless the nameservers are changed in Papaki.
- It has **email** at MXroute — keep these records whatever we do:
  - MX 10 witcher.mxrouting.net · MX 20 witcher-relay.mxrouting.net
  - CNAME mail → witcher.mxrouting.net · CNAME webmail → witcher.mxrouting.net · CNAME autodiscover → autodiscover.mxroute.com
  - TXT @ "v=spf1 include:mxroute.com -all"
  - TXT x._domainkey "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8VCs+MhARmkxlF8hLBcu2CRCW8IXVykqQs7RV1DpxoIOQpMeJRTYw8AaRuoIuM7pSgN8gJa16yyFRRBanQDmpACG3cJiSN3trQxR8jw9GxRBK17TgIfAWA+1FuhDb5XyHUnbDT/7a8ZEvcs0LvEbyRWsjBepn9/lFpAx3puakbCuf4WtqPWl4aqtbJkjRPgXOkL/ac/L4car4K0d7rQThmHEs7bU58wb80hcySGxkju7ofg+QuCG2pb8qlEoc7F/PXCrZ3h8G06iX5gWK3jxUWYG5Vdhbpwy4B5rBKnJp7I3ftYXZGYxbYQrIRj56IDQgDMjIJsQmATo4MbuegwZDQIDAQAB"
- Website records to set (DNS only / grey cloud in Cloudflare): A @ → 75.2.60.5 · CNAME www → korkonew.netlify.app. Then Netlify → korkonew → Domain management → add korkodilosathens.gr (+ www), make it primary; HTTPS is automatic.
- After the switch: site.json `url`, admin `site_url`/`display_url`, GitHub OAuth app Homepage URL → https://korkodilosathens.gr; remove /_proposals.
- Old WordPress addresses already redirect (/studio/ /classes/ /calendar/ /contact/ /author/* /wp-admin/*).
- Not ours: korkodilosathens.com (now a casino site), korkodilos.com (someone else). korkodilos.gr has no DNS (maybe free to register).

## 16. Domain switch — DONE: LIVE at https://korkodilosathens.gr (11 Oct 2026, 22:29)
- Netlify: korkodilosathens.gr added to project korkonew as primary (www redirects), Netlify DNS zone created → nameservers dns1–dns4.p03.nsone.net. Tested: the zone answers with Netlify's servers and serves the new site.
- Papaki (Alex's account AN784-PK — the domain is only visible in the **old panel**: "Τα παλιά σου προϊόντα" → www2.papaki.com/cp2): nameservers changed by Stavros to dns1–dns4.p03.nsone.net at ~21:03. The .gr WHOIS shows them (last updated 11-10-2026), but the .gr registry's published DNS still showed Cloudflare at 21:19 — the .gr zone is republished periodically, then resolvers cache for up to ~3 h.
- .gr registry switched 22:05; go-live commit pushed (site.json url, admin site_url/display_url, /_proposals no longer published — copies kept locally, git-ignored). Let's Encrypt certificate issued 22:29 (auto-renews). Tested over https: all pages el/en, http→https, www→apex, old WP links, 404, admin, sitemap/robots/canonical/og.
- korkonew.netlify.app still works too. The project is now shown in Netlify as "korkodilosathens.gr".
- After: Alex can cancel the old WordPress hosting (Bracket/Marios), the Cloudflare account and the old SSL product in Papaki.

## 17. Alex's photo + text picks (12 Oct 2026) — live
- Home carousel: 4936, 6882, 7584 (Alex wrote "75842"), 6987, 7360, 4885, 7241 · Corporate box: 7209 (Monthly 7200, Parties 6977 unchanged).
- Studio: hero 4927 · next to K 4931 · "Το τραπέζι" 4952 (NEW slot `table.image`) · "Ο πηλός" 4929 · "Tools" 4904 (NEW slot `tools.image`).
- Alex (tutor): photo 7368 + bio paragraphs (`tutors.json → bio`, shown instead of the list; English translation by Claude — Alex to check).
- Classes strip: 6264, 6987, 4955, 4934, 4932, 4933 · Corporate 7592 · Parties 7360. Calendar unchanged.
- "Photo with the eyes" = 4902 (wall drawing with two big eyes) → Contact, between details and form (`contact.json → photo`).
- Git identity for this repo set locally: Stavros Bilionis <sbilionis@users.noreply.github.com>.

## 18. Security (12 Oct 2026)
- Done: admin loads Sveltia 0.221.1 with SRI (`integrity` in src/admin/index.html — recompute when upgrading); headers for all paths in netlify.toml (X-Frame-Options DENY, nosniff, HSTS incl. subdomains, Referrer-Policy, Permissions-Policy); Content-Security-Policy as a **meta tag in base.njk** (site pages only — the admin needs GitHub/Netlify/unpkg). Allowed: self + fonts project. Adding any outside script/style/font/image later means updating that policy.
- Updated image-size 2.0.4, markdown-it 14.3.2, sharp 0.35.5. Remaining npm audit items are inside Eleventy's own dependencies (braces/chokidar/sprintf-js/js-yaml), build-time only, no fixed 3.x release — accepted.
- Still to do (accounts): 2FA on GitHub (sbilionis + KORKODILOS), Netlify, Papaki, korkodilos20@gmail.com, alexntouras@hotmail.gr; rotate the GitHub OAuth client secret; Netlify deploy notifications to Stavros; optional DNSSEC; cancel old WordPress hosting, Cloudflare, MXroute email, old SSL.
- Alex's illustrated admin guide: claude.ai/artifact/MhC7xfPGxipgmcQ7Sn9N6m (+ PDF "Korkodilos – οδηγός admin για τον Αλέξανδρο.pdf" in CREATIVE CODING; source in _proposals/).
