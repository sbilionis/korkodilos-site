# Korkodilos website — handover for the next chat

> Paste into a new chat: **"Read `CREATIVE CODING/korkodilos-site/HANDOVER.md` and continue the Korkodilos website."**
> Updated 16 Oct 2026 (round 11 live). Sections 1–8 = the current state + next steps. Sections 9+ = dated log of what was done and why.
> Design history (why things look the way they do): `CREATIVE CODING/korkodilos-website/HANDOVER.md` §3–4h.

## 1. Where we are
- **LIVE at https://korkodilosathens.gr** (Greek at `/`, English at `/en/`; www → main address; https by Let's Encrypt, auto-renews). `korkonew.netlify.app` still works as a backup address.
- Built by Netlify from the **public GitHub repo github.com/sbilionis/korkodilos-site** on every push to `main` (~30 s). **Every push is live immediately — there is no separate test site any more.**
- **Alex** (owner, Αλέξανδρος Ντούρας, GitHub **KORKODILOS**, Write access) edits everything himself at **https://korkodilosathens.gr/admin** (Sveltia CMS). His first save worked (12 Oct). His illustrated Greek guide: https://claude.ai/artifact/MhC7xfPGxipgmcQ7Sn9N6m + PDF `CREATIVE CODING/Korkodilos – οδηγός admin για τον Αλέξανδρο.pdf` (source + builder in `_proposals/`).
- **Forms** (Contact / Corporate / Clay Party) → korkodilos20@gmail.com via Netlify Forms.
- The **booking system** is a separate project: `CREATIVE CODING/korkodilos website booking/HANDOVER-NEXT-CHAT.md`. The "Κλείσε μάθημα" pill, the price pills on Classes and "Κλείσε θέση" in workshop pop-ups open a placeholder booking box (`site.js`) until then.

## 2. NEXT STEPS (in order)
**Accounts & security — Stavros/Alex (Claude can only guide)**
1. **2FA** on: GitHub sbilionis, GitHub KORKODILOS, Netlify, Papaki (Alex, account AN784-PK), korkodilos20@gmail.com, alexntouras@hotmail.gr. The single most important item.
2. **New GitHub OAuth client secret** (old one appeared in a screenshot): GitHub → Settings → Developer settings → OAuth Apps → *Korkodilos admin* → Generate a new client secret → Netlify → project → Configuration → Security/Access → OAuth → GitHub → edit → paste → save → test /admin login → delete the old secret on GitHub. Stavros copies/pastes (Claude never handles secrets). Also set the OAuth app's Homepage URL to https://korkodilosathens.gr.
3. ✅ **Netlify deploy notifications** — DONE 12 Oct: email to sbilionis@gmail.com on "deploy succeeds" and "deploy fails" (Project configuration → Notifications).
4. *(optional)* **DNSSEC**: Netlify → Domain management → DNS settings → enable DNSSEC → copy the DS record → Papaki old panel → korkodilosathens.gr → "Διαχείριση DNSSEC (DS Εγγραφών)". Stavros clicks (DNS changes are blocked for Claude).
5. **Alex cancels**: the old WordPress hosting (Bracket / Marios Ελεγζόγλου), the old **Cloudflare** account of the domain, the unused **MXroute** email, and the old **SSL certificate** product in Papaki.

**Content — from Alex (he can enter most of it himself in /admin)**
6. **Ariadni Στρογγυλά, Γεωργία Πιλάλη**: photos + bios (Δάσκαλοι → "Βιογραφικό σε παραγράφους", untick "δείγμα").
7. **Privacy policy & Terms** — DRAFTED + live 12 Oct (`legal.json`, el/en). Alex fills every **[BRACKET]** in /admin → "Πολιτική απορρήτου & Όροι": business name, ΑΦΜ, ΔΟΥ, ΓΕΜΗ, payment/deposit, 4×3 make-up + package validity, cancellation deadline/refund, pieces ready in X weeks / recycled after X months, minimum age, retention (default [2 years]), "last updated" date. Then a check by his accountant/lawyer.
8. Check Claude's **English translation** of Alex's bio and the site texts (Stavros said "OK for now").
9. Workshops: Alex adds real ones in Πρόγραμμα & Ειδικά (Greek **and** English tab).
10. **Aeonik web licence** check (Greek sans font).

**Small things to consider (ask Stavros first — show before apply)**
- 6987 (Home carousel) and 6977 (Clay Parties box on Home) are near-identical sunflower photos.
- (done in round 10: the note is now serif, under the prices)
- Re-run `npm audit` in a few months (remaining items are Eleventy's own build-time dependencies, no fix yet).
- Remove the old candidate photos in `_proposals/cand` (git-ignored, local only) when no longer needed.

**Later**: booking system (separate project) → then link the booking pill/buttons to it and add Terms.

## Round 11 (16 Oct 2026) — LIVE since 16 Oct 2026
- **1A** section titles: the small label becomes a Canela title on its own line (CSS on `.content p > em:first-child`).
- **2** phone book button: a small slider (K circle in a short pill with a dot). Tap → it slides open to "Κλείσε μάθημα →" (~0.45 s) → the booking box opens; it closes back afterwards (`.book-badge.is-open`, handler in site.js). Desktop is unchanged; reduced-motion opens directly.
- **3** phone footer: the orange map fills the space under the address (map `flex:1`, so the mouth still closes).
- **4** Studio: text beside its photo on desktop (≥900px, `:has(> .sec-photo)`); the clay photo is a side photo; **tutors come right after the intro**.
- **5B** desktop weekly calendar: one row per day (like phones).
- **8** Google business details: LocalBusiness JSON-LD on Home + Contact, from site.json.
- Also: "Γεια" removed from the Home Google description; lemons photo described (el/en).
- Checked before going live: 10 widths 320–1440, el + en; no text over photos, no clipping, no sideways scroll. Proposals page (git-ignored): `_proposals/round11.html` + screenshots in `_proposals/round11/`.

**Safety copy of the site BEFORE round 11** (commit 55ec8a4):
- git tag **`live-2026-10-16-before-round11`** on GitHub
- source zip: `~/Downloads/Korkodilos backups/live-2026-10-16-before-round11.zip`

To go back:
- *Fastest (no code):* Netlify → korkonew → Deploys → the last deploy before "Round 11 picks" → **Publish deploy**. The next push or admin save publishes the new code again.
- *Permanent:* `git pull`, then `git revert --no-edit 74ec5d9^..b34a30d`, then `git push`. This undoes only the design round; Alex's later saves stay.
- *One piece only:* `git checkout live-2026-10-16-before-round11 -- src/studio.njk`, then commit and push.

**NEXT PHASE (parked, Stavros's picks):**
- Home students' work gallery as a swipe strip "like B, with the line".
- Upcoming workshops on Home.

Markup is in `src/_includes/parked-home-gallery-workshops.njk` (not included anywhere); the styles are in commit 74ec5d9. Each needs admin fields for Alex, then show-before-apply.

**START HERE in the next chat:**
1. `git pull` (Alex saves from /admin).
2. Run `npm start` → http://localhost:8052 (launch config `korkodilos-site`).
3. Ask Stavros what's next. Options: the parked gallery/workshops, the §2 open items, the booking link-up.

## 3. Stavros's working rules (important)
- **Show before applying** design changes: make options, show them (side-by-side desktop + 375px, real fonts/photos — iframes of the real pages work well, see `_proposals/round9.html`), let Stavros pick, apply only the picks. Direct, explicit requests can be applied straight away.
- **Simple, straightforward site.** No extra features without asking.
- **Audit every round:** navigation, UX, responsiveness at 320–1680px; text never runs into images; Greek typesetting rule (no line ends on a short word, no lonely last word — automatic, see §6).
- **Alex must be able to change ANY text/photo** → never hard-code words in templates/JS; every new piece of content gets an admin field.
- Explain in plain words. Do as much as possible yourself (his Mac + his Chrome). Never handle secrets or type passwords; Stavros signs in himself.
- **Every push goes live** → verify locally first, then push, then check the live site.

## 4. Accounts & services
| Service | What it is for us | Details |
|---|---|---|
| **GitHub** `sbilionis/korkodilos-site` (public) | All files + history = backup | Public on purpose (Netlify bills private-repo committers). Collaborators: sbilionis (admin), KORKODILOS (write). No secrets/fonts in it. Local git identity: Stavros Bilionis <sbilionis@users.noreply.github.com>. |
| **Netlify** project `korkonew` (shown as "korkodilosathens.gr", team OGUST, paid) | Builds + hosts, forms, DNS | Custom domain korkodilosathens.gr (+www) with **Netlify DNS** (dns1–4.p03.nsone.net). Forms `contact`, `enquiry` → korkodilos20@gmail.com. |
| **Netlify** project `unrivaled-queijadas-404cd2` | Licensed fonts only | https://unrivaled-queijadas-404cd2.netlify.app/fonts/… (source `CREATIVE CODING/korkodilos-fonts`, drag onto its Deploys page to update). |
| **Papaki** (Alex's account AN784-PK) | Domain registrar | korkodilosathens.gr, expires 23/10/2027, auto-renew ON. **Only visible in the OLD panel**: controlpanel.papaki.com → "Τα παλιά σου προϊόντα" → www2.papaki.com/cp2. |
| **GitHub OAuth app** "Korkodilos admin" (Client ID `Ov23li57Fr3wE3Wu9A2P`, owned by sbilionis) | /admin sign-in | Installed in Netlify → OAuth → GitHub. Callback `https://api.netlify.com/auth/done`. Users see "by sbilionis" when authorizing — normal. |
| **gh CLI** on Stavros's Mac | Claude pushes / manages collaborators | Logged in as sbilionis. |

## 5. How a change gets live
- **Claude:** `git pull` FIRST (Alex may have saved) → edit → `rm -rf _site && npm run build` → preview with launch config **`korkodilos-site`** (http://localhost:8052) → for admin changes validate the config (snippet in §6) → show Stavros → commit + `git push` → check https://korkodilosathens.gr.
- **Alex:** /admin → edit → Save → live in ~1 min. If the admin was open while Claude changed `config.yml`, he must reload it.

## 6. The code
| What | Where |
|---|---|
| Templates (el + en from one template) | `src/index/studio/classes/calendar/contact/thanks/privacy/terms/404.njk`, `robots.njk`, `sitemap.njk`; frame `src/_includes/layouts/base.njk` (incl. the page content policy); partials in `src/_includes/partials/` |
| **Content** (all in the admin) | `src/_data/{home,studio,classes,calendar,contact,programme,tutors,legal,ui}.json` (`{el,en}`); `site.json` (url, email, phone, socials — not bilingual) |
| Admin | `src/admin/config.yml` + `src/admin/index.html` (Sveltia **0.221.1** with SRI `integrity` — recompute when upgrading) |
| Photos | `src/assets/img/uploads/` (`korko-NNNN.jpg` = DSCF NNNN from `~/Downloads/KORKO NEW PHOTOS`, upright + ≤1600px). Small WebP versions are made at build time by **sharp** into `.cache/img` → `/assets/img/r/` |
| Styles / scripts | `src/css/site.css` (sections by round), `src/js/site.js` (header/footer/jaw band/menu/pill/dialogs/background page fetch), `src/js/programme.js` (hides past workshops, shows the Instagram message) |
| Build | `eleventy.config.mjs` (filters `mdi`, `imgsize`, `ratio`, `hasSlots`; transforms `typeset` = Greek/English line-break rule, `imgsizes` = width/height + srcset), `netlify.toml` (security headers, caching, redirects of the old WordPress addresses), `package.json` (Eleventy 3.1.6, markdown-it 14.3.2, image-size 2.0.4, sharp 0.35.5 — exact versions) |

**Validate the admin config before every push that touches it or the data:**
```
node -e 'const y=require("js-yaml"),fs=require("fs");const c=y.load(fs.readFileSync("src/admin/config.yml","utf8"));function keys(f){const o={};for(const x of f)o[x.name]=x.fields?keys(x.fields):1;return o}let bad=0;for(const col of c.collections)for(const f of col.files){const d=JSON.parse(fs.readFileSync(f.file,"utf8"));const k=keys(f.fields);const chk=(a,kk,p)=>{if(Array.isArray(a)){for(const x of a)if(x&&typeof x==="object")chk(x,kk,p);return}for(const key of Object.keys(a)){if(!(key in kk)){console.log("NO FIELD",f.name,p+key);bad++}else if(typeof kk[key]==="object"&&a[key])chk(a[key],kk[key],p+key+".")}};for(const L of (col.i18n?["el","en"]:[null]))chk(L?d[L]:d,k,"")}console.log("problems",bad);process.exit(bad?1:0)'
```

## 7. Gotchas (don't repeat)
- **Sveltia i18n:** every file entry needs `i18n: true`; every data key needs a field (else saving can wipe it); lists that may be empty need `required: false` (else Save is blocked); labels containing ": " must be quoted in YAML; insert YAML by exact line, never by substring (8 vs 12 spaces).
- **Admin blank screen** after a config change = stale admin → reload. Tell Alex: never Save on a blank/odd screen.
- **DNS / domain / certificate changes are blocked for Claude** → Stavros clicks; Claude prepares and verifies (`dig … @gr-at.ics.forth.gr` for the .gr registry; .gr publishes changes with a delay).
- **Photos:** never the Netlify Image CDN (slow, reset on deploy). Use the build-time versions. Give each `<img>` a `sizes`.
- **Content policy** (meta in base.njk): adding anything from another site (analytics, YouTube, Instagram embed, new font host) needs the policy updated first.
- **Never mask many elements on scroll** (iPhone jank) → the jaw uses one band (`.jaw-veil`).
- Fonts never go into the repo. Eleventy doesn't clean `_site/`: `rm -rf _site` before a final check. zsh: quote URLs with `?` and globs in shell commands.
- In-app browser: rAF/IntersectionObserver/image decoding are throttled when the pane is hidden → measure with JS, take screenshots to force a render.
- iOS: closed oval menu `visibility:hidden`; `html,body{overflow-x:clip}`; `svh` units. Never end a page on an ink section.
- `CREATIVE CODING/.claude/launch.json` holds many projects — edit, never overwrite.

## 8. Calendar (how it works now)
- Weekly programme = `programme.json → week.{mon…sun}` (same for both languages). Title "Monthly 4×3" = normal slot; any other title = pink slot with the name. **All days empty → the "on holiday" message** (`calendar.closed`).
- Specials = `programme.json → specials[]` {type, date, time, title, text, price, details, image, image_alt}. Whole row opens a pop-up. Past dates hide in the browser; **none → the Instagram message** (`calendar.specials.empty`, `[Instagram]` becomes a link). The 3 sample workshops were removed on 12 Oct.
- The note under the grid (`calendar.note`) explains 4×3 with a link to the prices; empty = no note.

---
# Change log
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

## 19. Round 10 (12 Oct 2026) — live
- From Stavros's marked-up screenshots. Options: `_proposals/round10.html` (git-ignored). Picks 1B, 2B.
- Reading texts trimmed site-wide: smaller serif (`lead-small`, empty-note) max 29em ≈ where the Home philosophy heading ends; big serif `.content p` max 30em (wide screens only).
- Classes: "everything included" note (`classes.monthly.note`, already in admin) moved directly under the price pills, serif `--fs-m`; "Δες το πρόγραμμα" below it.
- Footer: "PHOTOS @teapotgr" removed (site.js).
- Phone menu: ovals sized with `100dvh` (was svh) → no empty strip when the menu is opened after scrolling on iPhone (toolbar collapsed). Stavros to confirm on his phone.
- Pop-ups (workshops, tutors, booking): `.cv{position:relative}` overrode the modal's fixed position → the page jumped to the top on open. Now `position:fixed`; page stays where it was.

## 20. Admin photo uploads (13 Oct 2026) — live
- Alex (on a computer) saw "Processing a file. This may take a while" when picking a new photo → slow step is in his browser (likely iPhone **HEIC**: Sveltia downloads a HEIC decoder and decodes the full photo), then the full-size upload to GitHub.
- Added to `src/admin/config.yml`: `media_libraries.default.config.transformations.raster_image` = WebP, quality 85, max 2400×2400 → every photo is shrunk + converted in the browser before upload (~10× smaller; HEIC becomes viewable everywhere). Sveltia validates this option (checked: a wrong value shows a config error). Build handles `.webp` uploads (tested).
- Tip for Alex if HEIC is still slow: export iPhone photos as JPEG first (Photos → File → Export), or iPhone Settings → Camera → Formats → Most Compatible.
- Stavros is checking which photo Alex was uploading.
