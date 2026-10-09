// ============================================================
// 🎵 Sound Manager — نظام الأصوات (Web Audio API)
// ============================================================
// يولّد الأصوات برمجياً بدون ملفات — يعمل بدون إنترنت

(function initSoundManager() {

  // ===== حالة الصوت (محفوظة في المتصفح) =====
  let soundEnabled = localStorage.getItem('madrasati-sound') !== 'off';

  // ===== AudioContext (يُنشأ عند أول تفاعل) =====
  let audioCtx = null;
  let audioUnlocked = false;

  function getAudioContext() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
        return null;
      }
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        audioUnlocked = true;
      }).catch(() => {});
    } else {
      audioUnlocked = true;
    }
    return audioCtx;
  }

  // ===== أدوات مساعدة =====

  function playTone({ freq, type = 'sine', duration = 0.3, volume = 0.15, fade = 'exp' }) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);

    if (fade === 'exp') {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    } else {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function playGlide({ fromFreq, toFreq, type = 'sine', duration = 0.4, volume = 0.12 }) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(fromFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(toFreq, ctx.currentTime + duration);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function playNoise({ duration = 0.5, volume = 0.08, cutoffFrom = 2000, cutoffTo = 200 }) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoffFrom, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(cutoffTo, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  // ============================================================
  // 🎼 مكتبة الأصوات
  // ============================================================

  const sounds = {
    whoosh() {
      playNoise({ duration: 1.2, volume: 0.05, cutoffFrom: 3000, cutoffTo: 300 });
    },

    success() {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [
        { freq: 523.25, start: 0.00 },
        { freq: 659.25, start: 0.10 },
        { freq: 783.99, start: 0.20 },
        { freq: 1046.50, start: 0.32 },
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.start);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + n.start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + n.start + 0.6);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(n.freq * 2, ctx.currentTime + n.start);
        gain2.gain.setValueAtTime(0.04, ctx.currentTime + n.start);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + n.start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.start(ctx.currentTime + n.start);
        osc.stop(ctx.currentTime + n.start + 0.7);
        osc2.start(ctx.currentTime + n.start);
        osc2.stop(ctx.currentTime + n.start + 0.5);
      });
    },

    tick() {
      playTone({ freq: 2200, type: 'sine', duration: 0.04, volume: 0.025 });
    },

    warning() {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      [0, 0.18].forEach(start => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.10, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + 0.18);
      });
    },

    exit() {
      playGlide({ fromFreq: 600, toFreq: 200, type: 'sine', duration: 0.5, volume: 0.10 });
    },

    sectionChange() {
      playGlide({ fromFreq: 300, toFreq: 800, type: 'sine', duration: 0.25, volume: 0.05 });
    },

    reveal() {
      if (!soundEnabled) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      [0, 0.08, 0.16].forEach((start, i) => {
        const freq = 400 + (i * 200);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + 0.35);
      });
    },

    notification() {
      playTone({ freq: 880, type: 'sine', duration: 0.15, volume: 0.08 });
      setTimeout(() => playTone({ freq: 1100, type: 'sine', duration: 0.2, volume: 0.06 }), 80);
    },
  };

  // ============================================================
  // 🌍 API عام
  // ============================================================

  window.MadrasatiSound = {
    play(name) {
      if (sounds[name]) sounds[name]();
    },
    isEnabled() {
      return soundEnabled;
    },
    isUnlocked() {
      return audioUnlocked;
    },
    toggle() {
      soundEnabled = !soundEnabled;
      localStorage.setItem('madrasati-sound', soundEnabled ? 'on' : 'off');
      if (soundEnabled) {
        setTimeout(() => sounds.notification(), 50);
      }
      return soundEnabled;
    },
    unlock() {
      getAudioContext();
    },
  };

  // ============================================================
  // 🔓 فتح الصوت عند أول تفاعل (Pointer Down — أسرع من Click)
  // ============================================================

  const unlockEvents = ['pointerdown', 'touchstart', 'keydown'];

  function unlockOnce() {
    if (window.MadrasatiSound) window.MadrasatiSound.unlock();
    unlockEvents.forEach(evt => document.removeEventListener(evt, unlockOnce));
  }

  unlockEvents.forEach(evt => {
    document.addEventListener(evt, unlockOnce, { once: true });
  });

  // ============================================================
  // 💡 تنبيه لطيف عند أول زيارة (لتشغيل الصوت)
  // ============================================================

  window.addEventListener('load', () => {
    // لا تعرض التنبيه إذا:
    // - الصوت مكتوم
    // - سبق أن ظهر التنبيه
    // - المتصفح يدعم الصوت بدون تفاعل (نادر)
    if (!soundEnabled) return;
    if (sessionStorage.getItem('madrasati-sound-prompted')) return;

    // انتظر قليلاً حتى يستقر اللودر
    setTimeout(() => {
      // إذا تم فتح الصوت بالفعل (المستخدم نقر) — لا تعرض شيئاً
      if (audioUnlocked) return;

      const toast = document.createElement('div');
      toast.id = 'sound-prompt';
      toast.style.cssText = `
        position: fixed;
        bottom: 96px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
        color: #1c1917;
        padding: 12px 22px;
        border-radius: 14px;
        font-family: 'Cairo', sans-serif;
        font-weight: 800;
        font-size: 13px;
        z-index: 9998;
        box-shadow: 0 15px 40px rgba(251, 191, 36, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        direction: rtl;
        user-select: none;
      `;
      toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
        <span>انقر في أي مكان لتفعيل الصوت</span>
      `;
      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });

      const removeToast = () => {
        if (!toast.parentNode) return;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
        sessionStorage.setItem('madrasati-sound-prompted', '1');
      };

      // يختفي عند أول نقرة
      document.addEventListener('pointerdown', removeToast, { once: true });
      toast.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        removeToast();
      });

      // أو تلقائياً بعد 8 ثوانٍ
      setTimeout(removeToast, 8000);
    }, 4500); // يظهر بعد انتهاء اللودر
  });

})();