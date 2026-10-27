/* Editorial, evidence and trust-page copy. Kept out of the runtime dictionaries
   so it is rendered into server-side HTML without inflating jm-content. */
const REPO = "https://github.com/aitchikh05-a11y/droit-des-affaires";
const ISSUES = `${REPO}/issues`;
const ADVISORY = `${REPO}/security/advisories/new`;
const SECURITY_MAIL = "mailto:security@droit-des-affaires-dqt.pages.dev";

export const seoByLang = {
  en: {
    author: "JurisMind Editorial Team",
    byLabel: "By",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    publishedDisplay: "12 October 2026",
    updatedDisplay: "26 October 2026",
    ogAlt: "JurisMind — evidence-based, adaptive revision for law students",
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact",
      evidence: "Evidence",
      openApp: "Open dashboard"
    },
    bylineNote: "Reviewed against the learning-science sources linked on this page.",
    evidence: {
      kicker: "Evidence",
      title: "Why does spaced retrieval work?",
      lede:
        "Spaced retrieval works because active recall strengthens memory and returning to material after a delay makes that recall durable. Dunlosky et al. (2013) rated practice testing and distributed practice as high-utility learning techniques, while Cepeda et al. (2006) found that the best gap between study sessions grows with the time you want to remember something.",
      takeawaysTitle: "What does the research mean for law revision?",
      takeaways: [
        { t: "Answer before rereading.", d: "A case question forces retrieval; immediate feedback corrects the answer." },
        { t: "Return after a short delay.", d: "Reviews at 1, 3, 7, 14 and 30 days spread practice across the semester." },
        { t: "Let errors reshuffle the queue.", d: "A miss brings the topic back tomorrow; a correct answer moves it further out." }
      ],
      tableTitle: "How does the JurisMind loop compare with cramming?",
      tableCaption: "Study habits, research findings and the corresponding JurisMind feature",
      tableHeaders: ["Study habit", "What the research finds", "How JurisMind responds"],
      tableRows: [
        [
          "One long rereading session",
          "Rereading feels productive but does not consistently improve durable learning (Dunlosky et al., 2013).",
          "Each topic becomes a short case question with an explanation after the answer."
        ],
        [
          "Cramming close to the exam",
          "Spacing study episodes improves later recall; the optimal gap grows with the target retention interval (Cepeda et al., 2006).",
          "The scheduler starts with a one-day review and expands to 3, 7, 14 and 30 days."
        ],
        [
          "Testing only to grade yourself",
          "Retrieval tests can improve long-term retention more than extra study (Roediger & Karpicke, 2006).",
          "Every answer updates a mastery score and recalculates the next review date."
        ]
      ],
      quoteTitle: "What do the researchers say?",
      quoteNote: "Quoted verbatim from the original English abstracts.",
      sourceLinkLabel: "Read the source",
      referencesTitle: "Which sources support this page?",
      referencesNote:
        "These sources explain the learning method. They are not legal authority: your course, legislation and case law remain the references for legal rules.",
      sourceNotes: [
        "A review of ten study techniques; practice testing and distributed practice received the highest utility rating.",
        "A meta-analysis of 317 experiments showing that inter-study interval and retention interval work together.",
        "Two experiments showing that delayed recall benefits from testing rather than additional study."
      ]
    },
    identity: {
      kicker: "Transparency",
      title: "Who is behind JurisMind?",
      lede:
        "JurisMind is an independent, open-source educational demo for law students. The JurisMind Editorial Team maintains the content, the three language builds and the evidence-based revision method.",
      contactTitle: "How can you contact the team?",
      contactText:
        "Use the public issue tracker for corrections and feature requests, or the dedicated contact page for security and editorial enquiries.",
      points: [
        "The source code, content dictionaries and build scripts are public.",
        "Every learner starts at Level 0; progress stays in the browser under jurismind.state.v1.",
        "The method is documented with peer-reviewed sources, not unsupported claims."
      ],
      aboutLabel: "Read the editorial policy",
      contactLabel: "Contact the team",
      sourceLabel: "Inspect the source code"
    },
    pages: {
      about: {
        kicker: "About",
        title: "About JurisMind",
        description:
          "Learn who builds JurisMind, how its legal-learning content is reviewed, and how learner progress is handled.",
        lede:
          "JurisMind is a trilingual, open-source learning project. It helps law students find weak topics, answer case questions and return to each concept before it fades from memory.",
        sections: [
          {
            title: "Who builds and maintains JurisMind?",
            body: [
              "The site is maintained by the JurisMind Editorial Team as an educational demonstration, not by a law firm or a university. Its pages, translations, exercises and adaptive engine are generated from public source files."
            ],
            list: [
              "English, French and Arabic are first-class builds; Arabic has a full RTL layout.",
              "The landing pages are server-rendered static HTML, so AI crawlers and assistive technology receive the content without executing JavaScript.",
              "Learner progress is stored locally in the browser, not in an account database."
            ],
            links: [{ href: REPO, label: "View the public source repository" }]
          },
          {
            title: "How is the content reviewed?",
            body: [
              "Legal exercises are written at doctrine level and are reviewed for internal consistency across the three languages. The learning method is checked against peer-reviewed research on retrieval practice and distributed practice."
            ],
            list: [
              "Claims about learning outcomes are linked to their sources on the home page.",
              "Dates and authorship are exposed in both visible HTML and JSON-LD.",
              "Corrections can be proposed publicly with a page URL and the affected language."
            ],
            links: [
              { href: "index.html#evidence", label: "Read the evidence section" },
              { href: "contact.html", label: "Suggest a correction" }
            ]
          },
          {
            title: "Is JurisMind legal advice?",
            body: [
              "No. It is a study aid for practising legal reasoning and retention. It does not replace a course, a professor, legislation, case law or advice from a qualified lawyer."
            ],
            links: [
              { href: "terms.html", label: "Read the terms" },
              { href: "privacy.html", label: "Read the privacy notice" }
            ]
          }
        ]
      },
      contact: {
        kicker: "Contact",
        title: "Contact the JurisMind team",
        description:
          "Report a bug, suggest a legal-topic correction, raise a security issue or verify the open-source project behind JurisMind.",
        lede:
          "JurisMind is maintained in public. Choose the channel that matches your request and include the page URL, language and, for bugs, the steps needed to reproduce the problem.",
        sections: [
          {
            title: "How can I report a bug or content correction?",
            body: [
              "Open a public issue with the page, language, expected behaviour and what happened instead. For a legal-content correction, cite the course material or legislation that supports the change."
            ],
            links: [{ href: ISSUES, label: "Open a GitHub issue" }]
          },
          {
            title: "How can I report a security issue?",
            body: [
              "Do not publish exploit details in a public issue. Use GitHub's private security advisory form or the security contact published in security.txt."
            ],
            links: [
              { href: ADVISORY, label: "Open a private security advisory" },
              { href: SECURITY_MAIL, label: "Email the security contact" }
            ]
          },
          {
            title: "Where can I verify the project?",
            body: [
              "The repository contains the page builder, content dictionaries, deployment configuration and the same static assets served on this site."
            ],
            links: [
              { href: REPO, label: "Browse the source repository" },
              { href: "about.html", label: "Read about the editorial team" }
            ]
          }
        ],
        table: {
          title: "Which contact channel should I use?",
          headers: ["Purpose", "Channel", "What to include"],
          rows: [
            ["A display or translation bug", "Public issue tracker", "URL, language, browser and steps to reproduce."],
            ["A disputed legal explanation", "Public issue tracker", "The exercise, your course reference and a suggested correction."],
            ["A security vulnerability", "Private advisory or security email", "Impact, affected page and a private way to discuss details."]
          ]
        }
      },
      privacy: {
        kicker: "Privacy",
        title: "Privacy notice",
        description:
          "How JurisMind handles browser-local progress, analytics, fonts and external links across its English, French and Arabic builds.",
        lede:
          "JurisMind does not require an account. Learning progress is stored on your device; the site uses a small number of third-party services for fonts and aggregate analytics.",
        sections: [
          {
            title: "What data does JurisMind store?",
            body: [
              "Your answers, mastery scores, streak, badges and language preference are kept in your browser's localStorage under jurismind.state.v1 and jurismind.lang. They are not submitted to a JurisMind account server."
            ],
            list: [
              "Reset progress in the dashboard returns the local learning state to Level 0.",
              "Clearing site data in your browser removes the stored progress and language choice.",
              "Google Analytics may use cookies or similar identifiers to provide aggregate traffic measurements."
            ]
          },
          {
            title: "Which third parties receive requests?",
            body: [
              "Google Fonts serves the Latin and Arabic typefaces. Google Analytics receives standard web-request data such as page URL, browser characteristics and approximate location. External source links are only contacted when you select them."
            ],
            links: [{ href: "contact.html", label: "Contact the team about privacy" }]
          },
          {
            title: "How can I control my data?",
            body: [
              "Use your browser settings to block cookies or clear site data, and use the dashboard's reset control to remove learning state. Blocking analytics does not change the adaptive exercises."
            ],
            links: [{ href: "accessibility.html", label: "Read the accessibility statement" }]
          }
        ]
      },
      terms: {
        kicker: "Terms",
        title: "Terms of use",
        description:
          "The scope, limitations and educational purpose of the JurisMind adaptive law-revision demo.",
        lede:
          "JurisMind is a free educational demonstration. Use it as a practice tool, not as a source of legal authority or professional advice.",
        sections: [
          {
            title: "What is the service?",
            body: [
              "The site offers browser-based exercises, a local progress dashboard and a keyword-matched study tutor. It is provided as-is and may change or become unavailable without notice."
            ],
            list: [
              "No account, payment or legal consultation is required.",
              "Exercises are general doctrine prompts and may not reflect your jurisdiction.",
              "AI or keyword-matched answers can be incomplete; always verify against your course."
            ]
          },
          {
            title: "What are the limits of liability?",
            body: [
              "Nothing on this site is legal advice. The maintainers do not warrant that the exercises are complete, current or suitable for a particular exam, and are not responsible for decisions made solely from the demo content."
            ],
            links: [
              { href: "privacy.html", label: "Read the privacy notice" },
              { href: "contact.html", label: "Report a content problem" }
            ]
          },
          {
            title: "How can I reuse the project?",
            body: [
              "The source repository is public. Check the repository for its current licence and attribution requirements before reusing code, copy or translations."
            ],
            links: [{ href: REPO, label: "Open the source repository" }]
          }
        ]
      },
      accessibility: {
        kicker: "Accessibility",
        title: "Accessibility statement",
        description:
          "Keyboard, language, RTL, reduced-motion and semantic-HTML features in JurisMind, plus how to report a barrier.",
        lede:
          "JurisMind is designed to work with keyboard navigation, screen readers, right-to-left Arabic text and reduced-motion preferences. This is a demonstration project and has not completed a formal external accessibility audit.",
        sections: [
          {
            title: "What accessibility features are included?",
            body: [
              "Pages use semantic landmarks, headings, lists, tables, captions and a single H1. Language and direction are declared on the root element, and interactive controls have visible focus styles."
            ],
            list: [
              "Language pickers are native details elements, so they work without JavaScript.",
              "Decorative icons are hidden from assistive technology with aria-hidden.",
              "Animations are disabled when the operating system requests reduced motion.",
              "Arabic switches to a full RTL layout and Arabic typeface."
            ]
          },
          {
            title: "How do I report an accessibility barrier?",
            body: [
              "Please include the page, language, assistive technology and the task you were trying to complete. A short screen recording or browser version is helpful but not required."
            ],
            links: [
              { href: "contact.html", label: "Open the contact page" },
              { href: ISSUES, label: "Open a public issue" }
            ]
          },
          {
            title: "What is the current conformance status?",
            body: [
              "The project aims to meet WCAG 2.2 AA. Known limitations can be tracked in the public issue list; reports from learners help prioritise fixes."
            ]
          }
        ]
      }
    }
  },

  fr: {
    author: "Équipe éditoriale JurisMind",
    byLabel: "Par",
    publishedLabel: "Publié le",
    updatedLabel: "Mis à jour le",
    publishedDisplay: "12 octobre 2026",
    updatedDisplay: "26 octobre 2026",
    ogAlt: "JurisMind — révisions adaptatives fondées sur la recherche pour les étudiants en droit",
    nav: {
      home: "Accueil",
      about: "À propos",
      contact: "Contact",
      evidence: "Preuves",
      openApp: "Ouvrir le tableau de bord"
    },
    bylineNote: "Vérifié à partir des sources en sciences de l’apprentissage citées sur cette page.",
    evidence: {
      kicker: "Preuves scientifiques",
      title: "Pourquoi la récupération espacée fonctionne-t-elle ?",
      lede:
        "La récupération espacée fonctionne parce que le rappel actif renforce la mémoire et qu’un retour différé à la matière rend ce rappel durable. Dunlosky et ses collègues (2013) ont classé l’auto-évaluation et la pratique répartie parmi les techniques les plus utiles, tandis que Cepeda et ses collègues (2006) ont montré que l’intervalle optimal entre deux séances augmente avec la durée de rétention visée.",
      takeawaysTitle: "Que signifient ces recherches pour les révisions de droit ?",
      takeaways: [
        { t: "Répondez avant de relire.", d: "Une question de cas force le rappel ; la correction immédiate rectifie la réponse." },
        { t: "Revenez après un court délai.", d: "Les révisions à 1, 3, 7, 14 et 30 jours répartissent le travail sur le semestre." },
        { t: "Laissez les erreurs réorganiser la file.", d: "Une erreur ramène la notion demain ; une bonne réponse éloigne la révision suivante." }
      ],
      tableTitle: "Comment la boucle JurisMind se compare-t-elle au bachotage ?",
      tableCaption: "Habitudes d’étude, résultats de recherche et fonctionnalité JurisMind correspondante",
      tableHeaders: ["Habitude d’étude", "Ce que montre la recherche", "Réponse de JurisMind"],
      tableRows: [
        [
          "Une longue séance de relecture",
          "Relire semble productif mais n’améliore pas toujours l’apprentissage durable (Dunlosky et al., 2013).",
          "Chaque notion devient une courte question de cas avec une explication après la réponse."
        ],
        [
          "Le bachotage juste avant l’examen",
          "Répartir les séances améliore le rappel ultérieur ; l’intervalle optimal augmente avec la durée de rétention visée (Cepeda et al., 2006).",
          "Le planificateur commence à un jour, puis passe à 3, 7, 14 et 30 jours."
        ],
        [
          "Un test utilisé seulement pour se noter",
          "Les tests de récupération peuvent améliorer la rétention à long terme plus qu’une étude supplémentaire (Roediger & Karpicke, 2006).",
          "Chaque réponse met à jour le score de maîtrise et recalcule la prochaine révision."
        ]
      ],
      quoteTitle: "Que disent les chercheurs ?",
      quoteNote: "Citations exactes extraites des résumés originaux en anglais.",
      sourceLinkLabel: "Consulter la source",
      referencesTitle: "Quelles sources soutiennent cette page ?",
      referencesNote:
        "Ces sources expliquent la méthode d’apprentissage. Elles ne sont pas une autorité juridique : votre cours, la loi et la jurisprudence restent les références des règles de droit.",
      sourceNotes: [
        "Une revue de dix techniques d’étude ; l’auto-évaluation et la pratique répartie ont reçu la meilleure évaluation.",
        "Une méta-analyse de 317 expériences montrant l’interaction entre l’intervalle d’étude et l’intervalle de rétention.",
        "Deux expériences montrant le bénéfice des tests de rappel sur la mémorisation différée."
      ]
    },
    identity: {
      kicker: "Transparence",
      title: "Qui est derrière JurisMind ?",
      lede:
        "JurisMind est un projet éducatif indépendant et open source pour les étudiants en droit. L’équipe éditoriale JurisMind maintient le contenu, les trois versions linguistiques et la méthode de révision fondée sur la recherche.",
      contactTitle: "Comment contacter l’équipe ?",
      contactText:
        "Utilisez le suivi public des issues pour les corrections et suggestions, ou la page de contact dédiée pour les questions de sécurité et éditoriales.",
      points: [
        "Le code source, les dictionnaires de contenu et les scripts de génération sont publics.",
        "Chaque apprenant commence au niveau 0 ; la progression reste dans le navigateur sous jurismind.state.v1.",
        "La méthode est documentée par des sources évaluées par les pairs, sans affirmation invérifiable."
      ],
      aboutLabel: "Lire la politique éditoriale",
      contactLabel: "Contacter l’équipe",
      sourceLabel: "Consulter le code source"
    },
    pages: {
      about: {
        kicker: "À propos",
        title: "À propos de JurisMind",
        description:
          "Découvrez qui développe JurisMind, comment le contenu juridique est relu et comment la progression des apprenants est traitée.",
        lede:
          "JurisMind est un projet d’apprentissage open source trilingue. Il aide les étudiants en droit à repérer les notions faibles, à répondre à des cas pratiques et à revenir sur chaque concept avant de l’oublier.",
        sections: [
          {
            title: "Qui développe et maintient JurisMind ?",
            body: [
              "Le site est maintenu par l’équipe éditoriale JurisMind comme démonstration pédagogique, et non par un cabinet d’avocats ou une université. Ses pages, traductions, exercices et moteur adaptatif sont générés à partir de fichiers sources publics."
            ],
            list: [
              "L’anglais, le français et l’arabe sont trois versions complètes ; l’arabe dispose d’une mise en page RTL intégrale.",
              "Les pages d’accueil sont rendues côté serveur en HTML statique : les robots IA et les technologies d’assistance reçoivent le contenu sans JavaScript.",
              "La progression reste dans le localStorage du navigateur, sans base de données de compte."
            ],
            links: [{ href: REPO, label: "Voir le dépôt source public" }]
          },
          {
            title: "Comment le contenu est-il relu ?",
            body: [
              "Les exercices juridiques restent au niveau de la doctrine générale et sont vérifiés pour leur cohérence entre les trois langues. La méthode d’apprentissage est confrontée à des recherches évaluées par les pairs sur le rappel actif et la pratique répartie."
            ],
            list: [
              "Les affirmations sur l’apprentissage renvoient à leurs sources sur la page d’accueil.",
              "Les dates et l’auteur sont visibles en HTML et dans les données JSON-LD.",
              "Une correction peut être proposée publiquement avec l’URL de la page et la langue concernée."
            ],
            links: [
              { href: "index.html#evidence", label: "Lire la section Preuves" },
              { href: "contact.html", label: "Proposer une correction" }
            ]
          },
          {
            title: "JurisMind donne-t-il un conseil juridique ?",
            body: [
              "Non. C’est un outil d’entraînement au raisonnement juridique et à la mémorisation. Il ne remplace ni un cours, ni un professeur, ni la loi, ni la jurisprudence, ni un avocat."
            ],
            links: [
              { href: "terms.html", label: "Lire les conditions" },
              { href: "privacy.html", label: "Lire la confidentialité" }
            ]
          }
        ]
      },
      contact: {
        kicker: "Contact",
        title: "Contacter l’équipe JurisMind",
        description:
          "Signaler un bug, proposer une correction juridique, signaler un problème de sécurité ou vérifier le projet open source JurisMind.",
        lede:
          "JurisMind est maintenu publiquement. Choisissez le canal adapté à votre demande et indiquez l’URL de la page, la langue et, pour un bug, les étapes de reproduction.",
        sections: [
          {
            title: "Comment signaler un bug ou corriger un contenu ?",
            body: [
              "Ouvrez une issue publique avec la page, la langue, le comportement attendu et le comportement observé. Pour une correction juridique, citez le cours ou le texte qui justifie la modification."
            ],
            links: [{ href: ISSUES, label: "Ouvrir une issue GitHub" }]
          },
          {
            title: "Comment signaler un problème de sécurité ?",
            body: [
              "Ne publiez pas les détails d’une vulnérabilité dans une issue publique. Utilisez le formulaire privé GitHub ou le contact de sécurité publié dans security.txt."
            ],
            links: [
              { href: ADVISORY, label: "Ouvrir un avis de sécurité privé" },
              { href: SECURITY_MAIL, label: "Écrire au contact sécurité" }
            ]
          },
          {
            title: "Où vérifier le projet ?",
            body: [
              "Le dépôt contient le générateur de pages, les dictionnaires de contenu, la configuration de déploiement et les mêmes ressources statiques que ce site."
            ],
            links: [
              { href: REPO, label: "Parcourir le dépôt source" },
              { href: "about.html", label: "Lire la page À propos" }
            ]
          }
        ],
        table: {
          title: "Quel canal de contact utiliser ?",
          headers: ["Objet", "Canal", "Informations à fournir"],
          rows: [
            ["Un bug d’affichage ou de traduction", "Suivi public des issues", "URL, langue, navigateur et étapes de reproduction."],
            ["Une explication juridique contestée", "Suivi public des issues", "L’exercice, votre référence de cours et la correction proposée."],
            ["Une vulnérabilité de sécurité", "Avis privé ou e-mail sécurité", "Impact, page concernée et moyen privé de discussion."]
          ]
        }
      },
      privacy: {
        kicker: "Confidentialité",
        title: "Politique de confidentialité",
        description:
          "Gestion de la progression locale, des analyses, des polices et des liens externes dans les versions anglaise, française et arabe.",
        lede:
          "JurisMind ne demande aucun compte. La progression est conservée sur votre appareil ; le site utilise quelques services tiers pour les polices et des statistiques agrégées.",
        sections: [
          {
            title: "Quelles données JurisMind conserve-t-il ?",
            body: [
              "Vos réponses, scores de maîtrise, série, badges et préférence de langue sont enregistrés dans le localStorage du navigateur sous jurismind.state.v1 et jurismind.lang. Ils ne sont pas envoyés à un serveur de compte JurisMind."
            ],
            list: [
              "La commande de réinitialisation du tableau de bord remet l’état local au niveau 0.",
              "Effacer les données du site dans le navigateur supprime la progression et la langue mémorisée.",
              "Google Analytics peut utiliser des cookies ou identifiants similaires pour des mesures de trafic agrégées."
            ]
          },
          {
            title: "Quels tiers reçoivent des requêtes ?",
            body: [
              "Google Fonts fournit les polices latines et arabes. Google Analytics reçoit des données habituelles de requête web comme l’URL, les caractéristiques du navigateur et une localisation approximative. Les liens externes ne sont contactés que si vous les ouvrez."
            ],
            links: [{ href: "contact.html", label: "Contacter l’équipe au sujet de la confidentialité" }]
          },
          {
            title: "Comment contrôler mes données ?",
            body: [
              "Utilisez les réglages du navigateur pour bloquer les cookies ou effacer les données du site, et la commande de réinitialisation pour supprimer la progression. Bloquer les analyses ne modifie pas les exercices adaptatifs."
            ],
            links: [{ href: "accessibility.html", label: "Lire la déclaration d’accessibilité" }]
          }
        ]
      },
      terms: {
        kicker: "Conditions",
        title: "Conditions d’utilisation",
        description:
          "Portée, limites et finalité pédagogique de la démonstration JurisMind de révision du droit.",
        lede:
          "JurisMind est une démonstration éducative gratuite. Utilisez-la comme outil d’entraînement, et non comme autorité juridique ou conseil professionnel.",
        sections: [
          {
            title: "Quel est le service proposé ?",
            body: [
              "Le site propose des exercices dans le navigateur, un tableau de bord local et un tuteur d’étude fondé sur des mots-clés. Il est fourni tel quel et peut évoluer ou devenir indisponible sans préavis."
            ],
            list: [
              "Aucun compte, paiement ni consultation juridique n’est nécessaire.",
              "Les exercices sont des principes généraux et peuvent ne pas correspondre à votre juridiction.",
              "Les réponses automatiques peuvent être incomplètes : vérifiez toujours avec votre cours."
            ]
          },
          {
            title: "Quelles sont les limites de responsabilité ?",
            body: [
              "Rien sur ce site ne constitue un conseil juridique. Les mainteneurs ne garantissent pas que les exercices sont exhaustifs, à jour ou adaptés à un examen précis, et ne sont pas responsables des décisions prises uniquement à partir de cette démonstration."
            ],
            links: [
              { href: "privacy.html", label: "Lire la confidentialité" },
              { href: "contact.html", label: "Signaler un problème de contenu" }
            ]
          },
          {
            title: "Comment réutiliser le projet ?",
            body: [
              "Le dépôt source est public. Consultez sa licence actuelle et ses conditions d’attribution avant de réutiliser le code, les textes ou les traductions."
            ],
            links: [{ href: REPO, label: "Ouvrir le dépôt source" }]
          }
        ]
      },
      accessibility: {
        kicker: "Accessibilité",
        title: "Déclaration d’accessibilité",
        description:
          "Navigation au clavier, langues, RTL, réduction des animations, HTML sémantique et signalement des obstacles dans JurisMind.",
        lede:
          "JurisMind est conçu pour la navigation au clavier, les lecteurs d’écran, le texte arabe de droite à gauche et les préférences de réduction des animations. Ce projet de démonstration n’a pas encore fait l’objet d’un audit externe formel.",
        sections: [
          {
            title: "Quelles fonctionnalités d’accessibilité sont incluses ?",
            body: [
              "Les pages utilisent des régions sémantiques, des titres, des listes, des tableaux, des légendes et un unique H1. La langue et le sens d’écriture sont déclarés sur l’élément racine, et les contrôles interactifs ont un style de focus visible."
            ],
            list: [
              "Les sélecteurs de langue sont des éléments details natifs et fonctionnent sans JavaScript.",
              "Les icônes décoratives sont masquées aux technologies d’assistance avec aria-hidden.",
              "Les animations sont désactivées lorsque le système demande une réduction des mouvements.",
              "L’arabe active une mise en page RTL complète et une police arabe."
            ]
          },
          {
            title: "Comment signaler un obstacle d’accessibilité ?",
            body: [
              "Indiquez la page, la langue, la technologie d’assistance et la tâche que vous tentiez d’accomplir. Une courte vidéo ou la version du navigateur peut aider, mais n’est pas obligatoire."
            ],
            links: [
              { href: "contact.html", label: "Ouvrir la page Contact" },
              { href: ISSUES, label: "Ouvrir une issue publique" }
            ]
          },
          {
            title: "Quel est le niveau de conformité actuel ?",
            body: [
              "Le projet vise le niveau WCAG 2.2 AA. Les limites connues peuvent être suivies dans la liste publique des issues ; les retours des apprenants aident à prioriser les corrections."
            ]
          }
        ]
      }
    }
  },

  ar: {
    author: "فريق تحرير JurisMind",
    byLabel: "بقلم",
    publishedLabel: "نُشر في",
    updatedLabel: "آخر تحديث",
    publishedDisplay: "12 أكتوبر 2026",
    updatedDisplay: "26 أكتوبر 2026",
    ogAlt: "JurisMind — مراجعة قانونية تكيّفية مستندة إلى البحث لطلبة الحقوق",
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      evidence: "الأدلة",
      openApp: "فتح لوحة التحكم"
    },
    bylineNote: "تمت المراجعة استناداً إلى مصادر علم التعلّم المرتبطة في هذه الصفحة.",
    evidence: {
      kicker: "الأدلة العلمية",
      title: "لماذا ينجح الاسترجاع المتباعد؟",
      lede:
        "ينجح الاسترجاع المتباعد لأن التذكّر النشط يقوّي الذاكرة، والعودة إلى المادة بعد فاصل زمني تجعل هذا التذكّر أطول بقاءً. صنّف Dunlosky وزملاؤه (2013) اختبار الذات والممارسة الموزّعة ضمن أكثر التقنيات فائدة، وأظهر Cepeda وزملاؤه (2006) أن الفاصل الأمثل بين جلستَي دراسة يزداد كلما طالت مدة الاحتفاظ المستهدفة.",
      takeawaysTitle: "ماذا تعني هذه الأبحاث لمراجعة القانون؟",
      takeaways: [
        { t: "أجب قبل أن تعيد القراءة.", d: "سؤال الحالة يفرض الاسترجاع، والتغذية الراجعة الفورية تصحّح الإجابة." },
        { t: "عُد بعد فاصل قصير.", d: "مراجعات بعد 1 و3 و7 و14 و30 يوماً توزّع الدراسة على الفصل." },
        { t: "دع الأخطاء تعيد ترتيب الأولويات.", d: "الإجابة الخاطئة تعيد المفهوم غداً، والإجابة الصحيحة تؤجّل المراجعة التالية." }
      ],
      tableTitle: "كيف تقارن دورة JurisMind بالحشو قبل الامتحان؟",
      tableCaption: "عادات الدراسة، نتائج الأبحاث، والميزة المقابلة في JurisMind",
      tableHeaders: ["عادة الدراسة", "ما تظهره الأبحاث", "استجابة JurisMind"],
      tableRows: [
        [
          "جلسة إعادة قراءة طويلة واحدة",
          "قد تبدو إعادة القراءة مفيدة لكنها لا تحسّن التعلّم الدائم باستمرار (Dunlosky وآخرون، 2013).",
          "يتحوّل كل مفهوم إلى سؤال حالة قصير مع شرح بعد الإجابة."
        ],
        [
          "الحشو قبيل الامتحان",
          "توزيع جلسات الدراسة يحسّن التذكّر اللاحق، ويزداد الفاصل الأمثل مع مدة الاحتفاظ المستهدفة (Cepeda وآخرون، 2006).",
          "يبدأ المجدول بمراجعة بعد يوم ثم يتوسّع إلى 3 و7 و14 و30 يوماً."
        ],
        [
          "الاختبار للتقييم فقط",
          "يمكن لاختبارات الاسترجاع أن تحسّن الاحتفاظ طويل الأمد أكثر من دراسة إضافية (Roediger وKarpicke، 2006).",
          "كل إجابة تحدّث درجة الإتقان وتعيد حساب موعد المراجعة التالي."
        ]
      ],
      quoteTitle: "ماذا يقول الباحثون؟",
      quoteNote: "اقتباسات حرفية من الملخّصات الأصلية باللغة الإنجليزية.",
      sourceLinkLabel: "اقرأ المصدر",
      referencesTitle: "ما المصادر التي تدعم هذه الصفحة؟",
      referencesNote:
        "تشرح هذه المصادر منهجية التعلّم، ولا تُعدّ مرجعاً قانونياً: يبقى مقررك والتشريع والاجتهاد القضائي هي مراجع القواعد القانونية.",
      sourceNotes: [
        "مراجعة لعشر تقنيات دراسة؛ حصل اختبار الذات والممارسة الموزّعة على أعلى تقييم.",
        "تحليل تلوي لـ317 تجربة يوضح تفاعل الفاصل بين جلسات الدراسة مع فاصل الاحتفاظ.",
        "تجربتان تظهران فائدة اختبارات الاسترجاع للتذكّر المتأخر مقارنة بإعادة الدراسة."
      ]
    },
    identity: {
      kicker: "الشفافية",
      title: "من يقف وراء JurisMind؟",
      lede:
        "JurisMind مشروع تعليمي مستقل ومفتوح المصدر لطلبة الحقوق. يتولى فريق تحرير JurisMind صيانة المحتوى والنسخ اللغوية الثلاث ومنهجية المراجعة المستندة إلى البحث.",
      contactTitle: "كيف يمكنك التواصل مع الفريق؟",
      contactText:
        "استخدم نظام البلاغات العام للتصحيحات والاقتراحات، أو صفحة الاتصال المخصصة للاستفسارات التحريرية والأمنية.",
      points: [
        "الشيفرة المصدرية وقواميس المحتوى وسكربتات البناء متاحة للعموم.",
        "يبدأ كل متعلّم من المستوى 0، وتبقى البيانات في المتصفح تحت jurismind.state.v1.",
        "المنهجية موثّقة بمصادر محكّمة، وليست ادعاءات بلا دليل."
      ],
      aboutLabel: "اقرأ السياسة التحريرية",
      contactLabel: "اتصل بالفريق",
      sourceLabel: "تصفّح الشيفرة المصدرية"
    },
    pages: {
      about: {
        kicker: "من نحن",
        title: "عن JurisMind",
        description:
          "تعرّف على من يبني JurisMind، وكيف تُراجَع محتوياته القانونية، وكيف تُعامَل بيانات تقدّم المتعلّمين.",
        lede:
          "JurisMind مشروع تعلّم مفتوح المصدر بثلاث لغات. يساعد طلبة الحقوق على اكتشاف نقاط الضعف، والإجابة عن أسئلة الحالات، والعودة إلى كل مفهوم قبل نسيانه.",
        sections: [
          {
            title: "من يبني JurisMind ويصونه؟",
            body: [
              "يصون الموقع فريق تحرير JurisMind كنموذج تعليمي، وليس مكتب محاماة أو جامعة. تُولَّد صفحاته وترجماته وتمارينه ومحرّكه التكيّفي من ملفات مصدرية عامة."
            ],
            list: [
              "الإنجليزية والفرنسية والعربية نسخ كاملة، والعربية تحظى بتخطيط RTL شامل.",
              "تُقدَّم الصفحات الرئيسية كـHTML ثابت من الخادم، فتصل المحتويات إلى روبوتات الذكاء الاصطناعي وتقنيات المساعدة دون JavaScript.",
              "تُحفَظ بيانات التقدّم محلياً في localStorage، وليس في قاعدة بيانات حسابات."
            ],
            links: [{ href: REPO, label: "عرض المستودع المصدرية العام" }]
          },
          {
            title: "كيف تُراجَع المحتويات؟",
            body: [
              "تُكتب التمارين القانونية على مستوى المبادئ العامة وتُراجَع لضمان الاتساق بين اللغات الثلاث. وتُقارَن منهجية التعلّم بأبحاث محكّمة حول الاسترجاع النشط والممارسة الموزّعة."
            ],
            list: [
              "ترتبط الادعاءات المتعلقة بنتائج التعلّم بمصادرها في الصفحة الرئيسية.",
              "تظهر التواريخ والمؤلف في HTML المرئي وبيانات JSON-LD.",
              "يمكن اقتراح تصحيح علنياً مع رابط الصفحة واللغة المعنية."
            ],
            links: [
              { href: "index.html#evidence", label: "اقرأ قسم الأدلة" },
              { href: "contact.html", label: "اقترح تصحيحاً" }
            ]
          },
          {
            title: "هل يقدّم JurisMind استشارة قانونية؟",
            body: [
              "لا. إنه أداة للتدرّب على التفكير القانوني والاحتفاظ بالمعلومة، ولا يحلّ محل المقرر أو الأستاذ أو التشريع أو الاجتهاد القضائي أو استشارة محامٍ مؤهل."
            ],
            links: [
              { href: "terms.html", label: "اقرأ الشروط" },
              { href: "privacy.html", label: "اقرأ سياسة الخصوصية" }
            ]
          }
        ]
      },
      contact: {
        kicker: "اتصل بنا",
        title: "اتصل بفريق JurisMind",
        description:
          "أبلغ عن خطأ، أو اقترح تصحيحاً قانونياً، أو أبلغ عن ثغرة أمنية، أو تحقق من المشروع مفتوح المصدر.",
        lede:
          "تتم صيانة JurisMind علناً. اختر القناة المناسبة لطلبك، وأرفق رابط الصفحة واللغة، وبالنسبة للأخطاء خطوات إعادة إنتاج المشكلة.",
        sections: [
          {
            title: "كيف أبلغ عن خطأ أو تصحيح محتوى؟",
            body: [
              "افتح بلاغاً عاماً يوضح الصفحة واللغة والسلوك المتوقع وما حدث فعلاً. وفي تصحيح قانوني، اذكر المقرر أو النص التشريعي الذي يدعم التعديل."
            ],
            links: [{ href: ISSUES, label: "افتح بلاغاً على GitHub" }]
          },
          {
            title: "كيف أبلغ عن مشكلة أمنية؟",
            body: [
              "لا تنشر تفاصيل الثغرة في بلاغ عام. استخدم نموذج الاستشارة الأمنية الخاصة في GitHub أو جهة الاتصال الأمنية المنشورة في security.txt."
            ],
            links: [
              { href: ADVISORY, label: "افتح استشارة أمنية خاصة" },
              { href: SECURITY_MAIL, label: "راسل جهة الاتصال الأمنية" }
            ]
          },
          {
            title: "أين أتحقق من المشروع؟",
            body: [
              "يحتوي المستودع على مولّد الصفحات وقواميس المحتوى وإعدادات النشر والأصول الثابتة نفسها التي يقدمها هذا الموقع."
            ],
            links: [
              { href: REPO, label: "تصفّح المستودع المصدرية" },
              { href: "about.html", label: "اقرأ صفحة من نحن" }
            ]
          }
        ],
        table: {
          title: "أي قناة اتصال يجب أن أستخدم؟",
          headers: ["الغرض", "القناة", "ما الذي ترفقه؟"],
          rows: [
            ["خطأ في العرض أو الترجمة", "نظام البلاغات العام", "الرابط واللغة والمتصفح وخطوات إعادة الإنتاج."],
            ["اعتراض على شرح قانوني", "نظام البلاغات العام", "التمرين ومرجعك الدراسي والتصحيح المقترح."],
            ["ثغرة أمنية", "استشارة خاصة أو بريد أمني", "الأثر والصفحة المتأثرة ووسيلة خاصة للنقاش."]
          ]
        }
      },
      privacy: {
        kicker: "الخصوصية",
        title: "سياسة الخصوصية",
        description:
          "كيف يعالج JurisMind التقدّم المحلي والتحليلات والخطوط والروابط الخارجية في نسخه الإنجليزية والفرنسية والعربية.",
        lede:
          "لا يتطلب JurisMind إنشاء حساب. يُحفَظ تقدّم التعلّم على جهازك، ويستخدم الموقع عدداً محدوداً من خدمات الأطراف الثالثة للخطوط والتحليلات الإجمالية.",
        sections: [
          {
            title: "ما البيانات التي يخزنها JurisMind؟",
            body: [
              "تُحفَظ إجاباتك ودرجات الإتقان والسلسلة والشارات وتفضيل اللغة في localStorage بمتصفحك تحت jurismind.state.v1 وjurismind.lang، ولا تُرسل إلى خادم حسابات خاص بـJurisMind."
            ],
            list: [
              "يعيد زر إعادة ضبط التقدّم في لوحة التحكم الحالة المحلية إلى المستوى 0.",
              "يؤدي مسح بيانات الموقع من المتصفح إلى إزالة التقدّم واللغة المحفوظة.",
              "قد يستخدم Google Analytics ملفات تعريف ارتباط أو معرّفات مشابهة لقياسات زيارات إجمالية."
            ]
          },
          {
            title: "ما الأطراف الثالثة التي تستقبل الطلبات؟",
            body: [
              "تقدّم Google Fonts الخطوط اللاتينية والعربية. وتلقى Google Analytics بيانات طلبات ويب معتادة مثل رابط الصفحة وخصائص المتصفح وموقع تقريبي. ولا يتم الاتصال بالروابط الخارجية إلا عند اختيارها."
            ],
            links: [{ href: "contact.html", label: "اتصل بالفريق بخصوص الخصوصية" }]
          },
          {
            title: "كيف أتحكم في بياناتي؟",
            body: [
              "استخدم إعدادات المتصفح لحظر ملفات تعريف الارتباط أو مسح بيانات الموقع، وزر إعادة الضبط لإزالة حالة التعلّم. حظر التحليلات لا يغيّر التمارين التكيّفية."
            ],
            links: [{ href: "accessibility.html", label: "اقرأ بيان إمكانية الولوج" }]
          }
        ]
      },
      terms: {
        kicker: "الشروط",
        title: "شروط الاستخدام",
        description:
          "نطاق وحدود وغرض النموذج التجريبي JurisMind لمراجعة القانون بصورة تعليمية.",
        lede:
          "JurisMind نموذج تعليمي مجاني. استخدمه كأداة تدريب، لا كمرجع قانوني أو استشارة مهنية.",
        sections: [
          {
            title: "ما هي الخدمة؟",
            body: [
              "يقدّم الموقع تمارين داخل المتصفح ولوحة تقدّم محلية ومدرّساً دراسياً يعتمد على مطابقة الكلمات المفتاحية. يُقدَّم كما هو، وقد يتغيّر أو يتوقف دون إشعار."
            ],
            list: [
              "لا يلزم حساب أو دفع أو استشارة قانونية.",
              "التمارين مبادئ عامة قد لا تعكس ولايتك القضائية.",
              "قد تكون الإجابات الآلية ناقصة؛ تحقق دائماً من مقررك."
            ]
          },
          {
            title: "ما حدود المسؤولية؟",
            body: [
              "لا شيء في هذا الموقع استشارة قانونية. لا يضمن القائمون على المشروع أن التمارين كاملة أو حديثة أو مناسبة لامتحان معين، ولا يتحملون مسؤولية القرارات المتخذة استناداً وحدها إلى محتوى النموذج."
            ],
            links: [
              { href: "privacy.html", label: "اقرأ سياسة الخصوصية" },
              { href: "contact.html", label: "أبلغ عن مشكلة في المحتوى" }
            ]
          },
          {
            title: "كيف يمكنني إعادة استخدام المشروع؟",
            body: [
              "المستودع المصدرية عام. راجع الترخيص الحالي وشروط النسبة قبل إعادة استخدام الشيفرة أو النصوص أو الترجمات."
            ],
            links: [{ href: REPO, label: "افتح المستودع المصدرية" }]
          }
        ]
      },
      accessibility: {
        kicker: "إمكانية الولوج",
        title: "بيان إمكانية الولوج",
        description:
          "ميزات لوحة المفاتيح واللغات وRTL وتقليل الحركة وHTML الدلالي في JurisMind، وكيفية الإبلاغ عن عائق.",
        lede:
          "صُمّم JurisMind ليعمل مع التنقل بلوحة المفاتيح وقارئات الشاشة والنص العربي من اليمين إلى اليسار وتفضيلات تقليل الحركة. هذا مشروع تجريبي ولم يخضع بعد لتدقيق خارجي رسمي.",
        sections: [
          {
            title: "ما ميزات إمكانية الولوج المتاحة؟",
            body: [
              "تستخدم الصفحات معالم دلالية وعناوين وقوائم وجداول وتسميات توضيحية وعنوان H1 واحداً. تُصرَّح اللغة واتجاه الكتابة في العنصر الجذري، وللعناصر التفاعلية أنماط focus مرئية."
            ],
            list: [
              "محددات اللغة عناصر details أصلية وتعمل بدون JavaScript.",
              "الأيقونات الزخرفية مخفية عن تقنيات المساعدة عبر aria-hidden.",
              "تُلغى الرسوم المتحركة عندما يطلب النظام تقليل الحركة.",
              "تفعّل العربية تخطيطاً كاملاً من اليمين إلى اليسار وخطاً عربياً."
            ]
          },
          {
            title: "كيف أبلغ عن عائق في إمكانية الولوج؟",
            body: [
              "اذكر الصفحة واللغة وتقنية المساعدة والمهمة التي حاولت إنجازها. تسجيل شاشة قصير أو إصدار المتصفح مفيد لكنه ليس إلزامياً."
            ],
            links: [
              { href: "contact.html", label: "افتح صفحة الاتصال" },
              { href: ISSUES, label: "افتح بلاغاً عاماً" }
            ]
          },
          {
            title: "ما مستوى المطابقة الحالي؟",
            body: [
              "يستهدف المشروع مستوى WCAG 2.2 AA. يمكن متابعة القيود المعروفة في قائمة البلاغات العامة، وتساعد ملاحظات المتعلّمين على ترتيب أولويات الإصلاح."
            ]
          }
        ]
      }
    }
  }
};
