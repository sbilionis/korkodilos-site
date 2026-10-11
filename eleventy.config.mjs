// Korkodilos — Eleventy build.
// Every page is one template that is built twice: Greek at /, English at /en/.
// Texts live in src/_data/*.json as { "el": {...}, "en": {...} } and are edited by Alex in /admin (Sveltia CMS).
import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";
import { imageSize } from "image-size";

const md = markdownIt({ html: false, breaks: true, linkify: false, typographer: false });

export default function (eleventyConfig) {
  // files copied as they are
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets", "src/css": "css", "src/js": "js", "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy("src/admin");
  // design options for Stavros (not linked from the site, not indexed): /_proposals/round7.html etc.
  eleventyConfig.addPassthroughCopy({ "_proposals": "_proposals" });

  // **bold** and line breaks inside one paragraph (no block markup: the design controls the paragraphs)
  eleventyConfig.addFilter("mdi", (s) => md.renderInline(String(s || "")));

  // [width, height] of an image in src/, so <img> has its size before it loads (no jumping while you scroll)
  const sizes = new Map();
  eleventyConfig.addFilter("imgsize", (src) => {
    if (!src) return [0, 0];
    if (!sizes.has(src)) {
      try {
        const d = imageSize(fs.readFileSync(path.join("src", src.replace(/^\//, ""))));
        sizes.set(src, [d.width, d.height]);
      } catch (e) {
        console.warn(`[imgsize] cannot read ${src}`);
        sizes.set(src, [0, 0]);
      }
    }
    return sizes.get(src);
  });
  eleventyConfig.addFilter("ratio", (src, digits = 3) => {
    const [w, h] = sizes.get(src) || [0, 0];
    return h ? (w / h).toFixed(digits) : "1";
  });

  // the other language's URL for this page (used by the language switch fallback and hreflang)
  eleventyConfig.addFilter("otherLang", (url, lang) => (lang === "el" ? "/en" + url : url.replace(/^\/en/, "")));

  // typesetting (Stavros's rule): a line never ends on a tiny word ("ο", "και", "the"…),
  // and the last word of a paragraph/title never sits alone on its line.
  // Works on the finished HTML, so it also covers everything Alex types in /admin. Text only — never tags or scripts.
  const SHORT = new Set(("ο η το οι τα τον την της του των τις τους στο στη στην στον στα στις στους σε με να θα " +
    "και κι ή αν ως ότι από για που πως μη μην δεν ένα μια μία ένας κάθε " +
    "a an the and or of to in on at by for with as is it we our your you i").split(" "));
  const NB = "\u00A0";
  const glueShort = (t) => t.replace(/(?<=^|[\s(«“"])([^\s<>()«»“”"]{1,12})[ \t\n]+(?=\S|$)/g, (m, w) =>
    (w.length <= 2 || SHORT.has(w.toLowerCase())) && !/^\d+$/.test(w) ? w + NB : m);
  eleventyConfig.addTransform("typeset", function (html) {
    if (!(this.page.outputPath || "").endsWith(".html")) return html;
    // 1. tiny words stick to the next word (text between tags only; skip script/style/textarea)
    let skip = false;
    html = html.split(/(<[^>]+>)/).map((part) => {
      if (part.startsWith("<")) {
        const m = part.match(/^<(\/?)(script|style|textarea)\b/i);
        if (m) skip = !m[1];
        return part;
      }
      return skip ? part : glueShort(part);
    }).join("");
    // 2. the last two words of each paragraph/title/list item stay together (when the last word is short)
    return html.replace(/(<(p|h1|h2|h3|li|figcaption)\b[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, inner, close) => {
      const parts = inner.split(/(<[^>]+>)/);
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i].startsWith("<") || !parts[i].trim()) continue;
        const k = parts[i].search(/[ \t\n]+\S*\s*$/);
        const tail = (parts[i].slice(Math.max(k, 0)) + parts.slice(i + 1).join("")).replace(/<[^>]+>/g, "").trim();
        if (k > 0 && tail.length <= 12) parts[i] = parts[i].slice(0, k) + NB + parts[i].slice(k).replace(/^[ \t\n]+/, "");
        break;
      }
      return open + parts.join("") + close;
    });
  });

  // photos: small versions are made once at build time (480/800/1200/1600px WebP, in .cache/img → /assets/img/r/),
  // so phones download small files that are served as plain, fast files (also for photos Alex uploads).
  // Every <img> also gets its real width/height, so the page doesn't jump while photos load.
  const WIDTHS = [480, 800, 1200, 1600];
  const CACHE = ".cache/img";
  const variant = (src, w) => `/assets/img/r/${path.basename(src).replace(/\.[^.]+$/, "")}-${w}.webp`;
  eleventyConfig.addPassthroughCopy({ [CACHE]: "assets/img/r" });
  eleventyConfig.on("eleventy.before", async () => {
    const { default: sharp } = await import("sharp");
    const dir = "src/assets/img/uploads";
    fs.mkdirSync(CACHE, { recursive: true });
    const jobs = [];
    for (const f of fs.readdirSync(dir)) {
      if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
      const file = path.join(dir, f), mtime = fs.statSync(file).mtimeMs;
      let width;
      try { width = imageSize(fs.readFileSync(file)).width; } catch (e) { continue; }
      for (const w of WIDTHS.filter((w) => w < width).concat(Math.min(width, 2000))) {
        const out = path.join(CACHE, `${f.replace(/\.[^.]+$/, "")}-${w}.webp`);
        if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= mtime) continue;
        jobs.push(() => sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out));
      }
    }
    for (let i = 0; i < jobs.length; i += 8) await Promise.all(jobs.slice(i, i + 8).map((j) => j()));
    if (jobs.length) console.log(`[img] made ${jobs.length} small photo versions`);
  });
  const SIZES = "(max-width: 768px) 100vw, 60vw";   // default; templates can give their own sizes="…"
  eleventyConfig.addTransform("imgsizes", function (html) {
    if (!(this.page.outputPath || "").endsWith(".html")) return html;
    return html.replace(/<img\b([^>]*?)\ssrc="(\/assets\/img\/uploads\/[^"]+\.(?:jpe?g|png|webp))"([^>]*)>/g, (m, a, src, b) => {
      let d;
      try { d = imageSize(fs.readFileSync(path.join("src", src))); } catch (e) { return m; }
      const attrs = a + b;
      const size = /\swidth=/.test(attrs) ? "" : ` width="${d.width}" height="${d.height}"`;
      const ws = WIDTHS.filter((w) => w < d.width).concat(Math.min(d.width, 2000));
      const set = ws.map((w) => `${variant(src, w)} ${w}w`).join(", ");
      const sizes = /\ssizes=/.test(attrs) ? "" : ` sizes="${SIZES}"`;
      return `<img${a} src="${src}" srcset="${set}"${sizes}${size}${b}>`;
    });
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk"
  };
}
