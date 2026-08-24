import { PERSPECTIVES } from "../data/perspectives.js";
import EmblaCarousel from "../vendor/embla-carousel.esm.js";
import Fade from "../vendor/embla-carousel-fade.esm.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function mount(root) {
  const viewport = root.querySelector("[data-embla-viewport]");
  const container = root.querySelector("[data-embla-container]");
  const dotsEl = root.querySelector("[data-perspectives-dots]");
  const dialog = document.querySelector("[data-perspective-dialog]");
  if (!viewport || !container || !PERSPECTIVES.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const slides = PERSPECTIVES.map((item, index) => {
    const slide = document.createElement("div");
    slide.className = "perspectives-slide";
    slide.innerHTML = `
      <button type="button" class="perspectives-slide__btn" data-perspective-index="${index}">
        <span class="perspectives-frame">
          <img src="${item.image}" alt="${escapeHtml(item.alt)}" />
        </span>
      </button>
    `;
    container.appendChild(slide);
    return slide;
  });

  const dots = PERSPECTIVES.map((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "perspectives-dot";
    dot.setAttribute("aria-label", `Go to ${item.title}`);
    dotsEl?.appendChild(dot);
    return { dot, index };
  });

  const embla = EmblaCarousel(
    viewport,
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      duration: reduceMotion ? 0 : 22,
      watchDrag: true,
    },
    [Fade()],
  );

  function syncDots() {
    const selected = embla.selectedScrollSnap();
    dots.forEach(({ dot, index }) => {
      const active = index === selected;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  embla.on("select", syncDots);
  embla.on("reInit", syncDots);
  syncDots();

  dots.forEach(({ dot, index }) => {
    dot.addEventListener("click", () => embla.scrollTo(index));
  });

  root.querySelector("[data-perspectives-prev]")?.addEventListener("click", () => {
    embla.scrollPrev();
  });
  root.querySelector("[data-perspectives-next]")?.addEventListener("click", () => {
    embla.scrollNext();
  });

  window.addEventListener("keydown", (event) => {
    if (dialog?.open) return;
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      embla.scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      embla.scrollNext();
    }
  });

  let pointerStartX = 0;
  let pointerStartY = 0;
  let dragged = false;
  let pointerActive = false;

  container.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    dragged = false;
    pointerActive = true;
  });
  container.addEventListener("pointermove", (event) => {
    if (!pointerActive) return;
    if (
      Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY) >
      12
    ) {
      dragged = true;
    }
  });
  container.addEventListener("pointerup", () => {
    pointerActive = false;
  });
  container.addEventListener("pointercancel", () => {
    pointerActive = false;
  });

  if (dialog) {
    const img = dialog.querySelector("[data-dialog-image]");
    const title = dialog.querySelector("[data-dialog-title]");
    const text = dialog.querySelector("[data-dialog-text]");
    const closeBtn = dialog.querySelector("[data-dialog-close]");
    let lastTrigger = null;

    function openPerspective(item, trigger) {
      lastTrigger = trigger;
      img.src = item.image;
      img.alt = item.alt;
      title.textContent = item.title;
      text.textContent = item.content;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      closeBtn?.focus();
    }

    slides.forEach((slide, index) => {
      const btn = slide.querySelector(".perspectives-slide__btn");
      btn?.setAttribute("aria-label", `Open ${PERSPECTIVES[index].title}`);
      btn?.addEventListener("click", () => {
        if (dragged) return;
        if (embla.selectedScrollSnap() !== index) return;
        openPerspective(PERSPECTIVES[index], btn);
      });
    });

    closeBtn?.addEventListener("click", () => {
      if (dialog.open) dialog.close();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
      lastTrigger = null;
    });
  }
}
