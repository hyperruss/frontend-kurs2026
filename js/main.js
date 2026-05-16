import { initRouter } from './router.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderState();
  initRouter({ afterRender: initPageEffects });
});

function initHeaderState() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 60 || window.location.pathname.startsWith('/car'));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('popstate', onScroll);
  onScroll();
}

function initPageEffects() {
  updateHeaderState();
  initFadeInAnimations();
  updateActiveNavLink();
}

function updateHeaderState() {
  const header = document.getElementById('mainHeader');
  header?.classList.toggle('header--scrolled', window.scrollY > 60 || window.location.pathname.startsWith('/car'));
}

function initFadeInAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
}

function updateActiveNavLink() {
  const route =
    window.location.pathname.startsWith('/car') ? 'catalog' :
    window.location.pathname.startsWith('/rent-conditions') ? 'rent-conditions' :
    window.location.hash.replace('#', '') || 'catalog';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === route);
  });
}
