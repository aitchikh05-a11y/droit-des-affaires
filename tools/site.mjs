/* Shared, deployment-safe site constants.
   Imported by the page builder, the Cloudflare bundle builder and the checks. */
export const DEFAULT_SITE_URL = "https://droit-des-affaires-dqt.pages.dev";
export const REPO_URL = "https://github.com/aitchikh05-a11y/droit-des-affaires";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const SECURITY_ADVISORY_URL = `${REPO_URL}/security/advisories/new`;
export const SECURITY_EMAIL = "security@droit-des-affaires-dqt.pages.dev";

/* The first commit in this checkout is dated 2026-10-12; this GEO/editorial
   revision is dated 2026-10-26. Update these together when the content changes. */
export const SITE_PUBLISHED = "2026-10-12";
export const SITE_MODIFIED = "2026-10-26";

export const OG_IMAGE_PATH = "/assets/og/jurismind-og.png";
export const LOGO_IMAGE_PATH = "/assets/og/jurismind-mark.png";

export const APP_PAGES = ["index", "dashboard", "path", "practice", "subjects", "tutor"];
export const INFO_PAGES = ["about", "contact", "privacy", "terms", "accessibility"];
export const PAGES = [...APP_PAGES, ...INFO_PAGES];
export const LANG_CODES = ["en", "fr", "ar"];
export const LANG_PREFIXES = ["", "fr", "ar"];
export const LOCALES = { en: "en_US", fr: "fr_FR", ar: "ar_MA" };

export function getSiteUrl() {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

/* Canonical, extension-free paths: /, /fr/, /dashboard, /fr/dashboard … */
export function cleanPath(code = "en", page = "index", siteUrl = getSiteUrl()) {
  const prefix = code === "en" ? "" : `/${code}`;
  const path = page === "index" ? `${prefix}/` : `${prefix}/${page}`;
  return `${siteUrl}${path || "/"}`;
}

/* Descriptive alias used by the builders and checks. */
export const canonicalUrl = cleanPath;

export function relativeCleanPath(code = "en", page = "index") {
  const prefix = code === "en" ? "" : `/${code}`;
  return page === "index" ? `${prefix}/` : `${prefix}/${page}`;
}
