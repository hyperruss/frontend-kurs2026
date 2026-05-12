/**
 * main.js — Инициализация приложения
 */
document.addEventListener('DOMContentLoaded', () => {

  // Даты по умолчанию
  const today = new Date();
  const next  = new Date(today); next.setDate(next.getDate() + 7);
  const fmt = d => d.toISOString().split('T')[0];
  const df = document.getElementById('dateFrom');
  const dt = document.getElementById('dateTo');
  if (df) df.value = fmt(today);
  if (dt) dt.value = fmt(next);

  // Первый рендер каталога
  Catalog.applyFilters();

  // Scroll-анимации
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // Активный пункт навигации
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-40% 0px -40% 0px' });
  sections.forEach(s => navObs.observe(s));
});
