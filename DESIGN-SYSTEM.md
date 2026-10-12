# Korkodilos — visual identity for other projects (booking, student login/sign-up, admin)

> For any new Korkodilos screen (the booking system, student accounts, the studio admin), follow this so it feels like **https://korkodilosathens.gr**.
> The live site is the reference. Open it at 1440px and at 375px before designing. The source of truth for the values is `korkodilos-site/src/css/site.css` (`:root` + "Round 8–10" sections).
> Updated 12 Oct 2026.

## 1. The idea in one paragraph
A ceramic studio that's playful but calm. A warm light-grey page, black ink, **one strong colour per area** (orange, brown, green, pink), a big light **serif** for anything you read, a small uppercase **sans** for labels, **pill** buttons, **ovals** for the menu, and the **KORKO–DILOS jaw**: KORKO at the top, –DILOS at the bottom, the content "in the mouth". Lots of space, few elements, no shadows except on floating things, no icons where a word works.

## 2. Colours
| Token | Hex | Use |
|---|---|---|
| `--base` | `#ECEAE5` | page background (never pure white) |
| `--ink` | `#28282A` | text, solid buttons, dark sections (never pure black) |
| `--orange` | `#FF831E` | Classes / Monthly area, focus underline in forms |
| `--brown` | `#7D4921` | footer, secondary area |
| `--green` | `#006837` | Calendar, "OK / confirmed" |
| `--pink` | `#E59E8F` | Home / Contact, special (non-standard) slots, "Κλείσε θέση" on phones |

- Text on orange, pink and base = ink. Text on green, brown and ink = base. **Never put orange text on base** (too weak).
- Whole sections are flat colour blocks (`.bg-pink`, `.bg-orange` …), edge to edge, no gradients.
- The booking app may use derived tints for states (already in `korkodilos website booking/css/tokens.css`: `--ok/--warn/--bad/--info` + `-t` tints). Keep them; they come from the same palette.

## 3. Fonts (licensed, Ogust)
Served from the fonts project (never commit font files to a public repo):
```css
@font-face{font-family:"Canela";src:url(https://unrivaled-queijadas-404cd2.netlify.app/fonts/Canela-Light-Gr-Web.woff2) format("woff2");font-weight:300;font-display:swap}
@font-face{font-family:"Monument Grotesk";src:url(https://unrivaled-queijadas-404cd2.netlify.app/fonts/MonumentGrotesk-Regular.woff2) format("woff2");font-weight:400;font-display:swap;unicode-range:U+0000-036F,U+2000-206F,U+20AC,U+2190-21FF,U+2122}
@font-face{font-family:"Aeonik Greek";src:url(https://unrivaled-queijadas-404cd2.netlify.app/fonts/AeonikPro-Regular-Greek.woff) format("woff");font-weight:400;font-display:swap;unicode-range:U+0370-03FF,U+1F00-1FFF}
@font-face{font-family:"Monument Extended";src:url(https://unrivaled-queijadas-404cd2.netlify.app/fonts/MonumentExtended-Ultrabold.woff2) format("woff2");font-weight:800;font-display:swap}
:root{
  --serif:"Canela",Georgia,serif;                                   /* reading text + titles, weight 300 only */
  --sans:"Monument Grotesk","Aeonik Greek",Helvetica,Arial,sans-serif; /* labels, buttons, menu row; Greek letters come from Aeonik */
  --display:"Monument Extended","Canela","Arial Black",sans-serif;  /* UPPERCASE oval-menu words only */
}
```
- **Greek in the sans = Aeonik Pro**, not Inter. Monument has no Greek, so Aeonik draws the Greek letters via `unicode-range`. *(The booking app still uses Inter: switch it to Aeonik Greek.)*
- If the new app is on another domain, the fonts project must allow it (CORS on that Netlify site), and that app's content policy must allow `https://unrivaled-queijadas-404cd2.netlify.app`.
- Never fake bold (`font-synthesis:none`). Canela only in Light 300. Bold inside serif text is shown in the **sans** (`strong{font-family:var(--sans);font-weight:400}`).

## 4. Type scale (the live "scale A")
```css
:root{
  --fs-l:clamp(22px,calc(14px + 1.4vw),34px);   /* big serif: page intros, the main sentence of a screen */
  --fs-m:clamp(17px,calc(15px + .3vw),20px);    /* serif reading size: paragraphs, form inputs, list items, prices */
  --fs-xs:13px;                                 /* sans UPPERCASE labels, letter-spacing .04–.06em */
}
```
- **Only these three sizes.** Titles are serif `--fs-l`, line-height 1.1–1.2. Paragraphs are serif `--fs-m`, line-height 1.35. Labels/eyebrows/buttons are sans 13px uppercase.
- The menu row (Studio, Classes, Calendar, Contact) is sans ~26px, sentence case, comma-separated, current page underlined.
- **Line length:** reading text max **29em**, big serif max **30em**. Never let text run the full width of a big screen.
- **Label pattern:** a small sans uppercase label sits *inline* before the first serif sentence (`<em>Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ</em> Μαθαίνουμε παίζοντας…`). Use it for section and screen titles.
- **Greek typesetting:** no line ends on a short word (ο, η, και, με, σε, το, να…) and no lonely last word. The site does it at build time (`typeset` transform in `eleventy.config.mjs`). In a JS app, glue short words to the next one with ` ` and use `text-wrap:pretty`.
- Uppercase Greek has **no accents** (ΜΑΘΗΜΑΤΑ, not ΜΑΘΉΜΑΤΑ). CSS `text-transform:uppercase` + `lang="el"` handles it.

## 5. Shapes & components (copy these patterns)
- **Buttons:** pill (`border-radius:99px`), solid ink with base text, sans 13px uppercase, padding 14px 24px, arrow `→` after the word, which nudges right on hover (`transform:translateX(4px)` with `cubic-bezier(.3,1.5,.5,1)`). Secondary = 1.5px ink outline, transparent.
- **Choice pills** (e.g. price packages, class slots): wide outlined pills in a 3-column grid (1 column on phones), label left in serif, value right (`1 μήνας ………… €100`). Hover/selected = solid ink. Use the same for choosing a class or a package in booking.
- **Forms** (`.kform`): **no boxes**. Label above in sans 13px uppercase; input in serif `--fs-m` with only a 1.5px ink bottom line; focus turns the line orange; 2 columns on desktop, 1 on phones; small sans note under it (privacy link); solid pill submit, left-aligned. **Use exactly this for student sign-up / login / profile.**
- **Pop-ups** (`dialog.cv`): base background, radius 28px (22px phones), max 760px wide, ink backdrop at 60%, round ink × button top-right (40px), springy open. On phones nearly full-width. Use `position:fixed` and never `relative`, or the page jumps.
- **Floating pill** ("Κλείσε μάθημα"): ink pill bottom-right with the K mark in a base circle, soft shadow. The only floating element; hidden when the menu is open.
- **Oval menu:** full-screen base layer, five stacked tilted ovals (ink, orange, brown, green, pink) with Monument Extended uppercase words; they drop in one after another. The booking app can reuse it for its own sections.
- **Photos:** square corners (radius 0–2px), never filters or overlays, captions in sans 13px uppercase under the photo.
- **Status tags** (booked / waitlist / cancelled): small sans uppercase text in a pill with the tint of its colour. Never icons alone.
- **Lists/tables** (admin): rows separated by 1px ink lines at ~14% opacity, serif `--fs-m` for names/values, sans 13px uppercase for column heads. No zebra stripes, no card shadows.

## 6. Layout & motion
- Side padding: 72px desktop, 15px phones. Section spacing generous (`--sec`, ~120px desktop / 70px phones).
- Every screen starts under the menu row with KORKO above, and ends on a calm (base or colour) block. **Never end a page on an ink section.**
- **Login / sign-up screen = the open mouth:** KORKO at the top, –DILOS at the bottom, the form in between. The booking app already does this (`.login` in `css/layout.css`). Keep it and restyle the inputs to the `.kform` underline style.
- Motion: short and springy (`cubic-bezier(.3,1.5,.5,1)`, 0.3–0.55s). Respect `prefers-reduced-motion`. Nothing that moves many elements on scroll (iPhone jank).
- Phones first: test at 320, 375, 768, 1280 and 1680px. No sideways scroll (`html,body{overflow-x:clip}`), use `dvh/svh` for full-height screens, tap targets ≥ 44px.

## 7. Words & languages
- Greek first, English second, same structure. Every word the studio may want to change lives in a strings/content file, not in the markup.
- Tone: warm, short, "εσύ" (informal). Buttons are verbs: «Κλείσε θέση →», «Δες το πρόγραμμα →», «Σύνδεση», «Δημιουργία λογαριασμού».

## 8. What the admin side may relax
The studio/admin screens are a working tool: they can be denser (cards on `--paper #F6F4F0`, 14–16px sans for tables). Keep the same fonts, colours, pills, labels and serif headings so they clearly belong to the same family.

## 9. Checklist for a new screen
1. Base background, ink text, one area colour.
2. Only `--fs-l`, `--fs-m`, 13px uppercase labels.
3. Pills for actions/choices, underline inputs for forms, rounded `dialog` for pop-ups.
4. Text ≤ 29–30em wide; Greek short-word rule.
5. Greek + English strings in a file.
6. Checked at 375px and 1440px next to the live site.
