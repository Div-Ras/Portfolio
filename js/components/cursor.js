/* Custom Boho Interactive Cursor — sparkle trail + sticker imprints */
export function mount() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    document.body.style.cursor = 'auto';
    return;
  }

  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';

  document.body.append(cursorRing, cursorDot);

  // ---- Sparkle Trail ----
  let lastSparkleTime = 0;
  const sparkleChars = ['✦', '✧', '✹', '★'];
  const sparkleColors = ['rgba(43, 78, 140, 0.5)', 'rgba(91, 44, 111, 0.45)', 'rgba(110, 26, 68, 0.4)'];

  function createSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < 40) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    sparkle.innerText = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.style.transform = `translate(-50%, -50%) scale(${0.8 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.style.opacity = '0';
      sparkle.style.transform += ' translateY(-18px) scale(0.2)';
    }, 30);

    setTimeout(() => sparkle.remove(), 600);
  }

  // ---- Dotted Outline Imprints ----
  let lastStickerTime = 0;
  const stickerColors = [
    'rgba(43, 78, 140, 0.50)',   // Royal Blue
    'rgba(91, 44, 111, 0.45)',   // Deep Purple
    'rgba(110, 26, 68, 0.42)',   // Burgundy
    'rgba(59, 82, 132, 0.48)',   // Steel Blue
  ];

  function dropSticker(x, y) {
    const now = Date.now();
    if (now - lastStickerTime < 650) return;
    lastStickerTime = now;

    const isFlower = Math.random() > 0.45;
    const sticker = document.createElement('div');
    sticker.className = isFlower ? 'cursor-sticker cursor-sticker--flower' : 'cursor-sticker cursor-sticker--circle';

    const color = stickerColors[Math.floor(Math.random() * stickerColors.length)];
    const pixelSize = 30 + Math.floor(Math.random() * 26); // 30-55px
    const rotation = Math.floor(Math.random() * 360);

    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
    sticker.style.width = `${pixelSize}px`;
    sticker.style.height = `${pixelSize}px`;
    sticker.style.borderColor = color;
    sticker.style.setProperty('--dot-color', color);
    sticker.style.transform = `translate(-50%, -50%) scale(0) rotate(${rotation}deg)`;
    document.body.appendChild(sticker);

    // Pop in
    requestAnimationFrame(() => {
      sticker.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation + 10}deg)`;
      sticker.style.opacity = '1';
    });

    // Fade out after lingering
    setTimeout(() => {
      if (!sticker.classList.contains('popped')) {
        sticker.style.opacity = '0';
        sticker.style.transform = `translate(-50%, -50%) scale(0.7) rotate(${rotation + 25}deg)`;
      }
    }, 3500);

    setTimeout(() => sticker.remove(), 4300);
  }

  // ---- Mouse Move Handler ----
  document.addEventListener('mousemove', e => {
    const mx = e.clientX;
    const my = e.clientY;

    cursorDot.style.left = `${mx}px`;
    cursorDot.style.top = `${my}px`;

    cursorRing.style.left = `${mx}px`;
    cursorRing.style.top = `${my}px`;

    createSparkle(mx, my);
    dropSticker(mx, my);

    // Magnetic effect on CTAs & buttons
    document.querySelectorAll('.btn, .filter-btn').forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const distanceX = mx - (rect.left + rect.width / 2);
      const distanceY = my - (rect.top + rect.height / 2);

      if (Math.abs(distanceX) < rect.width / 2 + 25 && Math.abs(distanceY) < rect.height / 2 + 25) {
        btn.style.transform = `translate(${distanceX * 0.18}px, ${distanceY * 0.18}px)`;
      } else {
        if (!btn.classList.contains('active')) {
          btn.style.transform = '';
        }
      }
    });
  });

  // Hover state on interactive elements
  const interactives = 'a, button, .project-card, .filter-btn, input, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

