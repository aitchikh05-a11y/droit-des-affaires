/* Generator for the emerging /llms.txt convention.
   The page builder writes it at the repository root; cf-build writes the
   domain-specific copy into dist/. */
import { SOURCES } from "./content/evidence.mjs";
import {
  ISSUES_URL,
  REPO_URL,
  SECURITY_ADVISORY_URL,
  SITE_MODIFIED,
  canonicalUrl,
  getSiteUrl,
  LANG_CODES,
  PAGES
} from "./site.mjs";

const PAGE_LABELS = {
  en: {
    index: "Home",
    dashboard: "Dashboard",
    path: "Learning path",
    practice: "Adaptive practice",
    subjects: "Subject library",
    tutor: "AI study tutor",
    about: "About",
    contact: "Contact",
    privacy: "Privacy notice",
    terms: "Terms of use",
    accessibility: "Accessibility statement"
  },
  fr: {
    index: "Accueil",
    dashboard: "Tableau de bord",
    path: "Parcours",
    practice: "Entraînement adaptatif",
    subjects: "Bibliothèque des matières",
    tutor: "Tuteur IA",
    about: "À propos",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Conditions d’utilisation",
    accessibility: "Accessibilité"
  },
  ar: {
    index: "الرئيسية",
    dashboard: "لوحة التحكم",
    path: "المسار التعليمي",
    practice: "التمرين التكيّفي",
    subjects: "مكتبة المواد",
    tutor: "المدرّس الذكي",
    about: "من نحن",
    contact: "اتصل بنا",
    privacy: "الخصوصية",
    terms: "شروط الاستخدام",
    accessibility: "إمكانية الولوج"
  }
};

export function llmsTxt(siteUrl = getSiteUrl()) {
  const origin = siteUrl.replace(/\/+$/, "");
  const home = (code) => canonicalUrl(code, "index", origin);
  const evidence = (code) => `${home(code)}#evidence`;
  const pageList = (code) =>
    PAGES.filter((p) => p !== "index")
      .map((p) => `- [${PAGE_LABELS[code][p]}](${canonicalUrl(code, p, origin)}): ${PAGE_LABELS.en[p]} (${code.toUpperCase()} build).`)
      .join("\n");

  return `# JurisMind

> JurisMind is a free, open-source, server-rendered learning path for law students. It finds weak topics with short case questions, then schedules spaced reviews at 1, 3, 7, 14 and 30 days. English, French and Arabic are complete builds; Arabic uses RTL. Learner progress stays in browser localStorage. The content is educational, not legal advice.

Last reviewed: ${SITE_MODIFIED}. Publisher and author: JurisMind Editorial Team.

## Start here

- [English home](${home("en")}): product overview, evidence, FAQ, identity and sources.
- [Accueil français](${home("fr")}): présentation, preuves, FAQ, identité et sources.
- [الصفحة الرئيسية العربية](${home("ar")}): نظرة عامة، الأدلة، الأسئلة الشائعة، الهوية والمصادر.
- [Robots.txt](${origin}/robots.txt) · [Sitemap](${origin}/sitemap.xml) · [This file](${origin}/llms.txt)

## English pages

${pageList("en")}

## Français

${pageList("fr")}

## العربية

${pageList("ar")}

## Method and evidence

Peer-reviewed sources: the learning claims are explained in the answer-first section [Why does spaced retrieval work?](${evidence("en")}). It includes a comparison table, two verbatim quotations and a reference list. French and Arabic equivalents are at [Preuves](${evidence("fr")}) and [الأدلة](${evidence("ar")}).

${SOURCES.map(
  (s) =>
    `- ${s.short}. *${s.title}*. ${s.journal}. [Publisher record](${s.url}) · [DOI](${s.doi}).`
).join("\n")}

The JurisMind decay model is an educational simplification. The 1/3/7/14/30-day schedule is a product design, not a single universal schedule prescribed by those studies.

## Entity and contact

- Organization: JurisMind; author: JurisMind Editorial Team.
- [About](${canonicalUrl("en", "about", origin)}): editorial policy and project scope.
- [Contact](${canonicalUrl("en", "contact", origin)}): support and security channels.
- [Public source repository](${REPO_URL}): builder, dictionaries, assets and deployment config.
- [Public issue tracker](${ISSUES_URL}): bugs, corrections and accessibility reports.
- [Private security advisory](${SECURITY_ADVISORY_URL}): do not disclose vulnerabilities publicly.
- [Privacy notice](${canonicalUrl("en", "privacy", origin)}): localStorage, analytics and Google Fonts.
- [Terms of use](${canonicalUrl("en", "terms", origin)}): educational purpose and limitations.
- [Accessibility statement](${canonicalUrl("en", "accessibility", origin)}): keyboard, RTL, reduced-motion and reporting.

## Crawling notes

- Canonical URLs are extension-free except the three home pages: \`/\`, \`/fr/\`, \`/ar/\`.
- HTML pages include self-referencing canonical links, hreflang alternates for ${LANG_CODES.join(", ")}, Organization/WebSite/author/date JSON-LD, Open Graph and Twitter Card metadata.
- The home pages include Article, LearningResource and FAQPage schema plus visible citations to peer-reviewed sources.
- \`login.html\` aliases and the 404 page are intentionally noindex. Every other page is indexable and listed in the sitemap.
- The site is static; no API key or JavaScript execution is needed to read the main content.
`;
}
