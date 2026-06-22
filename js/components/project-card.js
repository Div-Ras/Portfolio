/**
 * Project Card Factory
 * Creates a .project-card element from a data object.
 *
 * @param {Object} data
 * @param {string} data.num       — e.g. "01"
 * @param {string} data.title
 * @param {string} data.subtitle  — discipline / medium
 * @param {string[]} data.tags
 * @param {string} [data.href]    — link to project page
 * @param {string} [data.label]   — image placeholder label
 * @param {boolean} [data.featured]
 * @returns {HTMLElement}
 */
export function createCard(data) {
  const card = document.createElement('div');
  card.className = 'project-card' + (data.featured ? ' featured' : '');

  const tags = (data.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
  const href = data.href || '#';

  const thumbMedia = data.image
    ? `<img src="${data.image}" alt="${data.title}" class="project-card__image" />`
    : `<div class="img-placeholder" data-label="${data.label || data.title}"></div>`;

  card.innerHTML = `
    <div class="project-card__thumb">
      ${thumbMedia}
      <a href="${href}" class="project-card__overlay">
        <span class="project-card__overlay-text">View Project</span>
      </a>
    </div>
    <div class="project-card__body">
      <div class="project-card__meta">
        <span class="project-card__num font-mono">Project ${data.num}</span>
      </div>
      <h3 class="project-card__title">${data.title}</h3>
      <p class="project-card__sub">${data.subtitle}</p>
      <div class="project-card__tags">${tags}</div>
      <a href="${href}" class="project-card__link">→ View Project</a>
    </div>
  `;

  return card;
}

/**
 * Render a list of cards into a .project-grid container.
 * @param {HTMLElement} grid
 * @param {Object[]} projects
 */
export function renderGrid(grid, projects) {
  grid.innerHTML = '';
  projects.forEach((p, i) => {
    const card = createCard({ ...p, num: String(i + 1).padStart(2, '0') });
    grid.appendChild(card);
  });

  const upcomingCard = document.createElement('div');
  upcomingCard.className = 'project-card';
  upcomingCard.innerHTML = `
    <div class="project-card__thumb">
      <div class="img-placeholder" data-label="Coming Soon"></div>
    </div>
    <div class="project-card__body">
      <div class="project-card__meta">
        <span class="project-card__num font-mono">Project ${String(projects.length + 1).padStart(2, '0')}</span>
      </div>
      <h3 class="project-card__title">More Projects Upcoming</h3>
      <p class="project-card__sub">Site still in progress</p>
    </div>
  `;
  grid.appendChild(upcomingCard);
}
