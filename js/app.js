/**
 * app.js — Orchestrator
 * Mounts components, runs reveal animations, filters project cards,
 * and keeps the project count on the Work page in sync with the project data.
 */

import { mount as mountCursor  } from './components/cursor.js';
import { mount as mountNavbar  } from './components/navbar.js';
import { mount as mountHero    } from './components/hero.js';
import { mount as mountFooter  } from './components/footer.js';
import { renderGrid            } from './components/project-card.js';

export const PROJECTS = [
  {
    "title": "From fragments to flow",
    "subtitle": "Master’s Thesis · UX Research · Media Architecture",
    "tags": [
      "UX Research",
      "Media Architecture",
      "Thesis"
    ],
    "categories": [
      "ux"
    ],
    "label": "Residues of Passage",
    "image": "assets/project-01-thesis-cover.jpg",
    "featured": true,
    "href": "work/thesis.html"
  },
  {
    "title": "Play Palooza",
    "subtitle": "Freelance UX Research & App Design · In Progress",
    "tags": [
      "UX Research",
      "App Design",
      "Figma"
    ],
    "categories": [
      "ux"
    ],
    "label": "In Progress",
    "image": "assets/project-02-play-palooza-cover.jpg",
    "href": "work/play-palooza.html"
  },
  {
    "title": "UNBOUND",
    "subtitle": "QAGOMA Website Redesign · Web Design",
    "tags": [
      "UI Design",
      "Web Design",
      "Front-End"
    ],
    "categories": [
      "ux"
    ],
    "label": "Academic Project",
    "image": "assets/project-03-unbound-cover.jpg",
    "href": "work/unbound.html"
  },
  {
    "title": "Cultural Heritage Systems Map",
    "subtitle": "Advanced HCI · Systems Thinking · Research Website",
    "tags": [
      "HCI Research",
      "Systems Map",
      "Research"
    ],
    "categories": [
      "ux"
    ],
    "label": "Systems Thinking",
    "image": "assets/project-04-heritage-cover.jpg",
    "href": "work/heritage-systems-map.html"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  mountCursor();
  mountNavbar();
  mountFooter();

  const heroSection = document.querySelector('[data-component="hero"]');
  if (heroSection) mountHero(heroSection);

  document.querySelectorAll('[data-project-count]').forEach(el => {
    el.textContent = '20+';
    el.dataset.count = '20';
  });

  const grid  = document.querySelector('[data-component="project-grid"]');
  const limit = grid?.dataset.limit ? parseInt(grid.dataset.limit, 10) : null;
  if (grid) {
    const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;
    renderGrid(grid, projects);
  }

  const filterBar = document.querySelector('.filter-bar');
  if (filterBar && grid) {
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(cat));
      renderGrid(grid, filtered);
      observeReveal();
    });
  }

  observeReveal();
});

function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
        if (entry.target.classList.contains('stat__number')) {
          const target = parseInt(entry.target.dataset.count || entry.target.innerText.replace(/[^0-9]/g, ''), 10);
          entry.target.dataset.suffix = entry.target.innerText.replace(/[0-9]/g, '');
          animateValue(entry.target, 0, target, 2000);
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-stagger, .section-line, .stat__number').forEach(el => {
    if (!el.classList.contains('visible')) obs.observe(el);
  });
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.dataset.suffix || '');
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}
