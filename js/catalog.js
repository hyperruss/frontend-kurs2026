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

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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
            <a class="btn btn-primary btn-hero" href="/#catalog">Выбрать автомобиль</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCategories() {
  const items = [
    ['premium', 'Премиум'],
    ['suv', 'Внедорожники'],
    ['business', 'Бизнес'],
    ['sport', 'Спорткары'],
    ['minivan', 'Минивэны'],
    ['electric', 'Электромобили']
  ];

  return `
    <section id="categories" class="categories-section" aria-labelledby="categories-heading">
      <div class="container">
        <h2 class="categories-title" id="categories-heading">Категории автомобилей</h2>
        <div class="categories-grid" role="list">
          ${items.map(([id, label]) => `
            <a href="/#catalog" class="category-card" role="listitem" aria-label="${label}">
              <img src="${categoryImages[id]}" alt="${label}" loading="lazy" width="220" height="100">
              <div class="category-label">${label}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}



function renderCarCard(car) {
  return `
    <a class="showcase-card fade-in" href="/car/${escapeHtml(car.id)}" role="listitem" aria-label="${escapeHtml(car.name)}" data-status="${car.status}" data-collection="${car.collection}">
      <div class="showcase-card-media" data-initial="${escapeHtml(car.initial)}">
        <span class="showcase-photo-label">Фото автомобиля</span>
      </div>
      <div class="showcase-card-body">
        <h3>${escapeHtml(car.name)}</h3>
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

function renderCollection(collection) {
  const cars = getCarsByCollection(collection.id);
  return `
    <section class="car-showcase" aria-labelledby="${collection.id}-heading" data-collection-section="${collection.id}">
      <div class="section-header showcase-header">
        <div>
          <p class="showcase-eyebrow">${escapeHtml(collection.eyebrow)}</p>
          <h2 class="section-title" id="${collection.id}-heading">${escapeHtml(collection.title)}</h2>
        </div>
        <div class="showcase-actions">
          <a href="/#catalog" class="section-link">${escapeHtml(collection.link)} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg></a>
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

    <section class="how-section" id="how" aria-labelledby="how-heading">
      <div class="container">
        <div class="section-center">
          <p class="why-label">Процесс</p>
          <h2 class="why-title" id="how-heading">Как взять авто в аренду</h2>
        </div>
        <div class="steps-grid">
          <div class="step-card fade-in"><div class="step-num" aria-hidden="true">1</div><h3 class="step-title">Выберите авто</h3><p class="step-desc">Найдите подходящий автомобиль в подборке и откройте его страницу.</p></div>
          <div class="step-card fade-in"><div class="step-num" aria-hidden="true">2</div><h3 class="step-title">Оставьте заявку</h3><p class="step-desc">Менеджер свяжется с вами и уточнит даты аренды.</p></div>
          <div class="step-card fade-in"><div class="step-num" aria-hidden="true">3</div><h3 class="step-title">Подпишите договор</h3><p class="step-desc">Удаленно или лично в офисе Monolith Drive.</p></div>
          <div class="step-card fade-in"><div class="step-num" aria-hidden="true">4</div><h3 class="step-title">Получите ключи</h3><p class="step-desc">Авто подадут в удобный район или к месту съемки.</p></div>
        </div>
      </div>
    </section>

    <section class="reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div class="container">
        <div class="section-center">
          <p class="why-label">Отзывы</p>
          <h2 class="why-title" id="reviews-heading">Что говорят клиенты</h2>
        </div>
        <div class="reviews-grid">
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Брал BMW на неделю — машина чистая, менеджер все объяснил. Уже второй раз обращаюсь.»</p><div class="review-author"><div class="review-avatar"><img src="https://picsum.photos/seed/alex1/80/80" alt="Алексей М." loading="lazy" width="44" height="44"></div><div><div class="review-name">Алексей М.</div><div class="review-date">Март 2026</div></div></div></article>
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Оформили за 10 минут, привезли прямо к офису. Цены честные, без скрытых платежей.»</p><div class="review-author"><div class="review-avatar"><img src="https://picsum.photos/seed/marina/80/80" alt="Марина К." loading="lazy" width="44" height="44"></div><div><div class="review-name">Марина К.</div><div class="review-date">Апрель 2026</div></div></div></article>
          <article class="review-card fade-in"><div class="review-stars" aria-label="5 звезд">★★★★★</div><p class="review-text">«Брали Mercedes для съемки. Машина в отличном состоянии, поддержка была на связи весь день.»</p><div class="review-author"><div class="review-avatar"><img src="https://picsum.photos/seed/dmitry/80/80" alt="Дмитрий Р." loading="lazy" width="44" height="44"></div><div><div class="review-name">Дмитрий Р.</div><div class="review-date">Май 2026</div></div></div></article>
        </div>
      </div>
    </section>

    <section class="cta-section" aria-labelledby="cta-heading">
      <div class="container">
        <div class="cta-inner">
          <h2 class="cta-title" id="cta-heading">Готовы поехать?</h2>
          <p class="cta-desc">Выберите автомобиль и получите персональное предложение на аренду.</p>
          <div class="cta-btns">
            <a class="btn btn-primary btn-hero" href="/#catalog">Выбрать авто</a>
            <a href="tel:+74951234567" class="btn btn-outline btn-hero">Позвонить нам</a>
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
              <a class="btn btn-primary btn-hero" href="/#catalog">Выбрать автомобиль</a>
              <a class="btn btn-outline btn-hero" href="tel:+74951234567">Позвонить менеджеру</a>
            </div>
          </article>
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
            <a class="btn btn-primary btn-hero" href="/#catalog">Вернуться к каталогу</a>
          </div>
        </div>
      </section>
    `;
  }

  document.title = `${car.name} — Monolith Drive`;
  return `
    <section class="car-detail-page">
      <div class="container">
        <a class="car-back-link" href="/#catalog">← Вернуться к подборке</a>
        <div class="car-detail-grid">
          <div class="car-detail-media" data-initial="${escapeHtml(car.initial)}">
            <span>Фото автомобиля</span>
          </div>
          <article class="car-detail-panel">
            <p class="stub-label">${escapeHtml(car.className)}</p>
            <h1 class="stub-title">${escapeHtml(car.name)}</h1>
            <p class="stub-text">Детальная страница автомобиля рендерится внутри SPA и берет данные напрямую из общего модуля данных.</p>
            <div class="car-detail-specs">
              <div><span>Объем</span><strong>${escapeHtml(car.engine)}</strong></div>
              <div><span>Мощность</span><strong>${escapeHtml(car.power)}</strong></div>
              <div><span>Привод</span><strong>${escapeHtml(car.drive)}</strong></div>
            </div>
            <div class="car-detail-price">
              <span>${escapeHtml(car.priceLabel)}</span><small>/сут</small>
            </div>
            <div class="stub-actions">
              <a class="btn btn-primary btn-hero" href="tel:+74951234567">Забронировать</a>
              <a class="btn btn-outline btn-hero" href="/#catalog">Назад</a>
            </div>
          </article>
        </div>
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
