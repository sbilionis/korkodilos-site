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

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk"
  };
}
