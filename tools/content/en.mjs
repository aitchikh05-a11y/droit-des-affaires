/* JurisMind — English content dictionary (source of truth for the /en build) */

export default {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  native: 'English',
  dir: 'ltr',
  fonts: 'latin',
  meta: {
    title: 'JurisMind — Learn smarter. Think deeper.',
    description:
      'JurisMind is an adaptive learning path for law students. It tracks your weak topics in contract, commercial and labour law, schedules your revisions and builds the next exercise around what you are about to forget.'
  },
  brand: { name: 'JurisMind', tagline: 'Adaptive learning path for law students' },

  nav: {
    landing: [
      { href: '#method', label: 'Method' },
      { href: '#retention', label: 'Retention' },
      { href: '#subjects', label: 'Subjects' },
      { href: '#tutor', label: 'AI tutor' },
      { href: '#evidence', label: 'Evidence' },
      { href: '#faq', label: 'FAQ' }
    ],
    app: [
      { href: 'dashboard.html', label: 'Dashboard', icon: 'grid' },
      { href: 'path.html', label: 'Learning path', icon: 'route' },
      { href: 'practice.html', label: 'Practice', icon: 'bolt' },
      { href: 'subjects.html', label: 'Subjects', icon: 'books' },
      { href: 'tutor.html', label: 'AI tutor', icon: 'sparkles' }
    ],
    appShort: [
      { href: 'dashboard.html', label: 'Home', icon: 'grid' },
      { href: 'path.html', label: 'Path', icon: 'route' },
      { href: 'practice.html', label: 'Practice', icon: 'bolt' },
      { href: 'subjects.html', label: 'Subjects', icon: 'books' },
      { href: 'tutor.html', label: 'Tutor', icon: 'sparkles' }
    ]
  },

  ctas: {
    start: 'Build my learning path',
    demo: 'Explore the demo dashboard',
    continue: 'Continue my 12-min session',
    openDashboard: 'Open dashboard',
    practiceNow: 'Practice now',
    reviewNow: 'Review weak spots',
    seePath: 'See the full path',
    askTutor: 'Ask the tutor',
    login: 'Log in',
    signup: 'Sign up free',
    back: 'Back to home',
    switchLanguage: 'Language'
  },

  landing: {
    eyebrow: 'Your learning path',
    h1: 'Learn smarter. Think deeper.',
    lede:
      'JurisMind maps what you actually know in contract, commercial and labour law, detects the topics you are quietly forgetting, and hands you the next exercise before the memory fades.',
    ticker: [
      'Formation of contract',
      'Vitiated consent',
      'Breach & remedies',
      'Commercial acts',
      'Cheques & bills',
      'Dismissal procedure',
      'Working time',
      'Vicarious liability',
      'Legal personality',
      'Judicial review'
    ],
    heroCard: {
      kicker: 'YOUR LEARNING PATH',
      title: 'Start from level 0.',
      sub: 'Your adaptive path builds as you answer.',
      nextFocus: 'Starting mastery',
      recommended: 'Recommended first: obligations and contract formation',
      weakSpots: 'Current level',
      weakSpotsValue: 'Level 0 · 0 XP',
      daily: 'First step',
      dailyValue: 'Solve your first case',
      caption: 'Progress starts at 0 and updates with every answer.'
    },
    retention: {
      kicker: 'The retention feature',
      title: 'Your memory has a deadline. We keep the calendar.',
      lede:
        'Forgetting is not a character flaw, it is a schedule. JurisMind models the decay curve of every topic you study and puts the review back in front of you on the day it starts to slip.',
      bullets: [
        {
          t: 'Every topic has a memory score',
          d: 'Each concept carries a mastery score that moves every time you answer — up when you are right, down when you guess.'
        },
        {
          t: 'Reviews are scheduled automatically',
          d: 'Short intervals at first, then wider: 1 day, 3 days, 7, 14, 30. You revise less and keep more.'
        },
        {
          t: 'Weak topics surface themselves',
          d: 'The topics under 60% are pulled into a coral "attention" list, so no gap stays invisible until the exam.'
        }
      ],
      chartCaption: 'Decay curve against our review moments',
      chartNow: 'Now',
      chartR1: 'R1',
      chartR2: 'R2',
      chartR3: 'R3',
      chartLegendForget: 'Without review',
      chartLegendKeep: 'With JurisMind'
    },
    method: {
      kicker: 'How the path adapts',
      title: 'Three moves, repeated every session.',
      steps: [
        {
          n: '01',
          t: 'Diagnose',
          d: 'A short adaptive check-up grades every topic you have covered. No guessing what to study tonight.'
        },
        {
          n: '02',
          t: 'Drill the gap',
          d: 'JurisMind serves the lowest-scoring topic first — and drops the difficulty a notch if you are struggling.'
        },
        {
          n: '03',
          t: 'Schedule the return',
          d: 'Every answer reschedules the topic. Correct answers move the review further out, errors bring it back tomorrow.'
        }
      ],
      nextLabel: 'Your next recommended exercise',
      nextReason: 'Generated live by the adaptive engine',
      pickSubject: 'Try it: pick a subject'
    },
    subjects: {
      kicker: 'Subjects',
      title: 'One path per subject, one dashboard for all of them.',
      lede:
        'Contract, commercial and labour law are the core of the business-law curriculum — the other subjects plug into the same engine.',
      available: 'Exercises available',
      soon: 'Coming soon'
    },
    stats: {
      kicker: 'By the numbers',
      items: [
        { v: 'Level 0', l: 'clean starting point for every student' },
        { v: '8', l: 'law subjects in the curriculum' },
        { v: '19', l: 'adaptive legal exercises' },
        { v: '3', l: 'interface languages, RTL included' }
      ]
    },
    journey: {
      kicker: 'The journey',
      title: 'From first-year confusion to exam-day confidence.',
      steps: [
        { t: 'Diagnostic', d: 'A 15-minute check-up on the subjects you have already studied.' },
        { t: 'Foundations', d: 'Lessons and drills for the concepts you cannot afford to miss.' },
        { t: 'Application', d: 'Case labs: apply the rule to a fact pattern and defend your answer.' },
        { t: 'Retention', d: 'Spaced reviews that keep the whole syllabus alive until exam day.' },
        { t: 'Exam readiness', d: 'Mock papers scored against your weak-topic history.' }
      ]
    },
    tutor: {
      kicker: 'AI tutor',
      title: 'The lavender corner of JurisMind.',
      lede:
        'Ask for a rule, a case, or a simpler explanation. The tutor knows your weak topics, so it answers in the direction your path needs.',
      chips: [
        'Explain vitiated consent simply',
        'Compare a cheque and a bill of exchange',
        'When is dismissal without notice valid?',
        'Give me a case on contractual liability'
      ],
      disclaimer:
        'JurisMind is a study aid. It is not legal advice and it does not replace your course, your professor or a lawyer.'
    },
    faq: {
      kicker: 'FAQ',
      title: 'What do law students ask about JurisMind?',
      items: [
        {
          q: 'Is JurisMind a summary of the law?',
          a: 'No. JurisMind is a practice and retention tool. Your course remains the reference; we make sure you still remember it in week twelve.'
        },
        {
          q: 'Which law is covered?',
          a: 'The core of countries in the civil-law tradition: contract, commercial, labour, corporate and administrative law. Exercises stay at doctrine level so they travel between courses.'
        },
        {
          q: 'Do I need to create an account?',
          a: 'This demo runs entirely in your browser: your answers, streak and mastery scores are stored locally on your device.'
        },
        {
          q: 'Does it work right-to-left?',
          a: 'Yes. Arabic gets a full RTL layout, an Arabic typeface and its own content — not a mirrored afterthought.'
        }
      ]
    },
    finalCta: {
      title: 'Your first session is twelve minutes.',
      sub: 'Diagnostic, one weak topic, one review scheduled. That is the whole loop.',
      note: 'Free for students · No card required'
    }
  },

  footer: {
    blurb: 'Adaptive learning paths for law students. Diagnose, drill, retain.',
    columns: [
      {
        t: 'Product',
        links: [
          { href: 'dashboard.html', label: 'Dashboard' },
          { href: 'path.html', label: 'Learning path' },
          { href: 'practice.html', label: 'Practice' },
          { href: 'subjects.html', label: 'Subjects' }
        ]
      },
      {
        t: 'Subjects',
        links: [
          { href: 'subjects.html#contract', label: 'Contract law' },
          { href: 'subjects.html#commercial', label: 'Commercial law' },
          { href: 'subjects.html#labour', label: 'Labour law' },
          { href: 'subjects.html#company', label: 'Company law' }
        ]
      },
      {
        t: 'Learn',
        links: [
          { href: 'tutor.html', label: 'AI tutor' },
          { href: 'index.html#method', label: 'Method' },
          { href: 'index.html#faq', label: 'FAQ' },
          { href: 'index.html#retention', label: 'Retention' }
        ]
      }
    ],
    legal: [
      { href: 'about.html', label: 'About' },
      { href: 'contact.html', label: 'Contact' },
      { href: 'privacy.html', label: 'Privacy' },
      { href: 'terms.html', label: 'Terms' },
      { href: 'accessibility.html', label: 'Accessibility' }
    ],
    disclaimer: 'Educational tool — not legal advice.',
    rights: '© 2026 JurisMind. Demo project.',
    langLabel: 'Language'
  },

  /* ---- Dashboard ---- */
  dash: {
    kicker: 'Your learning path',
    h1: "You're getting sharper.",
    sub: 'Your next steps, based on your progress.',
    greeting: 'Good evening',
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    sessionPill: '12 min session ready',
    nextFocus: 'Your next focus',
    recommended: 'Recommended',
    weakSpots: 'Weak spots',
    weakSpotsSub: 'concepts below 60% mastery',
    daily: 'Daily challenge',
    dailySub: 'Solve one legal case',
    streak: 'Streak',
    streakSub: 'days in a row',
    best: 'Best',
    activity: 'Last 7 days',
    activitySub: 'Minutes studied and accuracy',
    minutes: 'min',
    accuracy: 'accuracy',
    reviewQueue: 'Retention schedule',
    reviewQueueSub: 'What is due, and when',
    dueNow: 'Due now',
    dueToday: 'Today',
    dueTomorrow: 'Tomorrow',
    dueLater: 'Later this week',
    dueDate: 'Due',
    subjectProgress: 'Subject progress',
    subjectProgressSub: 'Mastery, weak topics and next review',
    weakTopic: 'weak spot',
    lastSeen: 'Last seen',
    never: 'not started',
    daysAgo: '{n} days ago',
    today: 'today',
    yesterday: 'yesterday',
    milestones: 'Milestones',
    milestonesSub: 'Where you are on the current path',
    badges: 'Badges',
    badgesSub: '{n} of {total} unlocked',
    recommendedExercises: 'Recommended exercises',
    recommendedExercisesSub: 'Chosen by the adaptive engine',
    startExercise: 'Start',
    level: 'Level',
    xp: 'XP',
    nextLevel: '{n} XP to level {l}',
    todayPlan: "Today's plan",
    planItem1: 'Review 3 concepts in contract law',
    planItem2: 'One case lab on commercial law',
    planItem3: 'Daily challenge: labour law',
    planDone: 'done',
    reset: 'Reset progress',
    resetConfirm: 'Reset your progress and start over from level 0?',
    sampleNote: 'Progress starts at level 0 and is stored locally in your browser.',
    continueBtn: 'Continue the session',
    examCountdown: 'Final exam',
    examIn: '{n} days',
    readiness: 'Exam readiness'
  },

  /* ---- Learning path ---- */
  path: {
    kicker: 'Learning path',
    h1: 'One path, four stages.',
    sub: 'Diagnose, build, apply, retain. Every subject runs on the same spine.',
    stage: 'Stage',
    steps: 'steps',
    done: 'Completed',
    current: 'In progress',
    locked: 'Locked',
    checkpoint: 'Checkpoint',
    foundations: 'Foundations',
    application: 'Application',
    retention: 'Retention',
    review: 'Review',
    mockExam: 'Mock exam',
    reviewCycle: 'Spaced review cycle',
    diagnostic: 'Diagnostic',
    lesson: 'Lesson',
    drill: 'Drill',
    caseLab: 'Case lab',
    progressOnPath: 'Path progress',
    unlockNext: '{n} steps to unlock the next stage',
    stageDone: 'Stage complete',
    examineMode: 'Exam mode',
    readinessScore: 'Readiness score',
    readinessSub: 'Based on mastery and review recency across the syllabus.',
    atRisk: 'Topics at risk',
    atRiskSub: 'High mastery but no review in a long time',
    upcoming: 'Upcoming reviews',
    upcomingSub: 'Your calendar for the next 14 days',
    practiceStage: 'Practice this stage',
    tabs: 'Subject'
  },

  /* ---- Practice ---- */
  practice: {
    kicker: 'Adaptive practice',
    h1: 'Practice',
    sub: 'Every answer moves your mastery score and reschedules the topic.',
    chooseSubject: 'Choose a subject',
    chooseSubjectSub: 'The engine picks the topic — you can override it.',
    anySubject: 'Let the engine decide',
    difficulty: 'Difficulty',
    sessionSoFar: 'This session',
    correctCount: '{n} correct',
    liveMastery: 'Live mastery',
    question: 'Question',
    of: 'of',
    submit: 'Check my answer',
    next: 'Next question',
    results: 'See my results',
    correct: 'Correct answer',
    wrong: 'Not quite',
    theAnswer: 'The right answer is',
    whyThis: 'Why this question?',
    whyRight: 'Why it works',
    explanation: 'The rule',
    yourScore: 'Your score',
    sessionSummary: 'Session summary',
    masteryMoved: 'Mastery moved',
    xpEarned: 'XP earned',
    streakNow: '{n}-day streak',
    badgeUnlocked: 'Badge unlocked',
    nextReview: 'Next review',
    reviewIn: 'in {n} day(s)',
    reviewToday: 'later today',
    backToDashboard: 'Back to dashboard',
    practiceAgain: 'Practise again',
    startDiagnostic: 'Start the diagnostic',
    diagnosticNote: 'A diagnostic scores every topic before your first session.',
    keyboardHint: 'Tip: press 1–4 to answer, Enter to continue.',
    emptyTitle: 'No exercises in this subject yet',
    emptyText: 'Pick another subject — commercial, contract, labour, corporate and administrative law all have live exercises.',
    timerLabel: 'Session time',
    done: 'Done',
    missed: 'Missed',
    masteryUp: 'Mastery up',
    masteryDown: 'Mastery down'
  },

  /* ---- Subjects library ---- */
  subjectsPage: {
    kicker: 'Subject library',
    h1: 'Eight subjects, one engine.',
    sub: 'Contract, commercial and labour law carry the curriculum; the rest plug into the same learning path.',
    mastery: 'Mastery',
    topics: 'topics',
    weakTopics: 'Weak topics',
    noWeak: 'No weak topics. Keep the reviews going.',
    lastSession: 'Last session',
    exercises: '{n} exercises',
    openPath: 'Open path',
    topicBreakdown: 'Topic breakdown',
    schedule: 'Next reviews',
    difficultyMix: 'Difficulty mix',
    available: 'Exercises available',
    soon: 'Coming soon',
    soonNote: 'Exercises for this subject are being written.',
    weak: 'Weak',
    solid: 'Solid',
    strong: 'Strong',
    allTopics: 'All topics'
  },

  /* ---- AI tutor ---- */
  tutor: {
    kicker: 'AI tutor',
    h1: 'Ask JurisMind.',
    sub: 'The tutor knows your weak topics and answers in the direction your path needs.',
    placeholder: 'Ask about a rule, a case or a definition…',
    send: 'Send',
    you: 'You',
    tutor: 'JurisMind',
    thinking: 'Reading your path…',
    promptsTitle: 'Try one of these',
    promptsSub: 'Based on your weak topics',
    contextTitle: 'Tutor context',
    contextSub: 'What the tutor can see',
    ctxWeak: 'Your weak topics',
    ctxPath: 'Current path stage',
    ctxLang: 'Answer language',
    modeTitle: 'Answer style',
    modeSimple: 'Simple',
    modeExam: 'Exam',
    modeCase: 'Case',
    styleSimple: 'Explain it like it is my first week.',
    styleExam: 'Give me the exam-ready version.',
    styleCase: 'Show me a case applying it.',
    sourcesTitle: 'Sources to check',
    disclaimer:
      'Demo tutor with canned answers. Always check your course materials and your national code before relying on an answer.',
    newChat: 'New chat',
    suggestQ: 'Suggested question',
    fallback:
      'Good question. JurisMind cannot answer a topic outside its library yet. Try asking about formation of contract, vitiated consent, breach and remedies, commercial acts, cheques and bills, dismissal, working time or vicarious liability.'
  },

  /* ---- Auth (demo) ---- */
  auth: {
    kicker: 'Demo account',
    h1: 'Your path is stored in your browser.',
    sub: 'This demo does not need an account. Sign in only if you want a named profile in the sidebar.',
    name: 'Display name',
    email: 'Email',
    password: 'Password',
    submit: 'Start my learning path',
    note: 'No data leaves your device in this demo.',
    or: 'or',
    guest: 'Continue as a guest'
  },

  /* ---- Runtime strings used by the engine ---- */
  ui: {
    difficulty: { 1: 'Foundation', 2: 'Core', 3: 'Advanced' },
    diffShort: { 1: 'F', 2: 'C', 3: 'A' },
    level: 'Level',
    xp: 'XP',
    mastery: 'Mastery',
    accuracy: 'Accuracy',
    streakDays: 'day streak',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    near: {
      now: 'due now',
      today: 'later today',
      tomorrow: 'tomorrow',
      d2: 'in 2 days',
      d3: 'in 3 days',
      d7: 'in a week',
      d14: 'in 2 weeks',
      d30: 'in a month',
      late: 'overdue'
    },
    reasons: {
      weakest: 'Because {subject} is your weakest subject right now.',
      missed: 'Because you missed the last question on {topic}.',
      due: 'Because your review of {topic} is due today.',
      streak: 'Because you are on a {n}-day streak — time to raise the bar.',
      onRoll: 'You got the last {n} right, so this one is harder.',
      needsWork: '{topic} is flagged as a weak spot: {n}% mastery.',
      almost: 'Almost there — {n}% mastery on {topic}.',
      fresh: 'Because you have not practised {topic} yet — start here.'
    },
    feedback: {
      masteryUp: 'Mastery +{n}',
      masteryDown: 'Mastery −{n}',
      scheduled: 'Review scheduled {when}',
      streakKeep: 'Streak kept: day {n}.',
      streakStart: 'Day 1 of a new streak.',
      adaptiveUp: 'Difficulty up. The engine thinks you are ready.',
      adaptiveDown: 'Difficulty down. Let us rebuild the rule first.'
    },
    badges: {
      unlocked: 'Badge unlocked: {name}',
      firstCase: 'First case solved',
      streak7: '7-day streak',
      streak30: '30-day streak',
      cleanSweep: 'Perfect session',
      contractMaster: 'Contract law 80%',
      reviewer: 'Review warrior',
      nightOwl: 'Night owl',
      diagnostic: 'Diagnostic done'
    },
    toast: { reset: 'Progress reset to level 0.', saved: 'Progress saved locally.' },
    status: { weak: 'Weak', solid: 'Solid', strong: 'Strong' }
  },

  /* ---- Subjects & topics ---- */
  subjects: [
    {
      id: 'contract', accent: 'lime', icon: 'scroll',
      name: 'Contract law', short: 'Contracts',
      blurb: 'Formation, consent, effects, breach and remedies — the spine of business law.',
      topics: [
        { id: 'formation', name: 'Formation & offer', key: 'offer, acceptance, meeting of minds' },
        { id: 'consent', name: 'Consent & defects', key: 'error, fraud, duress, lesion' },
        { id: 'effects', name: 'Effects & performance', key: 'binding force, good faith, interpretation' },
        { id: 'breach', name: 'Breach & remedies', key: 'damages, specific performance, force majeure' }
      ]
    },
    {
      id: 'commercial', accent: 'mint', icon: 'chart',
      name: 'Commercial law', short: 'Commercial',
      blurb: 'Merchant status, commercial acts, instruments and insolvency.',
      topics: [
        { id: 'acts', name: 'Commercial acts & merchant status', key: 'actes de commerce, registration' },
        { id: 'lease', name: 'Commercial lease & goodwill', key: 'premises, term, renewal, goodwill' },
        { id: 'instruments', name: 'Cheques & bills of exchange', key: 'endorsement, protest, holder rights' },
        { id: 'insolvency', name: 'Insolvency & cessation of payments', key: 'safeguard, liquidation, ranking' }
      ]
    },
    {
      id: 'labour', accent: 'lavender', icon: 'people',
      name: 'Labour law', short: 'Labour',
      blurb: 'Employment contracts, working time, discipline and collective rights.',
      topics: [
        { id: 'contract-emp', name: 'Employment contract', key: 'subordination, trial period, form' },
        { id: 'time', name: 'Working time & leave', key: 'hours, overtime, rest, holidays' },
        { id: 'dismissal', name: 'Termination & dismissal', key: 'cause, procedure, notice, damages' },
        { id: 'collective', name: 'Collective rights', key: 'unions, bargaining, strikes' }
      ]
    },
    {
      id: 'liability', accent: 'coral', icon: 'shield',
      name: 'Civil liability', short: 'Liability',
      blurb: 'Fault, damage, causation — and when liability shifts to someone else.',
      topics: [
        { id: 'elements', name: 'Fault, damage, causation', key: 'the three elements' },
        { id: 'vicarious', name: 'Vicarious liability', key: 'employers, parents, guardians' },
        { id: 'product', name: 'Product & neighbour liability', key: 'defective goods, nuisance' }
      ]
    },
    {
      id: 'company', accent: 'indigo', icon: 'building',
      name: 'Company law', short: 'Companies',
      blurb: 'Incorporation, governance and the limits of shareholder liability.',
      topics: [
        { id: 'incorporation', name: 'Incorporation & legal personality', key: 'registration, veil, capacity' },
        { id: 'governance', name: 'Governance & officers', key: 'board, managers, conflicts' },
        { id: 'shareholders', name: 'Shareholders & capital', key: 'shares, dividends, transfers' }
      ]
    },
    {
      id: 'admin', accent: 'teal', icon: 'landmark',
      name: 'Administrative law', short: 'Administrative',
      blurb: 'Administrative acts, public service and judicial review.',
      topics: [
        { id: 'acts-admin', name: 'Administrative acts', key: 'unilateral acts, publication, revocation' },
        { id: 'review', name: 'Judicial review', key: 'ultra vires, misuse of power, procedure' },
        { id: 'contracts-admin', name: 'Public contracts & liability', key: 'procurement, state liability' }
      ]
    },
    {
      id: 'criminal', accent: 'slate', icon: 'gavel',
      name: 'Business criminal law', short: 'Criminal',
      blurb: 'The offences a business lawyer meets: fraud, abuse of trust, forgery.',
      topics: [
        { id: 'elements-crim', name: 'Elements of an offence', key: 'act, intent, attempt' },
        { id: 'business-crim', name: 'Fraud & abuse of trust', key: 'misappropriation, forgery' }
      ]
    },
    {
      id: 'family', accent: 'rose', icon: 'home',
      name: 'Family & persons', short: 'Family',
      blurb: 'Capacity, marriage contracts and the patrimonial effects of family law.',
      topics: [
        { id: 'capacity', name: 'Capacity & status', key: 'minors, guardianship' },
        { id: 'marriage', name: 'Marriage & assets', key: 'regimes, contribution' }
      ]
    }
  ],

  /* ---- Exercise bank (19 questions, 3 difficulty levels) ---- */
  questions: [
    {
      id: 'c1', subject: 'contract', topic: 'formation', level: 1,
      stem: 'A shopkeeper displays a watch in the window with a price tag of 900. A customer walks in and says "I will buy it". Where does the offer come from?',
      options: ['The displayed goods are an offer made by the shopkeeper', 'The displayed goods are an invitation to treat; the customer makes the offer', 'No offer exists until both parties sign a document', 'The offer is formed jointly the moment the customer enters the shop'],
      answer: 1,
      explain: 'Displaying goods with a price is normally an invitation to treat. The customer makes the offer, and the sale is formed when the shopkeeper accepts it — or at the till, depending on the practice.'
    },
    {
      id: 'c2', subject: 'contract', topic: 'consent', level: 1,
      stem: 'Which of these is a defect of consent (a vice du consentement)?',
      options: ['A signature written in a foreign language', 'A price that later turns out to be unfavourable', 'A mistake about the essential qualities of the subject matter', 'Signing without reading the clauses'],
      answer: 2,
      explain: 'Defects of consent are mistake, fraud and duress (plus lesion where the law allows it). A mistake about essential qualities is a ground of nullity; an unfavourable price is simply a bad deal.'
    },
    {
      id: 'c3', subject: 'contract', topic: 'consent', level: 2,
      stem: 'A seller hides that the machine he sells has a cracked cylinder head, and the buyer could not have discovered it. Which defect is at stake?',
      options: ['Duress', 'Fraud (dol)', 'Lesion', 'No defect — the buyer should have inspected'],
      answer: 1,
      explain: 'Fraud is a deliberate manoeuvre to deceive the other party. The other party must not have been able to discover the truth by ordinary diligence, which is the case here.'
    },
    {
      id: 'c4', subject: 'contract', topic: 'effects', level: 2,
      stem: 'A contract validly formed turns out to be a bad bargain for one side. In principle, what do the courts do?',
      options: ['They rewrite the price to restore the balance', 'They enforce the agreement: it is binding on the parties (pacta sunt servanda)', 'They annul it because the balance is unequal', 'They suspend it until the parties renegotiate'],
      answer: 1,
      explain: 'The binding force of contracts means the agreement prevails over individual interest. Judges may intervene for a good faith imbalance, but they do not rewrite a valid bargain.'
    },
    {
      id: 'c5', subject: 'contract', topic: 'breach', level: 3,
      stem: 'Performance becomes impossible after an unforeseeable, irresistible event that cannot be attributed to the debtor. What is the effect?',
      options: ['The debtor must pay damages but keeps the contract', 'The debtor owes nothing: force majeure discharges the obligation', 'The contract is void from the start', 'Only the creditor may terminate, with damages'],
      answer: 1,
      explain: 'Force majeure is an exogenous event that is unforeseeable, irresistible and exterior. It releases the debtor from liability, and the contract is usually resolved rather than penalised.'
    },
    {
      id: 'c6', subject: 'contract', topic: 'breach', level: 3,
      stem: 'Before the delivery date, the seller tells the buyer in writing that he will not deliver at all. What can the buyer do?',
      options: ['Nothing until the delivery date has passed', 'Treat the breach as certain and claim immediate termination with damages', 'Only ask for a price reduction', 'Force the seller to deliver by calling the police'],
      answer: 1,
      explain: 'An anticipated breach that is certain lets the creditor act at once: termination plus damages, or, where possible, an order for specific performance with a penalty for delay.'
    },
    {
      id: 'c7', subject: 'commercial', topic: 'acts', level: 1,
      stem: 'Which of these is a commercial act by nature?',
      options: ['Buying a house to live in', 'A purchase of goods to resell them', 'Signing an employment contract as an employee', 'A donation between relatives'],
      answer: 1,
      explain: 'A purchase to resell (with profit intent) is the classic commercial act. Personal real estate and gifts are civil matters.'
    },
    {
      id: 'c8', subject: 'commercial', topic: 'acts', level: 2,
      stem: 'What is the main consequence of the status of merchant?',
      options: ['A duty to register in the commercial register and keep accounts', 'Automatic exemption from income tax', 'A ban on hiring employees', 'A right to refuse all liability'],
      answer: 0,
      explain: 'Merchant status brings duties: registration in the commercial register, accounting, and a specific insolvency regime — which is how creditors can track the business.'
    },
    {
      id: 'c9', subject: 'commercial', topic: 'instruments', level: 2,
      stem: 'What is the essential difference between a cheque and a bill of exchange?',
      options: ['A cheque is always payable abroad', 'A cheque is drawn on a bank and payable on demand; a bill involves a term and a drawee who is not a bank', 'A bill is only valid between merchants', 'There is no practical difference'],
      answer: 1,
      explain: 'The cheque is a means of payment drawn on a bank, payable at sight. The bill of exchange is a credit instrument: a term, a drawee, and possible endorsement to a third holder.'
    },
    {
      id: 'c10', subject: 'commercial', topic: 'insolvency', level: 3,
      stem: 'A company stops paying its due debts with the available assets. What does this trigger?',
      options: ['An obligation to open an insolvency procedure (cessation of payments)', 'Automatic dissolution of the company', 'Personal liability of every employee', 'Nothing until a creditor sues on one invoice'],
      answer: 0,
      explain: 'Cessation of payments is the trigger for collective proceedings. Managers must file within the legal deadline, or they risk personal liability for the shortfall.'
    },
    {
      id: 'c11', subject: 'labour', topic: 'contract-emp', level: 1,
      stem: 'Which element turns a service relationship into an employment contract?',
      options: ['Payment by invoice', 'Legal subordination to the employer', 'The place where the work is done', 'A fixed monthly amount'],
      answer: 1,
      explain: 'Subordination — the power to give orders, supervise and sanction — is the decisive criterion. Payment method or the label used by the parties does not change the nature of the relationship.'
    },
    {
      id: 'c12', subject: 'labour', topic: 'dismissal', level: 2,
      stem: 'An employer dismisses an employee for theft without any prior disciplinary interview and without a written statement of grounds. What is the likely consequence?',
      options: ['The dismissal is valid because theft is serious', 'The dismissal may be held unfair for procedural irregularity, opening damages', 'The dismissal becomes a resignation', 'The employee must be reinstated automatically'],
      answer: 1,
      explain: 'Serious misconduct can justify dismissal, but not if the procedure is skipped. Courts usually award damages for procedural unfairness even where the facts are serious.'
    },
    {
      id: 'c13', subject: 'labour', topic: 'time', level: 3,
      stem: 'An employee on a fixed-term contract works beyond its term without a new written contract. What is the usual legal effect?',
      options: ['The contract ends the day the term expires', 'The contract is normally requalified as an open-ended contract', 'The extra period is unpaid', 'The employee owes damages for the overrun'],
      answer: 1,
      explain: 'In most labour codes, continuing to work after the term defeats the written fixed-term formality, and the relationship is requalified as open-ended with the corresponding rights.'
    },
    {
      id: 'c14', subject: 'labour', topic: 'collective', level: 2,
      stem: 'Which body negotiates and signs an enterprise collective agreement?',
      options: ['The labour inspector alone', 'Employee representatives and the employer', 'The commercial court', 'Each employee individually'],
      answer: 1,
      explain: 'Collective bargaining is conducted between employer (or employers organisation) and employee representatives or unions. The resulting agreement sets terms binding on the categories it covers.'
    },
    {
      id: 'c15', subject: 'liability', topic: 'elements', level: 1,
      stem: 'What are the three elements of civil liability for personal fault?',
      options: ['Contract, offer and acceptance', 'Fault, damage and causation', 'Intention, profit and loss', 'Registration, publication and opposition'],
      answer: 1,
      explain: 'Fault, damage and a causal link between the two. Remove any element and the claim fails — which is why fact patterns are always tested on causation.'
    },
    {
      id: 'c16', subject: 'liability', topic: 'vicarious', level: 2,
      stem: 'An employee, driving a delivery van, injures a pedestrian during a delivery round. Who is liable in principle?',
      options: ['Only the employee', 'The employer is liable for the acts of the employee acting within his duties, with a possible action against the employee', 'The manufacturer of the van', 'Nobody: the pedestrian accepted the risk'],
      answer: 1,
      explain: 'Vicarious liability attaches to the employer when the employee acts within his functions or without exceeding them. Contributory fault of the victim may reduce the compensation.'
    },
    {
      id: 'c17', subject: 'company', topic: 'incorporation', level: 1,
      stem: 'What does the legal personality of a company mean in practice?',
      options: ['The shareholders own the company assets directly', 'The company has its own patrimony, distinct from the shareholders', 'The company must always be a public body', 'The managers are personally bound by every contract'],
      answer: 1,
      explain: 'Once registered, the company has its own rights and assets. That separation is what protects shareholders from the company debt, except when the veil is lifted for fraud.'
    },
    {
      id: 'c18', subject: 'company', topic: 'shareholders', level: 2,
      stem: 'A shareholder in a limited liability company holds 10% of the shares. What is the limit of his liability for the company debt?',
      options: ['Unlimited personal liability', 'He risks the amount he subscribed, and no more, unless he gave a personal guarantee', 'He is liable for the entire debt', 'He is not liable at all in any scenario'],
      answer: 1,
      explain: 'Limited liability caps the loss at the subscribed capital, apart from personal guarantees, abusive conduct or confusion of patrimonies.'
    },
    {
      id: 'c19', subject: 'admin', topic: 'review', level: 2,
      stem: 'Which ground is distinctive to judicial review of an administrative act?',
      options: ['Breach of a commercial contract', 'Misuse of power (detournement de pouvoir)', 'Insolvency of the administration', 'Failure to pay a private debt'],
      answer: 1,
      explain: 'Misuse of power is the standard administrative ground: the act is lawful in form but the authority was used for a purpose other than the one intended by law.'
    }
  ],

  /* ---- AI tutor knowledge base ---- */
  tutorKB: [
    {
      kw: ['consent', 'vice', 'vitiat', 'error', 'fraud', 'duress', 'nullity'],
      title: 'Defects of consent',
      body:
        'Classic plan in three lines. Mistake: a false representation of reality, and only a mistake about the essential qualities of the subject matter (or the person in intuitu personae contracts) leads to nullity. Fraud (dol): a deliberate manoeuvre by one party, or by a third party with the other party aware, which the victim could not have discovered by ordinary diligence — it must be the determining cause. Duress: physical urgency is not required, moral pressure is enough; threats of lawful action become a defect when used to extort an excessive advantage. Sanction: relative nullity, with the five-year limitation period, and fraud also opens damages.',
      sources: ['Formation of contract', 'Effects of nullity']
    },
    {
      kw: ['dismissal', 'fire', 'terminate', 'notice', 'misconduct', 'procedure'],
      title: 'Dismissal for misconduct',
      body:
        'A lawful dismissal for cause needs three things. A real and serious ground — misconduct with a certain, dated character. A procedure — a written statement of grounds, an interview before the decision, and the employee must be able to be accompanied. And a measure of proportionality — the sanction must be proportionate to the fault. If the procedure is skipped, the dismissal stays lawful but becomes irregular and normally produces damages for the employee. Serious misconduct is the rare case where no notice is due.',
      sources: ['Labour law — dismissal', 'Procedural safeguards']
    },
    {
      kw: ['cheque', 'check', 'bill', 'exchange', 'endorsement', 'protest', 'drawee'],
      title: 'Cheque vs bill of exchange',
      body:
        'The cheque: a written order to pay at sight, drawn on a bank, given as a means of payment. The bill of exchange: a credit instrument — a term of payment, a drawee who can be a commercial debtor, and possible endorsements transmitting the paper to a new holder. Both share the same key principle: the abstract engagement of the signatory. Signing accepts the content, so personal defences against the previous holder are normally no answer to the current holder in due course.',
      sources: ['Commercial law — instruments', 'Endorsement and protest']
    },
    {
      kw: ['vicarious', 'employer', 'master', 'employee liability', 'liability of the employer'],
      title: 'Vicarious liability',
      body:
        'The employer answers for the damage caused by employees acting within their functions, or without exceeding them. Two conditions: a relationship of subordination, and an act connected with the duties. In principle, if the employee acted wholly outside his functions, liability shifts back to him. The victim sues the employer directly. Two correct answers on civil liability: what is the fault (an act or an omission), and what is the causal link — proof by equivalence of conditions, with a break in causation where force majeure or an external event intervenes.',
      sources: ['Civil liability — elements', 'Civil liability — liability of others']
    },
    {
      kw: ['force majeure', 'impossib', 'exoneration', 'unforeseeable'],
      title: 'Force majeure',
      body:
        'Three tests: unforeseeable, irresistible, and exterior to the debtor. Only an event that satisfies all three discharges the obligation. Look for the trap in the facts: an event that is irresistible but predictable (a known strike period) or exterior but foreseeable is not force majeure; the contract may then be renegotiated rather than resolved, depending on the code and the clauses.',
      sources: ['Breach and remedies', 'Exonerating causes']
    },
    {
      kw: ['formation', 'offer', 'acceptance', 'invitation', 'meeting of minds'],
      title: 'Formation of contract',
      body:
        'Two movements. The offer: firm, precise and revocable until accepted, unless the law or the offer itself fixes a time limit. Acceptance: the meeting of minds, and silence does not normally amount to acceptance. Traps to watch: displayed goods are an invitation to treat; a counter-offer kills the original offer; and in business law, the confirmation document counts, so a signed order form or an accepted purchase order is enough.',
      sources: ['Formation of contract', 'Consent']
    },
    {
      kw: ['commercial act', 'merchant', 'register', 'acts of trade'],
      title: 'Commercial acts & merchant status',
      body:
        'Three categories: acts commercial by nature (purchase to resell, negotiable instruments), by accessory (done by a merchant for the needs of the business) and by declaration. Requirement of the status: to exercise commercial acts habitually and independently. Consequences: registration in the commercial register, accounting duties, and the insolvency regime.',
      sources: ['Commercial law — merchant status']
    },
    {
      kw: ['shareholder', 'sarl', 'sa', 'limited liability', 'capital'],
      title: 'Shareholders and liability',
      body:
        'Limited liability caps the shareholder loss at the capital he subscribed. Exceptions to remember: personal guarantees signed by the manager or shareholder, abusive acts, confusion of the company patrimony with a private patrimony, and the sanction of a failure to raise capital, all of which open unlimited liability.',
      sources: ['Company law — legal personality']
    }
  ],

  /* ---- Badges ---- */
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
