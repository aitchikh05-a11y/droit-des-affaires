/* ============================================================
   JurisMind — static builder
   node tools/build.mjs
   Emits:   index.html + fr/ + ar/ at the repo root,
            with assets/ shared by the three languages.
   No dependencies, no runtime HTML: the site is plain static files,
   the language dictionary is embedded as JSON and read by app.js.
   ============================================================ */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import en from "./content/en.mjs";
import fr from "./content/fr.mjs";
import ar from "./content/ar.mjs";
import { seoByLang } from "./content/seo.mjs";
import { SOURCES } from "./content/evidence.mjs";
import { llmsTxt } from "./llms.mjs";
import {
  INFO_PAGES,
  LANG_CODES,
  LOCALES,
  LOGO_IMAGE_PATH,
  SECURITY_ADVISORY_URL,
  SECURITY_EMAIL,
  OG_IMAGE_PATH,
  PAGES,
  REPO_URL,
  SITE_MODIFIED,
  SITE_PUBLISHED,
  canonicalUrl,
  getSiteUrl
} from "./site.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = getSiteUrl();
/* Attach build-only editorial copy without adding it to the runtime jm-content JSON. */
const LANGS = [en, fr, ar].map((L) => ({ ...L, seo: seoByLang[L.code] }));
const GA_MEASUREMENT_ID = "G-6VYYNLG1L0";
const GOOGLE_SITE_VERIFICATION_FILE = "googledb2edb8cbf9baa93.html";
const OG_IMAGE = SITE_URL + OG_IMAGE_PATH;
const LOGO_IMAGE = SITE_URL + LOGO_IMAGE_PATH;

function googleAnalyticsTag() {
  return `<!-- Google tag (gtag.js) — JurisMind (Stream ID: 16109126475, https://droit-des-affaires-dqt.pages.dev) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
</script>`;
}

/* ---------- tiny helpers ---------- */
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (str, vars) => String(str).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : m));
const icon = (name, cls = "") =>
  ICONS[name]
    ? `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`
    : "";

/* icon paths are shared with assets/js/app.js (kept in sync by hand) */
const ICONS = {
  grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  route: '<circle cx="6" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.6 6h5.4a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h5.4"/>',
  bolt: '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>',
  books: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M9 3v15"/>',
  sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  scroll: '<path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 0 3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3.2 3.2 0 0 1 0 6"/><path d="M17.5 14.5A6 6 0 0 1 21 20"/>',
  shield: '<path d="M12 3l7 3v6c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  building: '<path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15"/><path d="M14 21V11h4a2 2 0 0 1 2 2v8"/><path d="M7 8h4M7 12h4M7 16h4M17 15h1"/>',
  landmark: '<path d="M3 21h18M4 21V10M20 21V10M8 21v-8M12 21v-8M16 21v-8M2 10 12 3l10 7z"/>',
  gavel: '<path d="m14 3 7 7-3 3-7-7z"/><path d="M11.5 5.5 6 11l3 3 5.5-5.5z"/><path d="M13 13 4 22M3 21h5"/>',
  home: '<path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
  flame: '<path d="M12 22c3.9 0 6-2.4 6-5.6 0-3.6-3.4-5.3-3.9-9.4-2.3 1.2-3.4 3-3.4 4.8-1-.4-1.6-1.2-1.9-2.3C7.2 11 6 12.9 6 16.4 6 19.6 8.1 22 12 22z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  repeat: '<path d="M4 10a7 7 0 0 1 12-4.5L19 8"/><path d="M19 5v4h-4"/><path d="M20 14a7 7 0 0 1-12 4.5L5 16"/><path d="M5 19v-4h4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  crown: '<path d="m3 8 4 3 5-6 5 6 4-3-2 11H5z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z"/>',
  check: '<path d="m4 13 5 5L20 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3c2.4 3 2.4 15 0 18M12 3c-2.4 3-2.4 15 0 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  brain: '<path d="M12 5.5A3 3 0 0 0 6.4 7 3 3 0 0 0 5 12.4 3 3 0 0 0 7 18a3 3 0 0 0 5 1.6z"/><path d="M12 5.5A3 3 0 0 1 17.6 7 3 3 0 0 1 19 12.4 3 3 0 0 1 17 18a3 3 0 0 1-5 1.6z"/>',
  trend: '<path d="M4 17l5-5 3.5 3.5L20 8"/><path d="M15 8h5v5"/>',
  alert: '<path d="M12 4l8.5 15H3.5z"/><path d="M12 10v4M12 17h.01"/>',
  refresh: '<path d="M4 11a8 8 0 0 1 13.5-4.5L20 9"/><path d="M20 5v4h-4"/><path d="M20 13a8 8 0 0 1-13.5 4.5L4 15"/><path d="M4 19v-4h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  book: '<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v18H7.5A2.5 2.5 0 0 0 5 22z"/>',
  scale: '<path d="M12 3v18M7 21h10"/><path d="m12 5-6 2 3 6 3-6zM12 5l6 2-3 6-3-6z"/>',
  arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  send: '<path d="m4 12 16-8-6 16-3-6z"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>'
};

/* ---------- languages: flags (inline SVG: crisp on every OS) ---------- */
const FLAGS = {
  /* Union Jack, simplified for a 20x13 badge */
  en: `<rect width="24" height="16" fill="#012169"/>
    <path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="3.4"/>
    <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" stroke-width="1.7"/>
    <path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5.2"/>
    <path d="M12 0v16M0 8h24" stroke="#C8102E" stroke-width="3"/>`,
  fr: `<rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ED2939"/>`,
  /* Morocco: red field, green pentagram — the legal context of the content */
  ar: `<rect width="24" height="16" fill="#C1272D"/>
    <path d="M12 3.4 14.7 11.72 7.63 6.58 16.37 6.58 9.3 11.72Z" fill="none" stroke="#006233" stroke-width="0.95" stroke-linejoin="round"/>`
};
const flag = (code, cls = "flag") =>
  `<svg class="${cls}" viewBox="0 0 24 16" aria-hidden="true" focusable="false">${FLAGS[code] || ""}</svg>`;

/* the landing burger toggles this panel (see pages.landing) */
const MOBILE_NAV = (L, ctx) =>
  `<div class="mobile-nav" id="mobile-nav">${L.nav.landing
    .map((n) => `<a href="${navHref(n, ctx)}">${esc(n.label)}</a>`)
    .join("")}<a href="${ctx.href("about.html")}">${esc(L.seo.nav.about)}</a><a href="${ctx.href("contact.html")}">${esc(
    L.seo.nav.contact
  )}</a><a href="${ctx.href("dashboard.html")}" class="btn btn-lime btn-block" style="margin:14px 22px;width:auto">${esc(
    L.ctas.openDashboard
  )}</a></div>`;

/* ---------- link helpers ---------- */
function makeCtx(L, pageFile) {
  const inRoot = L.code === "en";
  const up = inRoot ? "" : "../";
  const self = inRoot ? "" : "";
  const file = (p) => up + p;
  const langFile = (code) => {
    if (code === "en") return up + pageFile;
    return pageFile && L.code === "en" ? `${code}/${pageFile}` : `../${code}/${pageFile}`;
  };
  return {
    up,
    self,
    inRoot,
    pageFile,
    href: (p) => up + p,
    langHref: (code) => langFile(code),
    asset: (p) => up + "assets/" + p
  };
}

/* ---------- shared SEO / provenance helpers ---------- */
function navHref(n, ctx) {
  return n.href.startsWith("#") ? n.href : ctx.href(n.href);
}

function linkMarkup(link, ctx) {
  const external = /^(https?:|mailto:)/.test(link.href);
  const href = external ? link.href : ctx.href(link.href);
  return `<a href="${esc(href)}"${external ? ' rel="noopener"' : ""}>${esc(link.label)}</a>`;
}

function byline(L, ctx, cls = "byline") {
  const S = L.seo;
  return `<p class="${cls}">
    <span>${esc(S.byLabel)} <a rel="author" href="${ctx.href("about.html")}">${esc(S.author)}</a></span>
    <span aria-hidden="true">·</span>
    <span>${esc(S.publishedLabel)} <time datetime="${SITE_PUBLISHED}">${esc(S.publishedDisplay)}</time></span>
    <span aria-hidden="true">·</span>
    <span>${esc(S.updatedLabel)} <time datetime="${SITE_MODIFIED}">${esc(S.updatedDisplay)}</time></span>
  </p>`;
}

function pageTitle(L, page) {
  if (page === "index") return L.meta.title;
  if (L.seo.pages[page]) return `${L.seo.pages[page].title} — JurisMind`;
  const app = {
    dashboard: L.dash.kicker,
    path: L.path.kicker,
    practice: L.practice.h1,
    subjects: L.subjectsPage.kicker,
    tutor: L.tutor.kicker
  };
  return `${app[page]} — JurisMind`;
}

function pageDescription(L, page) {
  return (L.seo.pages[page] && L.seo.pages[page].description) || L.meta.description;
}

/* One connected JSON-LD graph per page: entity, site, author, image, dates,
   typed content and breadcrumbs. Everything here is also visible in the HTML. */
function structuredData(L, page, title, description, canonical) {
  const orgId = `${SITE_URL}/#organization`;
  const editorialId = `${SITE_URL}/#editorial-team`;
  const siteId = `${SITE_URL}/#website`;
  const imageId = `${SITE_URL}/#og-image`;
  const logoId = `${SITE_URL}/#logo`;
  const webPageId = `${canonical}#webpage`;
  const pageType = page === "about" ? "AboutPage" : page === "contact" ? "ContactPage" : "WebPage";

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: "JurisMind",
      url: `${SITE_URL}/`,
      description: en.meta.description,
      logo: { "@id": logoId },
      image: { "@id": imageId },
      sameAs: [REPO_URL],
      knowsAbout: [
        "Legal education",
        "Retrieval practice",
        "Distributed practice",
        "Contract law",
        "Commercial law",
        "Labour law"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "editorial and product feedback",
          url: canonicalUrl("en", "contact", SITE_URL),
          availableLanguage: LANG_CODES
        },
        {
          "@type": "ContactPoint",
          contactType: "security",
          email: SECURITY_EMAIL,
          url: SECURITY_ADVISORY_URL,
          availableLanguage: LANG_CODES
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": editorialId,
      name: L.seo.author,
      url: canonicalUrl(L.code, "about", SITE_URL),
      parentOrganization: { "@id": orgId }
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: `${SITE_URL}/`,
      name: "JurisMind",
      description: en.meta.description,
      publisher: { "@id": orgId },
      inLanguage: LANG_CODES
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: OG_IMAGE,
      contentUrl: OG_IMAGE,
      width: 1200,
      height: 630,
      caption: L.seo.ogAlt
    },
    {
      "@type": "ImageObject",
      "@id": logoId,
      url: LOGO_IMAGE,
      contentUrl: LOGO_IMAGE,
      width: 512,
      height: 512,
      caption: "JurisMind mark"
    },
    {
      "@type": pageType,
      "@id": webPageId,
      url: canonical,
      name: title,
      description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      primaryImageOfPage: { "@id": imageId },
      inLanguage: L.htmlLang,
      author: { "@id": editorialId },
      creator: { "@id": editorialId },
      publisher: { "@id": orgId },
      datePublished: SITE_PUBLISHED,
      dateModified: SITE_MODIFIED
    }
  ];

  if (page === "index") {
    graph[5].mainEntity = { "@id": `${canonical}#learning-resource` };
    graph.push(
      {
        "@type": "Article",
        "@id": `${canonical}#evidence-article`,
        isPartOf: { "@id": webPageId },
        mainEntityOfPage: { "@id": webPageId },
        headline: L.seo.evidence.title,
        description: L.seo.evidence.lede,
        articleSection: "Evidence-based learning",
        inLanguage: L.htmlLang,
        author: { "@id": editorialId },
        publisher: { "@id": orgId },
        datePublished: SITE_PUBLISHED,
        dateModified: SITE_MODIFIED,
        citation: SOURCES.map((s) => ({
          "@type": "ScholarlyArticle",
          "@id": s.doi,
          headline: s.title,
          author: s.authors,
          datePublished: s.year,
          url: s.url,
          sameAs: s.doi
        })),
        about: [
          { "@type": "Thing", name: "Retrieval practice" },
          { "@type": "Thing", name: "Distributed practice" },
          { "@type": "Thing", name: "Legal education" }
        ]
      },
      {
        "@type": "LearningResource",
        "@id": `${canonical}#learning-resource`,
        name: "JurisMind adaptive law revision",
        description: L.meta.description,
        url: canonical,
        inLanguage: LANG_CODES,
        isAccessibleForFree: true,
        learningResourceType: "Adaptive case questions and spaced review",
        educationalLevel: "Undergraduate legal education",
        teaches: L.subjects.slice(0, 8).map((s) => s.name),
        author: { "@id": editorialId },
        publisher: { "@id": orgId },
        datePublished: SITE_PUBLISHED,
        dateModified: SITE_MODIFIED
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq-page`,
        name: L.landing.faq.title,
        url: `${canonical}#faq`,
        isPartOf: { "@id": webPageId },
        inLanguage: L.htmlLang,
        mainEntity: L.landing.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    );
  } else {
    graph[5].breadcrumb = { "@id": `${canonical}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "JurisMind", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: title, item: canonical }
      ]
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

/* ---------- head ---------- */
function head(L, ctx, page) {
  const title = pageTitle(L, page);
  const description = pageDescription(L, page);
  const canonical = canonicalUrl(L.code, page, SITE_URL);
  const locale = LOCALES[L.code];
  const ogType = page === "index" ? "article" : "website";
  const favicon =
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#191923"/><path d="M11 8v11c0 3 2 5 5 5s5-2 5-5" stroke="#C6FF4D" stroke-width="3.4" fill="none" stroke-linecap="round"/></svg>`
    );
  const alternates = LANG_CODES.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${canonicalUrl(code, page, SITE_URL)}">`
  ).join("\n");
  const localeAlternates = LANG_CODES.filter((code) => code !== L.code)
    .map((code) => `<meta property="og:locale:alternate" content="${LOCALES[code]}">`)
    .join("\n");

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${googleAnalyticsTag()}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(L.seo.author)}">
<meta name="date" content="${SITE_MODIFIED}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#191923">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="google-site-verification" content="googledb2edb8cbf9baa93">
<link rel="canonical" href="${canonical}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<link rel="alternate" type="text/markdown" title="llms.txt" href="${SITE_URL}/llms.txt">
<link rel="sitemap" type="application/xml" title="JurisMind sitemap" href="${SITE_URL}/sitemap.xml">
<link rel="author" href="${canonicalUrl(L.code, "about", SITE_URL)}">
<link rel="me" href="${REPO_URL}">
${langGuard(L)}
${structuredData(L, page, title, description, canonical)}
<meta property="og:site_name" content="JurisMind">
<meta property="og:locale" content="${locale}">
${localeAlternates}
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:secure_url" content="${OG_IMAGE}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(L.seo.ogAlt)}">
<meta property="article:published_time" content="${SITE_PUBLISHED}">
<meta property="article:modified_time" content="${SITE_MODIFIED}">
<meta property="article:author" content="${canonicalUrl(L.code, "about", SITE_URL)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:url" content="${canonical}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="twitter:image:alt" content="${esc(L.seo.ogAlt)}">
<link rel="icon" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${ctx.asset("css/jurismind.css")}?v=${VER["assets/css/jurismind.css"]}" integrity="${SRI["assets/css/jurismind.css"]}">`;
}

/* ---------- shared chrome ---------- */
/* single-button language picker: a native <details> disclosure, so the list of
   languages opens even with JavaScript disabled or a stale script in cache */
function langPicker(L, ctx, all, tone = "dark") {
  const id = `langmenu-${tone}-${L.code}-${ctx.pageFile.replace(/\W+/g, "")}`;
  return `<details class="langpick${tone === "dark" ? " langpick-dark" : ""}" data-langpick>
  <summary class="lang-btn" title="${esc(L.ctas.switchLanguage)} · اللغة · Langue"
           aria-label="${esc(L.ctas.switchLanguage)}: ${esc(L.native)}" aria-controls="${id}">
    ${flag(L.code)}
    <span class="lang-code">${L.code.toUpperCase()}</span>
    <span class="chev">${icon("chevron")}</span>
  </summary>
  <ul class="lang-menu" id="${id}" role="menu">
    ${all
      .map(
        (X) => `<li role="none"><a role="menuitemradio" href="${ctx.langHref(X.code)}?lang=${X.code}"
        hreflang="${X.code}" lang="${X.code}" data-lang-option="${X.code}" aria-checked="${X.code === L.code}">
        ${flag(X.code)}
        <span class="lang-name">${esc(X.native)}<span class="lh">${X.code.toUpperCase()} · ${X.dir.toUpperCase()}</span></span>
        <span class="tick">${icon("check")}</span>
      </a></li>`
      )
      .join("")}
  </ul>
</details>`;
}

/* runs before the body paints: keeps the language the visitor picked on every page */
function langGuard(L) {
  return `<script data-lang-guard>
(function () {
  try {
    var CODES = ["en", "fr", "ar"], HERE = "${L.code}";
    var raw = location.search;
    if (raw.charAt(0) === "?") raw = raw.slice(1);
    var parts = raw ? raw.split("&") : [];
    var keep = [], asked = null, i, kv;
    for (i = 0; i < parts.length; i++) {
      kv = parts[i].split("=");
      if (kv[0] === "lang") asked = decodeURIComponent(kv[1] || "").toLowerCase();
      else if (parts[i]) keep.push(parts[i]);
    }
    var stored = null;
    try { stored = localStorage.getItem("jurismind.lang"); } catch (e) {}
    var want = asked && CODES.indexOf(asked) > -1 ? asked : stored;
    if (asked && CODES.indexOf(asked) > -1) { try { localStorage.setItem("jurismind.lang", asked); } catch (e) {} }
    if (!want || CODES.indexOf(want) < 0 || want === HERE) return;
    /* relative target: works on a server, in a sub-folder and on file:// */
    var seg = location.pathname.split("/");
    var file = seg.pop() || "index.html";
    var cur = seg[seg.length - 1];
    var inSub = cur === "fr" || cur === "ar";
    var up = inSub ? "../" : "";
    var target = up + (want === "en" ? "" : want + "/") + file +
      (keep.length ? "?" + keep.join("&") : "") + location.hash;
    location.replace(target);
  } catch (e) {}
})();
</script>`;
}

function landingHeader(L, ctx, all) {
  return `<header class="site-head">
  <div class="container bar">
    <a class="brand" href="${ctx.href("index.html")}">
      <span class="brand-mark">${icon("scale")}</span> JurisMind
    </a>
    <nav class="site-nav" aria-label="${esc(L.brand.tagline)}">
      ${L.nav.landing.map((n) => `<a href="${navHref(n, ctx)}">${esc(n.label)}</a>`).join("")}
    </nav>
    <div class="head-actions">
      ${langPicker(L, ctx, all, "light")}
      <a class="btn btn-ghost btn-sm hide-sm" href="${ctx.href("tutor.html")}">${esc(L.ctas.askTutor)}</a>
      <a class="btn btn-lime btn-sm hide-xs" href="${ctx.href("dashboard.html")}">${esc(L.ctas.openDashboard)}</a>
      <button class="burger" data-burger-nav aria-label="Menu">${icon("menu")}</button>
    </div>
  </div>
  ${MOBILE_NAV(L, ctx)}
</header>`;
}

function sidebar(L, ctx, page) {
  const active = page;
  return `<aside class="sidebar" id="sidebar">
  <a class="brand" href="${ctx.href("index.html")}"><span class="brand-mark">${icon("scale")}</span> JurisMind</a>
  <nav class="side-nav">
    <span class="side-lab">${esc(L.brand.tagline)}</span>
    ${L.nav.app
      .map((n) => {
        const key = n.href.replace(".html", "");
        const on = key === active || (active === "index" && key === "dashboard");
        return `<a class="nav-item${on ? " active" : ""}" href="${ctx.href(n.href)}">${icon(n.icon)}<span>${esc(n.label)}</span>${
          n.href === "practice.html" ? '<span class="nav-badge" data-due-count-badge></span>' : ""
        }</a>`;
      })
      .join("")}
  </nav>
  <div class="side-foot">
    <div class="side-card">
      <div class="row-flex" style="justify-content:space-between">
        <div>
          <div class="tiny" style="color:rgba(247,247,242,.6)">${esc(L.dash.streak)}</div>
          <div class="streak-num"><span data-streak>0</span> <span class="tiny" style="font-size:.8rem;color:rgba(247,247,242,.6)">${esc(
            L.dash.streakSub
          )}</span></div>
        </div>
        <span style="width:26px;height:26px;color:var(--coral)">${icon("flame")}</span>
      </div>
    </div>
    <a class="user-chip" href="${ctx.href("tutor.html")}">
      <span class="avatar" data-user-initial>J</span>
      <span class="grow">
        <span class="small" style="display:block" data-user-name>${esc(L.auth.guest)}</span>
        <span class="tiny" style="color:rgba(247,247,242,.55)">${esc(L.dash.level)} <span data-level>0</span> · <span data-xp>0</span> ${esc(
          L.ui.xp
        )}</span>
      </span>
    </a>
    <button class="btn btn-ghost btn-sm btn-block" style="--btn-fg:rgba(247,247,242,.75);border-color:rgba(255,255,255,.15)" data-reset>
      ${esc(L.dash.reset)}
    </button>
  </div>
</aside>`;
}

function tabbar(L, ctx, page) {
  return `<nav class="tabbar" aria-label="${esc(L.brand.tagline)}">${L.nav.appShort
    .map((n) => {
      const key = n.href.replace(".html", "");
      return `<a class="${key === page ? "active" : ""}" href="${ctx.href(n.href)}">${icon(n.icon)}<span>${esc(n.label)}</span></a>`;
    })
    .join("")}</nav>`;
}

function topbar(L, ctx, page, title) {
  return `<div class="topbar">
  <button class="burger" data-burger aria-label="Menu">${icon("menu")}</button>
  <div class="crumb grow"><span>JurisMind</span><span>·</span><strong>${esc(title)}</strong></div>
  <span class="pill pill-dark hide-sm">${esc(L.dash.level)} <b data-level>0</b></span>
  <span class="xp-chip hide-sm">${icon("bolt")} <span data-xp>0</span> ${esc(L.ui.xp)}</span>
  ${langPicker(L, ctx, LANGS, "light")}
  <a class="btn btn-lime btn-sm hide-xs" href="${ctx.href("practice.html")}">${esc(L.ctas.practiceNow)}</a>
</div>`;
}

function footer(L, ctx) {
  return `<footer class="site-foot">
  <div class="container">
    <div class="foot-grid">
      <div>
        <a class="brand" href="${ctx.href("index.html")}" style="color:var(--off)"><span class="brand-mark">${icon(
          "scale"
        )}</span> JurisMind</a>
        <p class="small" style="max-width:32ch;margin-top:14px;color:rgba(247,247,242,.66)">${esc(L.footer.blurb)}</p>
        <p class="tiny" style="color:rgba(247,247,242,.45)">${esc(L.footer.disclaimer)}</p>
      </div>
      ${L.footer.columns
        .map(
          (c) => `<div>
        <h2 class="foot-title">${esc(c.t)}</h2>
        <div class="foot-links">${c.links.map((l) => `<a href="${ctx.href(l.href)}">${esc(l.label)}</a>`).join("")}</div>
      </div>`
        )
        .join("")}
    </div>
    <div class="foot-provenance">
      ${byline(L, ctx, "site-provenance")}
      <p class="tiny">${esc(L.seo.bylineNote)}</p>
    </div>
    <div class="foot-bottom">
      <span>${esc(L.footer.rights)}</span>
      <span class="pill pill-outline tiny" style="border-color:rgba(101,214,176,.35);color:var(--mint);gap:6px" title="AES-256-GCM + PBKDF2-SHA256 + SHA-384 SRI">${icon("shield")} AES-256-GCM · SHA-384 SRI</span>
      <nav class="foot-legal" aria-label="${esc(L.seo.nav.about)} · ${esc(L.seo.nav.contact)}">${L.footer.legal
        .map((l) => `<a href="${ctx.href(l.href)}">${esc(l.label)}</a>`)
        .join("")}</nav>
      ${langPicker(L, ctx, LANGS, "dark")}
    </div>
  </div>
</footer>`;
}

/* ---------- content builders: landing ---------- */
function decayChart(L) {
  const W = 560, H = 220, PAD = 34;
  const x = (i) => PAD + (i / 10) * (W - PAD * 2);
  const y = (v) => H - PAD - v * (H - PAD * 2);
  /* without review: single exponential decay */
  let forget = "";
  for (let i = 0; i <= 10; i++) forget += `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(Math.exp(-i / 3.2) * 0.95).toFixed(1)} `;
  /* with reviews at i = 2, 5, 8: sawtooth back to ~1 */
  let keep = "";
  const bumps = [2, 5, 8];
  let level = 1;
  for (let i = 0; i <= 10; i++) {
    if (bumps.includes(i) && i > 0) level = 1;
    else level = Math.max(0.55, level - 0.16);
    keep += `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(level * 0.95).toFixed(1)} `;
  }
  const marks = bumps
    .map(
      (i, n) => `<line x1="${x(i)}" y1="${PAD - 6}" x2="${x(i)}" y2="${H - PAD}" stroke="rgba(25,25,35,.16)" stroke-dasharray="3 4"/>
  <text x="${x(i)}" y="${PAD - 12}" text-anchor="middle" font-size="11" fill="#777785" font-family="Inter, sans-serif">R${n + 1}</text>`
    )
    .join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(L.landing.retention.chartCaption)}" style="width:100%;height:auto">
  <line x1="${PAD}" y1="${H - PAD}" x2="${W - PAD}" y2="${H - PAD}" stroke="rgba(25,25,35,.14)"/>
  <line x1="${PAD}" y1="${PAD - 14}" x2="${PAD}" y2="${H - PAD}" stroke="rgba(25,25,35,.14)"/>
  ${marks}
  <path d="${forget}" fill="none" stroke="#FF8B70" stroke-width="3" stroke-linecap="round"/>
  <path d="${keep}" fill="none" stroke="#65D6B0" stroke-width="3" stroke-linecap="round"/>
  <text x="${x(0)}" y="${H - 12}" font-size="11" fill="#777785" font-family="Inter, sans-serif">${esc(
    L.landing.retention.chartNow
  )}</text>
</svg>`;
}

function landingPage(L, ctx, all) {
  const H = L.landing;
  const subjCards = L.subjects
    .slice(0, 8)
    .map(
      (s) => `<article class="subj-card reveal" data-accent="${s.accent}">
      <div class="subj-icon">${icon(s.icon)}</div>
      <h3>${esc(s.name)}</h3>
      <p class="subj-blurb">${esc(s.blurb)}</p>
      <div class="subj-meta">
        <span class="pill pill-outline">${
          L.questions.some((q) => q.subject === s.id) ? `${L.questions.filter((q) => q.subject === s.id).length} × ${esc(H.subjects.available)}` : esc(H.subjects.soon)
        }</span>
        <a class="link-arrow small" href="${ctx.href("subjects.html#" + s.id)}">${esc(L.subjectsPage.openPath)}</a>
      </div>
    </article>`
    )
    .join("");

  return `
<section class="hero">
  <div class="hero-bg"></div>
  <div class="container hero-grid">
    <div>
      <p class="kicker kicker-lime">${esc(H.eyebrow)}</p>
      <h1>${esc(H.h1)}</h1>
      <p class="hero-lede">${esc(H.lede)}</p>
      ${byline(L, ctx)}
      <p class="byline-note tiny">${esc(L.seo.bylineNote)}</p>
      <div class="hero-cta">
        <a class="btn btn-lime btn-lg" href="${ctx.href("dashboard.html")}">${icon("bolt")} ${esc(L.ctas.start)}</a>
        <a class="btn btn-ghost btn-lg" href="${ctx.href("dashboard.html")}">${esc(L.ctas.demo)}</a>
      </div>
      <div class="hero-note">
        <span>${icon("check")} ${esc(H.finalCta.note)}</span>
        <span>${icon("globe")} ${esc(L.subjects.length + " " + L.subjectsPage.topics)}</span>
      </div>
    </div>
    <div class="hero-card reveal" id="hero-card">
      <p class="kicker" style="color:var(--lavender);margin-bottom:2px">${esc(H.heroCard.kicker)}</p>
      <div class="hc-title">${esc(H.heroCard.title)}</div>
      <p class="muted small mb-0">${esc(H.heroCard.sub)}</p>
      <div class="hero-tiles">
        <div class="htile htile-lime">
          <div class="htile-lab">${esc(H.heroCard.nextFocus)}</div>
          <div class="htile-val" style="font-size:1.9rem">
            <span data-metric="weakest">0</span><span style="font-size:1rem">%</span>
          </div>
          <div class="tiny" style="color:rgba(28,36,8,.72)">${esc(H.heroCard.recommended)}</div>
          <div class="meter meter-thin" style="margin-top:10px;background:rgba(28,36,8,.14)"><i data-meter-fill="0" style="background:#191923;width:0"></i></div>
        </div>
        <div style="display:grid;gap:12px">
          <div class="htile">
            <div class="htile-lab">${esc(H.heroCard.weakSpots)}</div>
            <div class="htile-val">${esc(L.dash.level)} <span data-level>0</span> · <span data-xp>0</span> ${esc(L.ui.xp)}</div>
          </div>
          <div class="htile htile-lav">
            <div class="htile-lab">${esc(H.heroCard.daily)}</div>
            <div class="htile-val">${esc(H.heroCard.dailyValue)}</div>
          </div>
        </div>
      </div>
      <p class="hero-caption">${esc(H.heroCard.caption)}</p>
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true">
  <div class="ticker-track">
    ${[0, 1]
      .map(() => H.ticker.map((t) => `<span>${esc(t)}</span>`).join(""))
      .join("")}
  </div>
</div>

<section class="section" id="retention">
  <div class="container grid g-2" style="align-items:center;gap:44px">
    <div class="reveal">
      <p class="kicker kicker-coral">${esc(H.retention.kicker)}</p>
      <h2>${esc(H.retention.title)}</h2>
      <p class="muted">${esc(H.retention.lede)}</p>
      <ul class="blist mt-3">
        ${H.retention.bullets
          .map(
            (b, i) => `<li class="bitem">
          <span class="bicon ${["bicon-lime", "bicon-mint", "bicon-coral"][i] || ""}">${icon(
              ["brain", "repeat", "alert"][i] || "check"
            )}</span>
          <div><h3>${esc(b.t)}</h3><p class="small muted mb-0">${esc(b.d)}</p></div>
        </li>`
          )
          .join("")}
      </ul>
    </div>
    <div class="card chart-card reveal">
      <div class="between mb-2">
        <div class="card-title">${esc(H.retention.chartCaption)}</div>
        <span class="pill pill-mint">${icon("trend")} 1 → 3 → 7 → 14 → 30d</span>
      </div>
      ${decayChart(L)}
      <div class="chart-legend mt-2">
        <span><i class="l-forget"></i>${esc(H.retention.chartLegendForget)}</span>
        <span><i class="l-keep"></i>${esc(H.retention.chartLegendKeep)}</span>
      </div>
    </div>
  </div>
</section>

<section class="section section-tight grid-bg" id="method">
  <div class="container">
    <div class="sec-head">
      <p class="kicker kicker-lime">${esc(H.method.kicker)}</p>
      <h2>${esc(H.method.title)}</h2>
    </div>
    <div class="steps">
      ${H.method.steps
        .map(
          (s) => `<article class="card reveal">
        <span class="step-num">${esc(s.n)}</span>
        <h3 class="mt-2">${esc(s.t)}</h3>
        <p class="muted small mb-0">${esc(s.d)}</p>
      </article>`
        )
        .join("")}
    </div>
    <div class="card next-card mt-3 reveal" style="padding:26px">
      <div class="between wrap mb-2">
        <div>
          <div class="card-title">${icon("sparkles", "next-ic")} ${esc(H.method.nextLabel)}</div>
          <div class="card-sub">${esc(H.method.nextReason)}</div>
        </div>
        <span class="pill pill-lav">${icon("sparkles")} AI · adaptive</span>
      </div>
      <div id="jm-live-next"></div>
      <div class="hairline"></div>
      <p class="tiny muted mb-2">${esc(H.method.pickSubject)}</p>
      <div class="prompt-chips">
        ${L.subjects
          .filter((s) => L.questions.some((q) => q.subject === s.id))
          .map((s) => `<button class="chip" data-live-subject="${s.id}">${esc(s.name)}</button>`)
          .join("")}
      </div>
    </div>
  </div>
</section>

<section class="section" id="evidence">
  <div class="container">
    <div class="sec-head">
      <p class="kicker kicker-lime">${esc(L.seo.evidence.kicker)}</p>
      <h2>${esc(L.seo.evidence.title)}</h2>
      <p class="muted evidence-lede">${esc(L.seo.evidence.lede)}</p>
    </div>
    <div class="evidence-grid">
      <article class="card reveal">
        <h3>${esc(L.seo.evidence.takeawaysTitle)}</h3>
        <ul class="evidence-list">
          ${L.seo.evidence.takeaways.map((x) => `<li><strong>${esc(x.t)}</strong> ${esc(x.d)}</li>`).join("")}
        </ul>
      </article>
      <aside class="card evidence-quotes reveal" aria-label="${esc(L.seo.evidence.quoteTitle)}">
        <h3>${esc(L.seo.evidence.quoteTitle)}</h3>
        ${SOURCES.filter((s) => s.quote)
          .map(
            (s) => `<figure class="evidence-quote">
          <blockquote cite="${s.url}" lang="en" dir="ltr"><p>“${esc(s.quote)}”</p></blockquote>
          <figcaption>— <cite>${esc(s.short)}</cite> · <a href="${s.url}" rel="noopener">${esc(
              L.seo.evidence.sourceLinkLabel
            )}</a></figcaption>
        </figure>`
          )
          .join("")}
        <p class="tiny muted mb-0">${esc(L.seo.evidence.quoteNote)}</p>
      </aside>
    </div>
    <div class="card geo-table-card mt-3 reveal">
      <h3>${esc(L.seo.evidence.tableTitle)}</h3>
      <div class="geo-table-wrap">
        <table class="geo-table">
          <caption>${esc(L.seo.evidence.tableCaption)}</caption>
          <thead>
            <tr>${L.seo.evidence.tableHeaders.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${L.seo.evidence.tableRows
              .map(
                (row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card reference-card mt-3 reveal">
      <h3>${esc(L.seo.evidence.referencesTitle)}</h3>
      <ol class="reference-list">
        ${SOURCES.map(
          (s, i) => `<li>
          <cite><a href="${s.url}" rel="noopener" lang="en" dir="ltr">${esc(s.title)}</a></cite>
          <span>${esc(s.authors)} (${s.year}). <span lang="en" dir="ltr">${esc(s.journal)}</span>. ${esc(
            L.seo.evidence.sourceNotes[i]
          )} <a href="${s.doi}" rel="noopener">DOI</a></span>
        </li>`
        ).join("")}
      </ol>
      <p class="tiny muted mb-0">${esc(L.seo.evidence.referencesNote)}</p>
    </div>
  </div>
</section>

<section class="section section-tight grid-bg" id="trust">
  <div class="container">
    <div class="sec-head">
      <p class="kicker">${esc(L.seo.identity.kicker)}</p>
      <h2>${esc(L.seo.identity.title)}</h2>
      <p class="muted">${esc(L.seo.identity.lede)}</p>
    </div>
    <div class="card identity-card reveal">
      <h3>${esc(L.seo.identity.contactTitle)}</h3>
      <p class="muted">${esc(L.seo.identity.contactText)}</p>
      <ul class="evidence-list">
        ${L.seo.identity.points.map((x) => `<li>${esc(x)}</li>`).join("")}
      </ul>
      <div class="identity-links">
        <a class="link-arrow" href="${ctx.href("about.html")}">${esc(L.seo.identity.aboutLabel)}</a>
        <a class="link-arrow" href="${ctx.href("contact.html")}">${esc(L.seo.identity.contactLabel)}</a>
        <a class="link-arrow" href="${REPO_URL}" rel="noopener">${esc(L.seo.identity.sourceLabel)}</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="subjects">
  <div class="container">
    <div class="sec-head">
      <p class="kicker">${esc(H.subjects.kicker)}</p>
      <h2>${esc(H.subjects.title)}</h2>
      <p class="muted">${esc(H.subjects.lede)}</p>
    </div>
    <div class="subj-grid">${subjCards}</div>
  </div>
</section>

<section class="section-tight section-dark">
  <div class="container">
    <div class="stats-band">
      ${H.stats.items
        .map(
          (s) => `<div class="stat-band-item reveal">
        <div class="stat"><span class="stat-val" style="color:var(--lime)">${esc(s.v)}</span><span class="stat-lab">${esc(s.l)}</span></div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head">
      <p class="kicker">${esc(H.journey.kicker)}</p>
      <h2>${esc(H.journey.title)}</h2>
    </div>
    <div class="journey">
      ${H.journey.steps.map((s) => `<div class="jstep"><h3>${esc(s.t)}</h3><p class="small muted">${esc(s.d)}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="section section-lav" id="tutor">
  <div class="container">
    <div class="sec-head">
      <p class="kicker kicker-lav">${esc(H.tutor.kicker)}</p>
      <h2>${esc(H.tutor.title)}</h2>
    </div>
    <div class="tutor-preview reveal">
      <div>
        <p class="muted" style="color:rgba(247,247,242,.7)">${esc(H.tutor.lede)}</p>
        <div class="prompt-chips mt-2">
          ${H.tutor.chips
            .map(
              (c) =>
                `<button class="chip" data-prompt="${esc(c)}" style="background:transparent;color:var(--off);border-color:rgba(255,255,255,.22)">${esc(
                  c
                )}</button>`
            )
            .join("")}
        </div>
        <a class="btn btn-lav mt-3" href="${ctx.href("tutor.html")}">${icon("sparkles")} ${esc(L.ctas.askTutor)}</a>
        <p class="tiny mt-2" style="color:rgba(247,247,242,.5)">${esc(H.tutor.disclaimer)}</p>
      </div>
      <div class="chat-mini" id="landing-chat">
        <div class="bubble bubble-me">${esc(H.tutor.chips[0])}</div>
        <div class="bubble bubble-tutor">${esc(L.tutorKB[0].title)} — ${esc(L.tutorKB[0].body.slice(0, 210))}…</div>
      </div>
    </div>
  </div>
</section>

<section class="section section-tight" id="faq">
  <div class="container">
    <div class="sec-head center">
      <p class="kicker">${esc(H.faq.kicker)}</p>
      <h2>${esc(H.faq.title)}</h2>
    </div>
    <div class="faq">
      ${H.faq.items
        .map(
          (f) => `<article class="faq-item"><h3>${esc(f.q)}</h3><p class="faq-body small">${esc(f.a)}</p></article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <div class="cta-band reveal">
      <h2>${esc(H.finalCta.title)}</h2>
      <p class="muted" style="max-width:52ch;margin:0 auto 22px">${esc(H.finalCta.sub)}</p>
      <div class="hero-cta" style="justify-content:center">
        <a class="btn btn-lime btn-lg" href="${ctx.href("dashboard.html")}">${esc(L.ctas.start)}</a>
        <a class="btn btn-ghost btn-lg" style="--btn-fg:var(--off);border-color:rgba(255,255,255,.24)" href="${ctx.href("tutor.html")}">${esc(
          L.ctas.askTutor
        )}</a>
      </div>
      <p class="tiny mt-2" style="color:rgba(247,247,242,.5)">${esc(H.finalCta.note)}</p>
    </div>
  </div>
</section>`;
}

/* ---------- content builders: app pages ---------- */
function dashboardPage(L, ctx) {
  const D = L.dash;
  const withQs = L.subjects.filter((s) => L.questions.some((q) => q.subject === s.id));
  return `
<div class="page-head">
  <p class="kicker kicker-lime">${esc(D.kicker)}</p>
  <h1 data-greeting>${esc(D.h1)}</h1>
  <p class="sub">${esc(D.sub)}</p>
  <div class="page-actions mt-2">
    <a class="btn btn-lime" href="${ctx.href("practice.html")}">${icon("bolt")} ${esc(L.ctas.continue)}</a>
    <a class="btn btn-ghost" href="${ctx.href("path.html")}">${esc(L.ctas.seePath)}</a>
    <span class="pill pill-lav">${icon("sparkles")} ${esc(D.sessionPill)}</span>
  </div>
</div>

<div class="grid g-side">
  <div class="grid" style="gap:var(--gap)">
    <section class="card card-dark">
      <div class="grid g-side" style="align-items:center;gap:26px">
        <div>
          <p class="kicker" style="color:var(--lavender);margin-bottom:6px">${esc(D.nextFocus)}</p>
          <div id="dash-focus"></div>
          <div class="row-flex wrap mt-2" style="gap:10px">
            <span class="pill pill-lime" data-level-pill>${esc(D.level)} 0</span>
            <span class="pill" style="background:rgba(255,255,255,.08);color:var(--off)">${esc(D.streak)} <b data-streak>0</b></span>
            <span class="pill pill-lav"><span data-xp>0</span> ${esc(L.ui.xp)}</span>
          </div>
          <div class="meter meter-thin mt-2" style="background:rgba(255,255,255,.14)"><i data-level-meter style="width:0;background:var(--lime)"></i></div>
          <p class="tiny mt-1" style="color:rgba(247,247,242,.55)" data-next-level>${esc(fmt(D.nextLevel, { n: 500, l: 1 }))}</p>
          <a class="btn btn-lime mt-2" href="${ctx.href("practice.html")}">${esc(D.continueBtn)} ${icon("arrow")}</a>
        </div>
        <div style="text-align:center">
          <div class="ring ring-lg" style="margin:0 auto" data-readiness-ring="150">
            <div class="ring-val" style="color:var(--off)"><span data-readiness-value>0%</span></div>
          </div>
          <div class="ring-lab" style="color:rgba(247,247,242,.6)">${esc(D.readiness)}</div>
        </div>
      </div>
    </section>

    <div class="grid g-3">
      <div class="card"><div class="stat"><span class="stat-lab">${esc(D.weakSpots)}</span><span class="stat-val" data-weak-count>0</span>
        <span class="tiny muted">${esc(D.weakSpotsSub)}</span></div></div>
      <div class="card"><div class="stat"><span class="stat-lab">${esc(D.reviewQueue)}</span><span class="stat-val" data-due-count>0</span>
        <span class="tiny muted">${esc(D.dueToday)}</span></div></div>
      <div class="card"><div class="stat"><span class="stat-lab">${esc(D.streak)}</span><span class="stat-val" data-streak>0</span>
        <span class="tiny muted">${esc(D.best)} <b data-best>0</b></span></div></div>
    </div>

    <section class="card">
      <div class="card-head">
        <div><div class="card-title">${esc(D.reviewQueue)}</div><div class="card-sub">${esc(D.reviewQueueSub)}</div></div>
        <a class="link-arrow small" href="${ctx.href("path.html")}">${esc(L.ctas.reviewNow)}</a>
      </div>
      <div id="queue" class="queue"></div>
    </section>

    <section class="card">
      <div class="card-head">
        <div><div class="card-title">${esc(D.subjectProgress)}</div><div class="card-sub">${esc(D.subjectProgressSub)}</div></div>
        <a class="link-arrow small" href="${ctx.href("subjects.html")}">${esc(L.subjectsPage.kicker)}</a>
      </div>
      <div class="grid" style="gap:10px" id="subject-progress"></div>
    </section>

    <section class="card">
      <div class="card-head">
        <div><div class="card-title">${esc(D.recommendedExercises)}</div><div class="card-sub">${esc(D.recommendedExercisesSub)}</div></div>
        <span class="pill pill-lav">${icon("sparkles")} AI</span>
      </div>
      <div class="grid" style="gap:10px" id="recommendations"></div>
    </section>
  </div>

  <div class="grid" style="gap:var(--gap)">
    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(D.activity)}</div><div class="card-sub">${esc(D.activitySub)}</div></div></div>
      <div class="bars" id="week-bars"></div>
      <div class="bars-lab" id="week-labels"></div>
      <div class="hairline"></div>
      <div class="progress-legend" id="week-legend"></div>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(D.todayPlan)}</div></div>
      <span class="pill pill-outline" data-plan-count>0/3</span></div>
      <div class="grid" style="gap:8px" id="plan"></div>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(D.milestones)}</div><div class="card-sub">${esc(D.milestonesSub)}</div></div></div>
      <div class="grid" style="gap:8px" id="milestones"></div>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(D.badges)}</div><div class="card-sub" data-badges-count></div></div></div>
      <div class="badge-grid" id="badges"></div>
    </section>

    <section class="card card-flat" style="border-style:dashed">
      <div class="row-flex" style="gap:12px">
        <span class="bicon bicon-lav" style="width:36px;height:36px">${icon("brain")}</span>
        <div class="grow">
          <div class="small" style="font-weight:600">${esc(D.examCountdown)}</div>
          <div class="tiny muted">${esc(fmt(D.examIn, { n: 24 }))}</div>
        </div>
        <span class="pill pill-coral">${esc(D.readiness)} <b data-readiness-value>0%</b></span>
      </div>
      <p class="tiny muted mt-2 mb-0">${esc(D.sampleNote)}</p>
      <button class="btn btn-ghost btn-sm mt-2" data-reset>${icon("refresh")} ${esc(D.reset)}</button>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(D.reviewQueue)}</div><div class="card-sub">${esc(D.reviewQueueSub)}</div></div></div>
      <div class="grid g-2" style="gap:10px">
        ${["now", "today", "tomorrow", "later"]
          .map(
            (k) => `<div class="htile" style="background:#fbfbf7;border-color:var(--line-soft);color:var(--midnight)">
          <div class="htile-lab" style="opacity:.6">${esc(D["due" + k[0].toUpperCase() + k.slice(1)])}</div>
          <div class="htile-val"><span class="mono" data-bucket="${k}">0</span></div>
        </div>`
          )
          .join("")}
      </div>
      <p class="tiny muted mt-2 mb-0">${esc(L.landing.retention.chartLegendKeep)} · ${esc(withQs.length + "/" + L.subjects.length)} ${esc(
    L.subjectsPage.available
  )}</p>
    </section>
  </div>
</div>`;
}

function pathPage(L, ctx) {
  const P = L.path;
  const withQs = L.subjects.filter((s) => L.questions.some((q) => q.subject === s.id));
  return `
<div class="page-head">
  <p class="kicker">${esc(P.kicker)}</p>
  <h1>${esc(P.h1)}</h1>
  <p class="sub">${esc(P.sub)}</p>
  <div class="page-actions mt-2">
    <a class="btn btn-lime" href="${ctx.href("practice.html")}">${icon("bolt")} ${esc(L.ctas.practiceNow)}</a>
    <a class="btn btn-ghost" href="${ctx.href("subjects.html")}">${esc(L.nav.app[3].label)}</a>
  </div>
</div>

<div class="grid g-side">
  <div class="grid" style="gap:var(--gap)">
    <section class="card">
      <div class="between wrap" style="gap:14px">
        <div>
          <div class="card-title">${esc(P.progressOnPath)}</div>
          <div class="stat-val mono" data-path-progress>0%</div>
          <p class="tiny muted mb-0" data-path-done></p>
        </div>
        <div class="meter meter-thin" style="min-width:220px;flex:1"><i data-path-meter style="width:0"></i></div>
      </div>
      <div class="hairline"></div>
      <p class="tiny muted mb-2">${esc(P.tabs)}</p>
      <div class="prompt-chips">
        ${withQs
          .map((s, i) => `<button class="chip${i === 0 ? " on" : ""}" data-subj-tab="${s.id}">${icon(s.icon)} ${esc(s.name)}</button>`)
          .join("")}
      </div>
    </section>

    <div id="path-stages" class="grid" style="gap:18px"></div>
  </div>

  <div class="grid" style="gap:var(--gap)">
    <section class="card card-dark">
      <div class="between">
        <div>
          <div class="card-title" style="color:var(--off)">${esc(P.readinessScore)}</div>
          <p class="tiny mb-0" style="color:rgba(247,247,242,.6)">${esc(P.readinessSub)}</p>
        </div>
        <div class="ring" data-readiness-ring="118"><div class="ring-val" style="color:var(--off)"><span data-readiness-value>0%</span></div></div>
      </div>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(P.atRisk)}</div><div class="card-sub">${esc(P.atRiskSub)}</div></div></div>
      <div class="grid" style="gap:8px" id="risk-list"></div>
    </section>

    <section class="card">
      <div class="card-head"><div><div class="card-title">${esc(P.upcoming)}</div><div class="card-sub">${esc(P.upcomingSub)}</div></div></div>
      <div class="grid g-2" style="gap:10px">
        ${[0, 1, 2, 3]
          .map((d) => `<div class="htile" style="background:#fbfbf7;border-color:var(--line-soft);color:var(--midnight)" data-upcoming-day="${d}"></div>`)
          .join("")}
      </div>
    </section>

    <section class="card">
      <div class="card-title mb-2">${esc(L.subjectsPage.mastery)}</div>
      <div id="path-subject-bars"></div>
    </section>
  </div>
</div>`;
}

function practicePage(L, ctx) {
  const P = L.practice;
  return `
<div class="page-head">
  <div class="between wrap">
    <div>
      <p class="kicker kicker-lime">${esc(P.kicker)}</p>
      <h1>${esc(P.h1)}</h1>
      <p class="sub">${esc(P.sub)}</p>
    </div>
    <div class="row-flex" style="gap:10px">
      <span class="pill pill-outline">${icon("clock")} ${esc(P.timerLabel)}: <b class="mono" data-timer>0:00</b></span>
      <a class="btn btn-ghost btn-sm" href="${ctx.href("dashboard.html")}">${esc(P.backToDashboard)}</a>
    </div>
  </div>
</div>

<div id="setup" class="grid" style="gap:var(--gap);max-width:900px"></div>
<div id="session" class="hide"></div>

<noscript>
  <div class="empty"><h2 class="noscript-title">JurisMind</h2><p class="muted">${esc(P.sub)}</p><p class="small">${esc(L.tutor.disclaimer)}</p></div>
</noscript>`;
}

function subjectsPage(L, ctx) {
  const S = L.subjectsPage;
  return `
<div class="page-head">
  <p class="kicker">${esc(S.kicker)}</p>
  <h1>${esc(S.h1)}</h1>
  <p class="sub">${esc(S.sub)}</p>
  <div class="page-actions mt-2">
    <a class="btn btn-lime" href="${ctx.href("practice.html")}">${icon("bolt")} ${esc(L.ctas.practiceNow)}</a>
    <a class="btn btn-ghost" href="${ctx.href("path.html")}">${esc(L.ctas.seePath)}</a>
    <span class="pill pill-outline">${esc(fmt(S.exercises, { n: L.questions.length }))}</span>
  </div>
</div>
<div class="subj-lib" id="subject-lib"></div>`;
}

function tutorPage(L, ctx) {
  const T = L.tutor;
  const weakNames = L.subjects
    .filter((s) => L.questions.some((q) => q.subject === s.id))
    .slice(0, 3)
    .map((s) => s.name);
  return `
<div class="page-head">
  <p class="kicker kicker-lav">${esc(T.kicker)}</p>
  <h1>${esc(T.h1)}</h1>
  <p class="sub">${esc(T.sub)}</p>
</div>

<div class="tutor-wrap">
  <section class="card chat">
    <div class="card-head">
      <div class="row-flex" style="gap:12px">
        <span class="bicon bicon-lav">${icon("sparkles")}</span>
        <div>
          <div class="card-title">${esc(T.tutor)}</div>
          <div class="card-sub">${esc(L.brand.tagline)}</div>
        </div>
      </div>
      <div class="row-flex" style="gap:8px">
        <div class="mode-switch" role="group" aria-label="${esc(T.modeTitle)}">
          <button class="on" data-mode="simple">${esc(T.modeSimple)}</button>
          <button data-mode="exam">${esc(T.modeExam)}</button>
          <button data-mode="case">${esc(T.modeCase)}</button>
        </div>
        <button class="btn btn-ghost btn-sm" data-newchat>${icon("refresh")}</button>
      </div>
    </div>
    <div class="prompt-chips">
      ${L.landing.tutor.chips
        .map((c) => `<button class="chip" data-prompt="${esc(c)}">${esc(c)}</button>`)
        .join("")}
    </div>
    <div class="chat-scroll" id="chat" aria-live="polite"></div>
    <form class="composer" id="composer">
      <textarea id="tutor-input" rows="1" placeholder="${esc(T.placeholder)}" aria-label="${esc(T.placeholder)}"></textarea>
      <button class="btn btn-lime" type="submit">${icon("send")} <span class="hide-sm">${esc(T.send)}</span></button>
    </form>
    <p class="tiny muted mt-2 mb-0">${esc(T.disclaimer)}</p>
  </section>

  <aside class="grid" style="gap:var(--gap)">
    <section class="card" id="tutor-context"></section>
    <section class="card">
      <div class="card-title mb-1">${esc(T.promptsTitle)}</div>
      <div class="card-sub mb-2">${esc(T.promptsSub)}</div>
      <div class="grid" style="gap:8px">
        ${weakNames
          .map(
            (n) => `<div class="queue-item"><span class="qi-dot" style="background:var(--coral)"></span>
        <div class="grow"><div class="small" style="font-weight:600">${esc(n)}</div>
        <div class="tiny muted">${esc(T.suggestQ)}</div></div>
        <button class="btn btn-sm btn-ghost" data-ask="${esc(n)}">${esc(T.askTutorLabel || L.ctas.askTutor)}</button></div>`
          )
          .join("")}
      </div>
    </section>
    <section class="card card-flat" style="border-style:dashed">
      <div class="card-title mb-1">${esc(T.sourcesTitle)}</div>
      <div class="row-flex wrap" style="gap:8px">
        ${L.tutorKB
          .slice(0, 4)
          .map((k) => `<span class="pill pill-outline tiny">${esc(k.sources[0])}</span>`)
          .join("")}
      </div>
      <p class="tiny muted mt-2 mb-0">${esc(T.disclaimer)}</p>
    </section>
  </aside>
</div>`;
}

/* ---------- editorial / trust pages ---------- */
function infoHeader(L, ctx, all, page) {
  const N = L.seo.nav;
  const current = (target) => (page === target ? ' aria-current="page"' : "");
  return `<header class="site-head info-head">
  <div class="container bar">
    <a class="brand" href="${ctx.href("index.html")}">
      <span class="brand-mark">${icon("scale")}</span> JurisMind
    </a>
    <nav class="site-nav info-nav" aria-label="${esc(N.about)} · ${esc(N.contact)}">
      <a href="${ctx.href("index.html")}">${esc(N.home)}</a>
      <a href="${ctx.href("about.html")}"${current("about")}>${esc(N.about)}</a>
      <a href="${ctx.href("contact.html")}"${current("contact")}>${esc(N.contact)}</a>
      <a href="${ctx.href("index.html#evidence")}">${esc(N.evidence)}</a>
    </nav>
    <div class="head-actions">
      ${langPicker(L, ctx, all, "light")}
      <a class="btn btn-lime btn-sm hide-xs" href="${ctx.href("dashboard.html")}">${esc(N.openApp)}</a>
    </div>
  </div>
</header>`;
}

function infoPage(L, ctx, page) {
  const P = L.seo.pages[page];
  const sections = P.sections
    .map(
      (section) => `<section class="info-section">
      <h2>${esc(section.title)}</h2>
      ${section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      ${section.list ? `<ul class="info-list">${section.list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      ${section.links ? `<p class="info-links">${section.links.map((link) => linkMarkup(link, ctx)).join("")}</p>` : ""}
    </section>`
    )
    .join("");
  const table = P.table
    ? `<section class="info-section">
      <h2>${esc(P.table.title)}</h2>
      <div class="geo-table-wrap">
        <table class="geo-table">
          <caption class="sr">${esc(P.table.title)}</caption>
          <thead><tr>${P.table.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${P.table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    </section>`
    : "";

  return `<section class="info-hero">
  <div class="container">
    <p class="kicker kicker-lime">${esc(P.kicker)}</p>
    <h1>${esc(P.title)}</h1>
    <p class="info-lede">${esc(P.lede)}</p>
    ${byline(L, ctx)}
  </div>
</section>
<div class="container info-body">
  <article class="info-content">${sections}${table}</article>
  <aside class="info-aside">
    <div class="card">
      <h2>${esc(L.seo.identity.title)}</h2>
      <p class="small muted">${esc(L.seo.identity.lede)}</p>
      <div class="info-links info-links-stack">
        <a class="link-arrow" href="${ctx.href("about.html")}">${esc(L.seo.nav.about)}</a>
        <a class="link-arrow" href="${ctx.href("contact.html")}">${esc(L.seo.nav.contact)}</a>
        <a class="link-arrow" href="${ctx.href("index.html#evidence")}">${esc(L.seo.nav.evidence)}</a>
        <a class="link-arrow" href="${REPO_URL}" rel="noopener">${esc(L.seo.identity.sourceLabel)}</a>
      </div>
    </div>
    <div class="card info-note">
      <p class="tiny muted mb-0">${esc(L.footer.disclaimer)}</p>
    </div>
  </aside>
</div>`;
}

/* ---------- page assembly ---------- */
const BUILDERS = {
  index: (L, ctx, all) => ({ body: landingPage(L, ctx, all), chrome: "landing" }),
  dashboard: (L, ctx) => ({ body: dashboardPage(L, ctx), chrome: "app" }),
  path: (L, ctx) => ({ body: pathPage(L, ctx), chrome: "app" }),
  practice: (L, ctx) => ({ body: practicePage(L, ctx), chrome: "app" }),
  subjects: (L, ctx) => ({ body: subjectsPage(L, ctx), chrome: "app" }),
  tutor: (L, ctx) => ({ body: tutorPage(L, ctx), chrome: "app" })
};
for (const page of INFO_PAGES) {
  BUILDERS[page] = (L, ctx) => ({ body: infoPage(L, ctx, page), chrome: "info" });
}

const TITLES = {
  index: (L) => L.brand.name,
  dashboard: (L) => L.nav.app[0].label,
  path: (L) => L.nav.app[1].label,
  practice: (L) => L.nav.app[2].label,
  subjects: (L) => L.nav.app[3].label,
  tutor: (L) => L.nav.app[4].label
};
for (const page of INFO_PAGES) TITLES[page] = (L) => L.seo.pages[page].title;

function renderPage(L, page, all) {
  const file = page === "index" ? "index.html" : `${page}.html`;
  const ctx = makeCtx(L, file);
  const built = BUILDERS[page](L, ctx, all);
  const runtimeContent = { ...L };
  delete runtimeContent.seo;
  const dict = JSON.stringify(runtimeContent).replace(/<\//g, "<\\/");
  const title = TITLES[page](L);

  const bodyChrome =
    built.chrome === "landing"
      ? `${landingHeader(L, ctx, all)}
<main>${built.body}</main>
${footer(L, ctx)}`
      : built.chrome === "info"
        ? `${infoHeader(L, ctx, all, page)}\n<main>${built.body}</main>\n${footer(L, ctx)}`
        : `<div class="app">
  ${sidebar(L, ctx, page)}
  <div class="main">
    ${topbar(L, ctx, page, title)}
    <div class="page">${built.body}</div>
  </div>
</div>
${tabbar(L, ctx, page)}
${footer(L, ctx)}`;

  return `<!DOCTYPE html>
<html lang="${L.htmlLang}" dir="${L.dir}" data-lang="${L.code}" data-fonts="${L.fonts}">
<head>
${head(L, ctx, page)}
</head>
<body data-page="${page}" data-lang="${L.code}">
${bodyChrome}
<script type="application/json" id="jm-content">${dict}</script>
<script src="${ctx.asset("js/app.js")}?v=${VER["assets/js/app.js"]}" integrity="${SRI["assets/js/app.js"]}"></script>
<script src="${ctx.asset("js/engine.js")}?v=${VER["assets/js/engine.js"]}" integrity="${SRI["assets/js/engine.js"]}"></script>
<script src="${ctx.asset("js/pages.js")}?v=${VER["assets/js/pages.js"]}" integrity="${SRI["assets/js/pages.js"]}"></script>
</body>
</html>
`;
}

/* ---------- asset fingerprints (cache busting) & SHA-384 Subresource Integrity ---------- */
const ASSETS = ["assets/css/jurismind.css", "assets/js/app.js", "assets/js/engine.js", "assets/js/pages.js"];
const VER = {};
const SRI = {};
for (const a of ASSETS) {
  try {
    const buf = readFileSync(join(ROOT, a));
    VER[a] = createHash("sha256").update(buf).digest("hex").slice(0, 8);
    SRI[a] = "sha384-" + createHash("sha384").update(buf).digest("base64");
  } catch (e) {
    VER[a] = "1";
    SRI[a] = "";
  }
}

/* ---------- run ---------- */
let written = 0;
for (const L of LANGS) {
  const dir = L.code === "en" ? ROOT : join(ROOT, L.code);
  mkdirSync(dir, { recursive: true });
  for (const page of PAGES) {
    const file = page === "index" ? "index.html" : `${page}.html`;
    writeFileSync(join(dir, file), renderPage(L, page, LANGS), "utf8");
    written++;
  }
  /* keep legacy links working: login.html → the dashboard demo (in the remembered language) */
  writeFileSync(
    join(dir, "login.html"),
    `<!DOCTYPE html><html lang="${L.htmlLang}" dir="${L.dir}" data-lang="${L.code}"><head><meta charset="utf-8">` +
      `${googleAnalyticsTag()}` +
      `<title>JurisMind</title>${langGuard(L)}` +
      `<meta http-equiv="refresh" content="0; url=dashboard.html">` +
      `<meta name="robots" content="noindex"></head>` +
      `<body><p><a href="dashboard.html">JurisMind — dashboard</a></p>` +
      `<script>location.replace("dashboard.html");</script></body></html>`,
    "utf8"
  );
  written++;
}

/* Google Search Console verification file */
writeFileSync(
  join(ROOT, GOOGLE_SITE_VERIFICATION_FILE),
  `google-site-verification: ${GOOGLE_SITE_VERIFICATION_FILE}`,
  "utf8"
);

writeFileSync(join(ROOT, "llms.txt"), llmsTxt(SITE_URL), "utf8");

console.log(`JurisMind: ${written} pages + llms.txt written (${LANGS.map((l) => l.code).join(" · ")}) → ${ROOT}`);
