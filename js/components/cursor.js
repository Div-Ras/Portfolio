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

  // ---- Sticker Imprints ----
  let lastStickerTime = 0;
  const stickerGlyphs = ['✿', '◇', '△', '❋', '◌', '⌾', 'ꕤ', '∘', '◈'];
  const stickerColors = [
    'rgba(43, 78, 140, 0.40)',   // Royal Blue
    'rgba(91, 44, 111, 0.38)',   // Deep Purple
    'rgba(110, 26, 68, 0.35)',   // Burgundy
    'rgba(59, 82, 132, 0.38)',   // Steel Blue
  ];

  function dropSticker(x, y) {
    const now = Date.now();
    if (now - lastStickerTime < 600) return;  // one sticker every 600ms
    lastStickerTime = now;

    const sticker = document.createElement('span');
    sticker.className = 'cursor-sticker';
    sticker.innerText = stickerGlyphs[Math.floor(Math.random() * stickerGlyphs.length)];

    const rotation = Math.floor(Math.random() * 360);
    const size = 1.6 + Math.random() * 0.8;

    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
    sticker.style.color = stickerColors[Math.floor(Math.random() * stickerColors.length)];
    sticker.style.transform = `translate(-50%, -50%) scale(0) rotate(${rotation}deg)`;
    document.body.appendChild(sticker);

    // Pop in with bouncy spring
    requestAnimationFrame(() => {
      sticker.style.transform = `translate(-50%, -50%) scale(${size}) rotate(${rotation + 15}deg)`;
      sticker.style.opacity = '1';
    });

    // Click to pop — burst the sticker!
    sticker.addEventListener('click', () => {
      sticker.classList.add('popped');
      // Spawn mini burst sparkles at sticker location
      const rect = sticker.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let i = 0; i < 6; i++) {
        const burst = document.createElement('span');
        burst.className = 'cursor-sparkle';
        burst.innerText = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        const angle = (Math.PI * 2 * i) / 6;
        const dist = 20 + Math.random() * 25;
        burst.style.left = `${cx}px`;
        burst.style.top = `${cy}px`;
        burst.style.color = stickerColors[Math.floor(Math.random() * stickerColors.length)];
        burst.style.fontSize = '0.9rem';
        burst.style.transform = `translate(-50%, -50%) scale(1)`;
        document.body.appendChild(burst);
        requestAnimationFrame(() => {
          burst.style.opacity = '0';
          burst.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0.3) rotate(${Math.random() * 360}deg)`;
        });
        setTimeout(() => burst.remove(), 600);
      }
      setTimeout(() => sticker.remove(), 400);
    });

    // Auto fade out after lingering
    let fadeTimer = setTimeout(() => {
      if (!sticker.classList.contains('popped')) {
        sticker.style.opacity = '0';
        sticker.style.transform = `translate(-50%, -50%) scale(${size * 0.6}) rotate(${rotation + 30}deg)`;
      }
    }, 4000);

    setTimeout(() => sticker.remove(), 5000);
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

