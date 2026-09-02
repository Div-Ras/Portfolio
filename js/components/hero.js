/* Hero — flowing gradient blobs + typewriter tagline */
export function mount(container) {
  // disabling moving blobs for now
  return;
  if (!container) return;

  // Canvas — sits behind all text content
  let canvas = container.querySelector(".hero-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "hero-canvas";
    canvas.style.cssText =
      "position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;";
    container.insertBefore(canvas, container.firstChild);
  }

  const ctx = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = canvas.width = container.clientWidth;
    H = canvas.height = container.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // ---- Flowing Blobs ----
  const blobs = [
    {
      x: 0.25,
      y: 0.3,
      r: 280,
      color: [37, 82, 165],
      alpha: 0.22,
      phase: 0,
      speed: 0.003,
    }, // Sapphire Royal Blue
    {
      x: 0.7,
      y: 0.55,
      r: 240,
      color: [110, 68, 186],
      alpha: 0.2,
      phase: 2.1,
      speed: 0.004,
    }, // Violet Indigo
    {
      x: 0.55,
      y: 0.2,
      r: 200,
      color: [138, 155, 232],
      alpha: 0.18,
      phase: 4.2,
      speed: 0.0035,
    }, // Periwinkle Lavender
    {
      x: 0.35,
      y: 0.7,
      r: 220,
      color: [70, 110, 200],
      alpha: 0.16,
      phase: 1.0,
      speed: 0.0025,
    }, // Cool Sky Blue
    {
      x: 0.8,
      y: 0.3,
      r: 180,
      color: [120, 85, 210],
      alpha: 0.15,
      phase: 3.5,
      speed: 0.003,
    }, // Soft Lavender
  ];

  let mouseX = W / 2;
  let mouseY = H / 2;
  let targetMX = mouseX;
  let targetMY = mouseY;
  let time = 0;

  window.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      targetMX = e.clientX - rect.left;
      targetMY = e.clientY - rect.top;
    }
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 1;

    // Smooth mouse lerp
    mouseX += (targetMX - mouseX) * 0.03;
    mouseY += (targetMY - mouseY) * 0.03;

    // Mouse influence (normalised 0-1)
    const mx = mouseX / W;
    const my = mouseY / H;

    for (const b of blobs) {
      // Organic drift — each blob orbits its home position
      const drift = time * b.speed + b.phase;
      const bx = (b.x + Math.sin(drift) * 0.08 + (mx - 0.5) * 0.12) * W;
      const by = (b.y + Math.cos(drift * 0.7) * 0.06 + (my - 0.5) * 0.1) * H;

      // Breathing radius
      const br = b.r + Math.sin(drift * 1.3) * 30;

      // Radial gradient — soft edge
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      const [r, g, bl] = b.color;
      grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, ${b.alpha})`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${bl}, ${b.alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle flowing contour lines — architectural feel
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = "rgba(43, 78, 140, 1)";
    ctx.lineWidth = 0.8;

    for (let i = 0; i < 4; i++) {
      const offset = time * 0.004 + i * 1.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const yBase = H * (0.3 + i * 0.15);
        const wave =
          Math.sin(x * 0.006 + offset) * 40 +
          Math.sin(x * 0.003 + offset * 0.7) * 25 +
          (mx - 0.5) * 30;
        if (x === 0) ctx.moveTo(x, yBase + wave);
        else ctx.lineTo(x, yBase + wave);
      }
      ctx.stroke();
    }
    ctx.restore();

    requestAnimationFrame(draw);
  }
  draw();

  const visual = container.querySelector(".hero__visual");
  if (visual) {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    visual.addEventListener("click", () => {
      if (canHover.matches) return;
      visual.classList.toggle("is-revealed");
    });
  }

  // Typewriter
  const phrases = [
    "Designing spaces and experiences that endure.",
    "Where architecture meets human-centred design.",
    "Creating thoughtful, purposeful environments.",
    "Bridging the built world with digital experience.",
  ];

  const taglineEl = container.querySelector("[data-hero-tagline]");
  if (!taglineEl) return;

  taglineEl.textContent = "";
  let index = 0;
  let charIdx = 0;
  let deleting = false;
  let current = "";

  function type() {
    const target = phrases[index];
    if (!deleting) {
      current = target.slice(0, ++charIdx);
      if (charIdx === target.length) {
        deleting = true;
        setTimeout(type, 3000);
        return;
      }
    } else {
      current = target.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
      }
    }
    taglineEl.textContent = current;
    setTimeout(type, deleting ? 20 : 45);
  }

  setTimeout(type, 600);
}
