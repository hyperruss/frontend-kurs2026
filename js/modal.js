/**
 * modal.js — Модальное окно бронирования
 */
function openModal(carId) {
  const car = carsData.find(c => c.id === carId);
  if (car) {
    document.getElementById('modalCarName').textContent  = car.name;
    document.getElementById('modalCarPrice').textContent = car.priceLabel;
    document.getElementById('modalCarImg').src           = car.img;
    document.getElementById('modalCarImg').alt           = car.name;
    document.getElementById('modalCarImg').style.display = 'block';
  } else {
    document.getElementById('modalCarName').textContent  = 'Любой автомобиль';
    document.getElementById('modalCarPrice').textContent = '';
    document.getElementById('modalCarImg').style.display = 'none';
  }
  document.getElementById('bookModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('bookModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('bookModal')) closeModal();
}

function submitBooking(e) {
  e.preventDefault();
  closeModal();
  showToast('Заявка принята! Менеджер позвонит в течение 5 минут.');
}

function showToast(message) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1a1917;color:#fff;padding:14px 20px;border-radius:12px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.3);display:flex;align-items:center;gap:10px;max-width:340px;';
  t.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${message}`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.transition='opacity 0.3s'; t.style.opacity='0'; }, 3000);
  setTimeout(() => t.remove(), 3400);
}

const Modal = { open: openModal, close: closeModal };