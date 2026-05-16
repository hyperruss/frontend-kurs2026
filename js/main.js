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
  initDetailGalleries();
  updateActiveNavLink();
}

function initDetailGalleries() {
  document.querySelectorAll('[data-detail-gallery]').forEach(gallery => {
    const slides = Array.from(gallery.querySelectorAll('[data-detail-slide]'));
    const prev = gallery.querySelector('[data-detail-gallery-prev]');
    const next = gallery.querySelector('[data-detail-gallery-next]');
    if (slides.length < 2 || !prev || !next) return;

    let activeIndex = slides.findIndex(slide => !slide.hidden);
    if (activeIndex < 0) activeIndex = 0;

    const showSlide = index => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeIndex;
      });
    };

    prev.addEventListener('click', () => showSlide(activeIndex - 1));
    next.addEventListener('click', () => showSlide(activeIndex + 1));
  });
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
