/* Hero — rotating tagline + typewriter */
export function mount(container) {
  if (!container) return;

  const phrases = [
    'Designing spaces and experiences that endure.',
    'Where architecture meets human-centred design.',
    'Creating thoughtful, purposeful environments.',
    'Bridging the built world with digital experience.',
  ];

  const taglineEl = container.querySelector('[data-hero-tagline]');
  if (!taglineEl) return;

  // Clear immediately to prevent the full static HTML text from flashing before typing starts
  taglineEl.textContent = '';

  let index = 0;
  let charIdx = 0;
  let deleting = false;
  let current = '';

  function type() {
    const target = phrases[index];
    if (!deleting) {
      current = target.slice(0, ++charIdx);
      if (charIdx === target.length) {
        deleting = true;
        setTimeout(type, 3000); // Hold phrase for 3s
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
    setTimeout(type, deleting ? 20 : 45); // Snappy speeds (45ms type, 20ms backspace)
  }

  // Start typing when the hero section animations begin fading in
  setTimeout(type, 600);
}
