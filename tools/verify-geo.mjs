/* Deterministic GEO/SEO regression checks for the generated site.
   Usage: node tools/verify-geo.mjs [dist-directory] */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  DEFAULT_SITE_URL,
  LANG_CODES,
  PAGES,
  SITE_MODIFIED,
  SITE_PUBLISHED,
  canonicalUrl,
  getSiteUrl
} from "./site.mjs";

const DIST = process.argv[2] || "dist";
const siteUrl = getSiteUrl() || DEFAULT_SITE_URL;
const failures = [];
const checked = [];

function read(rel) {
  return readFileSync(join(DIST, rel), "utf8");
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch (error) {
      failures.push(`Invalid JSON-LD: ${error.message}`);
      return null;
    }
  }).filter(Boolean);
}

function typesIn(data) {
  const types = new Set();
  for (const block of data) {
    for (const node of block["@graph"] || [block]) {
      const value = node["@type"];
      (Array.isArray(value) ? value : [value]).forEach((t) => t && types.add(t));
    }
  }
  return types;
}

function flatJson(data) {
  return JSON.stringify(data);
}

function verifyPage(code, page) {
  const rel = `${code === "en" ? "" : `${code}/`}${page === "index" ? "index.html" : `${page}.html`}`;
  const html = read(rel);
  const canonical = canonicalUrl(code, page, siteUrl);
  const data = jsonLdBlocks(html);
  const types = typesIn(data);
  const json = flatJson(data);
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  const questionHeadings = [...html.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].filter((m) =>
    /[?؟]/.test(stripTags(m[2]))
  );

  check((html.match(/<h1\b/gi) || []).length === 1, `${rel}: expected exactly one H1`);
  check(html.includes(`<link rel="canonical" href="${canonical}">`), `${rel}: missing/incorrect canonical`);
  check(!/<meta name="robots"[^>]*noindex/i.test(html), `${rel}: indexable page must not be noindex`);
  check(html.includes(`<title>`), `${rel}: missing title`);
  check(/<meta name="description" content="[^"]+"/.test(html), `${rel}: missing description`);
  check(html.includes('<meta name="author"'), `${rel}: missing author metadata`);
  check(html.includes(`datetime="${SITE_PUBLISHED}"`) && html.includes(`datetime="${SITE_MODIFIED}"`), `${rel}: missing visible dates`);
  check(html.includes('<meta name="twitter:card" content="summary_large_image">'), `${rel}: missing Twitter Card`);
  check(html.includes('<meta property="og:image"'), `${rel}: missing og:image`);
  check(html.includes('<meta property="og:url"'), `${rel}: missing og:url`);
  check((html.match(/rel="alternate" hreflang="(?:en|fr|ar|x-default)"/g) || []).length >= 4, `${rel}: missing hreflang alternates`);
  check(types.has("Organization"), `${rel}: missing Organization schema`);
  check(types.has("WebSite"), `${rel}: missing WebSite schema`);
  check([...types].some((t) => t && t.endsWith("Page")), `${rel}: missing WebPage-family schema`);
  check(json.includes("datePublished") && json.includes("dateModified"), `${rel}: missing schema dates`);
  check(json.includes("author") && json.includes("sameAs"), `${rel}: missing author/entity links`);
  check(html.includes('href="about.html"') || html.includes('href="../about.html"'), `${rel}: missing About link`);
  check(html.includes('href="contact.html"') || html.includes('href="../contact.html"'), `${rel}: missing Contact link`);

  for (let i = 1; i < headings.length; i++) {
    check(headings[i] <= headings[i - 1] + 1, `${rel}: heading jump H${headings[i - 1]} → H${headings[i]}`);
  }

  if (page === "index") {
    check(types.has("Article"), `${rel}: missing Article schema`);
    check(types.has("FAQPage"), `${rel}: missing FAQPage schema`);
    check(types.has("LearningResource"), `${rel}: missing LearningResource schema`);
    check(json.includes("citation") && json.includes("Dunlosky"), `${rel}: missing source citations in schema`);
    check((html.match(/href="https:\/\/(?:journals\.sagepub\.com|pubmed\.ncbi\.nlm\.nih\.gov|doi\.org)/g) || []).length >= 3, `${rel}: need 3+ external scholarly citations`);
    check(/<blockquote\b/.test(html) && /<cite\b/.test(html), `${rel}: missing semantic quotation/citation`);
    check(/<table\b/.test(html) && /<ul\b/.test(html) && /<ol\b/.test(html), `${rel}: missing table/list formatting`);
    check(questionHeadings.length >= 3, `${rel}: need 3+ question-style headings, found ${questionHeadings.length}`);
    check(/class="byline"/.test(html), `${rel}: missing visible byline`);
  }

  checked.push(rel);
}

for (const code of LANG_CODES) {
  for (const page of PAGES) verifyPage(code, page);
}

/* Site-level discovery and trust files */
for (const file of ["llms.txt", "robots.txt", "sitemap.xml", "_headers", "_redirects", "404.html", "site.webmanifest", "assets/og/jurismind-og.png", "assets/og/jurismind-mark.png"]) {
  check(existsSync(join(DIST, file)), `Missing ${file}`);
  if (existsSync(join(DIST, file)) && /\.(png|txt|xml)$/.test(file)) {
    check(statSync(join(DIST, file)).size > 100, `${file} is unexpectedly empty`);
  }
}

if (existsSync(join(DIST, "llms.txt"))) {
  const llms = read("llms.txt");
  check(llms.startsWith("# JurisMind"), "llms.txt needs an H1 title");
  check(llms.includes("/llms.txt") && llms.includes("Peer-reviewed"), "llms.txt needs discovery and source sections");
}
if (existsSync(join(DIST, "robots.txt"))) {
  const robots = read("robots.txt");
  check(/^Sitemap: /m.test(robots), "robots.txt must declare the sitemap");
  check(robots.includes("/llms.txt"), "robots.txt should advertise llms.txt");
}
if (existsSync(join(DIST, "sitemap.xml"))) {
  const sitemap = read("sitemap.xml");
  for (const code of LANG_CODES) {
    for (const page of PAGES) {
      check(sitemap.includes(`<loc>${canonicalUrl(code, page, siteUrl)}</loc>`), `Sitemap missing ${canonicalUrl(code, page, siteUrl)}`);
    }
  }
  check(sitemap.includes(`<lastmod>${SITE_MODIFIED}</lastmod>`), "Sitemap lastmod should match the reviewed date");
}
if (existsSync(join(DIST, "404.html"))) {
  const notFound = read("404.html");
  check(/noindex/.test(notFound), "404.html should be noindex");
  check(!/<link rel="canonical"/.test(notFound), "404.html must not inherit the home canonical");
  check(!/application\/ld\+json/.test(notFound), "404.html must not inherit home JSON-LD");
}

if (failures.length) {
  console.error(`GEO check failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures.slice(0, 80)) console.error(`  ✗ ${failure}`);
  if (failures.length > 80) console.error(`  … ${failures.length - 80} more`);
  process.exit(1);
}

console.log(`GEO check passed: ${checked.length} indexable pages, JSON-LD, canonical/hreflang, citations, llms.txt, sitemap, OG/Twitter, 404 isolation.`);
