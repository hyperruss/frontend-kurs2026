import { initHomePage, renderCarDetails, renderContacts, renderFleetPage, renderHome, renderRentConditions } from './catalog.js';

let afterRenderCallback = () => {};

export function initRouter({ afterRender } = {}) {
  afterRenderCallback = afterRender || afterRenderCallback;

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || shouldSkipLink(link)) return;

    const url = new URL(link.getAttribute('href'), window.location.origin);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    navigate(`${url.pathname}${url.search}${url.hash}`);
  });

  window.addEventListener('popstate', () => renderRoute({ isHistoryNavigation: true }));
  renderRoute({ isHistoryNavigation: true });
}

export function navigate(to, { replace = false } = {}) {
  const url = new URL(to, window.location.origin);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (next !== current) {
    const method = replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', next);
  }

  renderRoute();
}

function renderRoute({ isHistoryNavigation = false } = {}) {
  const app = document.getElementById('app');
  if (!app) return;

  const { pathname, hash } = window.location;
  const carMatch = pathname.match(/^\/car\/([^/]+)\/?$/);

  app.classList.remove('app-shell--visible');

  window.requestAnimationFrame(() => {
    if (pathname === '/' || pathname === '') {
      app.innerHTML = renderHome();
      initHomePage();
      afterRenderCallback({ route: 'home' });
      scrollAfterRender(hash, isHistoryNavigation);
    } else if (pathname === '/car' || pathname === '/car/') {
      app.innerHTML = renderFleetPage();
      afterRenderCallback({ route: 'fleet' });
      if (!isHistoryNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (carMatch) {
      app.innerHTML = renderCarDetails(decodeURIComponent(carMatch[1]));
      afterRenderCallback({ route: 'car', id: decodeURIComponent(carMatch[1]) });
      if (!isHistoryNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname === '/rent-conditions' || pathname === '/rent-conditions/') {
      app.innerHTML = renderRentConditions();
      afterRenderCallback({ route: 'rent-conditions' });
      if (!isHistoryNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname === '/contacts' || pathname === '/contacts/') {
      app.innerHTML = renderContacts();
      afterRenderCallback({ route: 'contacts' });
      if (!isHistoryNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.replaceState({}, '', '/');
      app.innerHTML = renderHome();
      initHomePage();
      afterRenderCallback({ route: 'home' });
    }

    window.requestAnimationFrame(() => app.classList.add('app-shell--visible'));
  });
}

function scrollAfterRender(hash, isHistoryNavigation) {
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: isHistoryNavigation ? 'auto' : 'smooth' });
      return;
    }
  }

  if (!isHistoryNavigation) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shouldSkipLink(link) {
  const href = link.getAttribute('href') || '';
  return (
    link.target === '_blank' ||
    link.hasAttribute('download') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}
