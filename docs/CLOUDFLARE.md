# Deploying JurisMind on Cloudflare

JurisMind is a plain static site: **21 HTML pages** (English at the root, `fr/` and `ar/`
sub-folders) plus `assets/css` and `assets/js`. It is published to **Cloudflare Workers with
static assets** — a Worker that has no script at all, so every request is answered by the
asset router and the whole site costs nothing but bandwidth. Cloudflare Pages serves the
same files just as well (section 4).

Everything below is already in the repository; nothing to write by hand.

---

## 0. What `wrangler.toml` declares

| Key | Value | Why |
| --- | --- | --- |
| `name` | `droit-des-affaires` | The Worker. Change it if your Worker is called something else; Workers Builds passes the real name in `WRANGLER_CI_OVERRIDE_NAME` and only logs a warning if the two disagree. |
| `compatibility_date` | `2026-10-12` | Pins the runtime behaviour of the Worker. There is no script, so it documents which version of Cloudflare's asset router this deploy was validated against. |
| `[build] command` | `node tools/cf-build.mjs` | Wrangler runs this before every `deploy`, `versions upload` and `dev`, so `dist/` is always fresh and no build command is needed in the dashboard or in CI. |
| `[assets] directory` | `./dist` | The published folder. |
| `[assets] not_found_handling` | `404-page` | Unknown paths return `dist/404.html` with a real 404 status. |
| `[assets] html_handling` | `auto-trailing-slash` | Pages-like routing with clean URLs — see the table in section 0.1. |

There is deliberately **no `main`**: an assets-only Worker is valid, and it keeps requests out
of billable Worker invocations. Add `main = "src/index.js"` (plus a `src/index.js`) the day you
want dynamic endpoints — auth, a real tutor, cross-device progress.

### 0.1 URLs — what the Worker answers

Verified against `wrangler dev` with this exact configuration:

| Request | Response |
| --- | --- |
| `/`, `/fr/`, `/ar/` | `200` — the index of that language |
| `/dashboard`, `/fr/dashboard`, `/ar/tutor` | `200` — the clean URL is canonical |
| `/dashboard.html` | `307` → `/dashboard` (query string kept: `?subject=labour` survives) |
| `/fr` | `307` → `/fr/` |
| `/login`, `/fr/login`, `/ar/login` | `301` → the dashboard of that language |
| `/anything-else` | `404` with the branded `404.html` |
| `/assets/*` | `200`, immutable cache headers |

Two rules follow from that, and both matter:

* **`_redirects` must never point at a `.html` file.** A rule such as
  `/dashboard /dashboard.html 301` loops forever: Cloudflare answers `/dashboard.html` with
  `307` back to `/dashboard`. The generated file only carries the `/login` aliases.
* **Clean URLs need no rules at all** — `html_handling` does the work. If you ever point the
  sitemap at a custom domain, the canonical URLs to publish are the extension-free ones
  (`/dashboard`, `/fr/practice`), which is what `tools/cf-build.mjs` now writes.

---

## 1. Cloudflare dashboard — connect the repository (no CLI)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** → **Import a Git
   repository**.
2. Pick `aitchikh05-a11y/droit-des-affaires` and the `main` branch.
3. Build settings:

   | Field | Value |
   | --- | --- |
   | Build command | *(leave empty — `wrangler.toml` runs `node tools/cf-build.mjs` itself)* |
   | Deploy command | `npx wrangler deploy` (the default) |
   | Root directory | *(leave empty)* |
   | Environment variable | `NODE_VERSION` = `22` (optional, the build image is already on 22) |

4. **Deploy.** Every push to `main` republishes; every other branch — and every pull request —
   gets its own preview URL at
   `https://<branch>-<worker-name>.<your-subdomain>.workers.dev`.

> The build container needs nothing but Node: there are no dependencies to install, so the
> whole deploy is "clone → wrangler → build → upload".

## 2. From your machine (Wrangler CLI)

```bash
npx wrangler login          # once
npx wrangler dev            # builds dist/ and serves it on http://localhost:8787
npx wrangler deploy         # builds dist/ and publishes it
```

`wrangler dev` applies `_headers` and `_redirects` and serves the branded 404 exactly like
production, so it is the fastest way to check a change. Add `--remote` to run against the real
edge. `npx wrangler versions upload` publishes a version **without** moving production traffic
and prints its preview URL — that is what the pull-request job below uses.

## 3. GitHub Actions (optional)

`.github/workflows/cloudflare.yml` builds the site on every push and pull request, verifies
that all 21 pages exist with their content dictionary and language picker, uploads `dist/` as
an artifact, and only then deploys:

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | API token with **Workers Scripts: Edit** |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Account id (dashboard → right sidebar) |

Without those secrets the workflow still builds and validates — the deploy and preview steps
skip themselves with a notice. That is the recommended setup here: Cloudflare's own git
integration (section 1) already deploys, and this workflow is the belt-and-braces second path
for when you want CI to publish instead.

## 4. Cloudflare Pages instead of Workers

The same `dist/` works on Pages. Pick **one** of these:

* **Dashboard** — *Workers & Pages* → *Create* → *Pages* → *Connect to Git*, build command
  `node tools/cf-build.mjs`, build output directory `dist`.
* **CLI** — `npx wrangler pages deploy dist --project-name=jurismind`.

Pages reads `_headers`, `_redirects` and `404.html` from the published folder just like the
Worker does, and the generated `_redirects` targets clean URLs, so the same `dist/` behaves the
same on both products. Remember that the Worker name and the Pages project name are separate
things: only the one you deploy to needs to match `name` in `wrangler.toml`.

---

## What ships in the bundle

`tools/cf-build.mjs` regenerates the pages, copies the web files into `dist/` and adds:

| File | Purpose |
| --- | --- |
| `_headers` | Security headers (CSP, `nosniff`, `X-Frame-Options`, Referrer-Policy, Permissions-Policy) and caching: `assets/*` immutable for a year (they carry `?v=<hash>`), HTML always revalidated |
| `_redirects` | The `/login` aliases (301 to the dashboard in the matching language). Clean URLs are not listed here — `html_handling` serves them, and a rule pointing at a `.html` file would loop (section 0.1) |
| `404.html` | Branded not-found page with the three language flags and a way back |
| `sitemap.xml`, `robots.txt` | All 18 indexable pages under their canonical clean URLs (`/dashboard`, `/fr/practice`…) with today's `lastmod`; the origin comes from the `SITE_URL` env variable (default `https://jurismind.pages.dev`) |
| `site.webmanifest` | Installable PWA metadata, inline SVG icon, `#191923` theme colour |
| `.assetsignore` | Keeps `tools/`, `*.md`, `wrangler.toml` out of a direct upload of the repository root |

`dist/` is git-ignored — it is a build artifact, and `wrangler.toml` regenerates it.

## After the first deploy

* **Custom domain** — Workers → your Worker → *Settings* → *Domains & Routes* → *Add custom
  domain* (`jurismind.ma` or similar); Cloudflare issues the certificate automatically.
* **Sitemap URL** — set `SITE_URL=https://jurismind.ma` in the build environment (Workers
  Builds → *Settings* → *Build* → *Variables and Secrets*, or the GitHub workflow) and the
  sitemap and robots files follow the real domain.
* **Language routing** — the picker remembers the visitor's language in `localStorage` and
  redirects to the equivalent page; the redirect targets are relative, so they work unchanged
  on `workers.dev`, on `pages.dev`, on a custom domain and under a sub-path.

## Local check before deploying

```bash
node tools/cf-build.mjs      # → dist/
npx wrangler dev             # serves dist/ with _headers, _redirects and 404.html applied
npx wrangler deploy --dry-run --outdir .wrangler/tmp   # validates the config, uploads nothing
```

## Troubleshooting the config file

These are configuration errors seen on this repository, and what they mean:

| Message | Cause |
| --- | --- |
| `Expected "compatibility_flags" to be of type string array but got {...}` | Compatibility flags are **strings in an array** (`compatibility_flags = ["flag_name"]`), not booleans in a table. |
| `Unexpected fields found in build field: "assets","environment"` | The `[build]` table only accepts `command`, `cwd` and `watch_dir`. The output folder belongs in `[assets] directory`; Node version belongs in the environment, not in the config. |
| `Unexpected fields found in top-level field: "preview"` | There is no `[preview]` block. Per-branch preview URLs come from the platform (`preview_urls`, on by default); the optional `[previews]` table only tunes limits and observability for them. |
| `You need to provide the name of your worker` | `name` is required even though Workers Builds overrides it at deploy time. |
| `It looks like you've run Wrangler in a non-interactive environment without an API token` | Only on a local `wrangler deploy`: run `npx wrangler login` first, or set `CLOUDFLARE_API_TOKEN`. |
