# JurisMind

**Learn smarter. Think deeper.** — an adaptive learning path for law students.

JurisMind maps what a student actually remembers in **contract law, commercial law and
labour law** (plus civil liability, company law, administrative law, business criminal law
and family law), detects the topics that are quietly fading, and serves the next exercise
before the memory slips — then re-schedules the review automatically.

Trilingual by design: **English**, **Français** and **العربية** (full RTL layout, Arabic
typeface and its own legal vocabulary).

---

## The retention feature

| Piece | What it does |
| --- | --- |
| **Mastery score** | Every topic carries a 0–100 score that moves with each answer (+8/+11/+13 by difficulty, −9 on a miss). |
| **Memory decay** | Retention = `mastery · e^(−days_since_review / (3 + mastery/6))` — the dashboard shows what is *currently* remembered, not just what was once learned. |
| **Spaced schedule** | Correct answers push the review out on 1 → 3 → 7 → 14 → 30-day intervals; a miss brings it back tomorrow. |
| **Weak-topic detection** | Topics under 60 % go into a coral “attention” list; topics whose retention has decayed below ~72 % of their score are flagged as *at risk*. |
| **Adaptive exercises** | The engine picks the weakest subject (70 % mastery / 30 % retention), then the weakest topic inside it, then the question closest to the learner’s current level. |

## Pages (per language)

| File | Content |
| --- | --- |
| `index.html` | Landing: hero, retention explainer with a decay chart, method, live “next exercise” preview, subjects, stats, journey, tutor preview, FAQ. |
| `dashboard.html` | Learning path dashboard: readiness ring, weak spots, retention schedule, 7-day activity, subject progress, milestones, badges, recommendations. |
| `path.html` | The journey: 5 stages × subject tabs, milestones, at-risk topics, upcoming reviews, subject mastery. |
| `practice.html` | Adaptive practice session: setup, 5-question run with timer, feedback with mastery delta + next review, live mastery sidebar, session summary. |
| `subjects.html` | Subject library: per-topic mastery, weak topics, next reviews, exercise counts. |
| `tutor.html` | AI tutor: keyword-matched knowledge base, three answer styles (simple / exam / case), context panel that shows the learner’s weak topics. |

Demo progress lives in `localStorage` (`jurismind.state.v1`) — nothing leaves the browser.
A seeded 30-day history makes the dashboard meaningful on first load; “Reset demo data”
starts over.

## Language switching

One button per page — flag + code, opening a list of English 🇬🇧 / Français 🇫🇷 /
العربية 🇲🇦 with the active one highlighted — in the landing header and footer, and in the
app topbar and footer. It is a native `<details>` disclosure, so the list opens even with
JavaScript disabled; the script only adds slimmer touches (one list open at a time, close
on outside click or Escape, flip upwards near the bottom of the page). Assets are linked
with a content hash (`?v=…`) so a stale cached script can never hide the list again. The choice is stored under `jurismind.lang` and **tracked across every page**: a
tiny guard script in each document's `<head>` sends the visitor to the same page in the
remembered language before anything paints, keeping query strings (`?subject=…`) and
hashes intact and never redirecting a first-time visitor. Deep links work too:
`/index.html?lang=ar`, `/fr/practice.html?lang=en&subject=labour` — on Cloudflare those clean up
on the way in (`/index.html?lang=ar` → `/?lang=ar`, `/fr/practice.html` → `/fr/practice`) with the
query string intact.

## Design system

* **Colour** — Electric lime `#C6FF4D`, Midnight `#191923`, Lavender `#B9A0FF`,
  Off-white `#F7F7F2`, Coral `#FF8B70` (attention only), Mint `#65D6B0`, muted grey `#777785`.
  70 % neutral / 20 % dark surfaces / 10 % accents.
* **Type** — Space Grotesk (headings), Inter (body/UI) and IBM Plex Sans Arabic, which
  replaces both in RTL.
* Rounded cards (14–28 px), loud accents reserved for progress and achievements, calm
  reading screens, animations limited to progress, correct answers and unlocked badges.

## Repository layout

```
index.html dashboard.html …     # English build (root)
fr/  ar/                        # French and Arabic builds, same file names
assets/css/jurismind.css        # the whole design system
assets/js/app.js                # runtime core: i18n, state, memory model, shell
assets/js/engine.js             # adaptive engine: picking, scheduling, badges
assets/js/pages.js              # page renderers (landing … tutor)
tools/content/{en,fr,ar}.mjs    # content dictionaries: copy, 8 subjects, 19 exercises, tutor KB
tools/build.mjs                 # static generator (no dependencies)
```

## Deploying to Cloudflare

The repository ships everything Cloudflare needs:

It is published as a **Worker with static assets** — no Worker script, `dist/` *is* the site.
`wrangler.toml` runs the build itself, so the dashboard only needs the default deploy command.

| File | Role |
| --- | --- |
| `wrangler.toml` | Worker config: `name`, `compatibility_date`, `[build] command = node tools/cf-build.mjs`, `[assets] directory = ./dist`, branded 404 |
| `tools/cf-build.mjs` | Regenerates the pages and writes `dist/` + `_headers`, `_redirects`, `404.html`, `sitemap.xml`, `robots.txt`, `site.webmanifest` |
| `.github/workflows/cloudflare.yml` | CI: builds, verifies all 21 pages, uploads `dist/`; deploys and previews when the Cloudflare secrets are set |
| `.assetsignore` | Keeps `tools/`, `*.md` and `wrangler.toml` out of a direct upload of the repository root |
| `docs/CLOUDFLARE.md` | Step-by-step guide (dashboard, Wrangler CLI, GitHub Actions, Pages) |

```bash
node tools/cf-build.mjs        # → dist/
npx wrangler dev               # preview dist/ locally, headers and redirects included
npx wrangler deploy            # → https://<worker-name>.<subdomain>.workers.dev
```

Cloudflare builds straight from Git too: connect the repository, leave the build command empty
(wrangler runs `node tools/cf-build.mjs`) and keep the default deploy command `npx wrangler deploy`.
Cloudflare Pages can serve the same `dist/` folder instead — see `docs/CLOUDFLARE.md`.

## Build & run

```bash
node tools/build.mjs        # regenerate all 21 HTML pages
python3 -m http.server 8080 # then open http://localhost:8080
```

The site is fully static: open `index.html` through any web server (a local one is needed
only because fonts are loaded from Google Fonts, not because of the scripts).

---

*JurisMind is an educational tool. It is not legal advice and does not replace a course,
a professor or a lawyer.*
