/* Custom Cursor */
export function mount() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    document.body.style.cursor = 'auto';
    return; // no custom cursor on touch devices
  }

  const dot  = document.createElement('div');
  dot.className  = 'cursor';
  document.body.append(dot);

  let mx = 0, my = 0;
  let isMoving = false;
  let moveTimeout;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';

    // Spotlight effect
    document.documentElement.style.setProperty('--mouse-x', mx + 'px');
    document.documentElement.style.setProperty('--mouse-y', my + 'px');
    
    if (!isMoving) {
      document.body.classList.add('mouse-moving');
      isMoving = true;
    }
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      document.body.classList.remove('mouse-moving');
      isMoving = false;
    }, 500); // fade out spotlight when idle
    
    // Parallax elements
    document.querySelectorAll('.parallax-el').forEach(el => {
      const speed = el.dataset.speed || 0.05;
      const x = (window.innerWidth - mx * speed) / 100;
      const y = (window.innerHeight - my * speed) / 100;
      el.style.transform = `translate(${x}px, ${y}px)`;
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
