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
   robots.txt. Defaults to the jurismind.pages.dev placeholder.
   ============================================================ */
import { mkdirSync, writeFileSync, rmSync, readdirSync, statSync, existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

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

/* ---------- 2. Cloudflare _headers ---------- */
const HEADERS = `# ============================================================
# JurisMind — Cloudflare headers
# https://developers.cloudflare.com/workers/static-assets/headers/
# ============================================================

/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; form-action 'self'; base-uri 'self'; frame-ancestors 'self'

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

/* ---------- 4. branded 404 (served by Cloudflare for unknown paths) ---------- */
function page404() {
  const src = readFileSync(join(ROOT, "index.html"), "utf8");
  // Canonical, extension-free URLs — Cloudflare redirects /index.html → / and
  // /fr/index.html → /fr/, so linking straight at the canonical path skips a hop.
  const langLinks = [
    { code: "en", href: "/", flag: "#012169", label: "English" },
    { code: "fr", href: "/fr/", flag: "#002395", label: "Français" },
    { code: "ar", href: "/ar/", flag: "#C1272D", label: "العربية" }
  ];
  return src
    .replace(/<title>[^<]*<\/title>/, "<title>404 — JurisMind</title>")
    .replace(
      /(<div class="container hero-grid">)/,
      `<div class="container" style="text-align:center;padding:60px 22px 10px">
      <p class="kicker kicker-coral">HTTP 404</p>
      <h1 style="font-size:clamp(2rem,6vw,3.4rem);margin-bottom:10px">Page not found</h1>
      <p class="muted" style="max-width:56ch;margin:0 auto 18px">
        This page does not exist in the ${langLinks.length} language builds. Pick a language and keep studying.
      </p>
      <div class="hero-cta" style="justify-content:center">
        ${langLinks
          .map(
            (l) =>
              `<a class="btn btn-ghost" href="${l.href}"><span style="width:20px;height:13px;border-radius:3px;background:${l.flag};box-shadow:inset 0 0 0 1px rgba(25,25,35,.2);display:inline-block"></span>${l.label}</a>`
          )
          .join("")}
        <a class="btn btn-lime" href="/">JurisMind home</a>
      </div>
    </div>
    $1`
    );
}

/* ---------- 5. robots.txt + sitemap.xml (only if not already provided) ---------- */
function writeExtras(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  // Canonical URLs as Cloudflare serves them: /, /dashboard, /fr/,
  // /fr/dashboard … (a .html URL answers with a 307 to these).
  const pages = ["", "dashboard", "path", "practice", "subjects", "tutor"];
  const urls = [];
  for (const lang of ["", "fr", "ar"]) {
    for (const p of pages) {
      const loc = p === "" ? `${siteUrl}/${lang ? lang + "/" : ""}` : `${siteUrl}/${[lang, p].filter(Boolean).join("/")}`;
      urls.push(`  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`);
    }
  }
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
  );
  writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  const manifest = {
    name: "JurisMind",
    short_name: "JurisMind",
    description: "Adaptive learning path for law students",
    start_url: "/dashboard.html",
    display: "standalone",
    background_color: "#F7F7F2",
    theme_color: "#191923",
    icons: [
      {
        src:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="120" fill="#191923"/><path d="M150 120v190c0 60 46 100 106 100s106-40 106-100" stroke="#C6FF4D" stroke-width="56" fill="none" stroke-linecap="round"/></svg>`
          ),
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
  writeFileSync(join(DIST, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
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
const siteUrl = (process.env.SITE_URL || "https://jurismind.pages.dev").replace(/\/+$/, "");
writeExtras(siteUrl);

console.log(
  `JurisMind → dist/ : ${files} files, ${(bytes / 1024).toFixed(0)} kB copied, plus _headers, _redirects, 404.html, sitemap.xml, robots.txt, site.webmanifest`
);
console.log(`Sitemap/robots origin: ${siteUrl}  (override with the SITE_URL env variable)`);
console.log(`Preview locally:  npx wrangler dev`);
console.log(`Deploy:           npx wrangler deploy   (wrangler runs this build itself)`);
if (!existsSync(join(DIST, "index.html"))) {
  console.error("JurisMind: index.html is missing from dist/ — check the copy rules.");
  process.exit(1);
}
