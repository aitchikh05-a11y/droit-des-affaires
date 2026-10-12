# Deploying JurisMind on Cloudflare

JurisMind is a plain static site: **21 HTML pages** (English at the root, `fr/` and `ar/`
sub-folders) plus `assets/css` and `assets/js`. Any Cloudflare product that serves files
works — these are the two useful ones.

| Option | What it is | When to pick it |
| --- | --- | --- |
| **Cloudflare Pages** | Static hosting with git integration, preview URLs per branch, free SSL | Recommended — zero cost, one repo, preview deploys |
| **Cloudflare Workers (assets)** | Same files served by a Worker, plus room for dynamic endpoints | When you add `functions/` (API, auth, real tutor) later |

Everything below is already in the repository; nothing to write by hand.

---

## 1. Cloudflare Pages — connect the repository (no CLI)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick `aitchikh05-a11y/droit-des-affaires` and the `main` branch.
3. Build settings:

   | Field | Value |
   | --- | --- |
   | Framework preset | *None* |
   | Build command | `node tools/cf-build.mjs` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |
   | Environment variable | `NODE_VERSION` = `22` |

4. **Save and Deploy.** Every push to `main` republishes; every pull request gets its own
   `https://<hash>.jurismind.pages.dev` preview URL.

> Prefer to publish the repository as-is, without a build? Clear the build command and set
> the output directory to `/` (or leave it blank). The site works from the root too — the
> build step exists only to add `_headers`, `_redirects`, `404.html`, `sitemap.xml`,
> `robots.txt` and `site.webmanifest`, which Cloudflare reads from the published folder.

## 2. Cloudflare Pages — from your machine (Wrangler CLI)

```bash
npx wrangler login                          # once
node tools/cf-build.mjs                     # → dist/
npx wrangler pages deploy dist --project-name=jurismind
```

The first run asks to create the project; later runs update it. Add `--branch=staging`
to publish a non-production preview.

## 3. GitHub Actions (already configured)

`.github/workflows/cloudflare-pages.yml` builds the site on every push and pull request,
verifies that all 21 pages exist and carry their content dictionary and language picker,
uploads `dist/` as an artifact, and deploys to Pages when these are set:

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | API token with **Cloudflare Pages: Edit** |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Account id (dashboard → right sidebar) |
| Variable | `CLOUDFLARE_PROJECT_NAME` | e.g. `jurismind` (defaults to `jurismind`) |

Without those secrets the workflow still builds and validates — only the deploy steps are
skipped, so the checks are useful on their own.

## 4. Cloudflare Workers with static assets (if you add a backend later)

`wrangler.toml` is ready for `wrangler pages deploy` and for a Worker setup. To serve the
same files through a Worker, add a `src/index.js` (or `functions/` folder) and use:

```toml
name = "jurismind"
main = "src/index.js"
compatibility_date = "2026-01-01"

[assets]
directory = "./dist"
binding = "ASSETS"
not_found_handling = "single-page-application"
```

`npx wrangler dev` then serves `dist/` locally, and `npx wrangler deploy` ships it.

---

## What ships in the bundle

`tools/cf-build.mjs` regenerates the pages, copies the web files into `dist/` and adds:

| File | Purpose |
| --- | --- |
| `_headers` | Security headers (CSP, `nosniff`, `X-Frame-Options`, Referrer-Policy, Permissions-Policy) and caching: `assets/*` immutable for a year (they carry `?v=<hash>`), HTML always revalidated |
| `_redirects` | Clean URLs (`/dashboard` → `/dashboard.html`, same for `fr/` and `ar/`), `/login` → dashboard, and a 404 catch-all |
| `404.html` | Branded not-found page with the three language flags and a way back |
| `sitemap.xml`, `robots.txt` | All 18 indexable pages with today's `lastmod` |
| `site.webmanifest` | Installable PWA metadata, inline SVG icon, `#191923` theme colour |
| `.assetsignore` | Keeps `tools/`, `*.md`, `wrangler.toml` out of direct uploads |

`dist/` is git-ignored — it is a build artifact.

## After the first deploy

* **Custom domain** — Pages → your project → *Custom domains* → `jurismind.ma` (or similar);
  Cloudflare issues the certificate automatically.
* **Sitemap URL** — if you use a custom domain, change the placeholder
  `https://jurismind.pages.dev` in `tools/cf-build.mjs` (`writeExtras(...)`) and rebuild.
* **Language routing** — the picker remembers the visitor's language in `localStorage` and
  redirects to the equivalent page; the redirect targets are relative, so they work
  unchanged on `pages.dev`, on a custom domain and under a sub-path.

## Local check before deploying

```bash
node tools/cf-build.mjs
npx wrangler pages dev dist      # serves dist/ with _headers and _redirects applied
```
