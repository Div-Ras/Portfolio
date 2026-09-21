/* VIEW MY WORK — pass the ball to the dog. */
export function mount() {
  const control = document.querySelector('[data-slide-work]');
  if (!control) return;

  const track = control.querySelector('.home-work-button__track');
  const thumb = control.querySelector('.home-work-button__thumb');
  if (!track || !thumb) return;

  let dragging = false;
  let completed = false;
  let startX = 0;
  let startLeft = 0;
  let suppressClick = false;

  const maxLeft = () => Math.max(0, track.clientWidth - thumb.offsetWidth - 2);

  const setProgress = (value, animate = true) => {
    const progress = Math.max(0, Math.min(1, value));
    if (!animate) control.classList.add('is-dragging');
    thumb.style.setProperty('--slide-left', `${progress * maxLeft()}px`);
    control.style.setProperty('--slide-progress', progress);
    control.style.setProperty('--dog-progress', Math.max(0, (progress - 0.72) / 0.28));
    if (!animate) requestAnimationFrame(() => control.classList.remove('is-dragging'));
    return progress;
  };

  const finish = () => {
    if (completed) return;
    completed = true;
    control.classList.add('is-complete');
    setProgress(1, true);
    window.setTimeout(() => {
      window.location.href = control.getAttribute('href') || 'portfolio.html';
    }, 800);
  };

  const pointerMove = (event) => {
    if (!dragging || completed) return;
    const delta = event.clientX - startX;
    const progress = setProgress((startLeft + delta) / Math.max(1, maxLeft()), false);
    if (progress >= 0.98) finish();
  };

  const pointerUp = () => {
    if (!dragging) return;
    dragging = false;
    control.classList.remove('is-dragging');
    window.removeEventListener('pointermove', pointerMove);
    window.removeEventListener('pointerup', pointerUp);

    if (!completed) {
      const current = parseFloat(control.style.getPropertyValue('--slide-progress')) || 0;
      if (current >= 0.55) {
        setProgress(1);
        window.setTimeout(finish, 350);
      } else {
        setProgress(0);
      }
    }
  };

  thumb.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    dragging = true;
    completed = false;
    suppressClick = true;
    startX = event.clientX;
    startLeft = parseFloat(getComputedStyle(thumb).getPropertyValue('--slide-left')) || 0;
    const inlineLeft = parseFloat(thumb.style.getPropertyValue('--slide-left'));
    startLeft = Number.isFinite(inlineLeft) ? inlineLeft : 0;
    control.classList.add('is-dragging');
    thumb.setPointerCapture?.(event.pointerId);
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp, { once: false });
  });

  control.addEventListener('click', (event) => {
    if (suppressClick) {
      event.preventDefault();
      suppressClick = false;
    }
  });

  control.addEventListener('keydown', (event) => {
    const current = parseFloat(control.style.getPropertyValue('--slide-progress')) || 0;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = Math.min(1, current + 0.12);
      setProgress(next);
      if (next >= 1) finish();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setProgress(Math.max(0, current - 0.12));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      finish();
    }
  });

  window.addEventListener('resize', () => {
    if (!completed) setProgress(parseFloat(control.style.getPropertyValue('--slide-progress')) || 0);
  });

  setProgress(0);
}
