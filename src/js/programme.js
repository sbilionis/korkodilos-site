/* ==========================================================================
   KORKODILOS — calendar page.
   The programme itself is built into the HTML from src/_data/programme.json
   (Alex edits it in /admin). This script only:
   - hides specials whose date has passed (the site isn't rebuilt every day),
   - shows "nothing special right now" when none are left,
   - writes the weekday in front of each special's time.
   ========================================================================== */
(function () {
  const list = document.querySelector('[data-specials]');
  if (!list) return;
  let days = [];
  try { days = JSON.parse(document.getElementById('days-json').textContent); } catch (e) {}
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let shown = 0;
  list.querySelectorAll('.special').forEach((el) => {
    const d = new Date(el.dataset.date + 'T12:00');
    if (d < today) { el.hidden = true; return; }
    shown++;
    const small = el.querySelector('[data-weekday]');
    if (small && days.length) small.textContent = days[(d.getDay() + 6) % 7] + ' · ' + small.textContent;
  });
  if (!shown) list.querySelector('[data-empty]').hidden = false;
})();
