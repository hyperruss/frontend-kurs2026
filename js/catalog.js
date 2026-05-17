import { carsData, collections, getCarById, getCarsByCollection } from './data.js';

const heroVideo = new URL('../assets/Video Project 2 (1).mp4', import.meta.url).href;
const categoryImages = {
  premium: new URL('../assets/maybach.png', import.meta.url).href,
  suv: new URL('../assets/g63.png', import.meta.url).href,
  business: new URL('../assets/bmw.png', import.meta.url).href,
  sport: new URL('../assets/720s.png', import.meta.url).href,
  minivan: new URL('../assets/v-class.png', import.meta.url).href,
  electric: new URL('../assets/cybertruck.png', import.meta.url).href
};

const carCategoryOptions = [
  { id: 'premium', label: 'Премиум' },
  { id: 'suv', label: 'Внедорожники' },
  { id: 'business', label: 'Бизнес' },
  { id: 'sport', label: 'Спорткары' },
  { id: 'minivan', label: 'Минивэны' },
  { id: 'electric', label: 'Электромобили' }
];

const assetImages = import.meta.glob('../assets/*', {
  eager: true,
  query: '?url',
  import: 'default'
});

const personalOptions = [
  { title: 'Доставка авто', price: 'от 3 000 ₽', icon: 'route' },
  { title: 'Личный водитель', price: 'от 1 500 ₽/час', icon: 'driver' },
  { title: '100% защита', price: 'ответственность 0 ₽', icon: 'shield' },
  { title: 'Детское кресло', price: 'бесплатно', icon: 'seat' },
  { title: 'Охрана', price: 'от 10 000 ₽/час', icon: 'guard' },
  { title: 'Фотограф', price: 'от 10 000 ₽/час', icon: 'camera' }
];

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatRub(value) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`;
}

function getCarImage(car) {
  if (Array.isArray(car.images) && car.images[0]) {
    return resolveAssetImage(car.images[0]);
  }

  const id = car.id.toLowerCase();
  const className = car.className.toLowerCase();

  if (id.includes('v-class')) return categoryImages.minivan;
  if (id.includes('cybertruck') || className.includes('электро')) return categoryImages.electric;
  if (id.includes('g63') || id.includes('range') || id.includes('urus') || id.includes('cullinan') || id.includes('bentayga')) return categoryImages.suv;
  if (id.includes('bmw')) return categoryImages.business;
  if (id.includes('911') || id.includes('ferrari') || id.includes('lamborghini') || id.includes('aston')) return categoryImages.sport;
  return categoryImages.premium;
}

function resolveAssetImage(filename) {
  return assetImages[`../assets/${filename}`] || `/assets/${filename}`;
}

function getCarImages(car) {
  if (Array.isArray(car.images) && car.images.length) {
    return car.images.map(resolveAssetImage);
  }

  return [getCarImage(car)];
}

function hasUploadedCarImages(car) {
  return Array.isArray(car.images) && car.images.length > 0;
}

function getCarCategory(car) {
  if (car.category) return car.category;

  const id = car.id.toLowerCase();
  const className = car.className.toLowerCase();

  if (id.includes('v-class')) return 'minivan';
  if (id.includes('cybertruck') || className.includes('электро')) return 'electric';
  if (id.includes('g63') || id.includes('range') || id.includes('urus') || id.includes('cullinan') || id.includes('bentayga') || className.includes('suv') || className.includes('внедорож')) return 'suv';
  if (id.includes('911') || id.includes('ferrari') || id.includes('lamborghini') || id.includes('aston') || className.includes('спорт') || className.includes('roadster')) return 'sport';
  if (id.includes('bmw') || className.includes('бизнес')) return 'business';
  return 'premium';
}

function getCarBrand(car) {
  const match = car.name.match(/^(Mercedes-Benz|Mercedes-AMG|Mercedes-Maybach|Rolls-Royce|Aston Martin|Range Rover|Tesla|BMW|Bentley|Ferrari|Lamborghini|Porsche)/i);
  return match ? match[0] : car.name.split(' ')[0];
}

function iconSvg(name) {
  const icons = {
    route: '<path d="M6 19c2.8 0 3.2-14 6-14s3.2 14 6 14"/><circle cx="6" cy="19" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="18" cy="19" r="2"/>',
    driver: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/><path d="M8 14l4 3 4-3"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 2.8 8.5 7 10 4.2-1.5 7-5.5 7-10V6l-7-3Z"/><path d="m9.5 12 1.8 1.8 3.7-4"/>',
    seat: '<path d="M8 4v8h8l2 8"/><path d="M6 20h12"/><path d="M8 12l-2 8"/>',
    guard: '<path d="M12 3 5 6v5c0 4.5 2.8 8.5 7 10 4.2-1.5 7-5.5 7-10V6l-7-3Z"/><path d="M9 10h6"/><path d="M9 14h6"/>',
    camera: '<path d="M4 8h4l2-3h4l2 3h4v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>'
  };
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.shield}</svg>`;
}

function renderDetailSlide(car, imageSrc, label = '', index = 0) {
  return `
    <div class="detail-photo detail-photo-${index + 1}" data-detail-slide${index === 0 ? '' : ' hidden'}>
      <img src="${imageSrc}" alt="${escapeHtml(`${car.name} — ${label}`)}" loading="${index === 0 ? 'eager' : 'lazy'}">
    </div>
  `;
}

function renderDetailGallery(car) {
  const images = getCarImages(car);
  const labels = ['главное фото', 'экстерьер', 'салон', 'детали'];
  return `
    <div class="detail-gallery fade-in" data-detail-gallery>
      <div class="detail-main-photo">
        ${images.map((imageSrc, index) => renderDetailSlide(car, imageSrc, labels[index] || labels[0], index)).join('')}
        ${images.length > 1 ? `<button class="detail-gallery-btn detail-gallery-btn-prev" type="button" data-detail-gallery-prev aria-label="Предыдущее фото">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="detail-gallery-btn detail-gallery-btn-next" type="button" data-detail-gallery-next aria-label="Следующее фото">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>` : ''}
      </div>
    </div>
  `;
}

function getRelatedCars(car) {
  const sameCollection = carsData.filter(item => item.id !== car.id && item.collection === car.collection);
  const fallback = carsData.filter(item => item.id !== car.id && !sameCollection.includes(item));
  return [...sameCollection, ...fallback].slice(0, 3);
}

function renderDailyPrices(car) {
  const plans = [
    ['1 сутки', car.price, ''],
    ['2-3 суток', car.price * 0.92, '-8%'],
    ['4-6 суток', car.price * 0.84, '-16%'],
    ['7-14 суток', car.price * 0.76, '-24%'],
    ['15-21 суток', car.price * 0.68, '-32%'],
    ['Более', null, '']
  ];

  return plans.map(([period, price, discount]) => `
    <div class="price-cell">
      <span>${period}</span>
      <strong>${price ? `${formatRub(price)}/сутки` : 'Договорная'}</strong>
      ${discount ? `<em>${discount}</em>` : ''}
    </div>
  `).join('');
}

function renderMonthlyPrices(car) {
  const monthlyBase = car.price * 17;
  const plans = [
    ['1 мес', monthlyBase, ''],
    ['3 мес', monthlyBase * 0.96, '-4%'],
    ['6 мес', monthlyBase * 0.92, '-8%'],
    ['12 мес', null, ''],
    ['24 мес', null, ''],
    ['36 мес', null, '']
  ];

  return plans.map(([period, price, discount]) => `
    <div class="price-cell">
      <span>${period}</span>
      <strong>${price ? `${formatRub(price)}/мес.` : 'Договорная'}</strong>
      ${discount ? `<em>${discount}</em>` : ''}
    </div>
  `).join('');
}

function renderSimilarCars(car) {
  const relatedCars = getRelatedCars(car);
  return `
    <section class="detail-section similar-section" aria-labelledby="similar-heading">
      <div class="detail-section-head">
        <p class="showcase-eyebrow">Похожие автомобили</p>
        <h2 id="similar-heading">Можно посмотреть ещё</h2>
      </div>
      <div class="similar-grid" role="list">
        ${relatedCars.map(item => renderCarCard(item, { className: 'showcase-card--compact fleet-card' })).join('')}
      </div>
    </section>
  `;
}

function renderHero() {
  return `
    <section class="hero" aria-labelledby="hero-heading">
      <video class="hero-video" autoplay muted loop playsinline preload="auto">
        <source src="${heroVideo}" type="video/mp4">
      </video>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title" id="hero-heading">Аренда премиальных автомобилей</h1>
          <p class="hero-cities">Москва · Сочи · Дубай</p>
          <div class="hero-cta">
            <a class="btn btn-primary btn-hero" href="/car">Выбрать автомобиль</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCategories() {
  const items = carCategoryOptions.map(({ id, label }) => [id, label]);
  /*
  const legacyItems = [
    ['premium', 'Премиум'],
    ['suv', 'Внедорожники'],
    ['business', 'Бизнес'],
    ['sport', 'Спорткары'],
    ['minivan', 'Минивэны'],
    ['electric', 'Электромобили']
  ];
  */

  return `
    <section id="categories" class="categories-section" aria-labelledby="categories-heading">
      <div class="container">
        <h2 class="categories-title" id="categories-heading">Категории автомобилей</h2>
        <div class="categories-grid" role="list">
          ${items.map(([id, label]) => `
            <a href="/car?category=${encodeURIComponent(id)}" class="category-card" role="listitem" aria-label="${label}">
              <img src="${categoryImages[id]}" alt="${label}" loading="lazy" width="220" height="100">
              <div class="category-label">${label}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}



function renderCarCard(car, { className = '' } = {}) {
  const cardImage = hasUploadedCarImages(car) ? getCarImage(car) : '';
  const category = getCarCategory(car);
  const brand = getCarBrand(car);
  return `
    <a class="showcase-card ${className} fade-in" href="/car/${escapeHtml(car.id)}" role="listitem" aria-label="${escapeHtml(car.name)}" data-status="${car.status}" data-collection="${car.collection}" data-price="${car.price}" data-brand="${escapeHtml(brand)}" data-category="${escapeHtml(category)}" data-class="${escapeHtml(car.className)}">
      <div class="showcase-card-media ${cardImage ? 'showcase-card-media--photo' : ''}" data-initial="${escapeHtml(car.initial)}">
      ${cardImage
        ? `<img class="showcase-card-img" src="${cardImage}" alt="${escapeHtml(car.name)}" loading="lazy">`
    : `<span class="showcase-photo-label">Фото автомобиля</span>`
      }
      <!--
        <span class="showcase-photo-label">Фото автомобиля</span>
      -->
      </div>
      <div class="showcase-card-body">
        <h3 class="car-name">${escapeHtml(car.name)}</h3>
        <div class="showcase-footer"><span>${escapeHtml(car.priceLabel)}</span><small>/сут</small></div>
        <div class="showcase-meta">
          <span>${escapeHtml(car.engine)}</span>
          <span>${escapeHtml(car.power)}</span>
          <span>${escapeHtml(car.drive)}</span>
        </div>
      </div>
    </a>
  `;
}

function renderFleetHero() {
  return `
    <section class="fleet-hero" aria-labelledby="fleet-heading">
      <video class="fleet-hero-video" autoplay muted loop playsinline preload="metadata">
        <source src="${heroVideo}" type="video/mp4">
      </video>
      <div class="fleet-hero-overlay" aria-hidden="true"></div>
      <div class="container">
        <nav class="fleet-breadcrumbs" aria-label="Хлебные крошки">
          <a href="/">Главная</a>
          <span aria-hidden="true">—</span>
          <span>Автопарк</span>
        </nav>
        <h1 class="fleet-title" id="fleet-heading">Автопарк</h1>
        <div class="fleet-tabs" aria-label="Тип аренды">
          <a class="fleet-tab active" href="/car">Посуточно</a>
          <a class="fleet-tab" href="/rent-conditions">Помесячно</a>
          <a class="fleet-tab" href="/rent-conditions">С водителем</a>
        </div>
      </div>
    </section>
  `;
}

function renderFleetFilters() {
  return `
    <div class="fleet-toolbar" aria-label="Фильтры автопарка">
      <div class="fleet-filter-group">
        <button class="fleet-filter active" type="button" data-fleet-filter="all">
          <span>Класс</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <button class="fleet-filter" type="button" data-fleet-filter="brand">
          <span>Марка</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <button class="fleet-filter" type="button" data-fleet-filter="price">
          <span>Цена</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <button class="fleet-filter fleet-filter-wide" type="button" data-fleet-filter="all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          <span>Все фильтры</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>
      <button class="fleet-sort" type="button" data-fleet-sort>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8 3v18"/><path d="m4 7 4-4 4 4"/><path d="M16 21V3"/><path d="m20 17-4 4-4-4"/></svg>
        <span>По умолчанию</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </div>
  `;
}

function renderFleetFilterControls() {
  const brands = [...new Set(carsData.map(getCarBrand))].sort((a, b) => a.localeCompare(b, 'ru'));

  return `
    <div class="fleet-toolbar" aria-label="Фильтры автопарка">
      <div class="fleet-filter-group" data-fleet-filters>
        <label class="fleet-select-field">
          <span>Категория</span>
          <select class="fleet-select" data-fleet-category>
            <option value="">Все категории</option>
            ${carCategoryOptions.map(({ id, label }) => `<option value="${id}">${label}</option>`).join('')}
          </select>
        </label>
        <label class="fleet-select-field">
          <span>Марка</span>
          <select class="fleet-select" data-fleet-brand>
            <option value="">Все марки</option>
            ${brands.map(brand => `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`).join('')}
          </select>
        </label>
        <label class="fleet-select-field">
          <span>Цена</span>
          <select class="fleet-select" data-fleet-price>
            <option value="">Любая цена</option>
            <option value="under-50000">До 50 000 ₽</option>
            <option value="50000-70000">50 000-70 000 ₽</option>
            <option value="over-70000">От 70 000 ₽</option>
          </select>
        </label>
        <button class="fleet-filter fleet-filter-reset" type="button" data-fleet-reset>Сбросить</button>
      </div>
      <label class="fleet-sort-field">
        <span>Сортировка</span>
        <select class="fleet-sort-select" data-fleet-sort>
          <option value="default">По умолчанию</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="name-asc">По названию</option>
        </select>
      </label>
    </div>
    <div class="fleet-results-line">
      <span id="fleetResultsCount"></span>
    </div>
  `;
}

export function renderFleetPage() {
  document.title = 'Автопарк — Monolith Drive';
  return `
    ${renderFleetHero()}
    <section class="fleet-page" aria-label="Список автомобилей">
      <div class="container">
        ${renderFleetFilterControls()}
        <div class="fleet-grid" role="list">
          ${carsData.map(car => renderCarCard(car, { className: 'showcase-card--compact fleet-card' })).join('')}
        </div>
        <p class="fleet-empty" data-fleet-empty hidden>Автомобили с такими параметрами не найдены.</p>
      </div>
    </section>
  `;
}

function renderCollection(collection) {
  const cars = getCarsByCollection(collection.id);
  return `
    <section class="car-showcase" aria-labelledby="${collection.id}-heading" data-collection-section="${collection.id}">
      <div class="section-header showcase-header">
        <div class="showcase-heading">
          <h2 class="section-title" id="${collection.id}-heading">${escapeHtml(collection.title)}</h2>
        </div>
        <div class="showcase-actions">
          <a href="/car" class="section-link">${escapeHtml(collection.link)} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg></a>
          <div class="showcase-nav" aria-label="Листать ${escapeHtml(collection.title)}">
            <button class="showcase-nav-btn" type="button" data-showcase-prev aria-label="Предыдущие автомобили"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button class="showcase-nav-btn" type="button" data-showcase-next aria-label="Следующие автомобили"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg></button>
          </div>
        </div>
      </div>
      <div class="showcase-grid" role="list">
        ${cars.map(renderCarCard).join('')}
      </div>
    </section>
  `;
}

function renderShowcase() {
  return `
    <main id="catalog" class="showcase-section">
      <div class="container">
        ${collections.map(renderCollection).join('')}
      </div>
    </main>
  `;
}

function renderInfoSections() {
  return `
    <section class="rental-text-section" id="about" aria-labelledby="rental-text-heading">
      <div class="container">
        <article class="rental-text fade-in">
          <p class="showcase-eyebrow">Monolith Drive</p>
          <h2 id="rental-text-heading">Прокат автомобилей в Москве</h2>
          <p>Компания «Monolith Drive» оказывает услуги посуточной и долгосрочной аренды автомобилей без водителя в Москве. В нашем парке более 30 высококлассных автомобилей, в том числе:</p>
          <ul>
            <li>внедорожники;</li>
            <li>кабриолеты;</li>
            <li>спорткары;</li>
            <li>бизнес-класс;</li>
            <li>премиум-класс;</li>
            <li>электромобили.</li>
          </ul>
          <p>Предлагаем машины на любой бюджет, от комфортных бизнес-классов до элитного суперкара. Воспользуйтесь удобным поиском по каталогу, чтобы подобрать и взять напрокат именно тот автомобиль, который подходит для ваших целей.</p>
          <p>Офисы компании расположены в Москве, Санкт-Петербурге и Сочи. По договоренности с вашим менеджером возможен возврат автомобиля после завершения аренды в удобный для вас офис.</p>

          <h3>Как оформить аренду</h3>
          <p>Чтобы взять у нас в аренду на сутки автомобиль без водителя, вам понадобятся только паспорт РФ и водительские права. Оформление займет всего 15 минут. Вы сможете получить автомобиль в любом удобном вам районе города.</p>
          <p>Договор аренды подписывается удалено или лично в офисе компании. Узнать больше об условиях аренды можно <a href="/rent-conditions">здесь</a>.</p>

          <h3>Больше, чем просто прокат</h3>
          <p>«Monolith Drive» предлагает высокий уровень сервиса и корпоративных стандартов, чтобы аренда автомобиля в нашей компании оставила только приятные воспоминания:</p>
          <ul>
            <li><strong>Полное КАСКО.</strong> Весь автопарк компании полностью застрахован.</li>
            <li><strong>Техническая поддержка 24/7.</strong> Мы всегда рядом, если вам потребуется помощь или консультация.</li>
            <li><strong>Мы гарантируем вашу конфиденциальность.</strong> Ни один прокатный автомобиль не оборудован средствами аудио- видеофиксации.</li>
            <li><strong>Прокат автомобиля с водителем.</strong> Если вам нужен персональный водитель, компания может предоставить его.</li>
            <li><strong>Доставка по адресу.</strong> После оформления аренды мы доставим автомобиль по указанному адресу в Москве, в том числе в аэропорт.</li>
            <li><strong>Личная охрана.</strong> Предоставляется по запросу вместе с автомобилем.</li>
            <li><strong>Аренда с выкупом.</strong> Некоторые автомобили можно выкупить после проката, эту возможность нужно отдельно обсудить с менеджером компании.</li>
          </ul>

          <h3>Аренда автомобилей для юридических лиц</h3>
          <p>Наша компания оказывает услуги посуточной аренды легковых автомобилей для компаний и индивидуальных предпринимателей. Можем предоставить машину от 1 дня до нескольких лет.</p>
          <p>Работаем с и без НДС, предоставляем закрывающие документы для вашей бухгалтерии. Электронный документооборот позволяет обеспечить прокат машины для вашей компании оперативной и прозрачной отчетностью.</p>
        </article>
        </div>
    </section>

    <section class="reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div class="container">
        <div class="section-center">
          <h2 class="why-title" id="reviews-heading">Что говорят клиенты</h2>
        </div>
        <div class="reviews-grid">
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Для деловой недели выбрал BMW. Автомобиль подали без задержек, салон идеально подготовлен, все условия были понятны до подписания договора.»</p><div class="review-author"><div class="review-avatar" aria-hidden="true">АМ</div><div><div class="review-name">Алексей М.</div><div class="review-date">Москва · Март 2026</div></div></div></article>
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Нужен был автомобиль к офису и обратный возврат в другом районе. Менеджер спокойно согласовал детали, без лишних звонков и скрытых платежей.»</p><div class="review-author"><div class="review-avatar" aria-hidden="true">МК</div><div><div class="review-name">Марина К.</div><div class="review-date">Сочи · Апрель 2026</div></div></div></article>
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Брали Mercedes для съемочного дня. Машина выглядела строго как на фото, сопровождение было на связи до самого возврата.»</p><div class="review-author"><div class="review-avatar" aria-hidden="true">ДР</div><div><div class="review-name">Дмитрий Р.</div><div class="review-date">Москва · Май 2026</div></div></div></article>
        </div>
      </div>
    </section>

    <section class="cta-section" aria-labelledby="cta-heading">
      <div class="container">
        <div class="cta-inner">
          <h2 class="cta-title" id="cta-heading">Готовы поехать?</h2>
          <p class="cta-desc">Выберите автомобиль и получите персональное предложение на аренду.</p>
          <div class="cta-btns">
            <a class="btn btn-primary btn-hero" href="/car">Выбрать авто</a>
            <a href="/contacts" class="btn btn-outline btn-hero">Контакты</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderRentConditions() {
  document.title = 'Условия аренды — Monolith Drive';
  return `
    <section class="conditions-page">
      <div class="container">
        <div class="conditions-hero fade-in">
          <p class="showcase-eyebrow">Rent conditions</p>
          <h1>Условия аренды</h1>
          <p>Коротко о требованиях, документах и правилах проката автомобилей Monolith Drive.</p>
        </div>

        <div class="conditions-layout">
          <aside class="conditions-aside fade-in">
            <p>Для оформления</p>
            <strong>15 минут</strong>
            <span>Паспорт РФ и водительское удостоверение</span>
          </aside>

          <article class="conditions-content fade-in">
            <section>
              <h2>Основные требования</h2>
              <ul>
                <li>Возраст водителя — от 21 года для автомобилей бизнес-класса и от 25 лет для премиального сегмента.</li>
                <li>Стаж вождения — от 2 лет. Для спорткаров и суперкаров условия согласуются индивидуально.</li>
                <li>Для заключения договора нужны паспорт РФ и водительское удостоверение.</li>
              </ul>
            </section>

            <section>
              <h2>Что входит в аренду</h2>
              <ul>
                <li>Полное КАСКО для всего автопарка.</li>
                <li>Техническая поддержка 24/7 на весь период аренды.</li>
                <li>Подача автомобиля в удобный район Москвы по согласованию с менеджером.</li>
                <li>Возможность долгосрочной аренды и индивидуального тарифа.</li>
              </ul>
            </section>

            <section>
              <h2>Оплата и возврат</h2>
              <p>Стоимость аренды фиксируется в договоре. Автомобиль можно вернуть в офис Monolith Drive или по согласованному адресу. Офисы компании расположены в Москве, Санкт-Петербурге и Сочи.</p>
            </section>

            <section>
              <h2>Дополнительные услуги</h2>
              <ul>
                <li>Персональный водитель.</li>
                <li>Личная охрана по запросу.</li>
                <li>Доставка в аэропорт, отель, офис или на съемочную площадку.</li>
                <li>Аренда с последующим выкупом для отдельных автомобилей.</li>
              </ul>
            </section>

            <div class="conditions-cta">
              <a class="btn btn-primary btn-hero" href="/car">Выбрать автомобиль</a>
              <a class="btn btn-outline btn-hero" href="tel:+74951234567">Позвонить менеджеру</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

export function renderContacts() {
  document.title = 'Контакты — Monolith Drive';
  return `
    <section class="contacts-page">
      <div class="container">
        <div class="contacts-hero fade-in">
          <p class="showcase-eyebrow">Contacts</p>
          <h1>Контакты</h1>
          <p>Свяжитесь с персональным менеджером, уточните доступность автомобиля или согласуйте подачу в удобную точку города.</p>
        </div>

        <div class="contacts-layout">
          <aside class="contacts-panel fade-in">
            <p class="contacts-panel-label">Единая линия</p>
            <a class="contacts-main-phone" href="tel:+74951234567">+7 (495) 123-45-67</a>
            <span>Круглосуточно, без выходных</span>
            <a class="btn btn-primary btn-hero" href="tel:+74951234567">Позвонить</a>
          </aside>

          <div class="contacts-grid">
            <article class="contact-card fade-in">
              <span>Телефоны</span>
              <a href="tel:+74951234567">+7 (495) 123-45-67</a>
              <a href="tel:+78005550177">+7 (800) 555-01-77</a>
              <p>Бронирование, подбор автомобиля и сопровождение аренды.</p>
            </article>

            <article class="contact-card fade-in">
              <span>Почта</span>
              <a href="mailto:info@monolithdrive.ru">info@monolithdrive.ru</a>
              <a href="mailto:booking@monolithdrive.ru">booking@monolithdrive.ru</a>
              <p>Коммерческие предложения, договоры и корпоративные заявки.</p>
            </article>

            <article class="contact-card contact-card-wide fade-in">
              <span>Офисы</span>
              <div class="office-list">
                <p><strong>Москва</strong> Пресненская наб., 12, башня Федерация</p>
                <p><strong>Санкт-Петербург</strong> Невский проспект, 55</p>
                <p><strong>Сочи</strong> Морской переулок, 2</p>
                <p><strong>Дубай</strong> Business Bay, Bay Square</p>
              </div>
            </article>

            <article class="contact-card fade-in">
              <span>График</span>
              <strong>24/7</strong>
              <p>Выдача и возврат автомобилей доступны по предварительному согласованию в любое время.</p>
            </article>

            <article class="contact-card fade-in">
              <span>Подача</span>
              <strong>Офис · отель · аэропорт</strong>
              <p>Доставим автомобиль по адресу в городе или встретим у терминала.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHome() {
  document.title = 'Monolith Drive — аренда элитных автомобилей';
  return `${renderHero()}${renderCategories()}${renderShowcase()}${renderInfoSections()}`;
}

export function renderCarDetails(id) {
  const car = getCarById(id);

  if (!car) {
    document.title = 'Автомобиль не найден — Monolith Drive';
    return `
      <section class="car-detail-page">
        <div class="container">
          <div class="car-detail-panel">
            <p class="stub-label">Ошибка маршрута</p>
            <h1 class="stub-title">Автомобиль не найден</h1>
            <p class="stub-text">Такой страницы пока нет. Вернитесь в каталог и выберите автомобиль из подборки.</p>
            <a class="btn btn-primary btn-hero" href="/car">Вернуться к каталогу</a>
          </div>
        </div>
      </section>
    `;
  }

  document.title = `${car.name} — Monolith Drive`;
  return `
    <section class="car-detail-page car-detail-page--rich">
      <div class="container">
        <nav class="detail-breadcrumbs" aria-label="Хлебные крошки">
          <a href="/">Главная</a>
          <span aria-hidden="true">—</span>
          <a href="/car">Автопарк</a>
          <span aria-hidden="true">—</span>
          <span>${escapeHtml(car.name)}</span>
        </nav>

        <div class="detail-hero-layout">
          ${renderDetailGallery(car)}
          <aside class="detail-booking-panel fade-in">
            <p class="stub-label">${escapeHtml(car.className)}</p>
            <h1>${escapeHtml(car.name)}</h1>
            <div class="detail-price-main">
              <span>${formatRub(car.price)}</span>
              <small>/сутки</small>
            </div>
            <div class="detail-quick-specs" aria-label="Краткие характеристики">
              <div><span>Двигатель</span><strong>${escapeHtml(car.engine)}</strong></div>
              <div><span>Мощность</span><strong>${escapeHtml(car.power)}</strong></div>
              <div><span>Привод</span><strong>${escapeHtml(car.drive)}</strong></div>
            </div>
            <div class="detail-booking-actions">
              <a class="btn btn-primary btn-hero" href="tel:+74951234567">Забронировать</a>
              <a class="btn btn-outline btn-hero" href="/car">В автопарк</a>
            </div>
            <p class="detail-booking-note">Менеджер уточнит даты, адрес подачи и дополнительные опции. Работаем 24/7.</p>
          </aside>
        </div>

        <section class="detail-section detail-spec-section fade-in" aria-labelledby="spec-heading">
          <div class="detail-section-head">
            <p class="showcase-eyebrow">Характеристики</p>
            <h2 id="spec-heading">Коротко об автомобиле</h2>
          </div>
          <div class="detail-spec-grid">
            <div><span>Класс</span><strong>${escapeHtml(car.className)}</strong></div>
            <div><span>Двигатель</span><strong>${escapeHtml(car.engine)}</strong></div>
            <div><span>Мощность</span><strong>${escapeHtml(car.power)}</strong></div>
            <div><span>Привод</span><strong>${escapeHtml(car.drive)}</strong></div>
            <div><span>Статус</span><strong>${car.status === 'new' ? 'Новинка' : 'Доступен'}</strong></div>
            <div><span>Город</span><strong>Москва</strong></div>
          </div>
        </section>

        <section class="detail-section detail-prices-section fade-in" aria-labelledby="prices-heading">
          <div class="detail-section-head">
            <p class="showcase-eyebrow">Тарифы</p>
            <h2 id="prices-heading">Стоимость аренды</h2>
          </div>
          <div class="detail-price-columns">
            <article class="detail-price-card">
              <div class="detail-price-card-head">
                <h3>Посуточно</h3>
                <span>без водителя</span>
              </div>
              <div class="price-grid">
                ${renderDailyPrices(car)}
              </div>
            </article>
            <article class="detail-price-card">
              <div class="detail-price-card-head">
                <h3>Помесячно</h3>
                <span>долгий срок</span>
              </div>
              <div class="price-grid">
                ${renderMonthlyPrices(car)}
              </div>
            </article>
          </div>
        </section>

        <section class="detail-section detail-options-section fade-in" aria-labelledby="options-heading">
          <div class="detail-section-head">
            <p class="showcase-eyebrow">Дополнительные опции</p>
            <h2 id="options-heading">Персонализируйте поездку</h2>
          </div>
          <div class="options-grid">
            ${personalOptions.map(option => `
              <article class="option-card">
                <div class="option-icon">${iconSvg(option.icon)}</div>
                <div>
                  <h3>${escapeHtml(option.title)}</h3>
                  <p>${escapeHtml(option.price)}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="detail-section detail-service-section fade-in" aria-labelledby="service-heading">
          <div class="detail-service-panel">
            <div>
              <p class="showcase-eyebrow">Monolith Drive</p>
              <h2 id="service-heading">Автомобиль подадим чистым и готовым к поездке</h2>
              <p>В стоимость входит подготовка автомобиля, консультация менеджера и сопровождение на весь период аренды. При необходимости добавим водителя, доставку к адресу, охрану или условия для съемки.</p>
            </div>
            <a class="btn btn-primary btn-hero" href="tel:+74951234567">Позвонить менеджеру</a>
          </div>
        </section>

        ${renderSimilarCars(car)}
      </div>
    </section>
  `;
}

export function initHomePage() {
  initShowcaseNavigation();
  initHomeFilters();
}

function initShowcaseNavigation() {
  document.querySelectorAll('.car-showcase').forEach(showcase => {
    const track = showcase.querySelector('.showcase-grid');
    const prev = showcase.querySelector('[data-showcase-prev]');
    const next = showcase.querySelector('[data-showcase-next]');
    if (!track || !prev || !next) return;

    const scrollCards = direction => {
      const card = track.querySelector('.showcase-card:not([hidden])') || track.querySelector('.showcase-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
      track.scrollBy({ left: direction * (card.offsetWidth + gap) * visibleCards, behavior: 'smooth' });
    };

    prev.addEventListener('click', () => scrollCards(-1));
    next.addEventListener('click', () => scrollCards(1));
  });
}

function initHomeFilters() {
  const chips = document.querySelectorAll('[data-home-filter]');
  const cards = document.querySelectorAll('.showcase-card[data-status]');
  const sections = document.querySelectorAll('[data-collection-section]');
  const countEl = document.getElementById('resultsCount');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(item => item.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.homeFilter;
      let visibleCount = 0;

      cards.forEach(card => {
        const visible =
          filter === 'all' ||
          card.dataset.status === filter ||
          card.dataset.collection === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      sections.forEach(section => {
        const hasVisibleCard = section.querySelector('.showcase-card:not([hidden])');
        section.hidden = !hasVisibleCard;
        section.querySelector('.showcase-grid')?.scrollTo({ left: 0 });
      });

      if (countEl) countEl.textContent = `Показано ${visibleCount} авто`;
    });
  });
}
