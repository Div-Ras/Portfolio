/* Navbar — sticky + active link + mobile hamburger */
export function mount() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // ----- Scroll class -----
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ----- Active link -----
  const links = navbar.querySelectorAll('.navbar__link');
  const page  = location.pathname.split('/').pop() || 'index.html';
  const inProject = location.pathname.includes('/work/');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href.endsWith('index.html')) || (inProject && href.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // ----- Hamburger -----
  const burger = navbar.querySelector('.navbar__hamburger');
  const mobileNav = navbar.querySelector('.navbar__mobile') || document.querySelector('.navbar__mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.navbar__mobile-link').forEach(l => {
      l.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}
