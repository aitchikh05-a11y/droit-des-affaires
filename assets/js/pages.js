/* ============================================================
   JurisMind — page renderers
   landing · dashboard · path · practice · subjects · tutor
   Quotes: JS strings use single quotes, HTML attributes use double.
   ============================================================ */
(function () {
  "use strict";
  var JM = window.JM;
  var pages = (JM.pages = {});

  /* ---------- partials ---------- */
  function badgeGrid(justUnlocked) {
    return (JM.C.badgeMeta || []).map(function (b) {
      var locked = JM.state().badges.indexOf(b.id) === -1;
      var just = justUnlocked && justUnlocked.indexOf(b.id) > -1;
      return (
        '<div class="badge' + (locked ? " locked" : "") + (just ? " just" : "") + '">' +
          '<div class="bg-ic">' + JM.icon(b.icon) + "</div>" +
          '<div class="badge-name">' + JM.badgeName(b.id) + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function statusTag(m, seen) {
    if (seen === false) return '<span class="pill pill-outline tiny">' + JM.t("dash.never") + "</span>";
    var s = JM.status(m);
    return '<span class="status-tag status-' + s + '">' + JM.statusLabel(m) + "</span>";
  }

  function queueItem(o) {
    return (
      '<div class="queue-item" data-accent="' + (o.accent || "lime") + '">' +
        '<span class="qi-dot"></span>' +
        '<div class="grow">' +
          '<div class="row-flex wrap" style="gap:7px;' + (o.pills ? "margin-bottom:5px" : "") + '">' +
            (o.pills || "") +
          "</div>" +
          '<div style="font-weight:600;font-size:.92rem">' + (o.title || "") + "</div>" +
          '<div class="tiny muted">' + (o.sub || "") + "</div>" +
        "</div>" +
        '<div class="qi-side">' + (o.side || "") + "</div>" +
      "</div>"
    );
  }

  function practiceLink(sid, tid, label, cls) {
    return '<a class="btn btn-sm ' + (cls || "btn-ghost") + '" href="practice.html?subject=' + sid +
      (tid ? "&topic=" + tid : "") + '">' + label + "</a>";
  }

  /* ============================================================
     Landing — live recommendation preview
     ============================================================ */
  pages.landing = function () {
    var host = JM.$("#jm-live-next");
    var chips = JM.$$("[data-live-subject]");

    function render(subjectId) {
      if (!host) return;
      var pick = JM.engine.next({ subject: subjectId || null });
      if (!pick) { host.innerHTML = ""; return; }
      var s = JM.subject(pick.subjectId);
      host.innerHTML =
        '<div class="row-flex wrap" style="gap:9px;margin-bottom:14px">' +
          '<span class="pill pill-dark">' + JM.esc(s.name) + "</span>" +
          '<span class="pill pill-outline" style="background:rgba(25,25,35,.05);color:var(--midnight)">' +
            JM.esc(JM.topicName(pick.subjectId, pick.topicId)) + "</span>" +
          '<span class="pill pill-lav">' + JM.C.ui.difficulty[pick.q.level] + "</span>" +
        "</div>" +
        '<p class="q-stem" style="font-size:1.08rem">' + JM.esc(pick.q.stem) + "</p>" +
        '<div class="options">' +
          pick.q.options.map(function (o, i) {
            return '<div class="opt opt-readonly"><span class="opt-key">' + (i + 1) + "</span><span>" + JM.esc(o) + "</span></div>";
          }).join("") +
        "</div>" +
        '<div class="why-row"><span class="why-ic">' + JM.icon("sparkles") + "</span>" +
          "<span><b>" + JM.t("practice.whyThis") + "</b> " + JM.esc(pick.reason) + "</span></div>";
    }

    render(null);
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) { x.style.background = ""; x.style.color = ""; });
        c.style.background = "var(--midnight)";
        c.style.color = "var(--off)";
        render(c.getAttribute("data-live-subject"));
      });
    });

    JM.$$("[data-ring]").forEach(function (el) {
      var pct = parseFloat(el.getAttribute("data-ring")) || 0;
      var size = parseInt(el.getAttribute("data-ring-size") || "108", 10);
      el.innerHTML = JM.ringSVG(pct, size, el.getAttribute("data-ring-color") || "var(--lime)");
    });
    var weakestId = JM.engine.weakestSubject();
    var weakestVal = weakestId ? JM.subjectMastery(weakestId) : 0;
    JM.$$('[data-metric="weakest"]').forEach(function (el) {
      el.textContent = JM.NUM(weakestVal);
    });
    JM.$$("[data-meter-fill]").forEach(function (el) {
      el.style.width = weakestVal + "%";
    });

    /* burger → mobile nav drawer */
    var nav = JM.$("#mobile-nav");
    JM.$$("[data-burger-nav]").forEach(function (b) {
      b.addEventListener("click", function () { if (nav) nav.classList.toggle("open"); });
    });
    JM.$$("[data-prompt]", document).forEach(function (b) {
      b.addEventListener("click", function () {
        var q = b.getAttribute("data-prompt");
        location.href = "tutor.html?q=" + encodeURIComponent(q);
      });
    });
  };

  /* index.html boots with data-page="index" */
  pages.index = pages.landing;

  /* ============================================================
     Dashboard
     ============================================================ */
  pages.dashboard = function () {
    var s = JM.state();
    var lv = JM.level(s.xp);

    var hour = new Date().getHours();
    var greeting = hour < 12 ? JM.t("dash.greetingMorning") : hour < 18 ? JM.t("dash.greetingAfternoon") : JM.t("dash.greeting");
    JM.$$("[data-greeting]").forEach(function (el) {
      el.textContent = greeting + (s.name ? ", " + s.name : "");
    });

    var ready = JM.readiness();
    JM.$$("[data-readiness-ring]").forEach(function (el) {
      var size = parseInt(el.getAttribute("data-readiness-ring") || "150", 10);
      el.innerHTML = JM.ringSVG(ready, size, "var(--lime)");
    });
    JM.$$("[data-readiness-value]").forEach(function (el) { el.textContent = ready + "%"; });

    var weak = JM.weakTopics();
    var buckets = JM.dueBuckets();
    var dueCount = buckets.now.length + buckets.today.length;
    JM.$$("[data-due-count]").forEach(function (el) { el.textContent = JM.NUM(dueCount); });
    JM.$$("[data-weak-count]").forEach(function (el) { el.textContent = JM.NUM(weak.length); });
    JM.$$("[data-session-count]").forEach(function (el) { el.textContent = JM.NUM(s.sessions || 0); });
    JM.$$("[data-level-pill]").forEach(function (el) {
      el.textContent = JM.t("dash.level") + " " + lv.level;
    });

    /* dark hero: weakest subject + what to do next */
    var focus = JM.$("#dash-focus");
    if (focus) {
      var pick = JM.engine.next({});
      if (pick) {
        var fsubj = JM.subject(pick.subjectId);
        var fm = JM.subjectMastery(pick.subjectId);
        focus.innerHTML =
          '<h2 style="color:var(--off);margin-bottom:4px">' + JM.esc(fsubj.name) + "</h2>" +
          '<div class="row-flex wrap" style="gap:10px">' +
            '<span class="pill pill-lime mono" style="font-size:.95rem">' + fm + "%</span>" +
            '<span class="small" style="color:rgba(247,247,242,.72)">' + JM.t("dash.recommended") + ": " +
              JM.esc(JM.topicName(pick.subjectId, pick.topicId)) + "</span>" +
          "</div>" +
          '<p class="tiny" style="color:rgba(247,247,242,.55);margin-top:10px">' + JM.esc(pick.reason) + "</p>";
      }
    }

    /* weak spots */
    var wl = JM.$("#weak-list");
    if (wl) {
      wl.innerHTML = weak.length
        ? weak.slice(0, 4).map(function (w) {
            return queueItem({
              accent: w.accent,
              title: JM.esc(w.name),
              sub: JM.esc(w.subjectName) + " · " + (w.state ? JM.relativeLast(w.state.last) : JM.t("dash.never")),
              side: '<span class="pill pill-coral mono">' + Math.round(w.m) + "%</span>",
              pills: '<span class="tiny muted">' + JM.t("dash.weakTopic") + "</span>"
            });
          }).join("")
        : '<p class="muted small mb-0">' + JM.t("subjectsPage.noWeak") + "</p>";
    }

    /* retention queue */
    var q = JM.$("#queue");
    if (q) {
      var groups = [
        { key: "dueNow", items: buckets.now, cls: "is-now" },
        { key: "dueToday", items: buckets.today },
        { key: "dueTomorrow", items: buckets.tomorrow },
        { key: "dueLater", items: buckets.later }
      ].filter(function (g) { return g.items.length; });

      q.innerHTML = groups.length ? groups.map(function (g) {
        return (
          '<div class="queue-group">' +
            '<div class="queue-head ' + (g.cls || "") + '">' +
              '<span style="width:15px;height:15px">' + JM.icon("clock") + "</span>" +
              "<span>" + JM.t("dash." + g.key) + "</span>" +
              '<span class="count">' + g.items.length + "</span>" +
            "</div>" +
            g.items.map(function (it) {
              return queueItem({
                accent: it.accent,
                title: JM.esc(it.name),
                sub: JM.esc(it.subjectName) + " · " + JM.C.ui.mastery + " " + Math.round(it.m) + "%",
                side: '<div class="tiny muted mb-1">' + JM.dueLabel(it.days) + "</div>" +
                  practiceLink(it.subject, it.topic, JM.t("ctas.practiceNow"), "btn-lime")
              });
            }).join("") +
          "</div>"
        );
      }).join("") : '<p class="muted small mb-0">' + JM.t("subjectsPage.noWeak") + "</p>";
    }

    /* weekly activity */
    var bars = JM.$("#week-bars");
    if (bars) {
      var series = JM.weekSeries();
      var max = Math.max.apply(null, series.map(function (d) { return d.minutes; }).concat([30]));
      var dayNames = JM.C.ui.days;
      bars.innerHTML = series.map(function (d) {
        var hpct = d.minutes ? Math.max(8, Math.round((d.minutes / max) * 100)) : 4;
        return '<div class="bar" title="' + d.minutes + ' ' + JM.t("dash.minutes") + '"><i style="height:' + hpct + '%"></i></div>';
      }).join("");
      var lab = JM.$("#week-labels");
      if (lab) {
        lab.innerHTML = series.map(function (d) {
          return "<span>" + dayNames[(d.dow + 6) % 7] + "</span>";
        }).join("");
      }
      var legend = JM.$("#week-legend");
      if (legend) {
        var mins = series.reduce(function (a, d) { return a + d.minutes; }, 0);
        var withAcc = series.filter(function (d) { return d.accuracy > 0; });
        var accAvg = withAcc.length
          ? Math.round((withAcc.reduce(function (a, d) { return a + d.accuracy; }, 0) / withAcc.length) * 100)
          : 0;
        legend.innerHTML =
          "<span><b>" + JM.NUM(mins) + "</b> " + JM.t("dash.minutes") + "</span>" +
          "<span><b>" + accAvg + "%</b> " + JM.t("dash.accuracy") + "</span>";
      }
    }

    /* per-subject progress */
    var sp = JM.$("#subject-progress");
    if (sp) {
      sp.innerHTML = JM.subjects().filter(function (x) { return JM.subjectCount(x.id) > 0; }).map(function (x) {
        var m = JM.subjectMastery(x.id);
        var seen = x.topics.some(function (t) {
          var st = JM.touchedTopic(x.id, t.id);
          return st && st.seen > 0;
        });
        var w = JM.weakTopics().filter(function (k) { return k.subject === x.id; });
        var cls = m < 60 ? "meter-coral" : m < 80 ? "meter-mint" : "meter-lime";
        var next = JM.dueList().filter(function (d) { return d.subject === x.id; })[0];
        return queueItem({
          accent: x.accent,
          title: JM.esc(x.name),
          sub: '<div class="meter meter-thin ' + cls + '" style="margin:8px 0 7px"><i style="width:' + m + '%"></i></div>' +
            (!seen ? '<span class="muted">' + JM.t("dash.never") + "</span>" : w.length ? '<span class="muted">' + w.length + " " + JM.t("dash.weakTopic") + "</span>" : JM.t("subjectsPage.noWeak")) +
            (next ? " · " + JM.t("dash.dueDate") + " " + JM.dueLabel(next.days) : ""),
          side: '<div class="mono" style="font-weight:700">' + m + "%</div>" +
            '<a class="tiny link-arrow" href="subjects.html#' + x.id + '">' + JM.t("subjectsPage.topicBreakdown") + "</a>",
          pills: '<span class="pill pill-outline tiny">' + JM.t("subjectsPage.mastery") + "</span>" +
            (!seen
              ? '<span class="pill pill-outline tiny">' + JM.t("dash.never") + "</span>"
              : '<span class="pill ' + (w.length ? "pill-coral" : "pill-mint") + ' tiny">' + JM.statusLabel(m) + "</span>")
        });
      }).join("");
    }

    /* milestones */
    var ms = JM.$("#milestones");
    if (ms) {
      var hasReviews = (s.sessions || 0) > 0 && JM.dueList().length > 0 && JM.dueList().filter(function (d) { return d.days <= 0; }).length === 0;
      var stages = [
        { t: JM.t("path.diagnostic"), done: (s.sessions || 0) > 0 },
        { t: JM.t("path.lesson"), done: (s.sessions || 0) > 3 },
        { t: JM.t("path.caseLab"), done: (s.sessions || 0) > 6 },
        { t: JM.t("path.reviewCycle"), done: hasReviews },
        { t: JM.t("path.mockExam"), done: ready >= 70 }
      ];
      var currentAssigned = false;
      ms.innerHTML = stages.map(function (x, i) {
        var isCurrent = !x.done && !currentAssigned;
        if (isCurrent) currentAssigned = true;
        return queueItem({
          title: x.t,
          sub: x.done ? JM.t("path.done") : isCurrent ? JM.t("path.current") : JM.t("path.locked"),
          side: '<span class="tiny muted">' + (i + 1) + "/5</span>" +
            '<span class="step-ic" style="width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:' +
            (x.done ? "var(--mint)" : "rgba(25,25,35,.07)") + ";color:" + (x.done ? "#06301f" : "var(--grey)") + '">' +
            (x.done ? JM.icon("check") : JM.icon("clock")) + "</span>"
        });
      }).join("");
    }

    /* badges */
    var bg = JM.$("#badges");
    if (bg) bg.innerHTML = badgeGrid();
    JM.$$("[data-badges-count]").forEach(function (el) {
      el.textContent = JM.fmt(JM.t("dash.badgesSub"), { n: s.badges.length, total: (JM.C.badgeMeta || []).length });
    });

    /* recommendations */
    var rc = JM.$("#recommendations");
    if (rc) {
      rc.innerHTML = JM.engine.recommendations(4).map(function (p) {
        var subj = JM.subject(p.subjectId);
        return queueItem({
          accent: subj ? subj.accent : "lime",
          title: JM.esc(JM.topicName(p.subjectId, p.topicId)),
          sub: JM.esc(p.reason),
          pills: '<span class="pill pill-outline tiny">' + JM.esc(subj.name) + "</span>" +
            '<span class="pill pill-lav tiny">' + JM.C.ui.difficulty[p.q.level] + "</span>",
          side: practiceLink(p.subjectId, p.topicId, JM.t("dash.startExercise"), "btn-lime")
        });
      }).join("");
    }

    /* today's plan */
    var plan = JM.$("#plan");
    if (plan) {
      var todayRec = (s.days || []).filter(function (d) { return d.date === JM.today(); })[0];
      var items = [JM.t("dash.planItem1"), JM.t("dash.planItem2"), JM.t("dash.planItem3")];
      var doneCount = 0;
      plan.innerHTML = items.map(function (t, i) {
        var done = !!(todayRec && ((i === 0 && todayRec.total >= 3) || (i === 1 && todayRec.total >= 5) || (i === 2 && (s.sessions || 0) >= 2)));
        if (done) doneCount++;
        return (
          '<div class="queue-item">' +
            '<span style="width:22px;height:22px;border-radius:7px;flex:none;display:grid;place-items:center;background:' +
              (done ? "var(--lime)" : "rgba(25,25,35,.07)") + ';color:var(--lime-ink)">' +
              (done ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m5 13 4 4L19 7"/></svg>' : "") +
            "</span>" +
            '<span class="grow" style="font-size:.92rem' + (done ? ";text-decoration:line-through;color:var(--grey)" : "") + '">' + t + "</span>" +
            (done ? '<span class="pill pill-mint tiny">' + JM.t("dash.planDone") + "</span>" : "") +
          "</div>"
        );
      }).join("");
      JM.$$("[data-plan-count]").forEach(function (el) { el.textContent = doneCount + "/" + items.length; });
    }

    /* review stats tiles */
    JM.$$("[data-bucket]").forEach(function (el) {
      var key = el.getAttribute("data-bucket");
      var b = JM.dueBuckets();
      var map = { now: b.now.length, today: b.today.length, tomorrow: b.tomorrow.length, later: b.later.length };
      el.textContent = JM.NUM(map[key] || 0);
    });

    JM.$$("[data-reset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.confirm(JM.t("dash.resetConfirm"))) {
          JM.reset();
          JM.toast(JM.t("ui.toast.reset"), "refresh");
          setTimeout(function () { location.reload(); }, 600);
        }
      });
    });
  };

  /* ============================================================
     Learning path
     ============================================================ */
  function subjectStages(sid) {
    var topics = JM.engine.liveMastery(sid);
    var weakTop = topics.slice(0, Math.max(1, Math.ceil(topics.length / 2)));
    var strongTop = topics.filter(function (t) { return t.m >= 60; });
    var readiness = JM.readiness();
    var due = JM.dueList().filter(function (d) { return d.subject === sid; });

    return [
      {
        key: "diagnostic",
        steps: [{ type: "diagnostic", name: JM.t("path.diagnostic"), state: (JM.state().sessions || 0) > 0 ? "done" : "current" }]
      },
      {
        key: "foundations",
        steps: weakTop.map(function (t) {
          return {
            type: "drill", name: t.name, topic: t.topic, mastery: t.m,
            state: t.m >= 60 ? "done" : t.m > 0 ? "current" : "locked"
          };
        })
      },
      {
        key: "application",
        steps: (strongTop.length ? strongTop : topics).map(function (t) {
          return {
            type: "caseLab", name: t.name, topic: t.topic, mastery: t.m,
            state: t.m >= 78 ? "done" : t.m >= 60 ? "current" : "locked"
          };
        })
      },
      {
        key: "retention",
        steps: (due.length ? due.slice(0, 3) : [{ name: JM.t("path.reviewCycle"), days: null, m: readiness, topic: null }])
          .map(function (d) {
            return {
              type: "review", name: d.name, topic: d.topic, mastery: d.m,
              when: d.days != null ? JM.dueLabel(d.days) : "",
              state: d.days == null ? "locked" : d.days <= 0 ? "current" : "done"
            };
          })
      },
      {
        key: "exam",
        steps: [{
          type: "mockExam", name: JM.t("path.mockExam"), mastery: readiness,
          state: readiness >= 70 ? "current" : "locked"
        }]
      }
    ];
  }

  function stageTitle(key) {
    return JM.t("path." + (key === "retention" ? "reviewCycle" : key === "exam" ? "mockExam" : key));
  }

  function renderStages(sid) {
    var host = JM.$("#path-stages");
    if (!host) return;
    var subj = JM.subject(sid);
    if (!subj) return;
    host.setAttribute("data-accent", subj.accent);

    var stages = subjectStages(sid);
    host.innerHTML = stages.map(function (st, i) {
      var doneCount = st.steps.filter(function (x) { return x.state === "done"; }).length;
      var allDone = st.steps.length > 0 && doneCount === st.steps.length;
      var locked = st.steps.every(function (x) { return x.state === "locked"; });
      return (
        '<section class="stage card reveal in' + (locked ? " is-locked" : "") + '">' +
          '<div class="stage-head">' +
            '<span class="stage-num">' + (i + 1) + "</span>" +
            '<div class="grow">' +
              '<div class="card-title">' + stageTitle(st.key) + "</div>" +
              '<div class="card-sub">' + doneCount + "/" + st.steps.length + " " + JM.t("path.steps") + " · " +
                (allDone ? JM.t("path.stageDone") : JM.fmt(JM.t("path.unlockNext"), { n: st.steps.length - doneCount })) +
              "</div>" +
            "</div>" +
            '<span class="pill ' + (allDone ? "pill-mint" : "pill-outline") + '">' +
              (allDone ? JM.t("path.done") : locked ? JM.t("path.locked") : JM.t("path.current")) + "</span>" +
          "</div>" +
          '<div class="stage-track">' +
            st.steps.map(function (x) {
              var ic = x.state === "done" ? "check"
                : x.type === "mockExam" ? "target"
                : x.type === "diagnostic" ? "compass"
                : x.type === "review" ? "repeat"
                : x.type === "caseLab" ? "gavel" : "book";
              return (
                '<div class="step-row is-' + x.state + '">' +
                  '<span class="step-ic">' + JM.icon(ic) + "</span>" +
                  '<div class="grow">' +
                    '<div class="step-name">' + JM.esc(x.name) + "</div>" +
                    '<div class="tiny muted">' + JM.t("path." + x.type) + (x.when ? " · " + x.when : "") + "</div>" +
                  "</div>" +
                  '<div class="step-side">' +
                    (x.mastery != null ? '<span class="mono tiny muted">' + Math.round(x.mastery) + "%</span>" : "") +
                    (x.state === "locked"
                      ? '<span class="pill pill-outline tiny">' + JM.t("path.locked") + "</span>"
                      : practiceLink(sid, x.topic, JM.t("path.practiceStage"), x.state === "current" ? "btn-lime" : "btn-ghost")) +
                  "</div>" +
                "</div>"
              );
            }).join("") +
          "</div>" +
        "</section>"
      );
    }).join("");

    var total = 0, done = 0;
    stages.forEach(function (st) {
      st.steps.forEach(function (x) { total++; if (x.state === "done") done++; });
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    JM.$$("[data-path-progress]").forEach(function (el) { el.textContent = pct + "%"; });
    JM.$$("[data-path-meter]").forEach(function (el) { el.style.width = pct + "%"; });
    JM.$$("[data-path-done]").forEach(function (el) { el.textContent = done + "/" + total; });
    JM.reveal();
  }

  pages.path = function () {
    var tabs = JM.$$("[data-subj-tab]");
    var withQs = JM.subjects().filter(function (s) { return JM.subjectCount(s.id) > 0; });
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("on"); });
        t.classList.add("on");
        renderStages(t.getAttribute("data-subj-tab"));
      });
    });
    if (withQs.length) {
      if (tabs.length) tabs[0].classList.add("on");
      renderStages(withQs[0].id);
    }

    var ready = JM.readiness();
    JM.$$("[data-readiness-ring]").forEach(function (el) {
      var size = parseInt(el.getAttribute("data-readiness-ring") || "130", 10);
      el.innerHTML = JM.ringSVG(ready, size, "var(--mint)");
    });
    JM.$$("[data-readiness-value]").forEach(function (el) { el.textContent = ready + "%"; });

    var rk = JM.$("#risk-list");
    if (rk) {
      var risk = JM.atRisk(5);
      rk.innerHTML = risk.length
        ? risk.map(function (x) {
            return queueItem({
              accent: x.accent,
              title: JM.esc(x.name),
              sub: JM.esc(x.subjectName) + " · " + JM.t("dash.lastSeen") + " " + JM.relativeLast(x.last),
              side: '<span class="tiny muted">' + JM.t("path.readinessScore") + "</span>" +
                '<div class="delta-down mono">' + x.retention + "%</div>"
            });
          }).join("")
        : '<p class="muted small mb-0">' + JM.t("subjectsPage.noWeak") + "</p>";
    }

    JM.$$("[data-upcoming-day]").forEach(function (col) {
      var n = parseInt(col.getAttribute("data-upcoming-day"), 10);
      var items = JM.dueList().filter(function (d) { return d.days === n; });
      col.innerHTML =
        '<div class="tiny muted">' + JM.dueLabel(n) + "</div>" +
        '<div class="stat-val mono" style="font-size:1.35rem">' + items.length + "</div>" +
        '<div class="tiny muted">' + (items.length ? JM.esc(items[0].name) + (items.length > 1 ? " +" + (items.length - 1) : "") : "—") + "</div>";
    });

    var bars = JM.$("#path-subject-bars");
    if (bars) {
      bars.innerHTML = JM.subjects().filter(function (s) { return JM.subjectCount(s.id) > 0; }).map(function (s) {
        var m = JM.subjectMastery(s.id);
        return (
          '<div class="mb-2" data-accent="' + s.accent + '">' +
            '<div class="between tiny"><span>' + JM.esc(s.name) + '</span><b class="mono">' + m + "%</b></div>" +
            '<div class="meter meter-thin" style="margin-top:6px"><i style="width:' + m + '%;background:var(--accent)"></i></div>' +
          "</div>"
        );
      }).join("");
    }
  };

  /* ============================================================
     Practice session
     ============================================================ */
  pages.practice = function () {
    var params = new URLSearchParams(location.search);
    var rawSubject = params.get("subject");
    var rawTopic = params.get("topic");
    var startSubject = JM.security && JM.security.validSubjectId(rawSubject) ? rawSubject : null;
    var startTopic = startSubject && JM.security && JM.security.validTopicId(startSubject, rawTopic) ? rawTopic : null;
    var setup = JM.$("#setup");
    var sessionHost = JM.$("#session");
    var timerEl = JM.$("[data-timer]");
    var steps = 5;
    var started = null;
    var timerId = null;
    var picked = null;

    function renderSetup() {
      if (!setup) return;
      var withQs = JM.subjects().filter(function (s) { return JM.subjectCount(s.id) > 0; });
      setup.innerHTML =
        '<div class="card">' +
          '<div class="card-title mb-1">' + JM.t("practice.chooseSubject") + "</div>" +
          '<p class="card-sub mb-2">' + JM.t("practice.chooseSubjectSub") + "</p>" +
          '<div class="prompt-chips" style="margin-bottom:18px">' +
            '<button class="chip" data-start="">' + JM.icon("sparkles") + " " + JM.t("practice.anySubject") + "</button>" +
            withQs.map(function (s) {
              return '<button class="chip" data-start="' + s.id + '">' + JM.icon(s.icon) + " " + JM.esc(s.name) +
                ' <span class="muted tiny mono">' + JM.subjectMastery(s.id) + "%</span></button>";
            }).join("") +
          "</div>" +
          '<div class="hairline"></div>' +
          '<p class="small muted mb-0">' + JM.icon("bolt") + " " + JM.t("practice.keyboardHint") + "</p>" +
        "</div>";
      JM.$$("[data-start]", setup).forEach(function (b) {
        b.addEventListener("click", function () { begin(b.getAttribute("data-start") || null, startTopic); });
      });
    }

    function startTimer() {
      var secs = 0;
      if (timerId) clearInterval(timerId);
      timerId = setInterval(function () {
        secs++;
        if (timerEl) timerEl.textContent = Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0");
      }, 1000);
    }

    function begin(sid, tid) {
      started = JM.engine.startSession({ subject: sid, topic: tid, total: steps });
      picked = null;
      if (setup) setup.classList.add("hide");
      if (sessionHost) sessionHost.classList.remove("hide");
      startTimer();
      renderQuestion();
    }

    function dotsHTML() {
      return '<div class="dots">' + Array.from({ length: steps }).map(function (_, i) {
        var a = started.answers[i];
        var cls = a ? (a.correct ? "ok" : "no") : i === started.index ? "now" : "";
        return '<i class="' + cls + '"></i>';
      }).join("") + "</div>";
    }

    function renderLive(subjectId) {
      var host = JM.$("#live-mastery");
      if (!host) return;
      host.innerHTML = JM.engine.liveMastery(subjectId).slice(0, 5).map(function (t) {
        var cls = t.m < 60 ? "meter-coral" : t.m < 80 ? "meter-mint" : "meter-lime";
        var when = t.next ? JM.t("practice.nextReview") + ": " + JM.dueLabel(JM.daysBetween(JM.today(), t.next)) : JM.t("dash.never");
        return (
          '<div class="lm-row">' +
            '<div class="lm-top"><span class="small">' + JM.esc(t.name) + "</span><b>" + Math.round(t.m) + "%</b></div>" +
            '<div class="meter meter-thin ' + cls + '"><i style="width:' + Math.round(t.m) + '%"></i></div>' +
            '<div class="tiny" style="color:rgba(247,247,242,.5)">' + when + "</div>" +
          "</div>"
        );
      }).join("");
    }

    function renderQuestion() {
      if (!sessionHost) return;
      if (started.finished) return renderSummary();
      var pick = started.current;
      if (!pick) return renderEmpty();
      picked = null;

      var subj = JM.subject(pick.subjectId);
      var q = pick.q;
      sessionHost.innerHTML =
        '<div class="q-wrap">' +
          '<div class="card q-card">' +
            '<div class="between wrap mb-2">' +
              '<div class="q-meta" style="margin:0">' +
                '<span class="pill pill-outline" data-accent="' + (subj ? subj.accent : "lime") + '">' + JM.esc(subj ? subj.name : "") + "</span>" +
                '<span class="pill pill-lav">' + JM.esc(JM.topicName(pick.subjectId, pick.topicId)) + "</span>" +
                '<span class="pill">' + JM.C.ui.difficulty[q.level] + "</span>" +
              "</div>" +
              dotsHTML() +
            "</div>" +
            '<div class="q-stem">' + JM.esc(q.stem) + "</div>" +
            '<div class="options" id="options">' +
              q.options.map(function (o, i) {
                return '<button class="opt" data-opt="' + i + '"><span class="opt-key">' + (i + 1) + "</span><span>" + JM.esc(o) + "</span></button>";
              }).join("") +
            "</div>" +
            '<div id="q-feedback"></div>' +
            '<div class="between mt-3 wrap" style="gap:10px;align-items:flex-start">' +
              '<span class="tiny muted grow" style="max-width:52ch">' +
                '<b>' + JM.t("practice.whyThis") + "</b> " + JM.esc(pick.reason) +
              "</span>" +
              '<button class="btn btn-dark" id="q-next" disabled>' +
                (started.index + 1 >= steps ? JM.t("practice.results") : JM.t("practice.next")) + JM.icon("arrow") +
              "</button>" +
            "</div>" +
          "</div>" +
          '<aside class="card card-dark">' +
            '<div class="between mb-1">' +
              '<div class="card-title" style="color:var(--off)">' + JM.t("practice.liveMastery") + "</div>" +
              '<span class="xp-chip">' + started.correct + "/" + (started.correct + started.wrong) + "</span>" +
            "</div>" +
            '<div class="live-mastery" id="live-mastery"></div>' +
            '<div class="hairline" style="background:rgba(255,255,255,.12)"></div>' +
            '<div class="tiny" style="color:rgba(247,247,242,.62)">' + JM.t("practice.difficulty") + ": <b style=\'color:var(--lavender)\'>" +
              JM.C.ui.difficulty[pick.targetLevel] + "</b></div>" +
            '<div class="prompt-chips" data-subject-pick style="margin-top:14px"></div>' +
            '<a class="btn btn-ghost btn-block mt-2" style="--btn-fg:var(--off);border-color:rgba(255,255,255,.2)" href="dashboard.html">' +
              JM.t("practice.backToDashboard") + "</a>" +
          "</aside>" +
        "</div>";

      renderLive(pick.subjectId);

      JM.$$("[data-opt]", sessionHost).forEach(function (btn) {
        btn.addEventListener("click", function () { pickOption(parseInt(btn.getAttribute("data-opt"), 10)); });
      });

      var nextBtn = JM.$("#q-next");
      nextBtn.addEventListener("click", function () {
        if (picked === null) return;
        if (started.finished) return renderSummary();
        JM.engine.pull(started);
        renderQuestion();
      });

      document.onkeydown = function (e) {
        if (e.key >= "1" && e.key <= "9") {
          var idx = parseInt(e.key, 10) - 1;
          if (idx < q.options.length) pickOption(idx);
        }
        if (e.key === "Enter" && picked !== null) nextBtn.click();
      };

      JM.$$("[data-subject-pick]").forEach(function (el) {
        el.innerHTML = JM.subjects().filter(function (s) { return JM.subjectCount(s.id) > 0; }).map(function (s) {
          return '<button class="chip" data-switch="' + s.id + '">' + JM.esc(s.short) + "</button>";
        }).join("");
      });
      JM.$$("[data-switch]").forEach(function (b) {
        b.addEventListener("click", function () { begin(b.getAttribute("data-switch"), null); });
      });
    }

    function pickOption(i) {
      if (picked !== null || !started || started.finished) return;
      picked = i;
      var res = JM.engine.answer(started, i);
      var q = res.q;
      JM.$$("[data-opt]", sessionHost).forEach(function (btn) {
        var idx = parseInt(btn.getAttribute("data-opt"), 10);
        btn.setAttribute("disabled", "disabled");
        if (idx === q.answer) btn.classList.add("correct");
        if (idx === i && !res.correct) btn.classList.add("wrong");
        if (idx === i) btn.classList.add("picked");
      });
      var badgesHTML = res.res.badges.map(function (b) {
        return '<li><span style="width:16px;height:16px;color:var(--midnight)">' + JM.icon(JM.badgeIcon(b)) + "</span>" +
          JM.esc(JM.fmt(JM.t("ui.badges.unlocked"), { name: JM.badgeName(b) })) + "</li>";
      }).join("");
      var fb = JM.$("#q-feedback");
      fb.innerHTML =
        '<div class="feedback ' + (res.correct ? "good" : "bad") + '">' +
          '<h4><span style="width:20px;height:20px">' + JM.icon(res.correct ? "check" : "alert") + "</span>" +
            (res.correct ? JM.t("practice.correct") : JM.t("practice.wrong")) + "</h4>" +
          (res.correct ? "" : '<p class="small mb-2"><b>' + JM.t("practice.theAnswer") + ":</b> " + JM.esc(q.options[q.answer]) + "</p>") +
          '<p class="small mb-0" style="color:#3a3a4a"><b>' + JM.t("practice.explanation") + ":</b> " + JM.esc(q.explain) + "</p>" +
          '<ul class="fb-list">' + res.res.feedback.map(function (f) { return "<li>" + JM.esc(f) + "</li>"; }).join("") + badgesHTML + "</ul>" +
          '<div class="row-flex wrap" style="gap:8px;margin-top:12px">' +
            '<span class="xp-chip">' + (res.correct ? "+" + q.level * 10 : "+2") + " " + JM.C.ui.xp + "</span>" +
            '<span class="pill ' + (res.correct ? "pill-mint" : "pill-coral") + '">' +
              JM.esc(JM.fmt(res.correct ? JM.C.ui.feedback.masteryUp : JM.C.ui.feedback.masteryDown, { n: Math.abs(res.res.delta) })) + "</span>" +
            '<span class="pill pill-outline">' + JM.t("practice.nextReview") + ": " + JM.dueLabel(res.res.interval) + "</span>" +
          "</div>" +
        "</div>";
      var next = JM.$("#q-next");
      next.removeAttribute("disabled");
      next.classList.remove("btn-dark");
      next.classList.add("btn-lime");
      renderLive(started.current.subjectId);
      JM.applyUser();
    }

    function renderSummary() {
      if (timerId) clearInterval(timerId);
      var fin = JM.engine.finish(started);
      var st = JM.state();
      sessionHost.innerHTML =
        '<div class="card" style="padding:34px">' +
          '<div class="center">' +
            '<div class="bicon bicon-mint" style="margin:0 auto 16px">' + JM.icon("target") + "</div>" +
            '<p class="kicker">' + JM.t("practice.sessionSummary") + "</p>" +
            '<h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">' + JM.t("practice.yourScore") + ": " + fin.accuracy + "%</h1>" +
            '<p class="muted">' + started.correct + " / " + (started.correct + started.wrong) + " · " + fin.minutes + " " + JM.t("dash.minutes") + "</p>" +
          "</div>" +
          '<div class="grid g-3 mt-3">' +
            '<div class="card card-flat"><div class="stat"><span class="stat-lab">' + JM.t("practice.xpEarned") + '</span><span class="stat-val">+' + fin.xp + "</span></div></div>" +
            '<div class="card card-flat"><div class="stat"><span class="stat-lab">' + JM.t("practice.masteryMoved") + '</span><span class="stat-val delta-up">' + started.correct + "</span></div></div>" +
            '<div class="card card-flat"><div class="stat"><span class="stat-lab">' + JM.t("dash.streak") + '</span><span class="stat-val">' + JM.NUM(st.streak) + "</span></div></div>" +
          "</div>" +
          '<div class="mt-3">' +
            started.answers.map(function (a) {
              return queueItem({
                accent: a.q.subject ? JM.subject(a.q.subject).accent : "lime",
                title: JM.esc(JM.topicName(a.q.subject, a.q.topic)),
                sub: (a.q.subject ? JM.subjectShort(a.q.subject) + " · " : "") + JM.C.ui.difficulty[a.q.level] +
                  " · " + JM.t("practice.nextReview") + ": " + JM.dueLabel(a.interval),
                side: '<span class="mono ' + (a.delta >= 0 ? "delta-up" : "delta-down") + '">' +
                  (a.delta > 0 ? "+" : "") + a.delta + "</span>" +
                  '<span class="tiny muted">' + (a.correct ? JM.t("practice.done") : JM.t("practice.missed")) + "</span>"
              });
            }).join("") +
          "</div>" +
          '<div class="page-actions mt-3" style="justify-content:center">' +
            '<a class="btn btn-lime" href="practice.html">' + JM.icon("refresh") + JM.t("practice.practiceAgain") + "</a>" +
            '<a class="btn btn-ghost" href="dashboard.html">' + JM.t("practice.backToDashboard") + "</a>" +
            '<a class="btn btn-ghost" href="path.html">' + JM.t("ctas.seePath") + "</a>" +
          "</div>" +
        "</div>" +
        '<div class="card mt-3"><div class="between mb-2"><div class="card-title">' + JM.t("dash.badges") + "</div>" +
          '<span class="tiny muted">' + JM.fmt(JM.t("dash.badgesSub"), { n: st.badges.length, total: (JM.C.badgeMeta || []).length }) + "</span></div>" +
          '<div class="badge-grid">' + badgeGrid() + "</div></div>";
      JM.applyUser();
      JM.reveal();
    }

    function renderEmpty() {
      sessionHost.innerHTML =
        '<div class="empty"><div class="bicon bicon-lav">' + JM.icon("books") + "</div>" +
        "<h3>" + JM.t("practice.emptyTitle") + "</h3>" +
        '<p class="muted">' + JM.t("practice.emptyText") + "</p>" +
        '<a class="btn btn-lime" href="subjects.html">' + JM.C.nav.app[3].label + "</a></div>";
    }

    if (startSubject) begin(startSubject, startTopic);
    else renderSetup();
  };

  /* ============================================================
     Subjects library
     ============================================================ */
  pages.subjects = function () {
    var host = JM.$("#subject-lib");
    if (!host) return;
    host.innerHTML = JM.subjects().map(function (s) {
      var count = JM.subjectCount(s.id);
      var m = JM.subjectMastery(s.id);
      var weak = JM.weakTopics().filter(function (w) { return w.subject === s.id; });

      var rows = s.topics.map(function (t) {
        var st = JM.touchedTopic(s.id, t.id);
        var hasQ = JM.questionsFor(s.id, t.id).length > 0;
        var val = st && st.seen ? st.m : 0;
        var cls = !hasQ ? "" : val < 60 ? "meter-coral" : val < 80 ? "meter-mint" : "meter-lime";
        return (
          '<div class="topic-row">' +
            "<div>" +
              '<div class="topic-name">' + JM.esc(t.name) + "</div>" +
              '<div class="topic-key">' + JM.esc(t.key) + "</div>" +
            "</div>" +
            (hasQ
              ? '<div class="meter meter-thin ' + cls + '"><i style="width:' + Math.round(val) + '%"></i></div>'
              : '<div class="center"><span class="pill pill-outline tiny">' + JM.t("subjectsPage.soonNote") + "</span></div>") +
            (hasQ
              ? '<div class="row-flex" style="justify-content:flex-end;gap:8px">' + statusTag(val, !!(st && st.seen)) +
                practiceLink(s.id, t.id, JM.t("dash.startExercise"), "btn-ghost") + "</div>"
              : '<div class="center"><span class="pill tiny">' + JM.t("subjectsPage.soon") + "</span></div>") +
          "</div>"
        );
      }).join("");

      var next = JM.dueList().filter(function (d) { return d.subject === s.id; }).slice(0, 3);
      return (
        '<section class="card subj-block reveal" id="' + s.id + '" data-accent="' + s.accent + '">' +
          '<div class="between wrap" style="gap:14px">' +
            '<div class="row-flex" style="gap:14px">' +
              '<span class="subj-icon" style="width:48px;height:48px">' + JM.icon(s.icon) + "</span>" +
              "<div>" +
                '<h2 style="font-size:1.3rem;margin-bottom:4px">' + JM.esc(s.name) + "</h2>" +
                '<p class="card-sub mb-0" style="max-width:60ch">' + JM.esc(s.blurb) + "</p>" +
              "</div>" +
            "</div>" +
            '<div class="row-flex wrap" style="gap:10px">' +
              (count ? '<span class="pill pill-dark mono">' + m + "% " + JM.t("subjectsPage.mastery") + "</span>" : "") +
              '<span class="pill pill-outline">' + (count ? JM.fmt(JM.t("subjectsPage.exercises"), { n: count }) : JM.t("subjectsPage.soon")) + "</span>" +
              (count ? practiceLink(s.id, null, JM.t("ctas.practiceNow"), "btn-lime") : "") +
            "</div>" +
          "</div>" +
          '<div class="hairline"></div>' +
          '<div class="topic-row" style="border-bottom:0;padding-top:0">' +
            '<div class="kicker mb-0">' + JM.t("subjectsPage.topicBreakdown") + "</div>" +
            '<div class="kicker mb-0 center">' + JM.t("subjectsPage.mastery") + "</div>" +
            '<div class="kicker mb-0" style="text-align:end">' + JM.t("subjectsPage.schedule") + "</div>" +
          "</div>" +
          rows +
          (next.length
            ? '<div class="hairline"></div><div class="row-flex wrap" style="gap:8px">' +
              '<span class="tiny muted">' + JM.t("subjectsPage.schedule") + ":</span>" +
              next.map(function (n) {
                return '<span class="pill pill-outline tiny">' + JM.esc(n.name) + " · " + JM.dueLabel(n.days) + "</span>";
              }).join("") + "</div>"
            : "") +
          (weak.length
            ? '<div class="hairline"></div><div class="row-flex wrap" style="gap:8px">' +
              '<span class="pill pill-coral">' + JM.t("subjectsPage.weakTopics") + " · " + weak.length + "</span>" +
              weak.map(function (w) {
                return '<span class="pill pill-outline tiny">' + JM.esc(w.name) + " · " + Math.round(w.m) + "%</span>";
              }).join("") + "</div>"
            : "") +
        "</section>"
      );
    }).join("");
    JM.reveal();
  };

  /* ============================================================
     AI tutor
     ============================================================ */
  pages.tutor = function () {
    var chat = JM.$("#chat");
    var composer = JM.$("#composer");
    var input = JM.$("#tutor-input");
    var mode = "simple";
    if (!chat) return;

    function contextPanel() {
      var host = JM.$("#tutor-context");
      if (!host) return;
      var weak = JM.weakTopics(3);
      var sessions = JM.state().sessions || 0;
      var pathStage = sessions === 0
        ? JM.t("path.diagnostic") + " → " + JM.t("path.foundations")
        : sessions <= 3
        ? JM.t("path.foundations") + " → " + JM.t("path.caseLab")
        : JM.t("path.caseLab") + " → " + JM.t("path.reviewCycle");
      host.innerHTML =
        '<div class="card-title">' + JM.t("tutor.contextTitle") + "</div>" +
        '<p class="card-sub mb-2">' + JM.t("tutor.contextSub") + "</p>" +
        '<div class="kicker mb-0">' + JM.t("tutor.ctxWeak") + "</div>" +
        '<div class="prompt-chips mb-2">' +
          (weak.length
            ? weak.map(function (w) {
                return '<button class="chip tiny" data-ask="' + JM.esc(w.name) + '">' + JM.esc(w.name) + " · " + Math.round(w.m) + "%</button>";
              }).join("")
            : '<span class="muted small">' + JM.t("subjectsPage.noWeak") + "</span>") +
        "</div>" +
        '<div class="kicker mb-0">' + JM.t("tutor.ctxPath") + "</div>" +
        '<p class="small mb-2">' + pathStage + "</p>" +
        '<div class="kicker mb-0">' + JM.t("tutor.ctxLang") + "</div>" +
        '<p class="small mb-0">' + JM.C.label + " · " + JM.C.dir.toUpperCase() + "</p>";
      JM.$$("[data-ask]", host).forEach(function (b) {
        b.addEventListener("click", function () { ask(b.getAttribute("data-ask")); });
      });
    }

    function push(role, html) {
      var el = document.createElement("div");
      el.className = "msg " + (role === "me" ? "msg-me" : "msg-tutor");
      var initial = (JM.load().name || "JM").trim().charAt(0).toUpperCase();
      el.innerHTML =
        '<span class="msg-avatar">' + (role === "me" ? initial : JM.icon("sparkles")) + "</span>" +
        '<div class="msg-body"><div class="msg-name">' + (role === "me" ? JM.t("tutor.you") : JM.t("tutor.tutor")) + "</div>" +
        html + "</div>";
      chat.appendChild(el);
      chat.scrollTop = chat.scrollHeight;
      return el;
    }

    function matchKB(text) {
      var t = text.toLowerCase();
      var best = null, bestScore = 0;
      (JM.C.tutorKB || []).forEach(function (entry) {
        var score = 0;
        entry.kw.forEach(function (k) {
          if (t.indexOf(k.toLowerCase()) > -1) score += k.length >= 6 ? 2 : 1;
        });
        if (score > bestScore) { best = entry; bestScore = score; }
      });
      return bestScore > 0 ? best : null;
    }

    function answerFor(text) {
      var entry = matchKB(text);
      if (!entry) return "<p>" + JM.t("tutor.fallback") + "</p>";
      var intro = mode === "exam"
        ? '<p class="small"><b>' + JM.t("tutor.modeExam") + "</b> — " + JM.t("tutor.styleExam") + "</p>"
        : mode === "exam"
        ? ""
        : mode === "case"
        ? '<p class="small"><b>' + JM.t("tutor.modeCase") + "</b> — " + JM.t("tutor.styleCase") + "</p>"
        : "";
      return (
        '<h4 style="margin-bottom:8px">' + JM.esc(entry.title) + "</h4>" +
        intro +
        "<p>" + JM.esc(entry.body) + "</p>" +
        '<div class="sources">' + entry.sources.map(function (s) {
          return '<span class="pill pill-lav tiny">' + JM.esc(s) + "</span>";
        }).join("") + "</div>"
      );
    }

    function ask(text) {
      var clean = JM.sanitizeText ? JM.sanitizeText(text, 500) : String(text || "").trim().slice(0, 500);
      if (!clean) return;
      if (JM.security && !JM.security.rateLimit("tutor-ask", 10, 15000)) return;
      push("me", "<p>" + JM.esc(clean) + "</p>");
      if (input) { input.value = ""; input.style.height = "auto"; }
      var thinking = push("tutor",
        '<span class="typing"><i></i><i></i><i></i></span> <span class="small muted">' + JM.t("tutor.thinking") + "</span>");
      setTimeout(function () {
        var body = thinking.querySelector(".msg-body");
        body.innerHTML = '<div class="msg-name">' + JM.t("tutor.tutor") + "</div>" + answerFor(clean) +
          '<p class="tiny muted" style="margin:8px 0 0">' + JM.t("tutor.disclaimer") + "</p>";
        chat.scrollTop = chat.scrollHeight;
      }, 650);
    }

    if (composer) {
      composer.addEventListener("submit", function (e) {
        e.preventDefault();
        ask(input.value);
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          ask(input.value);
        }
      });
      input.addEventListener("input", function () {
        input.style.height = "auto";
        input.style.height = Math.min(140, input.scrollHeight) + "px";
      });
    }

    JM.$$("[data-prompt]").forEach(function (b) {
      b.addEventListener("click", function () { ask(b.getAttribute("data-prompt")); });
    });
    JM.$$("[data-mode]").forEach(function (b) {
      b.addEventListener("click", function () {
        mode = b.getAttribute("data-mode");
        JM.$$("[data-mode]").forEach(function (x) { x.classList.toggle("on", x === b); });
      });
    });
    JM.$$("[data-newchat]").forEach(function (b) {
      b.addEventListener("click", function () { location.reload(); });
    });

    contextPanel();
    push("tutor",
      "<p>" + JM.t("landing.tutor.lede") + "</p>" +
      '<p class="small muted mb-0">' + JM.t("tutor.disclaimer") + "</p>");
    JM.tutorAsk = ask;

    /* deep link from the landing page: tutor.html?q=… */
    var q = new URLSearchParams(location.search).get("q");
    if (q) setTimeout(function () { ask(q); }, 260);
  };
})();
