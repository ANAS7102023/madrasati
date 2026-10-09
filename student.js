// ============================================================
// 🏠 Madrasati — Homepage Logic (student.js)
// ============================================================

(function () {
  'use strict';

  // جداول الفئات
  const schedules = {
    '3': {
      sunday:    { morning: null,                  afternoon: null },
      monday:    { morning: 'الشبكات',             afternoon: null },
      tuesday:   { morning: null,                  afternoon: 'الدارات الرقمية' },
      wednesday: { morning: 'الدارات الإلكترونية', afternoon: 'الصيانة' },
      thursday:  { morning: 'البرمجة',             afternoon: null },
    },
    '1': null,
    '2': null,
    '4': null,
  };

  let currentSchedule = null;

  // ============================================================
  // 💡 نصائح اليوم
  // ============================================================

  const studyTips = {
    ar: [
      'ابدأ أسبوعك بمراجعة سريعة لما تعلمته الأسبوع الماضي، فالمتابعة تصنع الفرق.',
      'خصص 25 دقيقة لكل مادة ثم خذ استراحة 5 دقائق — طريقة "بومودورو" أثبتت فعاليتها.',
      'اكتب ملاحظاتك بخط يدك — الدماغ يتذكر ما تكتبه يدوياً أكثر من الطباعة.',
      'اشرح ما تعلمته لصديق — أفضل طريقة لاكتشاف ما لم تفهمه بعد.',
      'راجع قبل النوم مباشرة — الدماغ يرتب المعلومات أثناء النوم.',
      'خصص وقتاً للراحة والترفيه — العقل المتعب لا يستوعب.',
      'ابدأ الاستعداد للأسبوع القادم خطوة بخطوة — التخطيط المسبق يوفر الوقت.',
    ],
    en: [
      'Start your week by reviewing what you learned last week — consistency makes the difference.',
      'Study for 25 minutes, then take a 5-minute break — the "Pomodoro" method really works.',
      'Write notes by hand — your brain remembers what you write more than what you type.',
      'Explain what you learned to a friend — the best way to spot what you missed.',
      'Review right before bed — your brain organizes information during sleep.',
      'Make time for rest and fun — a tired mind can\'t focus.',
      'Start preparing for next week step by step — pre-planning saves time.',
    ],
  };

  // ============================================================
  // 🎨 بطاقة اليوم
  // ============================================================

  function renderToday() {
    const App = window.App;
    const t = App.t;
    const info = App.getDayInfo();

    const todayDayEl = document.getElementById('today-day');
    const todayDateEl = document.getElementById('today-date');
    const contentEl = document.getElementById('today-content');
    const statSubjectEl = document.getElementById('stat-today-subject');

    if (!todayDayEl || !contentEl) return;

    todayDayEl.textContent = App.getCurrentLang() === 'ar' ? info.dayNameAr : info.dayNameEn;
    todayDateEl.textContent = App.getCurrentLang() === 'ar' ? info.dateAr : info.dateEn;

    if (info.isWeekend) {
      contentEl.innerHTML = `
        <div class="flex items-center gap-3 py-2">
          <div class="text-4xl">🌙</div>
          <div>
            <div class="text-lg font-black text-amber-300">${t('todayWeekend')}</div>
            <div class="text-sm text-stone-400 mt-1">${t('todayWeekendSub')}</div>
          </div>
        </div>`;
      statSubjectEl.textContent = '—';
      return;
    }

    if (!currentSchedule) {
      contentEl.innerHTML = `
        <div class="flex items-center gap-3 py-2">
          <div class="text-4xl">⏳</div>
          <div>
            <div class="text-lg font-black text-amber-300">${t('todayNoSchedule')}</div>
            <div class="text-sm text-stone-400 mt-1">${t('todayNoScheduleSub')}</div>
          </div>
        </div>`;
      statSubjectEl.textContent = '—';
      return;
    }

    const s = currentSchedule[info.dayKey];
    if (!s || (!s.morning && !s.afternoon)) {
      contentEl.innerHTML = `
        <div class="flex items-center gap-3 py-2">
          <div class="text-4xl">📖</div>
          <div>
            <div class="text-lg font-black text-white">${t('todayTheory')}</div>
            <div class="text-sm text-stone-400 mt-1">${t('todayTheorySub')}</div>
          </div>
        </div>`;
      statSubjectEl.textContent = t('theoryFull');
      return;
    }

    const slots = [];
    if (s.morning)   slots.push({ label: t('morning'),   subject: s.morning });
    if (s.afternoon) slots.push({ label: t('afternoon'), subject: s.afternoon });

    contentEl.innerHTML = `
      <div class="text-sm font-bold text-amber-200/80 mb-3">${t('todayPractical')}</div>
      <div class="grid ${slots.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3">
        ${slots.map(x => `
          <div class="rounded-2xl p-4 bg-gradient-to-br from-amber-500/15 to-amber-700/5 border border-amber-500/30">
            <div class="text-[10px] text-amber-300/70 font-bold tracking-widest mb-2">${x.label}</div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-lg font-black text-amber-200">${x.subject}</div>
            </div>
          </div>
        `).join('')}
      </div>`;
    statSubjectEl.textContent = s.morning || s.afternoon || '—';
  }

  // ============================================================
  // 🏷️ بطاقات الإحصائيات
  // ============================================================

  function updateStats() {
    const App = window.App;
    const t = App.t;
    const student = App.getStudent();
    const fatehKey = 'fateh' + student.fateh;
    const shabahKey = 'shabah' + student.shabah;

    const shabahEl = document.querySelector('[data-stat="shabah"]');
    const fatehEl  = document.querySelector('[data-stat="fateh"]');

    if (shabahEl) shabahEl.textContent = t(shabahKey);
    if (fatehEl)  fatehEl.textContent  = t(fatehKey);
  }

  // ============================================================
  // 💡 نصيحة اليوم
  // ============================================================

  function renderStudyTip() {
    const App = window.App;
    const el = document.getElementById('tip-text');
    if (!el) return;

    const info = App.getDayInfo();
    const lang = App.getCurrentLang();
    const tips = studyTips[lang];

    // نستخدم يوم الأسبوع لاختيار نصيحة ثابتة لكل يوم
    const tipIndex = info.dayIndex % tips.length;
    el.textContent = tips[tipIndex];
  }

  // ============================================================
  // 🚀 التشغيل
  // ============================================================

  document.addEventListener('madrasati:ready', () => {
    const App = window.App;
    const student = App.getStudent();

    currentSchedule = schedules[student.fateh] || null;

    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = student.name;

    updateStats();
    renderToday();
    renderStudyTip();
  });

  document.addEventListener('madrasati:language-changed', () => {
    updateStats();
    renderToday();
    renderStudyTip();
  });

})();