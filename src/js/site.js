/* ==========================================================================
   KORKODILOS — the jaw.
   Upper jaw (KORKO) opens while you read and bites down on the lower jaw
   (–DILOS) at the end of the page. Everything else is the original site.
   ========================================================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const cur = (p) => (p === page ? ' aria-current="page"' : '');

  /* ---------- language: Greek pages at the root, English pages in /en/ ---------- */
  const EN = document.documentElement.lang === 'en';
  const BASE = new URL('..', document.currentScript.src).href;          // site root, from either folder
  const FILE = page === 'notfound' ? 'index.html' : (location.pathname.split('/').pop() || 'index.html');   // 404: the switch goes to the home page
  // every word below comes from src/_data/ui.json → "chrome" and site.json (Alex edits both in /admin)
  let D = {};
  try { D = JSON.parse(document.getElementById('ui-json').textContent); } catch (e) {}
  const T = Object.assign({ label: 'CERAMIC STUDIO', menu: {} }, D.ui || {});
  T.close = D.close || '×';
  const M = Object.assign({ home: 'Home', studio: 'Studio', classes: 'Classes', calendar: 'Calendar', contact: 'Contact' }, T.menu);
  const tel = (D.phone || '').replace(/[^+\d]/g, '');

  /* ---------- the K symbol: stem + two jaws, so it can open and close ---------- */
  // Stavros's animated symbol (assets/img/korko-mouth.svg, see korko-mouth-HANDOFF.md) — colour from currentColor
  const K_SYMBOL = (id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="89.34 70.78 344 344" role="img" aria-label="Korkodilos">
  <style>
    .jaw{transform-box:view-box;transform-origin:211.14px 242.78px;animation:var(--korko-duration,4s) infinite both}
    .up{animation-name:korko-up}
    .lo{animation-name:korko-lo}
    @keyframes korko-up{
      0%{transform:rotate(0deg);animation-timing-function:ease-in-out}
      25%{transform:rotate(-2.5deg);animation-timing-function:ease-in-out}
      50%{transform:rotate(0deg);animation-timing-function:ease-out}
      55%{transform:rotate(-5deg);animation-timing-function:cubic-bezier(.55,0,1,.45)}
      57%{transform:rotate(27.96deg);animation-timing-function:linear}
      59%{transform:rotate(27.96deg);animation-timing-function:cubic-bezier(.2,0,.3,1)}
      63%{transform:rotate(-6deg);animation-timing-function:ease-in-out}
      66.5%{transform:rotate(2.5deg);animation-timing-function:ease-in-out}
      69.5%{transform:rotate(-1deg);animation-timing-function:ease-in-out}
      72%,100%{transform:rotate(0deg)}
    }
    @keyframes korko-lo{
      0%{transform:rotate(0deg);animation-timing-function:ease-in-out}
      25%{transform:rotate(2.5deg);animation-timing-function:ease-in-out}
      50%{transform:rotate(0deg);animation-timing-function:ease-out}
      55%{transform:rotate(5deg);animation-timing-function:cubic-bezier(.55,0,1,.45)}
      57%{transform:rotate(-27.96deg);animation-timing-function:linear}
      59%{transform:rotate(-27.96deg);animation-timing-function:cubic-bezier(.2,0,.3,1)}
      63%{transform:rotate(6deg);animation-timing-function:ease-in-out}
      66.5%{transform:rotate(-2.5deg);animation-timing-function:ease-in-out}
      69.5%{transform:rotate(1deg);animation-timing-function:ease-in-out}
      72%,100%{transform:rotate(0deg)}
    }
    .seam{opacity:0;animation:korko-seam var(--korko-duration,4s) infinite step-end both}
    @keyframes korko-seam{0%{opacity:0}57%{opacity:1}59%{opacity:0}}
    @media (prefers-reduced-motion:reduce){.jaw,.seam{animation:none}}
  </style>
  <defs>
    <clipPath id="korko-clip-${id}"><rect x="120.363" y="0" width="400" height="500"/></clipPath>
  </defs>
  <g class="korko" fill="currentColor">
    <polygon points="120.363 93.81 177.99 93.81 177.99 195.133 211.14 242.78 177.99 290.436 177.99 391.759 120.363 391.759"/>
    <g clip-path="url(#korko-clip-${id})">
      <polygon class="jaw up" points="88.23 242.78 375.29 90.4 402.31 141.3 272.084 210.431 277.465 255.54 244.81 224.91 211.14 242.78"/>
      <polygon class="jaw lo" points="88.23 242.78 211.14 242.78 402.31 344.27 375.29 395.17"/>
      <rect class="seam" x="200" y="240.3" width="227" height="5"/>
    </g>
  </g>
</svg>`;

  /* ---------- markup: upper jaw (original header) ---------- */
  $('[data-jaw="top"]').outerHTML = `
  <header class="jaw-top" id="jawTop">
    <a href="index.html" class="jaw-top__label">${T.label}</a>
    <nav class="jaw-top__menu" aria-label="Main">
      <a href="studio.html"${cur('studio')}>${M.studio}</a>
      <a href="classes.html"${cur('classes')}>${M.classes}</a>
      <a href="calendar.html"${cur('calendar')}>${M.calendar}</a>
      <a href="contact.html"${cur('contact')}>${M.contact}</a>
    </nav>
    <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="offcanvas"><span></span></button>
    <div class="jaw-top__lang"><a href="${BASE}${FILE}" lang="el"${EN ? '' : ' aria-current="true"'}>GR</a><a href="${BASE}en/${FILE}" lang="en"${EN ? ' aria-current="true"' : ''}>EN</a></div>
    <div class="jaw-top__mouth"><a href="index.html" class="jaw-top__logo" aria-label="Korkodilos — home"><span></span></a></div>
    <nav class="offcanvas" id="offcanvas" aria-label="Menu" inert>
      <a href="index.html" class="offcanvas__home"${cur('home')}><span>${M.home}</span></a>
      <a href="studio.html"${cur('studio')}><span>${M.studio}</span></a>
      <a href="classes.html"${cur('classes')}><span>${M.classes}</span></a>
      <a href="calendar.html"${cur('calendar')}><span>${M.calendar}</span></a>
      <a href="contact.html"${cur('contact')}><span>${M.contact}</span></a>
    </nav>
  </header>`;

  /* ---------- markup: lower jaw (original footer-logo + footer) ---------- */
  $('[data-jaw="bottom"]').outerHTML = `
  <div class="jaw-bottom" id="jawBottom">
    <div class="jaw-bottom__logo"><div class="wrap"><span role="img" aria-label="—dilos"></span></div></div>
    <footer class="footer">
      <a class="footer__map" href="${D.maps}" target="_blank" rel="noopener" aria-label="${T.map_aria}">
        <span class="footer__map-svg" data-map="${BASE}assets/img/map-kerameikos.svg"></span>
        <span class="footer__pin" aria-hidden="true">${K_SYMBOL('pin')}</span>
        <span class="footer__map-cta">${T.map_cta}</span>
      </a>
      <div class="footer__cols">
        <div class="footer__block">${T.addr}<br><a href="${D.maps}" target="_blank" rel="noopener">${T.map}</a></div>
        <div class="footer__block"><ul>
          <li><a href="${D.facebook}" target="_blank" rel="noopener">FACEBOOK</a></li>
          <li><a href="${D.instagram}" target="_blank" rel="noopener">INSTAGRAM</a></li>
          <li><a href="mailto:${D.email}">EMAIL</a></li>
        </ul></div>
        <p class="footer__credits">KORKODILOS© 2020–${new Date().getFullYear()} · <a href="privacy.html">${T.privacy || 'PRIVACY POLICY'}</a> · <a href="terms.html">${T.terms || 'TERMS'}</a> · DESIGNED BY <a href="https://ogustinathens.gr" target="_blank" rel="noopener">OGUST</a> · PHOTOS <a href="https://www.instagram.com/teapotgr/" target="_blank" rel="noopener">@teapotgr</a></p>
      </div>
    </footer>
  </div>`;

  /* ---------- CTA: the original corner badge, now "Book a class" with the animated K ---------- */
  document.body.insertAdjacentHTML('beforeend', `
  <a class="book-badge" id="bookBadge" href="#book" aria-label="${T.book}" aria-haspopup="dialog">
    <span class="book-badge__k" aria-hidden="true">${K_SYMBOL('pill')}</span>
    <span class="book-badge__label">${T.book} <i aria-hidden="true">→</i></span>
  </a>`);

  /* ---------- schematic map (drawn from OpenStreetMap), inlined so it takes the site fonts ---------- */
  const mapSlot = $('[data-map]');
  const mapImg = () => { mapSlot.innerHTML = `<img src="${mapSlot.dataset.map}" alt="" style="width:100%;height:100%;object-fit:cover">`; };   // fallback: same map, without the site fonts
  if (mapSlot) fetch(mapSlot.dataset.map).then((r) => r.ok ? r.text() : Promise.reject()).then((svg) => { mapSlot.innerHTML = svg; }).catch(mapImg);

  const root = document.documentElement;
  const top = $('#jawTop'), bottom = $('#jawBottom');
  const logo = $('.jaw-top__logo span'), dilos = $('.jaw-bottom__logo span');
  const sections = $$('main > section, main > img, main > .calendar-end');
  // what the jaw "eats": one soft band under the menu row, painted in the colours of the sections behind it.
  // (It used to fade every paragraph and photo with a moving mask — beautiful, but phones had to redraw
  //  all of them at every scroll step, which made scrolling heavy on mobile.)
  top.insertAdjacentHTML('afterbegin', '<div class="jaw-veil" aria-hidden="true"></div>');
  const veil = $('.jaw-veil', top);
  let secBg = [], veilKey = '';

  /* ---------- menu ---------- */
  const burger = $('.burger'), off = $('#offcanvas');
  function menu(open) {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    open ? off.removeAttribute('inert') : off.setAttribute('inert', '');
  }
  burger.addEventListener('click', () => menu(!root.classList.contains('menu-open')));
  addEventListener('keydown', (e) => e.key === 'Escape' && menu(false));

  /* ---------- booking: PLACEHOLDER until the booking app (separate project) ---------- */
  document.body.insertAdjacentHTML('beforeend', `
  <dialog class="cv book-dlg" id="bookDlg" aria-labelledby="bookDlgH">
    <div class="cv__inner"><div>
      <h2 id="bookDlgH" tabindex="-1" autofocus>${T.book}</h2>
      <p class="cv__role">${T.book_soon}</p>
      <ul>
        <li><a href="mailto:${D.email}?subject=${encodeURIComponent(T.book_subject)}">${D.email}</a></li>
        <li><a href="https://ig.me/m/korkodilosathens" target="_blank" rel="noopener">Instagram DM ↗</a></li>
        ${D.phone ? `<li><a href="tel:${tel}">${D.phone}</a></li>` : ''}
      </ul>
    </div></div>
    <button class="cv__close" type="button">${T.close}</button>
  </dialog>`);
  const badge = $('#bookBadge'), bookDlg = $('#bookDlg');
  // every "book" link (pill, bands, cards) closes the mouth onto the booking column — placeholder until the booking app
  document.addEventListener('click', (e) => {
    if (!e.target.closest('a[href="#book"]')) return;
    e.preventDefault();
    const from = e.target.closest('dialog');   // e.g. a workshop pop-up: close it, then open booking
    if (from && from !== bookDlg) from.close();
    bookDlg.showModal();
  });
  /* ---------- landing film strip: arrows scroll by most of a screen; disabled at the ends ---------- */
  $$('[data-film]').forEach((f) => {
    const track = $('.film__track', f), prev = $('.film__prev', f), next = $('.film__next', f);
    const sync = () => {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8 }));
    next.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8 }));
    track.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync); addEventListener('load', sync); sync();
  });

  /* ---------- Studio: the K walks from left to right each time it comes into view ---------- */
  $$('[data-walk]').forEach((w) => {
    const k = $('.k-walk__k', w);
    const dist = () => w.style.setProperty('--walk', Math.max(0, w.clientWidth - k.offsetWidth - 2 * k.offsetLeft) + 'px');
    dist(); addEventListener('resize', dist);
    new IntersectionObserver(([e]) => {
      if (e.intersectionRatio > 0.6) w.classList.add('is-walking');
      else if (!e.isIntersecting) w.classList.remove('is-walking');
    }, { threshold: [0, 0.6] }).observe(w);
  });

  /* ---------- Calendar: a click anywhere on a workshop row opens its pop-up ---------- */
  $$('.special').forEach((row) => row.addEventListener('click', (e) => {
    const open = $('.special__open', row);
    if (open && !e.target.closest('.special__open')) open.click();
  }));

  /* ---------- speed: fetch the other pages in the background, so the menu opens them at once ---------- */
  const warm = () => {
    const seen = new Set();
    $$('#offcanvas a, .jaw-top__menu a').forEach((a) => {
      if (a.origin !== location.origin || a.href === location.href || seen.has(a.href)) return;
      seen.add(a.href);
      fetch(a.href, { priority: 'low', credentials: 'same-origin' }).catch(() => {});
    });
  };
  if (!(navigator.connection && navigator.connection.saveData)) {
    addEventListener('load', () => ('requestIdleCallback' in window ? requestIdleCallback(warm, { timeout: 3000 }) : setTimeout(warm, 1500)));
  }

  /* ---------- tutors: quick CV pop-up ---------- */
  $$('[data-cv]').forEach((b) => b.addEventListener('click', () => { const d = $('#' + b.dataset.cv); d && d.showModal(); }));
  $$('dialog.cv').forEach((d) => {
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('.cv__close')) d.close(); });
  });

  /* ---------- geometry (like the original jsVars, but measured live) ---------- */
  let G = {};
  function measure() {
    const cs = getComputedStyle(root);
    const logoTop = parseFloat(cs.getPropertyValue('--logo-top'));
    const gum = parseFloat(cs.getPropertyValue('--gum'));
    const logoH = logo.getBoundingClientRect().height;
    const after = innerWidth <= 768 ? 10 : 25;              // original logo padding-bottom
    const jaw = logoTop + logoH + after;                    // closed upper jaw
    const dilosH = dilos.getBoundingClientRect().height;
    // round 5: KORKO lifts away completely while you read (one header); it still comes back to bite at the end
    const teeth = 0;
    G = { logoTop, gum, logoH, jaw, teeth, maxLift: Math.max(0, logoTop + logoH - gum - teeth) };
    root.style.setProperty('--jaw', jaw + 'px');
    root.style.setProperty('--foot-h', Math.max(0, innerHeight - jaw - dilosH - 50) + 'px');
    // colours behind the jaw band (a photo directly in the page sits on the page colour)
    const pageBg = getComputedStyle(document.body).backgroundColor;
    secBg = sections.map((sec) => { const c = getComputedStyle(sec).backgroundColor; return c === 'rgba(0, 0, 0, 0)' || c === 'transparent' ? pageBg : c; });
    veilKey = '';
    // the lower jaw sits on the colour of the last section, like the original
    const last = sections[sections.length - 1];
    const bg = last && last.tagName === 'SECTION' ? getComputedStyle(last).backgroundColor : getComputedStyle(document.body).backgroundColor;
    bottom.style.setProperty('--jaw-bg', bg);
    update();
  }

  /* ---------- the bite ---------- */
  let closed = false, chompT;
  function update() {
    const y = scrollY;
    const toEnd = Math.max(0, document.documentElement.scrollHeight - innerHeight - y);
    // open as you start reading, close as the end comes up (1:1 with scroll, so the jaws meet)
    const lift = Math.max(0, Math.min(G.maxLift, y, toEnd));
    top.style.setProperty('--lift', lift.toFixed(1));

    // swallow content at the jaw line (soft edge): the band covers 0 → line, then fades out over 16px
    const line = Math.round(G.logoTop + G.logoH - lift + 10);
    const stops = [];
    sections.forEach((sec, i) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= line + 16) return;
      const a = Math.max(0, Math.round(r.top)), z = Math.min(line + 16, Math.round(r.bottom));
      stops.push(`${secBg[i]} ${a}px ${z}px`);
    });
    const key = line + '|' + stops.join(',');
    if (key !== veilKey) {
      veilKey = key;
      veil.style.height = (line + 16) + 'px';
      veil.style.background = stops.length ? `linear-gradient(to bottom, ${stops.join(', ')})` : '';
      veil.style.webkitMaskImage = veil.style.maskImage = `linear-gradient(to bottom, #000 ${line}px, transparent ${line + 16}px)`;
    }

    // label colour follows the section under the menu row
    const probe = 40;
    let dark = false;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { dark = s.classList.contains('bg-brown') || s.classList.contains('bg-green') || s.classList.contains('bg-ink'); break; }
    }
    top.classList.toggle('on-dark', dark);

    // the badge steps aside once the lower jaw (with the booking column) is on screen
    // the pill steps aside as soon as –DILOS comes into view (visualViewport = the part not covered by iOS bars)
    badge.classList.toggle('is-hidden', bottom.getBoundingClientRect().top < (window.visualViewport ? visualViewport.height : innerHeight));

    // chomp when the jaws lock
    const scrollable = document.documentElement.scrollHeight - innerHeight > 80;
    if (scrollable && toEnd <= 1 && !closed) {
      closed = true;
      top.classList.add('chomp'); bottom.classList.add('chomp');
      clearTimeout(chompT); chompT = setTimeout(() => { top.classList.remove('chomp'); bottom.classList.remove('chomp'); }, 500);
    } else if (toEnd > 60) closed = false;
  }

  let raf = 0;
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  addEventListener('resize', measure);
  new ResizeObserver(measure).observe(document.body);
  document.fonts && document.fonts.ready.then(measure);
  measure();
  // a page that is only the closed mouth (Contact) bites once when it opens
  if (document.documentElement.scrollHeight - innerHeight <= 80 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => { top.classList.add('chomp'); bottom.classList.add('chomp'); setTimeout(() => { top.classList.remove('chomp'); bottom.classList.remove('chomp'); }, 500); }, 350);
  }
})();
