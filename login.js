// ============================================================
// 🌍 الترجمات
// ============================================================

const translations = {
  ar: {
    pageTitle: 'مدرستي | تسجيل الدخول',
    appName: 'مدرستي',
    welcome: 'مرحباً بك، سجّل دخولك للمتابعة',
    student: 'طالب',
    teacher: 'معلم',
    usernameLabel: 'الاسم الكامل',
    usernamePlaceholder: 'أدخل اسمك الكامل',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    submit: 'تسجيل الدخول',
    freePalestine: 'فلسطين حرة',
    loading: 'جاري الدخول...',
    schoolName: 'الثانوية الصناعية المختلطة',
    department: 'قسم تقنيات الحاسوب',
    swalErrorTitle: 'حقول ناقصة',
    swalErrorText: 'الرجاء إدخال الاسم وكلمة المرور',
    swalErrorBtn: 'حسناً',
    doorGreeting: 'أهلاً وسهلاً بك',
    doorEnter: 'ادخل إلى لوحة التحكم',
    genderLabel: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    shabahLabel: 'الشعبة',
    shabah5: 'الخامسة',
    shabah6: 'السادسة',
    fatehLabel: 'الفئة العملية',
    fateh1: 'الأولى',
    fateh2: 'الثانية',
    fateh3: 'الثالثة',
    fateh4: 'الرابعة',
    detailShabah: 'الشعبة',
    detailFateh: 'الفئة',
    detailGender: 'الجنس',
  },
  en: {
    pageTitle: 'Madrasati | Login',
    appName: 'Madrasati',
    welcome: 'Welcome, please log in to continue',
    student: 'Student',
    teacher: 'Teacher',
    usernameLabel: 'Full Name',
    usernamePlaceholder: 'Enter your full name',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    submit: 'Log in',
    freePalestine: 'Free Palestine',
    loading: 'Logging in...',
    schoolName: 'Mixed Industrial Secondary School',
    department: 'Computer Technology Department',
    swalErrorTitle: 'Missing Fields',
    swalErrorText: 'Please enter your name and password',
    swalErrorBtn: 'OK',
    doorGreeting: 'Welcome',
    doorEnter: 'Enter Dashboard',
    genderLabel: 'Gender',
    male: 'Male',
    female: 'Female',
    shabahLabel: 'Section',
    shabah5: 'Fifth',
    shabah6: 'Sixth',
    fatehLabel: 'Practical Group',
    fateh1: 'First',
    fateh2: 'Second',
    fateh3: 'Third',
    fateh4: 'Fourth',
    detailShabah: 'Section',
    detailFateh: 'Group',
    detailGender: 'Gender',
  },
};

let currentLang = 'ar';
function t(key) { return translations[currentLang][key]; }

// ============================================================
// 🌍 تطبيق اللغة
// ============================================================

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('pageTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  const isArabic = lang === 'ar';
  const langThumb = document.getElementById('lang-thumb');
  const langArLabel = document.getElementById('lang-ar');
  const langEnLabel = document.getElementById('lang-en');

  langThumb.classList.toggle('translate-x-full', isArabic);
  langArLabel.classList.toggle('text-slate-900', isArabic);
  langArLabel.classList.toggle('text-slate-400', !isArabic);
  langEnLabel.classList.toggle('text-slate-900', !isArabic);
  langEnLabel.classList.toggle('text-slate-400', isArabic);

  updateRoleUI();
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
});

// ============================================================
// 👁️ أيقونة العين
// ============================================================

const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('toggle-password');

const eyeOpenIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>`;

const eyeClosedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>`;

togglePasswordBtn.addEventListener('click', function () {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePasswordBtn.innerHTML = isHidden ? eyeClosedIcon : eyeOpenIcon;
});

// ============================================================
// 🎭 مبدّل الأدوار
// ============================================================

const btnStudent    = document.getElementById('btn-student');
const btnTeacher    = document.getElementById('btn-teacher');
const submitBtn     = document.getElementById('submit-btn');
const submitText    = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');
const roleThumb     = document.getElementById('role-thumb');
const studentFields = document.getElementById('student-fields');

let currentRole = 'student';

const studentSubmitClasses =
  'submit-glow w-full py-3 rounded-xl font-bold text-slate-900 bg-gradient-to-l from-amber-400 to-yellow-500 shadow-lg shadow-amber-600/40 hover:-translate-y-0.5 active:translate-y-0 transition duration-300 flex items-center justify-center gap-2';

const teacherSubmitClasses =
  'submit-glow w-full py-3 rounded-xl font-bold text-slate-900 bg-gradient-to-l from-amber-500 to-yellow-400 shadow-lg shadow-amber-600/40 hover:-translate-y-0.5 active:translate-y-0 transition duration-300 flex items-center justify-center gap-2';

function updateRoleUI() {
  const isRTL = document.documentElement.dir === 'rtl';
  const isTeacher = currentRole === 'teacher';
  const x = isRTL ? (isTeacher ? -100 : 0) : (isTeacher ? 100 : 0);
  roleThumb.style.transform = `translateX(${x}%)`;

  if (isTeacher) {
    roleThumb.style.background = 'linear-gradient(to left, #047857, #14b8a6)';
    roleThumb.style.boxShadow = '0 10px 15px -3px rgba(4, 120, 87, 0.45)';
  } else {
    roleThumb.style.background = 'linear-gradient(to left, #1e40af, #3b82f6)';
    roleThumb.style.boxShadow = '0 10px 15px -3px rgba(30, 64, 175, 0.45)';
  }

  if (isTeacher) {
    btnStudent.classList.remove('text-white'); btnStudent.classList.add('text-slate-400');
    btnTeacher.classList.remove('text-slate-400'); btnTeacher.classList.add('text-white');
    // ✅ إخفاء حقول الطالب
    studentFields.classList.remove('visible');
  } else {
    btnStudent.classList.remove('text-slate-400'); btnStudent.classList.add('text-white');
    btnTeacher.classList.remove('text-white'); btnTeacher.classList.add('text-slate-400');
    // ✅ إظهار حقول الطالب
    studentFields.classList.add('visible');
  }

  submitBtn.className = isTeacher ? teacherSubmitClasses : studentSubmitClasses;
}

function setRole(role) { currentRole = role; updateRoleUI(); }
btnStudent.addEventListener('click', () => setRole('student'));
btnTeacher.addEventListener('click', () => setRole('teacher'));

// ============================================================
// 🎬 مشهد الترحيب
// ============================================================

const welcomeScene = document.getElementById('welcome-scene');
const welcomeLabel = document.getElementById('welcome-label');
const welcomeUsername = document.getElementById('welcome-username');
const welcomeRoleBadge = document.getElementById('welcome-role-badge');
const welcomeRoleText = document.getElementById('welcome-role-text');
const welcomeDivider = document.getElementById('welcome-divider');
const welcomeDetails = document.getElementById('welcome-details');
const officialMark = document.getElementById('official-mark');
const enterDashboardBtn = document.getElementById('enter-dashboard-btn');
const ripple1 = document.getElementById('ripple-1');
const ripple2 = document.getElementById('ripple-2');
const ripple3 = document.getElementById('ripple-3');

function showWelcomeScene(userData) {
  welcomeLabel.textContent = t('doorGreeting');
  welcomeUsername.textContent = userData.name;
  welcomeRoleText.textContent = t(userData.role);
  welcomeRoleBadge.className = 'welcome-role-badge ' + (userData.role === 'teacher' ? 'teacher' : 'student');

  // شارات التفاصيل (للطلاب فقط)
  if (userData.role === 'student') {
    const shabahName = userData.shabah === '5' ? t('shabah5') : t('shabah6');
    const fatehName = t('fateh' + userData.fateh);
    const genderName = userData.gender === 'male' ? t('male') : t('female');

    welcomeDetails.innerHTML = `
      <span class="welcome-detail-chip">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>${t('detailShabah')}: ${shabahName}</span>
      </span>
      <span class="welcome-detail-chip">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>${t('detailFateh')}: ${fatehName}</span>
      </span>
      <span class="welcome-detail-chip">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>${t('detailGender')}: ${genderName}</span>
      </span>
    `;
  } else {
    welcomeDetails.innerHTML = '';
  }

  welcomeScene.classList.add('active');
  welcomeScene.setAttribute('aria-hidden', 'false');

  gsap.set([officialMark, welcomeDivider, welcomeLabel, welcomeUsername, welcomeRoleBadge, enterDashboardBtn], {
    opacity: 0, y: 30,
  });
  gsap.set(welcomeDivider, { scaleX: 0, y: 0 });
  gsap.set(officialMark, { scale: 0.5, y: 0 });
  gsap.set('.welcome-detail-chip', { opacity: 0, y: 10 });

  [ripple1, ripple2, ripple3].forEach((ring, i) => {
    gsap.fromTo(ring,
      { scale: 0, opacity: 0.9 },
      { scale: 8, opacity: 0, duration: 2.2, delay: i * 0.25, ease: 'power2.out' }
    );
  });

  const tl = gsap.timeline({ delay: 0.35 });
  tl.to(officialMark, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)' });
  tl.to(welcomeDivider, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5');
  tl.to(welcomeLabel, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
  tl.to(welcomeUsername, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  tl.to(welcomeRoleBadge, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    onStart: () => sparkBurst()
  }, '-=0.3');

  if (userData.role === 'student') {
    tl.to('.welcome-detail-chip', {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, '-=0.2');
  }

  tl.to(enterDashboardBtn, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.2');
}

function sparkBurst() {
  const colors = ['#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#fef3c7'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    s.style.background = color;
    s.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 280;
    s.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    s.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
    const duration = 1.0 + Math.random() * 0.9;
    s.style.animation = `spark-fly ${duration}s cubic-bezier(0.22, 1, 0.36, 1) forwards`;
    welcomeScene.appendChild(s);
    setTimeout(() => s.remove(), duration * 1000 + 100);
  }
}

// زر الدخول للوحة التحكم
enterDashboardBtn.addEventListener('click', function () {
  // ✅ التوجيه حسب الدور
  const target = currentRole === 'teacher' ? 'teacher.html' : 'student.html';
  window.location.href = target;
});

// ============================================================
// 📝 النموذج
// ============================================================

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('username').value.trim();
  const password = passwordInput.value;

  if (name === '' || password === '') {
    Swal.fire({
      icon: 'warning',
      title: t('swalErrorTitle'),
      text: t('swalErrorText'),
      confirmButtonText: t('swalErrorBtn'),
      showClass: { popup: 'swal-animate-in' },
      hideClass: { popup: 'swal-animate-out' },
    });
    return;
  }

  // ✅ جمع بيانات المستخدم
  let userData;

  if (currentRole === 'student') {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const shabah = document.querySelector('input[name="shabah"]:checked').value;
    const fateh  = document.querySelector('input[name="fateh"]:checked').value;

    userData = {
      name,
      role: 'student',
      gender,
      shabah,
      fateh,
      loggedInAt: new Date().toISOString(),
    };
  } else {
    userData = {
      name,
      role: 'teacher',
      loggedInAt: new Date().toISOString(),
    };
  }

  // ✅ حفظ البيانات في localStorage
  localStorage.setItem('madrasati-user', JSON.stringify(userData));

  // حالة التحميل
  submitBtn.disabled = true;
  submitBtn.classList.add('cursor-wait', 'opacity-90');
  submitText.textContent = t('loading');
  submitSpinner.classList.remove('hidden');

  setTimeout(function () {
    submitBtn.disabled = false;
    submitBtn.classList.remove('cursor-wait', 'opacity-90');
    submitSpinner.classList.add('hidden');
    submitText.textContent = t('submit');

    showWelcomeScene(userData);
  }, 1200);
});

// ============================================================
// ✨ جزيئات الخلفية
// ============================================================

(function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span');
    p.className = 'particle' + (Math.random() > 0.5 ? ' deep' : '');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = (100 + Math.random() * 20) + '%';
    const size = 2 + Math.random() * 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    const duration = 12 + Math.random() * 12;
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = (-Math.random() * duration) + 's';
    container.appendChild(p);
  }
})();

// ============================================================
// 🚀 التشغيل
// ============================================================

updateRoleUI();