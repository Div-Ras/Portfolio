/* Clean Native / Subtle Cursor — No Trailing Circles or Sticker Imprints */
export function mount() {
  // Restore normal system cursor
  document.body.style.cursor = 'auto';

  // Remove any leftover cursor elements if present
  document.querySelectorAll('.cursor-ring, .cursor-dot, .cursor-sparkle, .cursor-sticker').forEach(el => el.remove());
}
