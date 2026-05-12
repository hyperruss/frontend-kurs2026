/**
 * catalog.js — Рендер каталога, фильтрация, избранное
 */
let currentFilter = 'all';
const favorites = new Set();

const icons = {
  fuel: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V8l6-6h6l6 6v14"/><path d="M3 13h18M9 22v-5h6v5"/></svg>`,
  trans:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`,
  seats:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
};

function createCarCardHTML(car) {
  const isFav = favorites.has(car.id);
  const badgeText = car.badgeText || car.statusLabel;
  return `
    <div class="car-card fade-in" role="listitem" onclick="Modal.open(${car.id})">
      <div class="car-card-image">
        <img src="${car.img}" alt="${car.name}" loading="lazy" width="400" height="250">
        <span class="car-badge ${car.badge}">${badgeText}</span>
        <button class="favorite-btn ${isFav?'active':''}" onclick="Catalog.toggleFavorite(event,${car.id})" aria-label="${isFav?'Убрать из избранного':'В избранное'}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="car-card-body">
        <p class="car-class">${car.class}</p>
        <h3 class="car-name">${car.name}</h3>
        <div class="car-specs">
          <span class="car-spec">${icons.fuel} ${car.fuel}</span>
          <span class="car-spec">${icons.trans} ${car.trans}</span>
          <span class="car-spec">${icons.seats} ${car.seats} мест</span>
        </div>
        <div class="car-card-footer">
          <div>
            <span class="car-price">${car.priceLabel.split('/')[0]}</span>
            <span class="car-price-period">/сут</span>
          </div>
          <button class="btn-book" onclick="event.stopPropagation();Modal.open(${car.id})">Забронировать</button>
        </div>
      </div>
    </div>`;
}

function applyFilters() {
  const category = document.getElementById('categoryFilter').value;
  const search   = document.getElementById('searchInput').value.toLowerCase();
  const filtered = carsData.filter(car => {
    const matchCat    = !category || car.class === category;
    const matchSearch = !search   || car.name.toLowerCase().includes(search);
    const matchChip   =
      currentFilter === 'all'       ? true :
      currentFilter === 'available' ? car.status === 'available' :
      currentFilter === 'economy'   ? car.price < 3000 :
      currentFilter === 'comfort'   ? car.price >= 3000 && car.price <= 6000 :
      currentFilter === 'premium'   ? car.price > 6000 :
      currentFilter === 'suv'       ? car.tag === 'suv' : true;
    return matchCat && matchSearch && matchChip;
  });
  document.getElementById('carsGrid').innerHTML = filtered.map(createCarCardHTML).join('');
  document.getElementById('resultsCount').textContent = `Показано ${filtered.length} авто`;
  requestAnimationFrame(() => {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
}

function setChipFilter(btn, filter) {
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = filter;
  applyFilters();
}

function toggleFavorite(event, id) {
  event.stopPropagation();
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  applyFilters();
}

const Catalog = { applyFilters, setChipFilter, toggleFavorite };