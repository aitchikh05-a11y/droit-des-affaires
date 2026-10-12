/* JurisMind — Dictionnaire de contenu français (source du build /fr) */

export default {
  code: 'fr',
  htmlLang: 'fr',
  label: 'Français',
  native: 'Français',
  dir: 'ltr',
  fonts: 'latin',
  meta: {
    title: 'JurisMind — Apprends plus intelligemment. Pense plus loin.',
    description:
      'JurisMind est un parcours d\u2019apprentissage adaptatif pour les étudiants en droit. Il détecte vos points faibles en droit des contrats, droit commercial et droit du travail, programme vos révisions et prépare l\u2019exercice qui corrigera ce que vous êtes sur le point d\u2019oublier.'
  },
  brand: { name: 'JurisMind', tagline: 'Parcours adaptatif pour étudiants en droit' },

  nav: {
    landing: [
      { href: '#method', label: 'Méthode' },
      { href: '#retention', label: 'Rétention' },
      { href: '#subjects', label: 'Matières' },
      { href: '#tutor', label: 'Tuteur IA' },
      { href: '#faq', label: 'FAQ' }
    ],
    app: [
      { href: 'dashboard.html', label: 'Tableau de bord', icon: 'grid' },
      { href: 'path.html', label: 'Parcours', icon: 'route' },
      { href: 'practice.html', label: 'Entraînement', icon: 'bolt' },
      { href: 'subjects.html', label: 'Matières', icon: 'books' },
      { href: 'tutor.html', label: 'Tuteur IA', icon: 'sparkles' }
    ],
    appShort: [
      { href: 'dashboard.html', label: 'Accueil', icon: 'grid' },
      { href: 'path.html', label: 'Parcours', icon: 'route' },
      { href: 'practice.html', label: 'Entraînement', icon: 'bolt' },
      { href: 'subjects.html', label: 'Matières', icon: 'books' },
      { href: 'tutor.html', label: 'Tuteur', icon: 'sparkles' }
    ]
  },

  ctas: {
    start: 'Créer mon parcours',
    demo: 'Voir le tableau de bord démo',
    continue: 'Reprendre ma séance de 12 min',
    openDashboard: 'Ouvrir le tableau de bord',
    practiceNow: 'S\u2019entraîner maintenant',
    reviewNow: 'Réviser les points faibles',
    seePath: 'Voir tout le parcours',
    askTutor: 'Interroger le tuteur',
    login: 'Se connecter',
    signup: 'Créer un compte',
    back: 'Retour à l\u2019accueil',
    switchLanguage: 'Langue'
  },

  landing: {
    eyebrow: 'Votre parcours d\u2019apprentissage',
    h1: 'Apprends plus intelligemment. Pense plus loin.',
    lede:
      'JurisMind cartographie ce que vous savez réellement en droit des contrats, droit commercial et droit du travail, repère les chapitres que vous oubliez en silence et vous donne l\u2019exercice suivant avant que la mémoire ne lâche.',
    ticker: [
      'Formation du contrat',
      'Vices du consentement',
      'Inexécution et remèdes',
      'Actes de commerce',
      'Chèque et lettre de change',
      'Procédure de licenciement',
      'Temps de travail',
      'Responsabilité du commettant',
      'Personnalité morale',
      'Recours pour excès de pouvoir'
    ],
    heroCard: {
      kicker: 'VOTRE PARCOURS',
      title: 'Vous devenez plus affûté.',
      sub: 'Vos prochaines étapes, selon votre progression.',
      nextFocus: 'Votre priorité',
      recommended: 'Conseillé : obligations et responsabilité contractuelle',
      weakSpots: 'Points faibles',
      weakSpotsValue: 'Réviser 3 notions',
      daily: 'Défi du jour',
      dailyValue: 'Résoudre un cas pratique',
      caption: 'Les chiffres de progression sont illustratifs.'
    },
    retention: {
      kicker: 'La fonction de rétention',
      title: 'Votre mémoire a une échéance. Nous tenons le calendrier.',
      lede:
        'Oublier n\u2019est pas un défaut de caractère, c\u2019est un calendrier. JurisMind modélise la courbe d\u2019oubli de chaque chapitre et remet la révision devant vous le jour où elle commence à glisser.',
      bullets: [
        {
          t: 'Chaque notion a un score de mémoire',
          d: 'Chaque concept porte un score de maîtrise qui bouge à chaque réponse : il monte quand vous savez, il baisse quand vous devinez.'
        },
        {
          t: 'Les révisions se programment seules',
          d: 'Intervalles courts au début, puis plus larges : 1 jour, 3 jours, 7, 14, 30. Vous révisez moins et vous retenez plus.'
        },
        {
          t: 'Les points faibles remontent d\u2019eux-mêmes',
          d: 'Les notions sous 60 % rejoignent une liste corail « attention » : aucune lacune ne reste invisible jusqu\u2019à l\u2019examen.'
        }
      ],
      chartCaption: 'Courbe d\u2019oubli et moments de révision',
      chartNow: 'Auj.',
      chartR1: 'R1',
      chartR2: 'R2',
      chartR3: 'R3',
      chartLegendForget: 'Sans révision',
      chartLegendKeep: 'Avec JurisMind'
    },
    method: {
      kicker: 'Comment le parcours s\u2019adapte',
      title: 'Trois gestes, répétés à chaque séance.',
      steps: [
        {
          n: '01',
          t: 'Diagnostiquer',
          d: 'Un contrôle adaptatif court note chaque chapitre déjà étudié. Plus besoin de deviner quoi réviser ce soir.'
        },
        {
          n: '02',
          t: 'Combler l\u2019écart',
          d: 'JurisMind sert d\u2019abord la notion la plus faible — et baisse la difficulté d\u2019un cran si vous butez.'
        },
        {
          n: '03',
          t: 'Programmer le retour',
          d: 'Chaque réponse reprogramme le chapitre. Une bonne réponse éloigne la révision, une erreur la ramène demain.'
        }
      ],
      nextLabel: 'Votre prochain exercice conseillé',
      nextReason: 'Généré en direct par le moteur adaptatif',
      pickSubject: 'Essayez : choisissez une matière'
    },
    subjects: {
      kicker: 'Matières',
      title: 'Un parcours par matière, un seul tableau de bord.',
      lede:
        'Contrats, commercial et travail forment le cœur du cursus d\u2019affaires — les autres matières se branchent sur le même moteur.',
      available: 'Exercices disponibles',
      soon: 'Bientôt disponible'
    },
    stats: {
      kicker: 'En chiffres',
      items: [
        { v: '18 400', l: 'étudiants sur un parcours' },
        { v: '+23 %', l: 'de rétention en plus après 6 semaines' },
        { v: '312 000', l: 'exercices adaptatifs servis' },
        { v: '3', l: 'langues d\u2019interface, RTL incluse' }
      ]
    },
    journey: {
      kicker: 'Le trajet',
      title: 'De la panique de L1 à la confiance du jour d\u2019examen.',
      steps: [
        { t: 'Diagnostic', d: 'Un contrôle de 15 minutes sur les matières déjà étudiées.' },
        { t: 'Fondations', d: 'Cours et drills sur les notions que vous ne pouvez pas manquer.' },
        { t: 'Application', d: 'Cas pratiques : appliquer la règle à des faits et défendre votre réponse.' },
        { t: 'Rétention', d: 'Révisions espacées qui maintiennent tout le programme vivant jusqu\u2019à l\u2019examen.' },
        { t: 'Préparation examen', d: 'Sujets blancs notés à partir de votre historique de points faibles.' }
      ]
    },
    voices: {
      kicker: 'Étudiants',
      title: 'Ce que le parcours change.',
      items: [
        { q: 'J\u2019ai arrêté de relire des chapitres que je connaissais. Mes points faibles ont enfin eu mes soirées.', n: 'Yasmine B.', r: 'L3, droit des affaires' },
        { q: 'Le calendrier de révision, c\u2019est tout le produit. Rien de ce que j\u2019ai étudié en octobre n\u2019a disparu en janvier.', n: 'Marc L.', r: 'Master 1, droit commercial' },
        { q: 'Le tuteur explique la même règle de trois façons jusqu\u2019à ce que ça clique, en français ou en arabe.', n: 'Salma K.', r: 'L2, droit privé' }
      ]
    },
    tutor: {
      kicker: 'Tuteur IA',
      title: 'Le coin lavande de JurisMind.',
      lede:
        'Demandez une règle, un arrêt ou une explication plus simple. Le tuteur connaît vos points faibles et répond dans la direction que votre parcours demande.',
      chips: [
        'Explique les vices du consentement simplement',
        'Compare chèque et lettre de change',
        'Quand un licenciement sans préavis est-il valable ?',
        'Donne-moi un cas sur la responsabilité contractuelle'
      ],
      disclaimer:
        'JurisMind est un outil de travail. Ce n\u2019est pas un conseil juridique et cela ne remplace ni votre cours, ni votre professeur, ni un avocat.'
    },
    faq: {
      kicker: 'FAQ',
      title: 'Les questions que les étudiants posent vraiment.',
      items: [
        {
          q: 'JurisMind, c\u2019est un résumé de cours ?',
          a: 'Non. JurisMind est un outil d\u2019entraînement et de rétention. Votre cours reste la référence ; nous faisons en sorte que vous vous en souveniez encore en semaine douze.'
        },
        {
          q: 'Quel droit est couvert ?',
          a: 'Le cœur des pays de tradition civiliste : contrats, commercial, travail, sociétés et droit administratif. Les exercices restent au niveau de la doctrine pour circuler entre les cours.'
        },
        {
          q: 'Faut-il créer un compte ?',
          a: 'Cette démo tourne entièrement dans votre navigateur : réponses, série et scores de maîtrise sont stockés localement sur votre appareil.'
        },
        {
          q: 'Est-ce que ça marche de droite à gauche ?',
          a: 'Oui. L\u2019arabe dispose d\u2019une mise en page RTL complète, d\u2019une police arabe et de son propre contenu — pas d\u2019un miroir de dernière minute.'
        }
      ]
    },
    finalCta: {
      title: 'Votre première séance dure douze minutes.',
      sub: 'Un diagnostic, une notion faible, une révision programmée. Toute la boucle est là.',
      note: 'Gratuit pour les étudiants · Sans carte bancaire'
    }
  },

  footer: {
    blurb: 'Parcours d\u2019apprentissage adaptatifs pour étudiants en droit. Diagnostiquer, drill, retenir.',
    columns: [
      {
        t: 'Produit',
        links: [
          { href: 'dashboard.html', label: 'Tableau de bord' },
          { href: 'path.html', label: 'Parcours' },
          { href: 'practice.html', label: 'Entraînement' },
          { href: 'subjects.html', label: 'Matières' }
        ]
      },
      {
        t: 'Matières',
        links: [
          { href: 'subjects.html#contract', label: 'Droit des contrats' },
          { href: 'subjects.html#commercial', label: 'Droit commercial' },
          { href: 'subjects.html#labour', label: 'Droit du travail' },
          { href: 'subjects.html#company', label: 'Droit des sociétés' }
        ]
      },
      {
        t: 'Apprendre',
        links: [
          { href: 'tutor.html', label: 'Tuteur IA' },
          { href: 'index.html#method', label: 'Méthode' },
          { href: 'index.html#faq', label: 'FAQ' },
          { href: 'index.html#retention', label: 'Rétention' }
        ]
      }
    ],
    legal: [
      { href: '#', label: 'Confidentialité' },
      { href: '#', label: 'Conditions' },
      { href: '#', label: 'Accessibilité' }
    ],
    disclaimer: 'Outil pédagogique — pas un conseil juridique.',
    rights: '© 2026 JurisMind. Projet de démonstration.',
    langLabel: 'Langue'
  },

  dash: {
    kicker: 'Votre parcours',
    h1: 'Vous devenez plus affûté.',
    sub: 'Vos prochaines étapes, selon votre progression.',
    greeting: 'Bonsoir',
    greetingMorning: 'Bonjour',
    greetingAfternoon: 'Bon après-midi',
    sessionPill: 'Séance de 12 min prête',
    nextFocus: 'Votre priorité',
    recommended: 'Conseillé',
    weakSpots: 'Points faibles',
    weakSpotsSub: 'notions sous 60 % de maîtrise',
    daily: 'Défi du jour',
    dailySub: 'Résoudre un cas pratique',
    streak: 'Série',
    streakSub: 'jours d\u2019affilée',
    best: 'Record',
    activity: '7 derniers jours',
    activitySub: 'Minutes travaillées et précision',
    minutes: 'min',
    accuracy: 'de réussite',
    reviewQueue: 'Calendrier de rétention',
    reviewQueueSub: 'Ce qui est à réviser, et quand',
    dueNow: 'À faire maintenant',
    dueToday: 'Aujourd\u2019hui',
    dueTomorrow: 'Demain',
    dueLater: 'Plus tard cette semaine',
    dueDate: 'Échéance',
    subjectProgress: 'Progression par matière',
    subjectProgressSub: 'Maîtrise, points faibles et prochaine révision',
    weakTopic: 'point faible',
    lastSeen: 'Vu',
    never: 'non commencé',
    daysAgo: 'il y a {n} jours',
    today: 'aujourd\u2019hui',
    yesterday: 'hier',
    milestones: 'Étapes',
    milestonesSub: 'Où vous en êtes sur le parcours en cours',
    badges: 'Badges',
    badgesSub: '{n} sur {total} débloqués',
    recommendedExercises: 'Exercices conseillés',
    recommendedExercisesSub: 'Choisis par le moteur adaptatif',
    startExercise: 'Commencer',
    level: 'Niveau',
    xp: 'XP',
    nextLevel: '{n} XP avant le niveau {l}',
    todayPlan: 'Programme du jour',
    planItem1: 'Réviser 3 notions de droit des contrats',
    planItem2: 'Un cas pratique de droit commercial',
    planItem3: 'Défi du jour : droit du travail',
    planDone: 'fait',
    reset: 'Réinitialiser la démo',
    resetConfirm: 'Réinitialiser la progression et repartir d\u2019un diagnostic vierge ?',
    sampleNote: 'Données de démo — la progression reste dans votre navigateur.',
    continueBtn: 'Reprendre la séance',
    examCountdown: 'Examen final',
    examIn: '{n} jours',
    readiness: 'Préparation examen'
  },

  path: {
    kicker: 'Parcours',
    h1: 'Un parcours, quatre étapes.',
    sub: 'Diagnostiquer, construire, appliquer, retenir. Chaque matière suit la même colonne vertébrale.',
    stage: 'Étape',
    steps: 'étapes',
    done: 'Terminé',
    current: 'En cours',
    locked: 'Verrouillé',
    checkpoint: 'Point de contrôle',
    foundations: 'Fondations',
    application: 'Application',
    retention: 'Rétention',
    review: 'Révision',
    mockExam: 'Examen blanc',
    reviewCycle: 'Cycle de révision espacée',
    diagnostic: 'Diagnostic',
    lesson: 'Cours',
    drill: 'Drill',
    caseLab: 'Cas pratique',
    progressOnPath: 'Avancement du parcours',
    unlockNext: '{n} étapes pour débloquer l\u2019étape suivante',
    stageDone: 'Étape terminée',
    examineMode: 'Mode examen',
    readinessScore: 'Score de préparation',
    readinessSub: 'Calculé sur la maîtrise et l\u2019ancienneté des révisions dans tout le programme.',
    atRisk: 'Notions à risque',
    atRiskSub: 'Maîtrise élevée mais aucune révision depuis longtemps',
    upcoming: 'Révisions à venir',
    upcomingSub: 'Votre calendrier des 14 prochains jours',
    practiceStage: 'Travailler cette étape',
    tabs: 'Matière'
  },

  practice: {
    kicker: 'Entraînement adaptatif',
    h1: 'Entraînement',
    sub: 'Chaque réponse fait bouger votre score de maîtrise et reprogramme le chapitre.',
    chooseSubject: 'Choisir une matière',
    chooseSubjectSub: 'Le moteur choisit la notion — vous pouvez forcer.',
    anySubject: 'Laisser le moteur décider',
    difficulty: 'Difficulté',
    sessionSoFar: 'Cette séance',
    correctCount: '{n} bonnes réponses',
    liveMastery: 'Maîtrise en direct',
    question: 'Question',
    of: 'sur',
    submit: 'Vérifier ma réponse',
    next: 'Question suivante',
    results: 'Voir mon résultat',
    correct: 'Bonne réponse',
    wrong: 'Pas tout à fait',
    theAnswer: 'La bonne réponse est',
    whyThis: 'Pourquoi cette question ?',
    whyRight: 'Pourquoi c\u2019est juste',
    explanation: 'La règle',
    yourScore: 'Votre score',
    sessionSummary: 'Bilan de la séance',
    masteryMoved: 'Maîtrise',
    xpEarned: 'XP gagnés',
    streakNow: 'série de {n} jours',
    badgeUnlocked: 'Badge débloqué',
    nextReview: 'Prochaine révision',
    reviewIn: 'dans {n} jour(s)',
    reviewToday: 'plus tard aujourd\u2019hui',
    backToDashboard: 'Retour au tableau de bord',
    practiceAgain: 'Refaire une séance',
    startDiagnostic: 'Lancer le diagnostic',
    diagnosticNote: 'Un diagnostic note chaque chapitre avant votre première séance.',
    keyboardHint: 'Astuce : tapez 1–4 pour répondre, Entrée pour continuer.',
    emptyTitle: 'Pas encore d\u2019exercices dans cette matière',
    emptyText: 'Choisissez une autre matière — commercial, contrats, travail, sociétés et administratif ont des exercices actifs.',
    timerLabel: 'Temps de séance',
    done: 'Acquis',
    missed: 'Manqués',
    masteryUp: 'Maîtrise en hausse',
    masteryDown: 'Maîtrise en baisse'
  },

  subjectsPage: {
    kicker: 'Bibliothèque de matières',
    h1: 'Huit matières, un seul moteur.',
    sub: 'Contrats, commercial et travail portent le cursus ; les autres se branchent sur le même parcours.',
    mastery: 'Maîtrise',
    topics: 'notions',
    weakTopics: 'Points faibles',
    noWeak: 'Aucun point faible. Continuez les révisions.',
    lastSession: 'Dernière séance',
    exercises: '{n} exercices',
    openPath: 'Ouvrir le parcours',
    topicBreakdown: 'Détail par notion',
    schedule: 'Prochaines révisions',
    difficultyMix: 'Répartition difficulté',
    available: 'Exercices disponibles',
    soon: 'Bientôt disponible',
    soonNote: 'Les exercices de cette matière sont en cours de rédaction.',
    weak: 'Faible',
    solid: 'Correct',
    strong: 'Solide',
    allTopics: 'Toutes les notions'
  },

  tutor: {
    kicker: 'Tuteur IA',
    h1: 'Interrogez JurisMind.',
    sub: 'Le tuteur connaît vos points faibles et répond dans la direction que votre parcours demande.',
    placeholder: 'Posez une question sur une règle, un arrêt, une définition…',
    send: 'Envoyer',
    you: 'Vous',
    tutor: 'JurisMind',
    thinking: 'Lecture de votre parcours…',
    promptsTitle: 'Essayez une de ces questions',
    promptsSub: 'D\u2019après vos points faibles',
    contextTitle: 'Contexte du tuteur',
    contextSub: 'Ce que le tuteur peut voir',
    ctxWeak: 'Vos points faibles',
    ctxPath: 'Étape actuelle',
    ctxLang: 'Langue de réponse',
    modeTitle: 'Style de réponse',
    modeSimple: 'Simple',
    modeExam: 'Examen',
    modeCase: 'Cas',
    styleSimple: 'Explique comme si c\u2019était ma première semaine.',
    styleExam: 'Donne-moi la version prête pour l\u2019examen.',
    styleCase: 'Montre-moi un cas qui l\u2019applique.',
    sourcesTitle: 'Sources à vérifier',
    disclaimer:
      'Tuteur de démonstration avec réponses pré-écrites. Vérifiez toujours votre cours et votre code national avant de vous fier à une réponse.',
    newChat: 'Nouvelle conversation',
    suggestQ: 'Question suggérée',
    fallback:
      'Bonne question. JurisMind ne peut pas encore traiter un sujet hors de sa bibliothèque. Essayez : formation du contrat, vices du consentement, inexécution et remèdes, actes de commerce, chèque et lettre de change, licenciement, temps de travail ou responsabilité du commettant.'
  },

  auth: {
    kicker: 'Compte de démo',
    h1: 'Votre parcours est stocké dans votre navigateur.',
    sub: 'Cette démo n\u2019exige pas de compte. Connectez-vous seulement pour afficher un nom dans la barre latérale.',
    name: 'Nom affiché',
    email: 'E-mail',
    password: 'Mot de passe',
    submit: 'Créer mon parcours',
    note: 'Aucune donnée ne quitte votre appareil dans cette démo.',
    or: 'ou',
    guest: 'Continuer en invité'
  },

  ui: {
    difficulty: { 1: 'Fondation', 2: 'Cœur', 3: 'Avancé' },
    diffShort: { 1: 'F', 2: 'C', 3: 'A' },
    level: 'Niveau',
    xp: 'XP',
    mastery: 'Maîtrise',
    accuracy: 'Réussite',
    streakDays: 'jours de série',
    days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    near: {
      now: 'à faire maintenant',
      today: 'plus tard aujourd\u2019hui',
      tomorrow: 'demain',
      d2: 'dans 2 jours',
      d3: 'dans 3 jours',
      d7: 'dans une semaine',
      d14: 'dans 2 semaines',
      d30: 'dans un mois',
      late: 'en retard'
    },
    reasons: {
      weakest: 'Parce que {subject} est votre matière la plus faible aujourd\u2019hui.',
      missed: 'Parce que vous avez manqué la dernière question sur {topic}.',
      due: 'Parce que la révision de {topic} est due aujourd\u2019hui.',
      streak: 'Parce que vous êtes sur une série de {n} jours — il est temps de monter d\u2019un cran.',
      onRoll: 'Vous avez réussi les {n} dernières, donc celle-ci est plus dure.',
      needsWork: '{topic} est signalé comme point faible : {n} % de maîtrise.',
      almost: 'Presque — {n} % de maîtrise sur {topic}.',
      fresh: 'Parce que {topic} est le chapitre le plus ancien que vous n\u2019avez pas révisé.'
    },
    feedback: {
      masteryUp: 'Maîtrise +{n}',
      masteryDown: 'Maîtrise −{n}',
      scheduled: 'Révision programmée {when}',
      streakKeep: 'Série maintenue : jour {n}.',
      streakStart: 'Jour 1 d\u2019une nouvelle série.',
      adaptiveUp: 'Difficulté en hausse. Le moteur vous croit prêt.',
      adaptiveDown: 'Difficulté en baisse. Reprenons la règle d\u2019abord.'
    },
    badges: {
      unlocked: 'Badge débloqué : {name}',
      firstCase: 'Premier cas résolu',
      streak7: 'Série de 7 jours',
      streak30: 'Série de 30 jours',
      cleanSweep: 'Séance parfaite',
      contractMaster: 'Droit des contrats 80 %',
      reviewer: 'Guerrier de la révision',
      nightOwl: 'Oiseau de nuit',
      diagnostic: 'Diagnostic terminé'
    },
    toast: { reset: 'Démo réinitialisée.', saved: 'Progression enregistrée localement.' },
    status: { weak: 'Faible', solid: 'Correct', strong: 'Solide' }
  },

  subjects: [
    {
      id: 'contract', accent: 'lime', icon: 'scroll',
      name: 'Droit des contrats', short: 'Contrats',
      blurb: 'Formation, consentement, effets, inexécution et remèdes — la colonne vertébrale du droit des affaires.',
      topics: [
        { id: 'formation', name: 'Formation et offre', key: 'offre, acceptation, rencontre des volontés' },
        { id: 'consent', name: 'Consentement et vices', key: 'erreur, dol, violence, lésion' },
        { id: 'effects', name: 'Effets et exécution', key: 'force obligatoire, bonne foi, interprétation' },
        { id: 'breach', name: 'Inexécution et remèdes', key: 'dommages-intérêts, exécution forcée, force majeure' }
      ]
    },
    {
      id: 'commercial', accent: 'mint', icon: 'chart',
      name: 'Droit commercial', short: 'Commercial',
      blurb: 'Statut du commerçant, actes de commerce, effets de commerce et procédures collectives.',
      topics: [
        { id: 'acts', name: 'Actes de commerce et statut', key: 'immatriculation, présomptions' },
        { id: 'lease', name: 'Bail commercial et fonds de commerce', key: 'locaux, durée, renouvellement, clientèle' },
        { id: 'instruments', name: 'Chèque et lettre de change', key: 'endossement, protêt, droits du porteur' },
        { id: 'insolvency', name: 'Difficultés et cessation des paiements', key: 'sauvegarde, liquidation, classement' }
      ]
    },
    {
      id: 'labour', accent: 'lavender', icon: 'people',
      name: 'Droit du travail', short: 'Travail',
      blurb: 'Contrat de travail, temps de travail, discipline et droits collectifs.',
      topics: [
        { id: 'contract-emp', name: 'Contrat de travail', key: 'subordination, période d\u2019essai, forme' },
        { id: 'time', name: 'Temps de travail et congés', key: 'durée, heures supplémentaires, repos' },
        { id: 'dismissal', name: 'Rupture et licenciement', key: 'motif, procédure, préavis, indemnités' },
        { id: 'collective', name: 'Droits collectifs', key: 'syndicats, négociation, grève' }
      ]
    },
    {
      id: 'liability', accent: 'coral', icon: 'shield',
      name: 'Responsabilité civile', short: 'Responsabilité',
      blurb: 'Faute, dommage, lien de causalité — et quand la responsabilité glisse vers autrui.',
      topics: [
        { id: 'elements', name: 'Faute, dommage, causalité', key: 'les trois éléments' },
        { id: 'vicarious', name: 'Responsabilité du fait d\u2019autrui', key: 'commettants, parents, gardiens' },
        { id: 'product', name: 'Produits défectueux et voisinage', key: 'biens défectueux, troubles anormaux' }
      ]
    },
    {
      id: 'company', accent: 'indigo', icon: 'building',
      name: 'Droit des sociétés', short: 'Sociétés',
      blurb: 'Constitution, gouvernance et limites de la responsabilité des associés.',
      topics: [
        { id: 'incorporation', name: 'Constitution et personnalité morale', key: 'immatriculation, écran social, capacité' },
        { id: 'governance', name: 'Gouvernance et dirigeants', key: 'conseil, gérants, conflits d\u2019intérêts' },
        { id: 'shareholders', name: 'Associés et capital', key: 'parts, dividendes, cessions' }
      ]
    },
    {
      id: 'admin', accent: 'teal', icon: 'landmark',
      name: 'Droit administratif', short: 'Administratif',
      blurb: 'Actes administratifs, service public et contrôle juridictionnel.',
      topics: [
        { id: 'acts-admin', name: 'Actes administratifs', key: 'actes unilatéraux, publication, retrait' },
        { id: 'review', name: 'Contentieux administratif', key: 'excès de pouvoir, détournement, procédure' },
        { id: 'contracts-admin', name: 'Marchés publics et responsabilité', key: 'passation, responsabilité de l\u2019État' }
      ]
    },
    {
      id: 'criminal', accent: 'slate', icon: 'gavel',
      name: 'Droit pénal des affaires', short: 'Pénal',
      blurb: 'Les infractions que rencontre l\u2019avocat d\u2019affaires : escroquerie, abus de confiance, faux.',
      topics: [
        { id: 'elements-crim', name: 'Éléments de l\u2019infraction', key: 'acte, intention, tentative' },
        { id: 'business-crim', name: 'Escroquerie et abus de confiance', key: 'détournement, faux et usage de faux' }
      ]
    },
    {
      id: 'family', accent: 'rose', icon: 'home',
      name: 'Droit de la famille et des personnes', short: 'Famille',
      blurb: 'Capacité, contrats de mariage et effets patrimoniaux du droit de la famille.',
      topics: [
        { id: 'capacity', name: 'Capacité et état des personnes', key: 'mineurs, tutelle, curatelle' },
        { id: 'marriage', name: 'Mariage et biens', key: 'régimes, contribution aux charges' }
      ]
    }
  ],

  questions: [
    {
      id: 'c1', subject: 'contract', topic: 'formation', level: 1,
      stem: 'Un commerçant expose une montre en vitrine avec une étiquette à 900. Un client entre et déclare : « je l\u2019achète ». D\u2019où vient l\u2019offre ?',
      options: ['La marchandise exposée est une offre du commerçant', 'La marchandise exposée est une invitation à entrer en pourparlers ; c\u2019est le client qui offre', 'Aucune offre n\u2019existe avant la signature d\u2019un écrit', 'L\u2019offre naît de façon commune dès que le client entre'],
      answer: 1,
      explain: 'L\u2019exposition de marchandises avec un prix est en principe une offre de contracter pas assez précise : c\u2019est une invitation à entrer en pourparlers. Le client fait l\u2019offre, la vente se forme quand le commerçant l\u2019accepte.'
    },
    {
      id: 'c2', subject: 'contract', topic: 'consent', level: 1,
      stem: 'Lequel de ces éléments est un vice du consentement ?',
      options: ['Une signature rédigée dans une langue étrangère', 'Un prix qui se révèle défavorable par la suite', 'Une erreur sur les qualités substantielles de la chose', 'Le fait de signer sans lire les clauses'],
      answer: 2,
      explain: 'Les vices du consentement sont l\u2019erreur, le dol et la violence (et la lésion quand la loi l\u2019admet). L\u2019erreur sur les qualités substantielles ouvre la nullité ; un prix défavorable n\u2019est qu\u2019une mauvaise affaire.'
    },
    {
      id: 'c3', subject: 'contract', topic: 'consent', level: 2,
      stem: 'Le vendeur cache que la machine vendue a une culasse fissurée, que l\u2019acheteur ne pouvait pas découvrir. Quel vice est en cause ?',
      options: ['La violence', 'Le dol', 'La lésion', 'Aucun vice : l\u2019acheteur devait vérifier'],
      answer: 1,
      explain: 'Le dol est une manœuvre intentionnelle destinée à tromper l\u2019autre partie. Il faut que la victime n\u2019ait pas pu découvrir la vérité par des diligences normales, ce qui est le cas ici.'
    },
    {
      id: 'c4', subject: 'contract', topic: 'effects', level: 2,
      stem: 'Un contrat valablement formé se révèle une mauvaise affaire pour l\u2019une des parties. En principe, que fait le juge ?',
      options: ['Il réécrit le prix pour rétablir l\u2019équilibre', 'Il applique l\u2019accord : il s\u2019impose aux parties (pacta sunt servanda)', 'Il l\u2019annule parce que l\u2019équilibre est rompu', 'Il le suspend jusqu\u2019à renégociation'],
      answer: 1,
      explain: 'La force obligatoire du contrat fait prévaloir l\u2019accord sur l\u2019intérêt individuel. Le juge peut intervenir en cas de déséquilibre de bonne foi, mais il ne réécrit pas une convention valable.'
    },
    {
      id: 'c5', subject: 'contract', topic: 'breach', level: 3,
      stem: 'L\u2019exécution devient impossible après un événement imprévisible, irrésistible et non imputable au débiteur. Quel est l\u2019effet ?',
      options: ['Le débiteur doit des dommages-intérêts mais garde le contrat', 'Le débiteur ne doit rien : la force majeure libère l\u2019obligation', 'Le contrat est nul depuis l\u2019origine', 'Seul le créancier peut résoudre, avec dommages-intérêts'],
      answer: 1,
      explain: 'La force majeure est extérieure, imprévisible et irrésistible. Elle exonère le débiteur de sa responsabilité et le contrat est en principe résolu plutôt que sanctionné.'
    },
    {
      id: 'c6', subject: 'contract', topic: 'breach', level: 3,
      stem: 'Avant la date de livraison, le vendeur écrit à l\u2019acheteur qu\u2019il ne livrera rien. Que peut faire l\u2019acheteur ?',
      options: ['Rien avant l\u2019expiration du délai de livraison', 'Tenir l\u2019inexécution pour certaine et demander la résolution immédiate avec dommages-intérêts', 'Demander seulement une réduction du prix', 'Forcer le vendeur à livrer avec l\u2019aide de la police'],
      answer: 1,
      explain: 'L\u2019inexécution anticipée certaine permet au créancier d\u2019agir aussitôt : résolution et dommages-intérêts, ou exécution forcée en nature avec astreinte si elle est possible.'
    },
    {
      id: 'c7', subject: 'commercial', topic: 'acts', level: 1,
      stem: 'Lequel de ces actes est un acte de commerce par nature ?',
      options: ['Acheter une maison pour y habiter', 'Acheter des marchandises pour les revendre', 'Signer un contrat de travail en tant que salarié', 'Une donation entre proches'],
      answer: 1,
      explain: 'L\u2019achat pour revendre, avec intention de profit, est l\u2019acte de commerce par excellence. L\u2019immobilier personnel et les libéralités relèvent du droit civil.'
    },
    {
      id: 'c8', subject: 'commercial', topic: 'acts', level: 2,
      stem: 'Quelle est la conséquence principale du statut de commerçant ?',
      options: ['L\u2019obligation de s\u2019immatriculer au registre du commerce et de tenir une comptabilité', 'Une exonération automatique d\u2019impôt', 'L\u2019interdiction d\u2019embaucher des salariés', 'Le droit de refuser toute responsabilité'],
      answer: 0,
      explain: 'Le statut de commerçant entraîne des obligations : immatriculation au registre du commerce, comptabilité, régime propre en cas de difficultés — ce qui permet aux créanciers de suivre l\u2019activité.'
    },
    {
      id: 'c9', subject: 'commercial', topic: 'instruments', level: 2,
      stem: 'Quelle est la différence essentielle entre le chèque et la lettre de change ?',
      options: ['Le chèque est toujours payable à l\u2019étranger', 'Le chèque est tiré sur une banque et payable à vue ; la lettre de change suppose un terme et un tiré', 'La lettre de change n\u2019est valable qu\u2019entre commerçants', 'Il n\u2019y a pas de différence pratique'],
      answer: 1,
      explain: 'Le chèque est un instrument de paiement tiré sur une banque, payable à vue. La lettre de change est un instrument de crédit : un terme, un tiré non bancaire possible, et un endossement qui la transmet.'
    },
    {
      id: 'c10', subject: 'commercial', topic: 'insolvency', level: 3,
      stem: 'Une société ne peut plus payer ses dettes échues avec l\u2019actif disponible. Qu\u2019est-ce que cela déclenche ?',
      options: ['L\u2019obligation d\u2019ouvrir une procédure collective (cessation des paiements)', 'La dissolution automatique de la société', 'La responsabilité personnelle de tous les salariés', 'Rien tant qu\u2019un créancier ne réclame pas une facture'],
      answer: 0,
      explain: 'La cessation des paiements est le fait générateur des procédures collectives. Les dirigeants doivent déclarer dans le délai légal, sous peine d\u2019une action en comblement du passif.'
    },
    {
      id: 'c11', subject: 'labour', topic: 'contract-emp', level: 1,
      stem: 'Quel élément transforme une relation de service en contrat de travail ?',
      options: ['Le paiement sur facture', 'Le lien de subordination juridique', 'Le lieu d\u2019exécution du travail', 'Un montant mensuel fixe'],
      answer: 1,
      explain: 'La subordination — le pouvoir de donner des directives, de contrôler et de sanctionner — est le critère décisif. Le mode de paiement ou la qualification retenue par les parties ne change pas la nature de la relation.'
    },
    {
      id: 'c12', subject: 'labour', topic: 'dismissal', level: 2,
      stem: 'Un employeur licencie un salarié pour vol sans entretien préalable ni énoncé écrit du motif. Quelle est la conséquence probable ?',
      options: ['Le licenciement est valable car le vol est grave', 'Le licenciement peut être jugé irrégulier pour vice de procédure et ouvrir des dommages-intérêts', 'Le licenciement se transforme en démission', 'Le salarié doit être réintégré automatiquement'],
      answer: 1,
      explain: 'Une faute grave peut justifier le licenciement, mais pas si la procédure est court-circuitée. Les juges allouent en général des dommages-intérêts pour irrégularité, même si les faits sont sérieux.'
    },
    {
      id: 'c13', subject: 'labour', topic: 'time', level: 3,
      stem: 'Un salarié en CDD continue de travailler après le terme, sans nouveau contrat écrit. Quel est l\u2019effet habituel ?',
      options: ['Le contrat s\u2019arrête le jour du terme', 'Le contrat est généralement requalifié en CDI', 'La période supplémentaire n\u2019est pas payée', 'Le salarié doit des dommages-intérêts pour le dépassement'],
      answer: 1,
      explain: 'Dans la plupart des codes du travail, la poursuite du travail après le terme prive le CDD de sa forme écrite : la relation est requalifiée en contrat à durée indéterminée avec les droits correspondants.'
    },
    {
      id: 'c14', subject: 'labour', topic: 'collective', level: 2,
      stem: 'Qui négocie et signe un accord collectif d\u2019entreprise ?',
      options: ['L\u2019inspecteur du travail seul', 'Les représentants des salariés et l\u2019employeur', 'Le tribunal de commerce', 'Chaque salarié individuellement'],
      answer: 1,
      explain: 'La négociation collective se mène entre l\u2019employeur (ou l\u2019organisation patronale) et les représentants des salariés ou les syndicats. L\u2019accord lie les catégories qu\u2019il couvre.'
    },
    {
      id: 'c15', subject: 'liability', topic: 'elements', level: 1,
      stem: 'Quels sont les trois éléments de la responsabilité civile pour faute personnelle ?',
      options: ['Contrat, offre et acceptation', 'Faute, dommage et lien de causalité', 'Intention, profit et perte', 'Immatriculation, publication et opposition'],
      answer: 1,
      explain: 'Une faute, un dommage et un lien de causalité entre les deux. Retirez un élément et l\u2019action échoue — c\u2019est pourquoi la causalité est toujours testée en cas pratique.'
    },
    {
      id: 'c16', subject: 'liability', topic: 'vicarious', level: 2,
      stem: 'Un salarié, au volant d\u2019une camionnette de livraison, blesse un piéton pendant sa tournée. Qui est responsable en principe ?',
      options: ['Le salarié uniquement', 'L\u2019employeur répond du fait du salarié agissant dans ses fonctions, avec un recours possible contre lui', 'Le fabricant de la camionnette', 'Personne : le piéton a accepté le risque'],
      answer: 1,
      explain: 'La responsabilité du commettant pèse sur l\u2019employeur lorsque le salarié agit dans ses fonctions ou sans les dépasser. La faute de la victime peut réduire l\u2019indemnisation.'
    },
    {
      id: 'c17', subject: 'company', topic: 'incorporation', level: 1,
      stem: 'Que signifie concrètement la personnalité morale d\u2019une société ?',
      options: ['Les associés détiennent directement les biens sociaux', 'La société a un patrimoine propre, distinct de celui des associés', 'La société doit toujours être un organisme public', 'Les dirigeants sont personnellement liés par chaque contrat'],
      answer: 1,
      explain: 'Dès l\u2019immatriculation, la société a ses droits et son patrimoine. Cette séparation protège les associés des dettes sociales, sauf lorsque l\u2019écran social est écarté en cas de fraude.'
    },
    {
      id: 'c18', subject: 'company', topic: 'shareholders', level: 2,
      stem: 'Un associé de SARL détient 10 % des parts. Quelle est la limite de sa responsabilité pour les dettes sociales ?',
      options: ['Responsabilité personnelle illimitée', 'Il risque le montant souscrit et pas plus, sauf caution personnelle', 'Il répond de la totalité de la dette', 'Il n\u2019est jamais responsable'],
      answer: 1,
      explain: 'La limitation de responsabilité plafonne la perte au capital souscrit, sauf caution personnelle, comportement abusif ou confusion des patrimoines.'
    },
    {
      id: 'c19', subject: 'admin', topic: 'review', level: 2,
      stem: 'Quel motif est propre au contrôle juridictionnel de l\u2019acte administratif ?',
      options: ['La violation d\u2019un contrat commercial', 'Le détournement de pouvoir', 'La cessation des paiements de l\u2019administration', 'Le défaut de paiement d\u2019une dette privée'],
      answer: 1,
      explain: 'Le détournement de pouvoir est le moyen classique du contentieux administratif : l\u2019acte est régulier en la forme, mais l\u2019autorité en a usé dans un but autre que celui prévu par la loi.'
    }
  ],

  tutorKB: [
    {
      kw: ['consent', 'vice', 'erreur', 'dol', 'violence', 'lésion', 'nul'],
      title: 'Les vices du consentement',
      body:
        'Plan classique en trois lignes. L\u2019erreur : une représentation fausse de la réalité, et seule l\u2019erreur sur les qualités substantielles de la chose (ou sur la personne dans les contrats intuitu personae) entraîne la nullité. Le dol : une manœuvre intentionnelle d\u2019une partie, ou d\u2019un tiers dont l\u2019autre partie avait connaissance, que la victime ne pouvait pas découvrir par des diligences normales — il doit être la cause déterminante. La violence : l\u2019urgence physique n\u2019est pas exigée, la contrainte morale suffit ; la menace d\u2019une voie de droit devient un vice lorsqu\u2019elle sert à obtenir un avantage excessif. Sanction : nullité relative, prescription quinquennale, et le dol ouvre en plus des dommages-intérêts.',
      sources: ['Formation du contrat', 'Effets de la nullité']
    },
    {
      kw: ['licenci', 'faute', 'préavis', 'rupture', 'procédure', 'entretien'],
      title: 'Le licenciement pour faute',
      body:
        'Un licenciement pour motif valable suppose trois choses. Un motif réel et sérieux — une faute certaine et datée. Une procédure — énoncé écrit du motif, entretien préalable et possibilité d\u2019être assisté. Et une proportionnalité — la sanction doit être proportionnée à la faute. Si la procédure est omise, le licenciement reste justifié sur le fond mais devient irrégulier et ouvre en général des dommages-intérêts. La faute grave est le cas rare où aucun préavis n\u2019est dû.',
      sources: ['Droit du travail — rupture', 'Garanties procédurales']
    },
    {
      kw: ['chèque', 'cheque', 'lettre', 'change', 'endossement', 'protêt', 'tiré'],
      title: 'Chèque et lettre de change',
      body:
        'Le chèque : un ordre écrit de payer à vue, tiré sur une banque, remis comme instrument de paiement. La lettre de change : un instrument de crédit — un terme, un tiré qui peut être un débiteur commercial, et l\u2019endossement qui transmet le titre à un porteur. Les deux partagent le même principe clé : l\u2019engagement abstrait du signataire. Signer, c\u2019est accepter le contenu : les exceptions personnelles contre le porteur précédent ne sont en principe pas opposables au porteur actuel.',
      sources: ['Droit commercial — effets', 'Endossement et protêt']
    },
    {
      kw: ['commettant', 'employeur', 'préposé', 'autrui', 'responsabilité de l\u2019employeur'],
      title: 'La responsabilité du commettant',
      body:
        'L\u2019employeur répond du dommage causé par ses préposés agissant dans leurs fonctions, ou sans les avoir dépassées. Deux conditions : un lien de subordination, et un acte en rapport avec les fonctions. Si le préposé a agi totalement hors de ses fonctions, la responsabilité revient en principe à lui. La victime peut agir directement contre le commettant. Deux réflexes de correction : quelle est la faute (action ou abstention) et quel est le lien de causalité — avec rupture du lien en cas de force majeure ou de fait extérieur.',
      sources: ['Responsabilité civile — éléments', 'Responsabilité du fait d\u2019autrui']
    },
    {
      kw: ['force majeure', 'impossib', 'exonér', 'imprévisible', 'irrésistible'],
      title: 'La force majeure',
      body:
        'Trois critères : imprévisible, irrésistible et extérieur au débiteur. Seul un événement qui réunit les trois libère l\u2019obligation. Attention au piège : un événement irrésistible mais prévisible (un mouvement de grève annoncé) ou extérieur mais prévisible n\u2019est pas une force majeure ; le contrat peut alors être renégocié plutôt que résolu, selon le code et les clauses.',
      sources: ['Inexécution et remèdes', 'Causes d\u2019exonération']
    },
    {
      kw: ['formation', 'offre', 'acceptation', 'pourparlers', 'rencontre'],
      title: 'La formation du contrat',
      body:
        'Deux mouvements. L\u2019offre : ferme, précise et révocable jusqu\u2019à l\u2019acceptation, sauf délai fixé par la loi ou par l\u2019offre. L\u2019acceptation : la rencontre des volontés, le silence ne valant pas acceptation. Pièges à repérer : la marchandise exposée est une offre de contracter insuffisante ; une contre-proposition anéantit l\u2019offre initiale ; en droit des affaires, l\u2019écrit de confirmation compte, donc un bon de commande signé ou accepté suffit.',
      sources: ['Formation du contrat', 'Consentement']
    },
    {
      kw: ['acte de commerce', 'commerçant', 'registre', 'immatricul'],
      title: 'Actes de commerce et statut du commerçant',
      body:
        'Trois catégories : les actes de commerce par nature (achat pour revendre, effets de commerce), par accessoire (accomplis par un commerçant pour les besoins de son activité) et par déclaration. Condition du statut : accomplir des actes de commerce de façon habituelle et indépendante. Conséquences : immatriculation au registre du commerce, obligations comptables et régime des procédures collectives.',
      sources: ['Droit commercial — statut du commerçant']
    },
    {
      kw: ['associé', 'sarl', 'sa', 'responsabilité limitée', 'capital', 'parts'],
      title: 'Associés et responsabilité',
      body:
        'La limitation de responsabilité plafonne la perte de l\u2019associé au capital souscrit. Exceptions à connaître : cautions personnelles signées par le gérant ou l\u2019associé, actes abusifs, confusion du patrimoine social avec un patrimoine privé, ou défaut de reconstitution du capital — autant de cas qui ouvrent une responsabilité illimitée.',
      sources: ['Droit des sociétés — personnalité morale']
    }
  ],

  badgeMeta: [
    { id: 'diagnostic', icon: 'compass' },
    { id: 'firstCase', icon: 'gavel' },
    { id: 'streak7', icon: 'flame' },
    { id: 'streak30', icon: 'crown' },
    { id: 'cleanSweep', icon: 'target' },
    { id: 'contractMaster', icon: 'scroll' },
    { id: 'reviewer', icon: 'repeat' },
    { id: 'nightOwl', icon: 'moon' }
  ]
};
