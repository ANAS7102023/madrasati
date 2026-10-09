// ============================================================
// 🌌 مشهد Three.js الخلفي — جزيئات ذهبية تفاعلية
// ============================================================

(function initThreeScene() {
  const container = document.getElementById('three-bg');
  if (!container) return;

  // احترام تفضيل تقليل الحركة
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ===== الإعدادات =====
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ===== الطبقة 1: جزيئات ذهبية صغيرة (خلفية) =====
  const particlesCount = 1500;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  // ألوان ذهبية/عنبرية متنوعة
  const palette = [
    new THREE.Color('#fcd34d'), // ذهبي فاتح
    new THREE.Color('#fbbf24'), // ذهبي
    new THREE.Color('#f59e0b'), // عنبر
    new THREE.Color('#d97706'), // عنبر غامق
    new THREE.Color('#fef3c7'), // كريمي
  ];

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    // توزيع كروي واسع
    const radius = 15 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i3]     = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // ===== الطبقة 2: جزيئات قريبة كبيرة (للعمق) =====
  const nearCount = 200;
  const nearPositions = new Float32Array(nearCount * 3);

  for (let i = 0; i < nearCount; i++) {
    const i3 = i * 3;
    nearPositions[i3]     = (Math.random() - 0.5) * 25;
    nearPositions[i3 + 1] = (Math.random() - 0.5) * 25;
    nearPositions[i3 + 2] = (Math.random() - 0.5) * 15;
  }

  const nearGeo = new THREE.BufferGeometry();
  nearGeo.setAttribute('position', new THREE.BufferAttribute(nearPositions, 3));

  const nearMat = new THREE.PointsMaterial({
    size: 0.12,
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const nearParticles = new THREE.Points(nearGeo, nearMat);
  scene.add(nearParticles);

  // ===== الطبقة 3: إطار هندسي دوّار (احترافي) =====
  const wireframeGeo = new THREE.IcosahedronGeometry(4, 1);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
  scene.add(wireframe);

  // ===== حركة الماوس (Parallax) =====
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // ===== حركة التمرير (Scroll) =====
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // ===== الحلقة الرئيسية =====
  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    // تنعيم حركة الماوس (Lerp)
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // دوران الجزيئات البطيء
    particles.rotation.y = elapsed * 0.02;
    particles.rotation.x = elapsed * 0.01;

    // حركة عكسية للجزيئات القريبة (Parallax)
    nearParticles.rotation.y = -elapsed * 0.015;

    // الإطار الهندسي يدور
    wireframe.rotation.x = elapsed * 0.15;
    wireframe.rotation.y = elapsed * 0.2;

    // الكاميرا تتبع الماوس بلطف
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Parallax مع التمرير
    particles.position.y = scrollY * 0.001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  // ===== التعامل مع تغيير حجم النافذة =====
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();