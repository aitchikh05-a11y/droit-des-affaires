/* ============================================================
   JurisMind — Cloudflare build step
   Copies the static site into dist/ and writes the Cloudflare-only
   files (_headers, _redirects, 404.html) there, so the repository root
   stays clean and the site keeps working from any plain web server.

   Run:  node tools/cf-build.mjs
   Emits: dist/  (the assets directory declared in wrangler.toml, so
                  `wrangler deploy` publishes exactly this folder)

   wrangler.toml runs this script automatically through its [build]
   command before every `wrangler deploy` / `wrangler versions upload` /
   `wrangler dev`, and the GitHub workflow calls it directly.

   SITE_URL (optional): absolute origin used for sitemap.xml and
   robots.txt, sitemap.xml and llms.txt. Defaults to
   https://droit-des-affaires-dqt.pages.dev.
   ============================================================ */
import { mkdirSync, writeFileSync, rmSync, readdirSync, statSync, existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { llmsTxt } from "./llms.mjs";
import {
  LANG_CODES,
  PAGES,
  SECURITY_ADVISORY_URL,
  SECURITY_EMAIL,
  SITE_MODIFIED,
  canonicalUrl,
  getSiteUrl
} from "./site.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

/* ---------- 0. regenerate the HTML so the deploy always matches the dictionaries ---------- */
const build = spawnSync(process.execPath, [join(ROOT, "tools/build.mjs")], { stdio: "inherit" });
if (build.status !== 0) {
  console.error("JurisMind: tools/build.mjs failed, aborting the Cloudflare build.");
  process.exit(build.status || 1);
}

/* ---------- 1. clean + copy ---------- */
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const SKIP = new Set([".git", ".github", "dist", "node_modules", "tools", ".wrangler", ".assetsignore"]);
const PUBLISHED_EXT = new Set([".html", ".css", ".js", ".json", ".svg", ".png", ".jpg", ".jpeg", ".ico", ".webmanifest", ".txt", ".xml"]);

let files = 0;
let bytes = 0;

function copyTree(from, to) {
  for (const entry of readdirSync(from)) {
    const src = join(from, entry);
    const rel = relative(ROOT, src);
    if (rel.split("/").some((p) => SKIP.has(p))) continue;
    const st = statSync(src);
    if (st.isDirectory()) {
      copyTree(src, join(to, entry));
      continue;
    }
    if (!PUBLISHED_EXT.has(entry.slice(entry.lastIndexOf(".")))) continue;
    mkdirSync(dirname(join(to, entry)), { recursive: true });
    const contents = readFileSync(src);
    writeFileSync(join(to, entry), contents);
    files++;
    bytes += contents.length;
  }
}
copyTree(ROOT, DIST);

/* ---------- 2. Cloudflare _headers (Military-Grade Security Profile) ---------- */
const HEADERS = `# ============================================================
# JurisMind — Cloudflare Military-Grade Security Headers
# https://developers.cloudflare.com/workers/static-assets/headers/
# ============================================================

/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 0
  X-DNS-Prefetch-Control: off
  X-Permitted-Cross-Domain-Policies: none
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; object-src 'none'; form-action 'self'; base-uri 'self'; frame-ancestors 'self'; upgrade-insecure-requests

# Long-lived caching for the fingerprinted assets (?v=xxxxxxxx from tools/build.mjs)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# HTML: always revalidate so a deploy is visible immediately
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Directory-style URLs (/fr/ , /ar/) revalidate too
/fr/
  Cache-Control: public, max-age=0, must-revalidate
/ar/
  Cache-Control: public, max-age=0, must-revalidate

# AI discovery files should never be pinned by a long cache
/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
/robots.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
/sitemap.xml
  Content-Type: application/xml; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate

# Cloudflare-injected assets, if any
/cdn-cgi/*
  Cache-Control: public, max-age=31536000, immutable
`;

/* ---------- 3. Cloudflare _redirects ---------- */
const REDIRECTS = `# ============================================================
# JurisMind — Cloudflare redirects
# https://developers.cloudflare.com/workers/static-assets/redirects/
# ============================================================

# Clean URLs need NO rules here: \`html_handling = "auto-trailing-slash"\` in
# wrangler.toml already serves /dashboard from dashboard.html and /fr/ from
# fr/index.html, and Cloudflare canonicalises the other direction too
# (/dashboard.html → 307 → /dashboard, /fr → 307 → /fr/).
#
# Never point a rule at a \`.html\` file: /dashboard → /dashboard.html would bounce
# straight back to /dashboard and loop forever. The targets below are the
# canonical, extension-free paths.

# Legacy / convenience links: /login is not part of the journey, so it forwards
# to the dashboard in the matching language.
/login         /dashboard     301
/fr/login      /fr/dashboard  301
/ar/login      /ar/dashboard  301

# No catch-all on purpose: anything that does not match a file gets the bundled
# 404.html with a 404 status (not_found_handling = "404-page"), and a \`/*\` rule
# would also swallow real assets.
`;

/* ---------- 4. branded 404 (deliberately isolated from home-page SEO) ---------- */
function page404() {
  const links = [
    { href: "/", flag: "#012169", label: "English" },
    { href: "/fr/", flag: "#002395", label: "Français" },
    { href: "/ar/", flag: "#C1272D", label: "العربية" }
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>404 — JurisMind</title>
<meta name="description" content="The requested JurisMind page was not found. Choose a language to return to the learning path.">
<link rel="icon" href="/assets/og/jurismind-mark.png">
<link rel="stylesheet" href="/assets/css/jurismind.css">
</head>
<body data-page="not-found">
<main class="container" style="min-height:70vh;display:grid;place-items:center;text-align:center;padding:80px 22px">
  <div>
    <p class="kicker kicker-coral">HTTP 404</p>
    <h1 style="font-size:clamp(2.2rem,6vw,3.8rem)">Page not found</h1>
    <p class="muted" style="max-width:56ch;margin:0 auto 22px">
      This page does not exist in the three language builds. Pick a language and keep studying.
    </p>
    <div class="hero-cta" style="justify-content:center">
      ${links
        .map(
          (l) =>
            `<a class="btn btn-ghost" href="${l.href}"><span style="width:20px;height:13px;border-radius:3px;background:${l.flag};display:inline-block"></span>${l.label}</a>`
        )
        .join("")}
      <a class="btn btn-lime" href="/">JurisMind home</a>
    </div>
  </div>
</main>
</body>
</html>
`;
}

/* ---------- 5. discovery files: robots, sitemap, llms.txt, manifest ---------- */
function writeExtras(siteUrl) {
  const urls = [];
  for (const code of LANG_CODES) {
    for (const page of PAGES) {
      const loc = canonicalUrl(code, page, siteUrl);
      const alternates = LANG_CODES.map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${canonicalUrl(alt, page, siteUrl)}" />`
      ).join("\n");
      urls.push(
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${SITE_MODIFIED}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(
          "en",
          page,
          siteUrl
        )}" />\n  </url>`
      );
    }
  }
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join(
      "\n"
    )}\n</urlset>\n`
  );
  writeFileSync(
    join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\n# LLM-friendly site summary: ${siteUrl}/llms.txt\nSitemap: ${siteUrl}/sitemap.xml\n`
  );
  writeFileSync(join(DIST, "llms.txt"), llmsTxt(siteUrl), "utf8");

  const manifest = {
    id: "/",
    name: "JurisMind",
    short_name: "JurisMind",
    description: "Adaptive, evidence-based learning path for law students",
    lang: "en",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#F7F7F2",
    theme_color: "#191923",
    categories: ["education", "legal"],
    icons: [
      {
        src: "/assets/og/jurismind-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
  writeFileSync(join(DIST, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
  mkdirSync(join(DIST, ".well-known"), { recursive: true });
  writeFileSync(
    join(DIST, ".well-known/security.txt"),
    `Contact: ${SECURITY_ADVISORY_URL}\nContact: mailto:${SECURITY_EMAIL}\nCanonical: ${siteUrl}/.well-known/security.txt\nPreferred-Languages: en, fr, ar\nExpires: 2027-12-31T23:59:59.000Z\n`
  );
}

/* ---------- 6. .assetsignore (keeps non-web files out of a direct upload) ---------- */
const ASSETSIGNORE = `# Files Cloudflare should never upload when the repository root itself is
# used as an assets directory (wrangler.toml normally publishes ./dist, which
# already contains only web files)
tools/
*.md
wrangler.toml
.cloudflare/
.github/
.git/
node_modules/
dist/
assets/scss/
`;

writeFileSync(join(DIST, "_headers"), HEADERS);
writeFileSync(join(DIST, "_redirects"), REDIRECTS);
writeFileSync(join(DIST, "404.html"), page404());
writeFileSync(join(ROOT, ".assetsignore"), ASSETSIGNORE);
const siteUrl = getSiteUrl();
writeExtras(siteUrl);

console.log(
  `JurisMind → dist/ : ${files} files, ${(bytes / 1024).toFixed(0)} kB copied, plus _headers, _redirects, 404.html, sitemap.xml, robots.txt, llms.txt, site.webmanifest`
);
console.log(`Sitemap/robots origin: ${siteUrl}  (override with the SITE_URL env variable)`);
console.log(`Preview locally:  npx wrangler dev`);
console.log(`Deploy:           npx wrangler deploy   (wrangler runs this build itself)`);
if (!existsSync(join(DIST, "index.html"))) {
  console.error("JurisMind: index.html is missing from dist/ — check the copy rules.");
  process.exit(1);
}
