// ============================================================
// 🚀 Madrasati — Shared Application Logic (app.js)
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 🎨 إضافة تنسيق زر المطور (CSS مخصص)
  // ============================================================

  (function addDevStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .dev-nav-item {
        border: 1px dashed rgba(0, 255, 65, 0.3);
        margin-top: 12px !important;
        background: linear-gradient(90deg, rgba(0, 255, 65, 0.05) 0%, transparent 100%);
      }
      .dev-nav-item:hover {
        color: #00ff41 !important;
        background: rgba(0, 255, 65, 0.1) !important;
        border-color: rgba(0, 255, 65, 0.6);
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
      }
      .dev-nav-item.active {
        color: #00ff41 !important;
        background: linear-gradient(90deg, rgba(0, 255, 65, 0.2) 0%, transparent 100%) !important;
      }
      .dev-nav-item.active::before {
        background: linear-gradient(to bottom, #00ff41, #008f11) !important;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.9) !important;
      }
    `;
    document.head.appendChild(style);
  })();

  // ============================================================
  // 🔐 بيانات المستخدم
  // ============================================================

  function loadUserData() {
    const raw = localStorage.getItem('madrasati-user');
    if (!raw) { window.location.href = 'login.html'; return null; }
    try {
      const data = JSON.parse(raw);
      if (!data || !data.name) throw new Error('Invalid');
      return data;
    } catch (e) {
      localStorage.removeItem('madrasati-user');
      window.location.href = 'login.html';
      return null;
    }
  }

  const userData = loadUserData();
  if (!userData) return;

  const student = {
    name: userData.name,
    initial: userData.name.charAt(0),
    role: userData.role,
    gender: userData.gender || null,
    shabah: userData.shabah || null,
    fateh: userData.fateh || null,
  };

  // ============================================================
  // 🌍 الترجمات
  // ============================================================

  const translations = {
    ar: {
      appName: 'مدرستي', department: 'قسم تقنيات الحاسوب',
      topWelcome: 'مرحباً بعودتك', todayLabel: 'اليوم',
      navMain: 'الرئيسية', navHome: 'الرئيسية',
      navSchedule: 'البرنامج الأسبوعي', navScheduleShort: 'البرنامج',
      navBooks: 'الكتب والمواد', navBooksShort: 'الكتب',
      navAnnouncements: 'الإعلانات', navAnnouncementsShort: 'الإعلانات',
      navProfile: 'ملفي الشخصي', navProfileShort: 'حسابي',
      navDeveloper: 'المطور الرسمي', navDeveloperShort: 'المطور',
      logout: 'تسجيل الخروج', heroGreeting: 'أهلاً بك يا',
      heroSub: 'نظرة سريعة على يومك الدراسي',
      statShabah: 'الشعبة', statGroup: 'الفئة',
      statSubject: 'مادة اليوم',
      shabah5: 'الخامسة', shabah6: 'السادسة',
      fateh1: 'الأولى', fateh2: 'الثانية', fateh3: 'الثالثة', fateh4: 'الرابعة',
      weeklyTitle: 'البرنامج الأسبوعي', weeklySub: 'فئتك — الشعبة',
      legendPractical: 'عملي', legendTheory: 'نظري',
      morning: 'أول 4 حصص', afternoon: 'آخر 4 حصص', theoryFull: 'نظري',
      viewAll: 'عرض الكل',
      print: 'طباعة',
      announceTitle: 'أحدث الإعلانات',
      announce1Date: '12 أكتوبر 2026',
      announce1Title: 'بدء التسجيل للامتحانات العملية للفصل الأول',
      announce1Body: 'يرجى من جميع الطلاب مراجعة إدارة القسم لاستلام بطاقات الامتحانات العملية.',
      announce2Date: '10 أكتوبر 2026',
      announce2Title: 'ورشة عمل: أساسيات الأمن السيبراني',
      announce2Body: 'ستُقام ورشة عمل في مخبر الحاسوب يوم الخميس القادم.',
      announce3Date: '8 أكتوبر 2026',
      announce3Title: 'تحديث جدول الحصص الأسبوعية',
      announce3Body: 'تم تحديث الجداول الأسبوعية. يرجى مراجعة البرنامج الأسبوعي.',
      todayPractical: 'اليوم لديك حصص عملية',
      todayTheory: 'اليوم نظري بالكامل', todayTheorySub: 'لا توجد حصص عملية اليوم',
      todayWeekend: 'عطلة نهاية الأسبوع', todayWeekendSub: 'استمتع بيومك! 🕌',
      todayNoSchedule: 'جدول فئتك قيد الإضافة',
      todayNoScheduleSub: 'سيتم إضافة جدول الفئة قريباً',
      logoutTitle: 'تسجيل الخروج', logoutText: 'هل أنت متأكد من تسجيل الخروج؟',
      logoutConfirm: 'نعم، خروج', logoutCancel: 'إلغاء',
      daySunday: 'الأحد', dayMonday: 'الاثنين', dayTuesday: 'الثلاثاء',
      dayWednesday: 'الأربعاء', dayThursday: 'الخميس',
      soundOnTitle: 'الصوت مفعّل — انقر للكتم',
      soundOffTitle: 'الصوت مكتوم — انقر للتفعيل',
      pageScheduleTitle: 'البرنامج الأسبوعي',
      pageScheduleSub: 'جدول حصص فئتك خلال الأسبوع',
      pageBooksTitle: 'الكتب والمواد',
      pageBooksSub: 'الكتب المدرسية وملفات PDF',
      pageAnnounceTitle: 'الإعلانات',
      pageAnnounceSub: 'كل الإعلانات والتعميمات',
      pageProfileTitle: 'ملفي الشخصي',
      pageProfileSub: 'معلوماتك الشخصية والدراسية',
      quickActionsTitle: 'روابط سريعة',
      quickActionsSub: 'الوصول السريع لكل الأقسام',
      qaSchedule: 'البرنامج الأسبوعي', qaScheduleDesc: 'جدول حصص فئتك',
      qaBooks: 'الكتب والمواد', qaBooksDesc: 'كتب PDF للتحميل',
      qaAnnouncements: 'الإعلانات', qaAnnouncementsDesc: 'آخر التعميمات',
      qaProfile: 'ملفي الشخصي', qaProfileDesc: 'بياناتك الدراسية',
      studyTipTitle: 'نصيحة اليوم',
      schoolInfoTitle: 'معلومات المدرسة',
      schoolInfoHours: 'ساعات الدوام: 7:30 ص - 2:00 م',
      schoolInfoLocation: 'الثانوية الصناعية المختلطة',
    },
    en: {
      appName: 'Madrasati', department: 'Computer Technology Dept.',
      topWelcome: 'Welcome back', todayLabel: 'Today',
      navMain: 'Main', navHome: 'Home',
      navSchedule: 'Weekly Schedule', navScheduleShort: 'Schedule',
      navBooks: 'Books & Materials', navBooksShort: 'Books',
      navAnnouncements: 'Announcements', navAnnouncementsShort: 'News',
      navProfile: 'My Profile', navProfileShort: 'Profile',
      navDeveloper: 'Official Developer', navDeveloperShort: 'Developer',
      logout: 'Logout', heroGreeting: 'Welcome,',
      heroSub: 'A quick look at your school day',
      statShabah: 'Section', statGroup: 'Group',
      statSubject: 'Today\'s Subject',
      shabah5: 'Fifth', shabah6: 'Sixth',
      fateh1: 'First', fateh2: 'Second', fateh3: 'Third', fateh4: 'Fourth',
      weeklyTitle: 'Weekly Schedule', weeklySub: 'Your group — Section',
      legendPractical: 'Practical', legendTheory: 'Theory',
      morning: 'First 4 sessions', afternoon: 'Last 4 sessions', theoryFull: 'Theory',
      viewAll: 'View all',
      print: 'Print',
      announceTitle: 'Latest Announcements',
      announce1Date: 'October 12, 2026',
      announce1Title: 'Registration open for first-term practical exams',
      announce1Body: 'All students should visit the department office to collect exam cards.',
      announce2Date: 'October 10, 2026',
      announce2Title: 'Workshop: Cybersecurity Fundamentals',
      announce2Body: 'A workshop will be held in the computer lab next Thursday.',
      announce3Date: 'October 8, 2026',
      announce3Title: 'Weekly schedule updated',
      announce3Body: 'Weekly schedules have been updated. Please review.',
      todayPractical: 'You have practical sessions today',
      todayTheory: 'Today is all theory', todayTheorySub: 'No practical sessions today',
      todayWeekend: 'Weekend', todayWeekendSub: 'Enjoy your day! 🕌',
      todayNoSchedule: 'Your group schedule is being added',
      todayNoScheduleSub: 'Group schedule will be available soon',
      logoutTitle: 'Logout', logoutText: 'Are you sure you want to logout?',
      logoutConfirm: 'Yes, logout', logoutCancel: 'Cancel',
      daySunday: 'Sunday', dayMonday: 'Monday', dayTuesday: 'Tuesday',
      dayWednesday: 'Wednesday', dayThursday: 'Thursday',
      soundOnTitle: 'Sound on — click to mute',
      soundOffTitle: 'Sound muted — click to enable',
      pageScheduleTitle: 'Weekly Schedule',
      pageScheduleSub: 'Your group weekly schedule',
      pageBooksTitle: 'Books & Materials',
      pageBooksSub: 'School books and PDF files',
      pageAnnounceTitle: 'Announcements',
      pageAnnounceSub: 'All announcements and notices',
      pageProfileTitle: 'My Profile',
      pageProfileSub: 'Your personal and academic info',
      quickActionsTitle: 'Quick Actions',
      quickActionsSub: 'Fast access to all sections',
      qaSchedule: 'Weekly Schedule', qaScheduleDesc: 'Your group schedule',
      qaBooks: 'Books & Materials', qaBooksDesc: 'PDF books for download',
      qaAnnouncements: 'Announcements', qaAnnouncementsDesc: 'Latest notices',
      qaProfile: 'My Profile', qaProfileDesc: 'Your academic info',
      studyTipTitle: 'Tip of the Day',
      schoolInfoTitle: 'School Info',
      schoolInfoHours: 'School hours: 7:30 AM - 2:00 PM',
      schoolInfoLocation: 'Mixed Industrial Secondary School',
    },
  };

  let currentLang = localStorage.getItem('madrasati-lang') || 'ar';

  function t(key) {
    const v = translations[currentLang][key];
    return typeof v === 'string' ? v : key;
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'student.html';
    if (page === 'student.html' || page === '' || page === 'index.html') return 'home';
    if (page === 'schedule.html') return 'schedule';
    if (page === 'books.html') return 'books';
    if (page === 'announcements.html') return 'announcements';
    if (page === 'profile.html') return 'profile';
    if (page === 'developer.html') return 'developer';
    return 'home';
  }

  const currentPage = getCurrentPage();

  // ============================================================
  // 🧩 Sidebar HTML
  // ============================================================

  function sidebarHTML() {
    const active = (k) => currentPage === k ? 'active' : '';
    return `
      <aside id="sidebar">
        <div class="p-5 border-b border-amber-500/10">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-600/40">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7" />
              </svg>
            </div>
            <div>
              <div class="text-base font-black text-amber-300 leading-none" data-i18n="appName">${t('appName')}</div>
              <div class="text-[10px] text-amber-200/50 mt-1 tracking-wider" data-i18n="department">${t('department')}</div>
            </div>
          </div>
        </div>

        <div class="p-4 mx-3 my-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/15">
          <div class="flex items-center gap-3">
            <div class="avatar-circle" id="user-avatar">${student.initial}</div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-black text-white truncate" id="sidebar-username">${student.name}</div>
              <div class="text-[10px] text-amber-200/60 mt-0.5" id="sidebar-user-role">—</div>
            </div>
          </div>
        </div>

        <nav class="flex-1 px-3 overflow-y-auto">
          <div class="text-[10px] font-bold text-stone-500 tracking-widest px-3 mb-2 mt-2" data-i18n="navMain">${t('navMain')}</div>

          <a href="student.html" class="nav-item ${active('home')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
            </svg>
            <span data-i18n="navHome">${t('navHome')}</span>
          </a>

          <a href="schedule.html" class="nav-item ${active('schedule')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span data-i18n="navSchedule">${t('navSchedule')}</span>
          </a>

          <a href="books.html" class="nav-item ${active('books')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span data-i18n="navBooks">${t('navBooks')}</span>
          </a>

          <a href="announcements.html" class="nav-item ${active('announcements')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span data-i18n="navAnnouncements">${t('navAnnouncements')}</span>
          </a>

          <a href="profile.html" class="nav-item ${active('profile')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span data-i18n="navProfile">${t('navProfile')}</span>
          </a>

          <a href="developer.html" class="nav-item dev-nav-item ${active('developer')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span style="color: #00ff41;" data-i18n="navDeveloper">${t('navDeveloper')}</span>
            <span style="margin-inline-start: auto; font-size: 9px; padding: 2px 6px; border-radius: 4px; background: rgba(0,255,65,0.15); color: #00ff41; border: 1px solid rgba(0,255,65,0.4); font-weight: 900;">DEV</span>
          </a>
        </nav>

        <div class="p-3 border-t border-amber-500/10">
          <button type="button" id="logout-btn"
            class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/15 hover:border-red-500/30 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span data-i18n="logout">${t('logout')}</span>
          </button>
        </div>
      </aside>
    `;
  }

  // ============================================================
  // 🧩 Header HTML
  // ============================================================

  function headerHTML() {
    return `
      <header class="sticky top-0 z-30 bg-stone-950/70 backdrop-blur-xl border-b border-amber-500/10">
        <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="avatar-circle lg:hidden" id="mobile-avatar">${student.initial}</div>
            <div class="min-w-0">
              <div class="text-[10px] text-stone-500 font-bold tracking-widest" data-i18n="topWelcome">${t('topWelcome')}</div>
              <div class="text-sm sm:text-base font-black text-white truncate" id="top-username">${student.name}</div>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-3">
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-amber-200/80 font-bold" id="top-date">—</span>
            </div>

            <button type="button" id="sound-toggle" class="sound-btn" aria-label="Toggle sound" title="الصوت">
              <svg class="icon-on" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <svg class="icon-off" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l4-4m0 4l-4-4" />
              </svg>
            </button>

            <button type="button" id="lang-toggle" dir="ltr" class="lang-pill ${currentLang === 'ar' ? 'is-ar' : ''}" aria-label="Change language">
              <span class="lang-pill-thumb"></span>
              <span class="lang-pill-label ${currentLang === 'ar' ? 'text-stone-500' : 'text-stone-900'}" id="lang-en-label">EN</span>
              <span class="lang-pill-label ${currentLang === 'ar' ? 'text-stone-900' : 'text-stone-500'}" id="lang-ar-label">ع</span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  // ============================================================
  // 🧩 Bottom Nav HTML
  // ============================================================

  function bottomNavHTML() {
    const active = (k) => currentPage === k ? 'active' : '';
    return `
      <nav id="bottom-nav">
        <div class="flex items-center">
          <a href="student.html" class="bottom-nav-item ${active('home')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
            </svg>
            <span data-i18n="navHome">${t('navHome')}</span>
          </a>
          <a href="schedule.html" class="bottom-nav-item ${active('schedule')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span data-i18n="navScheduleShort">${t('navScheduleShort')}</span>
          </a>
          <a href="books.html" class="bottom-nav-item ${active('books')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span data-i18n="navBooksShort">${t('navBooksShort')}</span>
          </a>
          <a href="announcements.html" class="bottom-nav-item ${active('announcements')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span data-i18n="navAnnouncementsShort">${t('navAnnouncementsShort')}</span>
          </a>
          <a href="profile.html" class="bottom-nav-item ${active('profile')}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span data-i18n="navProfileShort">${t('navProfileShort')}</span>
          </a>
        </div>
      </nav>
    `;
  }

  // ============================================================
  // 🎨 الحقن في DOM
  // ============================================================

  function mountElements() {
    const sidebarMount = document.getElementById('sidebar-mount');
    const headerMount  = document.getElementById('header-mount');
    const bottomMount  = document.getElementById('bottom-nav-mount');

    if (sidebarMount) sidebarMount.outerHTML = sidebarHTML();
    if (headerMount)  headerMount.outerHTML  = headerHTML();
    if (bottomMount)  bottomMount.outerHTML  = bottomNavHTML();

    const roleEl = document.getElementById('sidebar-user-role');
    if (roleEl) {
      const fatehKey = 'fateh' + student.fateh;
      roleEl.textContent = currentLang === 'ar'
        ? `طالب — فئة ${t(fatehKey)}`
        : `Student — Group ${t(fatehKey)}`;
    }
  }

  // ============================================================
  // 🌍 تطبيق اللغة
  // ============================================================

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('madrasati-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = translations[lang][key];
      if (typeof val === 'string') el.textContent = val;
    });

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.classList.toggle('is-ar', lang === 'ar');

    const enLabel = document.getElementById('lang-en-label');
    const arLabel = document.getElementById('lang-ar-label');
    if (enLabel && arLabel) {
      if (lang === 'ar') {
        arLabel.classList.add('text-stone-900'); arLabel.classList.remove('text-stone-500');
        enLabel.classList.add('text-stone-500'); enLabel.classList.remove('text-stone-900');
      } else {
        enLabel.classList.add('text-stone-900'); enLabel.classList.remove('text-stone-500');
        arLabel.classList.add('text-stone-500'); arLabel.classList.remove('text-stone-900');
      }
    }

    const roleEl = document.getElementById('sidebar-user-role');
    if (roleEl) {
      const fatehKey = 'fateh' + student.fateh;
      roleEl.textContent = lang === 'ar'
        ? `طالب — فئة ${t(fatehKey)}`
        : `Student — Group ${t(fatehKey)}`;
    }

    updateSoundBtnTitle();
    document.dispatchEvent(new CustomEvent('madrasati:language-changed', { detail: { lang } }));
  }

  // ============================================================
  // 🔊 الصوت
  // ============================================================

  const SFX = () => window.MadrasatiSound;

  function updateSoundBtnTitle() {
    const btn = document.getElementById('sound-toggle');
    if (!btn || !SFX()) return;
    const on = SFX().isEnabled();
    btn.title = on ? t('soundOnTitle') : t('soundOffTitle');
  }

  function setupSound() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;
    if (SFX()) {
      btn.classList.toggle('on', SFX().isEnabled());
      btn.setAttribute('aria-pressed', SFX().isEnabled());
      updateSoundBtnTitle();
    }
    btn.addEventListener('click', () => {
      if (!SFX()) return;
      SFX().unlock();
      SFX().toggle();
      btn.classList.toggle('on', SFX().isEnabled());
      updateSoundBtnTitle();
    });
  }

  // ============================================================
  // 🌐 زر اللغة
  // ============================================================

  function setupLanguageToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (SFX()) SFX().play('sectionChange');
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  // ============================================================
  // 📅 التاريخ
  // ============================================================

  const arabicDays   = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const englishDays  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function getDayInfo() {
    const now = new Date();
    const dayIdx = now.getDay();
    return {
      dayIndex: dayIdx,
      dayKey: dayIdx === 0 ? 'sunday' : dayIdx === 1 ? 'monday'
            : dayIdx === 2 ? 'tuesday' : dayIdx === 3 ? 'wednesday'
            : dayIdx === 4 ? 'thursday' : null,
      dayNameAr: arabicDays[dayIdx],
      dayNameEn: englishDays[dayIdx],
      dateAr: `${now.getDate()} ${arabicMonths[now.getMonth()]} ${now.getFullYear()}`,
      dateEn: `${englishMonths[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
      isWeekend: dayIdx === 5 || dayIdx === 6,
    };
  }

  function renderTopDate() {
    const el = document.getElementById('top-date');
    if (!el) return;
    const info = getDayInfo();
    el.textContent = currentLang === 'ar' ? info.dateAr : info.dateEn;
  }

  // ============================================================
  // 🎴 تأثير Tilt
  // ============================================================

  let lastTickTime = 0;

  function setupCardTilt() {
    const cards = document.querySelectorAll('.glass-card, .today-card, .day-cell, .schedule-page-cell, .action-card, .tip-card');
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    cards.forEach(card => {
      if (card.dataset.tiltSetup) return;
      card.dataset.tiltSetup = '1';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        const rotX = ((y - rect.height / 2) / rect.height) * -5;
        const rotY = ((x - rect.width / 2) / rect.width) * 5;
        if (window.gsap) {
          gsap.to(card, {
            rotationX: rotX, rotationY: rotY, scale: 1.02,
            duration: 0.4, ease: 'power2.out', transformPerspective: 900,
          });
        }
      });

      card.addEventListener('mouseenter', () => {
        const now = Date.now();
        if (now - lastTickTime < 60) return;
        lastTickTime = now;
        if (SFX()) SFX().play('tick');
      });

      card.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(card, {
            rotationX: 0, rotationY: 0, scale: 1,
            duration: 0.6, ease: 'power3.out',
            clearProps: 'rotationX,rotationY,scale',
          });
        }
      });
    });
  }

  // ============================================================
  // 🚪 زر الخروج
  // ============================================================

  function setupLogout() {
    const btn = document.getElementById('logout-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (SFX()) SFX().play('exit');
      Swal.fire({
        icon: 'question',
        title: t('logoutTitle'),
        text: t('logoutText'),
        showCancelButton: true,
        confirmButtonText: t('logoutConfirm'),
        cancelButtonText: t('logoutCancel'),
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#57534e',
        background: 'rgba(12, 10, 9, 0.95)',
        color: '#e7e5e4',
        didOpen: (popup) => {
          popup.style.fontFamily = 'Cairo, sans-serif';
          popup.style.borderRadius = '24px';
          popup.style.border = '1px solid rgba(251, 191, 36, 0.2)';
        }
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('madrasati-user');
          sessionStorage.removeItem('madrasati-loader-shown');
          window.location.href = 'login.html';
        }
      });
    });
  }

  // ============================================================
  // 🎥 LOADER (مرة واحدة فقط في الجلسة)
  // ============================================================

  function runLoader() {
    return new Promise((resolve) => {
      const loader = document.getElementById('loader');
      if (!loader) { resolve(); return; }

      if (sessionStorage.getItem('madrasati-loader-shown') === '1') {
        loader.style.display = 'none';
        resolve();
        return;
      }

      const wrap = loader.querySelector('.loader-circle-wrap');
      const title = loader.querySelector('.loader-title');
      const sub = loader.querySelector('.loader-sub');
      const percentEl = document.getElementById('loader-percent');
      const statusEl = document.getElementById('loader-status');
      const ringEls = loader.querySelectorAll('.loader-ring');
      const curtainL = document.getElementById('curtain-left');
      const curtainR = document.getElementById('curtain-right');
      const circle = document.getElementById('loader-circle');

      if (!window.gsap) {
        loader.style.display = 'none';
        sessionStorage.setItem('madrasati-loader-shown', '1');
        resolve();
        return;
      }

      if (percentEl) percentEl.style.display = 'none';
      if (statusEl) statusEl.style.display = 'none';
      if (circle) circle.style.display = 'none';
      ringEls.forEach(r => r.style.display = 'none');

      const tl = gsap.timeline({
        onComplete: () => {
          loader.style.display = 'none';
          sessionStorage.setItem('madrasati-loader-shown', '1');
          resolve();
        }
      });

      gsap.set(wrap, { scale: 0.7, opacity: 0 });
      gsap.set(title, { opacity: 0, y: 15 });
      gsap.set(sub, { opacity: 0, y: 10 });

      tl.to(wrap, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' })
        .to(title, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.3')
        .to(sub, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2');

      tl.to({}, { duration: 0.25 });

      tl.to([wrap, title, sub], {
        opacity: 0, scale: 0.9, duration: 0.35,
        ease: 'power2.in', stagger: 0.03,
      });

      if (curtainL && curtainR) {
        tl.to(curtainL, { x: '-100%', duration: 0.7, ease: 'power3.inOut' }, '-=0.2');
        tl.to(curtainR, { x: '100%', duration: 0.7, ease: 'power3.inOut' }, '<');
      }
    });
  }

  // ============================================================
  // ✨ حركات الدخول
  // ============================================================

  function playEntranceAnimations() {
    if (!window.gsap) return;

    const threeBg = document.getElementById('three-bg');
    if (threeBg) threeBg.classList.add('visible');

    if (window.innerWidth >= 1024) {
      gsap.from('#sidebar', { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all' });
    }
    gsap.from('header', { y: -40, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' });
    gsap.from('#hero h1, #hero h1 span', { y: 60, opacity: 0, duration: 1, stagger: 0.15, delay: 0.2, ease: 'power4.out', clearProps: 'all' });
    gsap.from('#hero p', { y: 30, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power3.out', clearProps: 'all' });
    gsap.from('#today-card', { y: 60, opacity: 0, scale: 0.96, duration: 1, delay: 0.7, ease: 'power3.out', clearProps: 'all' });
    gsap.from('.glass-card, .action-card, .tip-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.9, ease: 'power3.out', clearProps: 'all' });
    gsap.from('.day-cell, .schedule-page-cell', { y: 40, opacity: 0, scale: 0.95, duration: 0.6, stagger: 0.08, delay: 1.1, ease: 'power2.out', clearProps: 'all' });
    gsap.from('.print-btn', { y: 30, opacity: 0, duration: 0.6, delay: 1.2, ease: 'power2.out', clearProps: 'all' });
  }

  // ============================================================
  // 🚀 التشغيل
  // ============================================================

  async function init() {
    if (window.AOS) AOS.init({ duration: 800, once: true, offset: 100 });

    mountElements();
    setupSound();
    setupLanguageToggle();
    setupLogout();

    applyLanguage(currentLang);
    renderTopDate();

    document.dispatchEvent(new CustomEvent('madrasati:ready'));

    if (currentPage === 'home') {
      await runLoader();
    } else {
      const loader = document.getElementById('loader');
      if (loader) loader.style.display = 'none';
    }

    setTimeout(() => playEntranceAnimations(), 100);
    setupCardTilt();
  }

  // ============================================================
  // 🌍 API عام
  // ============================================================

  window.App = {
    t: (key) => t(key),
    applyLanguage,
    getDayInfo,
    setupCardTilt,
    renderTopDate,
    getCurrentLang: () => currentLang,
    getCurrentPage: () => currentPage,
    getStudent: () => student,
    getUser: () => userData,
    playSound: (name) => { if (SFX()) SFX().play(name); },
  };

  document.addEventListener('DOMContentLoaded', init);
})();