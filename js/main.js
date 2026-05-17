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
    header.classList.toggle('header--scrolled', window.scrollY > 60 || window.location.pathname.startsWith('/car') || window.location.pathname.startsWith('/contacts') || window.location.pathname.startsWith('/rent-conditions'));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('popstate', onScroll);
  onScroll();
}

function initPageEffects() {
  updateHeaderState();
  initFadeInAnimations();
  initDetailGalleries();
  initFleetFilters();
  updateActiveNavLink();
}

function initFleetFilters() {
  const grid = document.querySelector('.fleet-grid');
  if (!grid) return;

  const categorySelect = document.querySelector('[data-fleet-category]');
  const brandSelect = document.querySelector('[data-fleet-brand]');
  const priceSelect = document.querySelector('[data-fleet-price]');
  const sortSelect = document.querySelector('[data-fleet-sort]');
  const reset = document.querySelector('[data-fleet-reset]');
  const count = document.getElementById('fleetResultsCount');
  const empty = document.querySelector('[data-fleet-empty]');
  const cards = Array.from(grid.querySelectorAll('.fleet-card'));
  const initialOrder = new Map(cards.map((card, index) => [card, index]));
  const params = new URLSearchParams(window.location.search);

  if (categorySelect) categorySelect.value = params.get('category') || '';
  if (brandSelect) brandSelect.value = params.get('brand') || '';
  if (priceSelect) priceSelect.value = params.get('price') || '';
  if (sortSelect) sortSelect.value = params.get('sort') || 'default';

  const priceMatches = (price, range) => {
    if (!range) return true;
    if (range === 'under-50000') return price < 50000;
    if (range === '50000-70000') return price >= 50000 && price <= 70000;
    if (range === 'over-70000') return price > 70000;
    return true;
  };

  const updateUrl = () => {
    const next = new URLSearchParams();
    if (categorySelect?.value) next.set('category', categorySelect.value);
    if (brandSelect?.value) next.set('brand', brandSelect.value);
    if (priceSelect?.value) next.set('price', priceSelect.value);
    if (sortSelect?.value && sortSelect.value !== 'default') next.set('sort', sortSelect.value);

    const query = next.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState({}, '', url);
  };

  const applyFilters = () => {
    const category = categorySelect?.value || '';
    const brand = brandSelect?.value || '';
    const priceRange = priceSelect?.value || '';
    const sort = sortSelect?.value || 'default';

    cards.forEach(card => {
      const price = Number(card.dataset.price || 0);
      const visible =
        (!category || card.dataset.category === category) &&
        (!brand || card.dataset.brand === brand) &&
        priceMatches(price, priceRange);
      card.hidden = !visible;
    });

    const sorted = [...cards].sort((a, b) => {
      if (sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
      if (sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
      if (sort === 'name-asc') return a.getAttribute('aria-label').localeCompare(b.getAttribute('aria-label'), 'ru');
      return initialOrder.get(a) - initialOrder.get(b);
    });
    sorted.forEach(card => grid.appendChild(card));

    const visibleCount = cards.filter(card => !card.hidden).length;
    if (count) count.textContent = `Показано ${visibleCount} авто`;
    if (empty) empty.hidden = visibleCount > 0;
    updateUrl();
  };

  [categorySelect, brandSelect, priceSelect, sortSelect].forEach(control => {
    control?.addEventListener('change', applyFilters);
  });

  reset?.addEventListener('click', () => {
    if (categorySelect) categorySelect.value = '';
    if (brandSelect) brandSelect.value = '';
    if (priceSelect) priceSelect.value = '';
    if (sortSelect) sortSelect.value = 'default';
    applyFilters();
  });

  applyFilters();
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
  header?.classList.toggle('header--scrolled', window.scrollY > 60 || window.location.pathname.startsWith('/car') || window.location.pathname.startsWith('/contacts') || window.location.pathname.startsWith('/rent-conditions'));
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
