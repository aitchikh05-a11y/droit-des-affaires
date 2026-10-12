/* ============================================================
   JurisMind — app core
   Shared helpers, icons, persisted state (localStorage) and
   the i18n bridge to the embedded content dictionary.
   Classic script (no bundler): exposes window.JM
   ============================================================ */
(function () {
  "use strict";

  var JM = (window.JM = window.JM || {});
  JM.version = "1.0.0";

  /* ---------- content ---------- */
  var tag = document.getElementById("jm-content");
  JM.C = tag ? JSON.parse(tag.textContent) : {};
  JM.lang = (document.documentElement.getAttribute("data-lang") || "en");
  JM.dir = document.documentElement.getAttribute("dir") || "ltr";

  /** translate: JM.t("dash.weakSpots") */
  JM.t = function (path, vars) {
    var node = path.split(".").reduce(function (acc, k) {
      return acc == null ? acc : acc[k];
    }, JM.C);
    if (typeof node !== "string") return path;
    return JM.fmt(node, vars);
  };

  JM.fmt = function (str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] != null ? String(vars[k]) : m;
    });
  };

  JM.NUM = function (n) {
    var loc = JM.lang === "ar" ? "ar-MA" : JM.lang === "fr" ? "fr-FR" : "en-GB";
    try {
      return new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(n);
    } catch (e) {
      return String(n);
    }
  };

  /* ---------- icons (24px grid, currentColor stroke) ---------- */
  var P = {
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
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    send: '<path d="m4 12 16-8-6 16-3-6z"/>',
    user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3c2.4 3 2.4 15 0 18M12 3c-2.4 3-2.4 15 0 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    brain: '<path d="M12 5.5A3 3 0 0 0 6.4 7 3 3 0 0 0 5 12.4 3 3 0 0 0 7 18a3 3 0 0 0 5 1.6z"/><path d="M12 5.5A3 3 0 0 1 17.6 7 3 3 0 0 1 19 12.4 3 3 0 0 1 17 18a3 3 0 0 1-5 1.6z"/>',
    trend: '<path d="M4 17l5-5 3.5 3.5L20 8"/><path d="M15 8h5v5"/>',
    alert: '<path d="M12 4l8.5 15H3.5z"/><path d="M12 10v4M12 17h.01"/>',
    refresh: '<path d="M4 11a8 8 0 0 1 13.5-4.5L20 9"/><path d="M20 5v4h-4"/><path d="M20 13a8 8 0 0 1-13.5 4.5L4 15"/><path d="M4 19v-4h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    book: '<path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v18H7.5A2.5 2.5 0 0 0 5 22z"/>',
    scale: '<path d="M12 3v18M7 21h10"/><path d="m12 5-6 2 3 6 3-6zM12 5l6 2-3 6-3-6z"/>'
  };
  JM.icon = function (name, cls) {
    var d = P[name] || P.grid;
    return (
      '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>"
    );
  };

  /* ---------- dates ---------- */
  function iso(d) {
    var t = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return t.toISOString().slice(0, 10);
  }
  JM.today = function () { return iso(new Date()); };
  JM.addDays = function (dateStr, n) {
    var d = new Date(dateStr + "T12:00:00");
    d.setDate(d.getDate() + n);
    return iso(d);
  };
  JM.daysBetween = function (a, b) {
    var d1 = new Date(a + "T12:00:00"), d2 = new Date(b + "T12:00:00");
    return Math.round((d2 - d1) / 86400000);
  };
  JM.fromToday = function (n) { return JM.addDays(JM.today(), n); };

  /* ---------- subjects ---------- */
  JM.subjects = function () { return JM.C.subjects || []; };
  JM.subject = function (id) {
    return JM.subjects().filter(function (s) { return s.id === id; })[0] || null;
  };
  JM.subjectName = function (id) {
    var s = JM.subject(id);
    return s ? s.name : id;
  };
  JM.subjectShort = function (id) {
    var s = JM.subject(id);
    return s ? s.short : id;
  };
  JM.topicName = function (sid, tid) {
    var s = JM.subject(sid);
    if (!s) return tid;
    var t = s.topics.filter(function (x) { return x.id === tid; })[0];
    return t ? t.name : tid;
  };
  JM.questions = function () { return JM.C.questions || []; };
  JM.questionsFor = function (subjectId, topicId) {
    return JM.questions().filter(function (q) {
      return (!subjectId || q.subject === subjectId) && (!topicId || q.topic === topicId);
    });
  };
  JM.subjectCount = function (id) { return JM.questionsFor(id).length; };
  JM.question = function (id) {
    return JM.questions().filter(function (q) { return q.id === id; })[0] || null;
  };
  JM.badgeMeta = function (id) {
    return (JM.C.badgeMeta || []).filter(function (b) { return b.id === id; })[0] || null;
  };
  JM.allTopics = function () {
    var out = [];
    JM.subjects().forEach(function (s) {
      s.topics.forEach(function (t) {
        out.push({ subject: s.id, topic: t.id, name: t.name, subjectName: s.name, accent: s.accent, hasQs: JM.questionsFor(s.id, t.id).length > 0 });
      });
    });
    return out;
  };

  /* ---------- state ---------- */
  var KEY = "jurismind.state.v1";

  function seed() {
    var t = JM.today();
    var m = {
      "contract.formation": { m: 74, seen: 5, streak: 3, last: JM.fromToday(-4), next: JM.fromToday(3) },
      "contract.consent": { m: 48, seen: 4, streak: 0, last: JM.fromToday(-2), next: JM.fromToday(0) },
      "contract.effects": { m: 66, seen: 3, streak: 1, last: JM.fromToday(-6), next: JM.fromToday(-1) },
      "contract.breach": { m: 58, seen: 3, streak: 0, last: JM.fromToday(-1), next: JM.fromToday(1) },
      "commercial.acts": { m: 82, seen: 6, streak: 4, last: JM.fromToday(-3), next: JM.fromToday(7) },
      "commercial.instruments": { m: 64, seen: 3, streak: 1, last: JM.fromToday(-5), next: JM.fromToday(2) },
      "commercial.insolvency": { m: 55, seen: 2, streak: 0, last: JM.fromToday(-7), next: JM.fromToday(-2) },
      "labour.contract-emp": { m: 78, seen: 4, streak: 3, last: JM.fromToday(-2), next: JM.fromToday(5) },
      "labour.time": { m: 61, seen: 3, streak: 1, last: JM.fromToday(-4), next: JM.fromToday(0) },
      "labour.dismissal": { m: 52, seen: 3, streak: 0, last: JM.fromToday(-1), next: JM.fromToday(0) },
      "labour.collective": { m: 70, seen: 2, streak: 2, last: JM.fromToday(-8), next: JM.fromToday(1) },
      "liability.elements": { m: 62, seen: 3, streak: 1, last: JM.fromToday(-3), next: JM.fromToday(2) },
      "liability.vicarious": { m: 47, seen: 2, streak: 0, last: JM.fromToday(-5), next: JM.fromToday(0) },
      "company.incorporation": { m: 79, seen: 4, streak: 5, last: JM.fromToday(-2), next: JM.fromToday(14) },
      "company.shareholders": { m: 68, seen: 2, streak: 1, last: JM.fromToday(-6), next: JM.fromToday(3) },
      "admin.review": { m: 60, seen: 2, streak: 1, last: JM.fromToday(-9), next: JM.fromToday(1) }
    };
    var days = [];
    var mins = [18, 24, 0, 32, 26, 41, 22];
    var accs = [0.75, 0.8, 0, 0.86, 0.78, 0.9, 0.83];
    for (var i = 6; i >= 0; i--) {
      var min = mins[6 - i];
      var total = min ? Math.max(3, Math.round(min / 5)) : 0;
      days.push({
        date: JM.fromToday(-i),
        minutes: min,
        correct: Math.round(total * accs[6 - i]),
        total: total
      });
    }
    return {
      name: "",
      xp: 4380,
      streak: 14,
      best: 21,
      lastActive: JM.fromToday(-1),
      days: days,
      topics: m,
      badges: ["diagnostic", "firstCase", "streak7", "reviewer"],
      answeredIds: [],
      history: [],
      sessions: 26,
      created: JM.fromToday(-30)
    };
  }

  var state = null;
  JM.load = function () {
    if (state) return state;
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : seed();
    } catch (e) {
      state = seed();
    }
    if (!state || !state.topics) state = seed();
    if (!state.badges) state.badges = [];
    if (!state.days) state.days = [];
    if (!state.answeredIds) state.answeredIds = [];
    return state;
  };
  JM.state = function () { return JM.load(); };
  JM.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  };
  JM.reset = function () {
    state = seed();
    JM.save();
    return state;
  };

  JM.topicState = function (sid, tid) {
    var s = JM.load();
    var k = sid + "." + tid;
    if (!s.topics[k]) s.topics[k] = { m: 0, seen: 0, streak: 0, last: null, next: null };
    return s.topics[k];
  };
  JM.touchedTopic = function (sid, tid) {
    var s = JM.load();
    return s.topics[sid + "." + tid] || null;
  };

  /* level curve: 500 XP per level, first level at 500 */
  JM.level = function (xp) {
    var lv = Math.floor((xp || 0) / 500) + 1;
    var into = (xp || 0) - (lv - 1) * 500;
    return { level: lv, into: into, need: 500 - into, pct: Math.round((into / 500) * 100) };
  };

  JM.status = function (m) {
    if (m < 60) return "weak";
    if (m < 80) return "solid";
    return "strong";
  };
  JM.statusLabel = function (m) {
    var k = JM.status(m);
    var map = { weak: "ui.status.weak", solid: "ui.status.solid", strong: "ui.status.strong" };
    return JM.t(map[k]);
  };
  JM.accentVar = function (subjectId) {
    var s = JM.subject(subjectId);
    return "var(--a-" + (s ? s.accent : "lime") + ")";
  };

  /* ---------- memory model ---------- */
  /** current strength of the memory, 0-100, decays with time since last review */
  JM.retention = function (t) {
    if (!t || !t.seen || !t.m) return 0;
    var elapsed = t.last ? Math.max(0, JM.daysBetween(t.last, JM.today())) : 0;
    var stability = 3 + t.m / 6; /* days before ~37% of that topic slips away */
    return Math.max(0, t.m * Math.exp(-elapsed / stability));
  };
  JM.subjectMastery = function (sid) {
    var s = JM.subject(sid);
    if (!s) return 0;
    var tot = 0, n = 0;
    s.topics.forEach(function (t) {
      if (!JM.questionsFor(sid, t.id).length) return;
      var st = JM.touchedTopic(sid, t.id);
      tot += st ? st.m : 0;
      n++;
    });
    return n ? Math.round(tot / n) : 0;
  };
  JM.subjectRetention = function (sid) {
    var s = JM.subject(sid);
    if (!s) return 0;
    var tot = 0, n = 0;
    s.topics.forEach(function (t) {
      if (!JM.questionsFor(sid, t.id).length) return;
      tot += JM.retention(JM.touchedTopic(sid, t.id));
      n++;
    });
    return n ? Math.round(tot / n) : 0;
  };
  JM.weakTopics = function (limit) {
    var out = [];
    JM.allTopics().forEach(function (t) {
      if (!t.hasQs) return;
      var st = JM.touchedTopic(t.subject, t.topic);
      var m = st ? st.m : 0;
      if (m < 60) out.push({ subject: t.subject, topic: t.topic, name: t.name, subjectName: t.subjectName, accent: t.accent, m: m, state: st });
    });
    out.sort(function (a, b) { return a.m - b.m; });
    return limit ? out.slice(0, limit) : out;
  };
  JM.atRisk = function (limit) {
    var out = [];
    JM.allTopics().forEach(function (t) {
      if (!t.hasQs) return;
      var st = JM.touchedTopic(t.subject, t.topic);
      if (!st || st.m < 70) return;
      var r = JM.retention(st);
      if (r < st.m * 0.72) {
        out.push({ subject: t.subject, topic: t.topic, name: t.name, subjectName: t.subjectName, accent: t.accent, m: st.m, retention: Math.round(r), last: st.last });
      }
    });
    out.sort(function (a, b) { return a.retention - b.retention; });
    return limit ? out.slice(0, limit) : out;
  };
  JM.readiness = function () {
    var tot = 0, n = 0;
    JM.allTopics().forEach(function (t) {
      if (!t.hasQs) return;
      var st = JM.touchedTopic(t.subject, t.topic);
      if (!st || !st.seen) return;
      tot += JM.retention(st);
      n++;
    });
    if (!n) return 0;
    var avg = tot / n;
    return Math.max(0, Math.min(99, Math.round(avg * 1.06)));
  };
  JM.dueList = function () {
    var today = JM.today();
    var out = [];
    JM.allTopics().forEach(function (t) {
      if (!t.hasQs) return;
      var st = JM.touchedTopic(t.subject, t.topic);
      if (!st || !st.next) return;
      var d = JM.daysBetween(today, st.next);
      out.push({
        subject: t.subject, topic: t.topic, name: t.name, subjectName: t.subjectName,
        accent: t.accent, m: st.m, days: d, date: st.next
      });
    });
    out.sort(function (a, b) { return a.days - b.days; });
    return out;
  };
  JM.dueBuckets = function () {
    var b = { now: [], today: [], tomorrow: [], later: [] };
    JM.dueList().forEach(function (x) {
      if (x.days < 0) b.now.push(x);
      else if (x.days === 0) b.today.push(x);
      else if (x.days === 1) b.tomorrow.push(x);
      else if (x.days <= 14) b.later.push(x);
    });
    return b;
  };
  /** next review label, localised ("tomorrow", "in 3 days"…) */
  JM.dueLabel = function (days) {
    var near = JM.C.ui.near;
    if (days < 0) return near.late;
    if (days === 0) return near.today;
    if (days === 1) return near.tomorrow;
    if (days === 2) return near.d2;
    if (days <= 4) return JM.fmt(near.d3, {}).replace("3", String(days));
    if (days <= 10) return near.d7;
    if (days <= 20) return near.d14;
    return near.d30;
  };
  JM.relativeLast = function (dateStr) {
    if (!dateStr) return JM.t("dash.never");
    var d = JM.daysBetween(dateStr, JM.today());
    if (d <= 0) return JM.t("dash.today");
    if (d === 1) return JM.t("dash.yesterday");
    return JM.fmt(JM.t("dash.daysAgo"), { n: d });
  };

  /* ---------- weekly activity ---------- */
  JM.weekSeries = function () {
    var s = JM.load();
    var map = {};
    (s.days || []).forEach(function (d) { map[d.date] = d; });
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var date = JM.fromToday(-i);
      var rec = map[date] || { minutes: 0, correct: 0, total: 0 };
      out.push({
        date: date,
        minutes: rec.minutes || 0,
        accuracy: rec.total ? rec.correct / rec.total : 0,
        dow: (new Date(date + "T12:00:00")).getDay()
      });
    }
    return out;
  };
  JM.logStudy = function (minutes, correct, total) {
    var s = JM.load();
    var today = JM.today();
    var rec = (s.days || []).filter(function (d) { return d.date === today; })[0];
    if (!rec) { rec = { date: today, minutes: 0, correct: 0, total: 0 }; s.days.push(rec); }
    rec.minutes += minutes;
    rec.correct = (rec.correct || 0) + (correct || 0);
    rec.total = (rec.total || 0) + (total || 0);
    s.days = s.days.slice(-30);
    /* streak */
    if (s.lastActive !== today) {
      if (s.lastActive === JM.fromToday(-1)) s.streak = (s.streak || 0) + 1;
      else s.streak = 1;
      s.lastActive = today;
      s.best = Math.max(s.best || 0, s.streak);
    }
    JM.save();
    return rec;
  };

  /* ---------- badges ---------- */
  JM.unlockBadge = function (id) {
    var s = JM.load();
    if (s.badges.indexOf(id) > -1) return false;
    s.badges.push(id);
    JM.save();
    return true;
  };
  JM.badgeName = function (id) { return JM.t("ui.badges." + id); };
  JM.badgeIcon = function (id) {
    var meta = JM.badgeMeta(id);
    return meta ? meta.icon : "target";
  };

  /* ---------- DOM helpers ---------- */
  JM.$ = function (sel, root) { return (root || document).querySelector(sel); };
  JM.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  JM.html = function (el, markup) { if (el) el.innerHTML = markup; };
  JM.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  JM.ringSVG = function (pct, size, color) {
    var r = (size - 14) / 2;
    var c = 2 * Math.PI * r;
    var off = c - (Math.max(0, Math.min(100, pct)) / 100) * c;
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '">' +
      '<circle class="ring-bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '"></circle>' +
      '<circle class="ring-fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" ' +
      'stroke="' + (color || "var(--lime)") + '" stroke-dasharray="' + c.toFixed(1) + '" ' +
      'stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg>'
    );
  };

  JM.toast = function (message, icon) {
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.innerHTML = '<span class="t-ic">' + JM.icon(icon || "check") + "</span><span>" + message + "</span>";
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .4s ease, transform .4s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      setTimeout(function () { el.remove(); }, 420);
    }, 3600);
  };

  JM.reveal = function () {
    var els = JM.$$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---------- shell behaviours (sidebar, tabs, language) ---------- */
  JM.initShell = function () {
    var burger = JM.$("[data-burger]");
    var sidebar = JM.$(".sidebar");
    var scrim = JM.$("[data-scrim]");
    function close() {
      if (sidebar) sidebar.classList.remove("open");
      if (scrim) scrim.remove();
    }
    if (burger && sidebar) {
      burger.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        if (sidebar.classList.contains("open")) {
          var s = document.createElement("div");
          s.className = "scrim";
          s.setAttribute("data-scrim", "");
          s.addEventListener("click", close);
          document.body.appendChild(s);
        } else { close(); }
      });
    }
    var active = document.body.getAttribute("data-page");
    JM.$$(".nav-item, .tabbar a").forEach(function (a) {
      var target = (a.getAttribute("href") || "").split(".")[0];
      if (target === active) a.classList.add("active");
    });
    JM.applyUser();
  };

  JM.applyUser = function () {
    var s = JM.load();
    var lv = JM.level(s.xp);
    JM.$$("[data-user-name]").forEach(function (el) {
      el.textContent = s.name || JM.t("auth.guest");
    });
    JM.$$("[data-user-initial]").forEach(function (el) {
      el.textContent = (s.name || "JM").trim().charAt(0).toUpperCase();
    });
    JM.$$("[data-streak]").forEach(function (el) { el.textContent = JM.NUM(s.streak); });
    JM.$$("[data-streak-sub]").forEach(function (el) { el.textContent = JM.t("dash.streakSub"); });
    JM.$$("[data-xp]").forEach(function (el) { el.textContent = JM.NUM(s.xp); });
    JM.$$("[data-level]").forEach(function (el) { el.textContent = JM.NUM(lv.level); });
    JM.$$("[data-next-level]").forEach(function (el) {
      el.textContent = JM.fmt(JM.t("dash.nextLevel"), { n: JM.NUM(lv.need), l: JM.NUM(lv.level + 1) });
    });
    JM.$$("[data-level-meter]").forEach(function (el) { el.style.width = lv.pct + "%"; });
    JM.$$("[data-best]").forEach(function (el) { el.textContent = JM.NUM(s.best || 0); });
    var b = JM.dueBuckets();
    var due = b.now.length + b.today.length;
    JM.$$("[data-due-count-badge]").forEach(function (el) {
      el.textContent = due ? JM.NUM(due) : "";
      el.style.display = due ? "" : "none";
    });
  };

  /* ---------- language: one button, remembered everywhere ---------- */
  var LANG_KEY = "jurismind.lang";
  var LANGS = ["en", "fr", "ar"];

  JM.langPref = function () {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  };
  JM.setLangPref = function (code) {
    if (LANGS.indexOf(code) < 0) return;
    try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* private mode */ }
  };
  /** equivalent page in another language, as a RELATIVE link so that it also
      works when the site is opened from disk (file://) or a sub-folder */
  JM.langHref = function (code) {
    var seg = location.pathname.split("/");
    var file = seg.pop() || "index.html";
    var cur = seg[seg.length - 1];
    var inSub = cur === "fr" || cur === "ar";
    return (inSub ? "../" : "") + (code === "en" ? "" : code + "/") + file;
  };

  JM.initLangPicker = function () {
    var picks = JM.$$("[data-langpick]");
    if (!picks.length) return;

    /* The button is a native <details>/<summary>, so opening and closing the list
       of languages works without any of this. The script only adds the nice
       touches: one open at a time, closing on an outside click or Escape,
       opening upwards near the bottom of the page, and remembering the choice. */
    function close(pick) {
      if (pick.open) pick.open = false;
      pick.classList.remove("drop-up", "open");
    }
    function closeAll(except) {
      picks.forEach(function (p) { if (p !== except) close(p); });
    }

    picks.forEach(function (pick) {
      var menu = JM.$(".lang-menu", pick);

      /* remember the choice and keep the current view (query + hash) */
      JM.$$("[data-lang-option]", menu).forEach(function (a) {
        var code = a.getAttribute("data-lang-option");
        var extra = location.search
          .replace(/^\?/, "")
          .split("&")
          .filter(function (kv) { return kv && kv.split("=")[0] !== "lang"; });
        try {
          a.setAttribute("href", JM.langHref(code) + "?lang=" + code +
            (extra.length ? "&" + extra.join("&") : "") + location.hash);
        } catch (e) { /* keep the static href */ }
        a.addEventListener("click", function () { JM.setLangPref(code); });
      });

      /* flip the menu upwards when there is more room above (footer).
         The native <details> toggle event is queued as a task, so we decide
         the direction synchronously on click to avoid a one-frame jump. */
      function place(pick) {
        var btn = JM.$(".lang-btn", pick);
        if (!btn || !btn.getBoundingClientRect) return;
        var r = btn.getBoundingClientRect();
        var below = (window.innerHeight || 0) - r.bottom;
        pick.classList.toggle("drop-up", below < 280 && r.top > below && r.top > 0);
      }

      var summary = JM.$(".lang-btn", pick);
      if (summary) {
        summary.addEventListener("click", function () {
          place(pick);
          closeAll(pick);
        });
      }

      pick.addEventListener("toggle", function () {
        if (!pick.open) { pick.classList.remove("drop-up"); return; }
        if (!pick.classList.contains("drop-up")) place(pick);
        closeAll(pick);
      });

      pick.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          close(pick);
          var btn = JM.$(".lang-btn", pick);
          if (btn) btn.focus();
        }
      });
    });

    /* click outside (or on another picker's button) closes everything */
    document.addEventListener("click", function (e) {
      var inside = e.target && e.target.closest && e.target.closest("[data-langpick]");
      closeAll(inside || null);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });
  };

  /* boot */
  document.addEventListener("DOMContentLoaded", function () {
    JM.initShell();
    JM.initLangPicker();
    var page = document.body.getAttribute("data-page") || "landing";
    if (JM.pages && JM.pages[page]) JM.pages[page]();
    JM.reveal();
  });
})();
