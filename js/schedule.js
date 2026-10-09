// ============================================================
// 📅 Madrasati — Schedule Page Logic (schedule.js)
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

  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];

  const dayKeysMap = {
    sunday: 'daySunday', monday: 'dayMonday', tuesday: 'dayTuesday',
    wednesday: 'dayWednesday', thursday: 'dayThursday',
  };

  let currentSchedule = null;

  // ============================================================
  // 🎨 عرض الجدول الكامل
  // ============================================================

  function renderSchedule() {
    const App = window.App;
    const t = App.t;
    const info = App.getDayInfo();
    const grid = document.getElementById('week-grid-full');
    if (!grid) return;

    // جدول غير متوفر
    if (!currentSchedule) {
      grid.innerHTML = `
        <div class="col-span-full glass-card p-10 text-center">
          <div class="text-6xl mb-4">⏳</div>
          <div class="text-xl font-black text-amber-300 mb-2">${t('todayNoSchedule')}</div>
          <div class="text-sm text-stone-400">${t('todayNoScheduleSub')}</div>
        </div>`;
      return;
    }

    grid.innerHTML = dayKeys.map(key => {
      const day = currentSchedule[key];
      const isToday = info.dayKey === key;
      const dayLabel = t(dayKeysMap[key]);

      const morningSlot = day.morning
        ? `<div class="sched-slot practical">
             <div class="sched-slot-label">${t('morning')}</div>
             <div class="sched-slot-value">${day.morning}</div>
           </div>`
        : `<div class="sched-slot theory">
             <div class="sched-slot-label">${t('morning')}</div>
             <div class="sched-slot-value">${t('theoryFull')}</div>
           </div>`;

      const afternoonSlot = day.afternoon
        ? `<div class="sched-slot practical">
             <div class="sched-slot-label">${t('afternoon')}</div>
             <div class="sched-slot-value">${day.afternoon}</div>
           </div>`
        : `<div class="sched-slot theory">
             <div class="sched-slot-label">${t('afternoon')}</div>
             <div class="sched-slot-value">${t('theoryFull')}</div>
           </div>`;

      return `
        <div class="schedule-page-cell ${isToday ? 'is-today' : ''}">
          <div class="sched-day-title">${dayLabel}</div>
          ${morningSlot}
          ${afternoonSlot}
        </div>`;
    }).join('');
  }

  // ============================================================
  // 🏷️ تحديث العنوان الفرعي
  // ============================================================

  function updateSubtitle() {
    const App = window.App;
    const t = App.t;
    const student = App.getStudent();
    const fatehKey = 'fateh' + student.fateh;
    const shabahKey = 'shabah' + student.shabah;

    const el = document.querySelector('[data-weekly-sub]');
    if (!el) return;

    el.textContent = App.getCurrentLang() === 'ar'
      ? `فئتك ${t(fatehKey)} — الشعبة ${t(shabahKey)}`
      : `Group ${t(fatehKey)} — Section ${t(shabahKey)}`;
  }

  // ============================================================
  // 🖨️ زر الطباعة
  // ============================================================

  function setupPrint() {
    const btn = document.getElementById('print-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (window.App) App.playSound('sectionChange');
      window.print();
    });
  }

  // ============================================================
  // 🚀 التشغيل
  // ============================================================

  document.addEventListener('madrasati:ready', () => {
    const App = window.App;
    const student = App.getStudent();

    currentSchedule = schedules[student.fateh] || null;

    updateSubtitle();
    renderSchedule();
    setupPrint();
  });

  document.addEventListener('madrasati:language-changed', () => {
    updateSubtitle();
    renderSchedule();
  });

})();