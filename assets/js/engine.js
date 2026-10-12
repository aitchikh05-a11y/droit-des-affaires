/* ============================================================
   JurisMind — adaptive engine
   Weak-topic detection · spaced-repetition scheduling · item picking
   ============================================================ */
(function () {
  "use strict";
  var JM = window.JM;
  JM.engine = {};

  /* review intervals in days, indexed by consecutive correct answers */
  var INTERVALS = [1, 3, 7, 14, 30];

  /** difficulty the learner should be served at, from mastery */
  JM.engine.targetLevel = function (mastery) {
    if (mastery < 45) return 1;
    if (mastery < 78) return 2;
    return 3;
  };

  /** weakest subject, weighted by mastery (70%) and retention decay (30%) */
  JM.engine.weakestSubject = function () {
    var best = null;
    JM.subjects().forEach(function (s) {
      if (!JM.subjectCount(s.id)) return;
      var m = JM.subjectMastery(s.id);
      var r = JM.subjectRetention(s.id);
      var score = m * 0.7 + r * 0.3;
      if (!best || score < best.score) best = { id: s.id, score: score, mastery: m, retention: r };
    });
    return best ? best.id : null;
  };

  JM.engine.weakestTopic = function (subjectId) {
    var s = JM.subject(subjectId);
    if (!s) return null;
    var best = null;
    s.topics.forEach(function (t) {
      if (!JM.questionsFor(subjectId, t.id).length) return;
      var st = JM.touchedTopic(subjectId, t.id);
      var m = st ? st.m : 0;
      var r = JM.retention(st);
      var score = (st && st.seen ? m * 0.7 + r * 0.3 : -12); /* unseen topics go first */
      if (!best || score < best.score) best = { id: t.id, score: score, mastery: m };
    });
    return best ? best.id : null;
  };

  /** an item due for review right now, if any */
  JM.engine.overdueTopic = function () {
    var list = JM.dueList().filter(function (d) { return d.days <= 0; });
    return list.length ? list[0] : null;
  };

  /**
   * Pick the next exercise.
   * opts = { subject, topic, level, avoid: [ids] }
   * returns { q, subject, topic, reason, targetLevel, mode }
   */
  JM.engine.next = function (opts) {
    opts = opts || {};
    var mode = "weakest";
    var subjectId = opts.subject || null;
    var topicId = opts.topic || null;

    /* 1. an overdue review has priority unless a subject was forced */
    if (!subjectId && !topicId) {
      var overdue = JM.engine.overdueTopic();
      if (overdue) {
        subjectId = overdue.subject;
        topicId = overdue.topic;
        mode = "review";
      }
    }
    /* 2. weakest subject, then weakest topic inside it */
    if (!subjectId) {
      subjectId = JM.engine.weakestSubject();
      mode = "weakest";
    }
    if (!topicId) topicId = JM.engine.weakestTopic(subjectId);
    if (!topicId && subjectId) {
      var s = JM.subject(subjectId);
      topicId = s && s.topics.length ? s.topics[0].id : null;
    }
    if (!subjectId) return null;

    var st = JM.topicState(subjectId, topicId);
    var target = opts.level || JM.engine.targetLevel(st.seen ? st.m : 0);

    var pool = JM.questionsFor(subjectId, topicId);
    if (!pool.length) {
      pool = JM.questionsFor(subjectId);
      topicId = pool.length ? pool[0].topic : topicId;
    }
    if (!pool.length) {
      /* last resort: any subject that has exercises */
      var fallback = JM.subjects().filter(function (x) { return JM.subjectCount(x.id) > 0; });
      subjectId = fallback.length ? fallback[0].id : null;
      pool = JM.questionsFor(subjectId);
      topicId = pool.length ? pool[0].topic : topicId;
      mode = "weakest";
    }
    if (!pool.length) return null;

    var avoid = opts.avoid || [];
    var fresh = pool.filter(function (q) { return avoid.indexOf(q.id) === -1; });
    var candidates = fresh.length ? fresh : pool;

    var scored = candidates.map(function (q) {
      var d = Math.abs(q.level - target);
      var penalty = 0;
      var topicMastery = JM.topicState(subjectId, q.topic).m;
      if (topicMastery < 60) penalty -= 0.6;        /* bias towards the weak topic */
      if (q.topic === topicId) penalty -= 0.5;
      if (avoid.indexOf(q.id) > -1) penalty += 2.5; /* never repeat in the same session if we can help it */
      return { q: q, score: d + penalty + Math.random() * 0.4 };
    });
    scored.sort(function (a, b) { return a.score - b.score; });

    var chosen = scored[0].q;
    return {
      q: chosen,
      subjectId: subjectId,
      topicId: chosen.topic,
      targetLevel: target,
      mode: mode,
      reason: JM.engine.reason({
        subjectId: subjectId, topicId: chosen.topic, mode: mode, q: chosen, targetLevel: target
      })
    };
  };

  /** human-readable "why this question?" line */
  JM.engine.reason = function (ctx) {
    var R = JM.C.ui.reasons;
    var s = JM.state();
    var st = JM.topicState(ctx.subjectId, ctx.topicId);
    var mastery = st.seen ? st.m : 0;
    var subj = JM.subjectName(ctx.subjectId);
    var topic = JM.topicName(ctx.subjectId, ctx.topicId);

    if (ctx.mode === "review" && st.next && JM.daysBetween(JM.today(), st.next) <= 0) {
      return JM.fmt(R.due, { topic: topic });
    }
    if (s.streak >= 7 && Math.random() < 0.3) return JM.fmt(R.streak, { n: s.streak });
    if (!st.seen) return JM.fmt(R.fresh, { topic: topic });
    if (mastery < 60) return JM.fmt(R.needsWork, { topic: topic, n: Math.round(mastery) });
    if (mastery < 78) return JM.fmt(R.almost, { topic: topic, n: Math.round(mastery) });
    if (JM.subjectMastery(ctx.subjectId) === JM.subjectMastery(JM.engine.weakestSubject())) {
      return JM.fmt(R.weakest, { subject: subj });
    }
    return JM.fmt(R.fresh, { topic: topic });
  };

  /**
   * Apply an answer to the memory model.
   * returns { delta, before, after, interval, next, feedback[], badges[] }
   */
  JM.engine.applyAnswer = function (q, correct) {
    var state = JM.state();
    var st = JM.topicState(q.subject, q.topic);
    var before = st.seen ? st.m : 0;
    var delta, interval;

    if (correct) {
      delta = q.level === 1 ? 8 : q.level === 2 ? 11 : 13;
      st.streak = (st.streak || 0) + 1;
      interval = INTERVALS[Math.min(st.streak - 1, INTERVALS.length - 1)];
      state.xp = (state.xp || 0) + (q.level * 10 + (st.streak > 2 ? 6 : 0));
    } else {
      delta = -9;
      st.streak = 0;
      interval = 1;
    }
    st.m = Math.max(5, Math.min(98, before + delta));
    st.seen = (st.seen || 0) + 1;
    st.last = JM.today();
    st.next = JM.fromToday(interval);

    state.history = (state.history || []).slice(-200);
    state.history.push({ id: q.id, date: JM.today(), correct: !!correct });
    state.answeredIds = (state.answeredIds || []).slice(-40);
    state.answeredIds.push(q.id);

    var feedback = [];
    feedback.push(JM.fmt(correct ? JM.C.ui.feedback.masteryUp : JM.C.ui.feedback.masteryDown, { n: Math.abs(delta) }));
    feedback.push(JM.fmt(JM.C.ui.feedback.scheduled, { when: JM.dueLabel(interval) }));
    if (correct && st.streak === 1) feedback.push(JM.C.ui.feedback.streakStart);
    if (correct && st.streak > 1) feedback.push(JM.fmt(JM.C.ui.feedback.streakKeep, { n: st.streak }));
    if (correct && st.m >= 78) feedback.push(JM.C.ui.feedback.adaptiveUp);
    if (!correct && st.m < 45) feedback.push(JM.C.ui.feedback.adaptiveDown);

    JM.save();
    var badges = JM.engine.checkBadges({ q: q, correct: correct, topicState: st });

    return {
      delta: delta, before: before, after: st.m, interval: interval,
      next: st.next, feedback: feedback, badges: badges
    };
  };

  /** evaluate badge conditions, return the ids that were just unlocked */
  JM.engine.checkBadges = function (ctx) {
    var state = JM.state();
    var fresh = [];
    function tryBadge(id, cond) {
      if (cond && state.badges.indexOf(id) === -1) {
        state.badges.push(id);
        fresh.push(id);
      }
    }
    var history = state.history || [];
    var correctStreak = 0;
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].correct) correctStreak++;
      else break;
    }
    tryBadge("firstCase", !!ctx.correct);
    tryBadge("streak7", (state.streak || 0) >= 7);
    tryBadge("streak30", (state.streak || 0) >= 30);
    tryBadge("cleanSweep", correctStreak >= 5);
    tryBadge("contractMaster", JM.subjectMastery("contract") >= 80);
    tryBadge("reviewer", JM.dueList().filter(function (d) { return d.days <= 0; }).length === 0 && state.sessions >= 1);
    tryBadge("nightOwl", new Date().getHours() >= 22 || new Date().getHours() <= 4);
    JM.save();
    return fresh;
  };

  /** Today's plan + recommended exercises for the dashboard */
  JM.engine.recommendations = function (n) {
    var out = [];
    var avoid = [];
    for (var i = 0; i < (n || 3); i++) {
      var pick = JM.engine.next({ avoid: avoid });
      if (!pick) break;
      avoid.push(pick.q.id);
      out.push(pick);
    }
    return out;
  };

  /* ---------- session runner used by practice.html ---------- */
  JM.engine.startSession = function (opts) {
    opts = opts || {};
    var session = {
      subjectId: opts.subject || null,
      topicId: opts.topic || null,
      total: opts.total || 5,
      index: 0,
      correct: 0,
      wrong: 0,
      answers: [],
      avoid: [],
      current: null,
      startedAt: Date.now(),
      finished: false,
      mode: opts.mode || (opts.subject ? "topic" : "engine")
    };
    JM.engine.pull(session);
    return session;
  };

  JM.engine.pull = function (session) {
    var pick = JM.engine.next({
      subject: session.subjectId,
      topic: session.topicId,
      avoid: session.avoid
    });
    session.current = pick;
    if (pick) session.avoid.push(pick.q.id);
    return pick;
  };

  JM.engine.answer = function (session, optionIndex) {
    var pick = session.current;
    if (!pick) return null;
    var q = pick.q;
    var correct = optionIndex === q.answer;
    var res = JM.engine.applyAnswer(q, correct);
    session.index++;
    if (correct) session.correct++; else session.wrong++;
    session.answers.push({
      q: q, picked: optionIndex, correct: correct,
      before: res.before, after: res.after, delta: res.delta,
      interval: res.interval, next: res.next, feedback: res.feedback, badges: res.badges
    });
    session.finished = session.index >= session.total;
    return { correct: correct, res: res, q: q };
  };

  JM.engine.finish = function (session) {
    var mins = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000));
    JM.logStudy(mins, session.correct, session.correct + session.wrong);
    JM.save();
    return {
      minutes: mins,
      accuracy: Math.round((session.correct / Math.max(1, session.correct + session.wrong)) * 100),
      xp: session.answers.reduce(function (a, x) { return a + (x.correct ? x.q.level * 10 : 2); }, 0),
      next: session.answers.length ? session.answers[session.answers.length - 1].next : null
    };
  };

  /** streak-safe answer: engine.delta for the sidebar "live mastery" panel */
  JM.engine.liveMastery = function (subjectId) {
    var s = JM.subject(subjectId);
    if (!s) return [];
    return s.topics
      .filter(function (t) { return JM.questionsFor(subjectId, t.id).length; })
      .map(function (t) {
        var st = JM.topicState(subjectId, t.id);
        return { topic: t.id, name: t.name, m: st.seen ? st.m : 0, next: st.next, seen: st.seen };
      })
      .sort(function (a, b) { return a.m - b.m; });
  };
})();
