# KORKO symbol, animated (korko-mouth.svg)

Self-contained animated SVG. No library, no JS. 2.7 KB.

## What it does
4 s loop: one slow breath (jaws open ±2.5°), wind-up, snap shut in 0.08 s, hold 0.08 s, spring back open with a small overshoot, rest.
Jaws pivot on the inner vertex of the K, so the junction never opens. A hidden filler bar shows only while the mouth is shut to stop an anti-aliasing seam.

## Embed
Inline the SVG markup (preferred). Colour comes from `currentColor`, so set it on the parent:

```html
<span class="korko-logo" style="color: var(--ink); width: 120px; display: inline-block">
  <!-- paste korko-mouth.svg here -->
</span>
```

`<img src="korko-mouth.svg">` also works and animates, but renders black only and ignores the speed variable.

## Controls (inline only)
- Speed: `--korko-duration: 3s;` on the svg or a parent. Default 4s.
- Pause until hover: `.korko-logo .jaw, .korko-logo .seam { animation-play-state: paused } .korko-logo:hover .jaw, .korko-logo:hover .seam { animation-play-state: running }`
- `prefers-reduced-motion: reduce` already stops it and shows the open K.

## Do not
- Do not edit coordinates or the viewBox. The square viewBox (89.34 70.78 344 344) is padded so the open jaw overshoot never clips and the mark stays optically centred.
- Do not remove the clipPath. It hides the jaw tails behind the stem.
- If two copies sit on one page, rename `korko-clip` in the second to avoid an id clash.
