export const collections = [
  { id: 'season-hits', eyebrow: 'Monolith selection', title: 'Хиты сезона', link: 'Все автомобили' },
  { id: 'new-arrivals', eyebrow: 'Fresh garage', title: 'Новые поступления', link: 'Смотреть новинки' },
  { id: 'influencers', eyebrow: 'Content ready', title: 'Для инфлюенсеров', link: 'Для съемок' }
];

export const carsData = [
  { id: 'mercedes-maybach-s580', collection: 'season-hits', name: 'Mercedes-Maybach S 580', price: 45000, priceLabel: 'от 45 000 ₽', engine: '4.0 л', power: '503 л.с.', drive: '4Matic', initial: 'S', className: 'Премиум седан', status: 'available' },
  { id: 'rolls-royce-ghost', collection: 'season-hits', name: 'Rolls-Royce Ghost', price: 78000, priceLabel: 'от 78 000 ₽', engine: '6.7 л', power: '571 л.с.', drive: 'AWD', initial: 'G', className: 'Представительский', status: 'available' },
  { id: 'lamborghini-urus', collection: 'season-hits', name: 'Lamborghini Urus', price: 62000, priceLabel: 'от 62 000 ₽', engine: '4.0 л', power: '650 л.с.', drive: 'AWD', initial: 'U', className: 'Super SUV', status: 'available' },
  { id: 'mercedes-amg-g63', collection: 'season-hits', name: 'Mercedes-AMG G 63', price: 55000, priceLabel: 'от 55 000 ₽', engine: '4.0 л', power: '585 л.с.', drive: '4Matic', initial: 'G', className: 'Внедорожник', status: 'available' },
  { id: 'porsche-911-carrera', collection: 'season-hits', name: 'Porsche 911 Carrera', price: 48000, priceLabel: 'от 48 000 ₽', engine: '3.0 л', power: '385 л.с.', drive: 'RWD', initial: '911', className: 'Спорткар', status: 'available' },
  { id: 'bentley-continental-gt', collection: 'season-hits', name: 'Bentley Continental GT', price: 69000, priceLabel: 'от 69 000 ₽', engine: '4.0 л', power: '550 л.с.', drive: 'AWD', initial: 'GT', className: 'Grand tourer', status: 'available' },

  { id: 'ferrari-roma', collection: 'new-arrivals', name: 'Ferrari Roma', price: 82000, priceLabel: 'от 82 000 ₽', engine: '3.9 л', power: '620 л.с.', drive: 'RWD', initial: 'R', className: 'Grand tourer', status: 'new' },
  { id: 'range-rover-sv', collection: 'new-arrivals', name: 'Range Rover SV', price: 44000, priceLabel: 'от 44 000 ₽', engine: '4.4 л', power: '530 л.с.', drive: 'AWD', initial: 'SV', className: 'Luxury SUV', status: 'new' },
  { id: 'bmw-m8-competition', collection: 'new-arrivals', name: 'BMW M8 Competition', price: 52000, priceLabel: 'от 52 000 ₽', engine: '4.4 л', power: '625 л.с.', drive: 'xDrive', initial: 'M8', className: 'Бизнес спорт', status: 'new' },
  { id: 'bentley-bentayga', collection: 'new-arrivals', name: 'Bentley Bentayga', price: 68000, priceLabel: 'от 68 000 ₽', engine: '4.0 л', power: '550 л.с.', drive: 'AWD', initial: 'B', className: 'Премиум SUV', status: 'new' },
  { id: 'tesla-cybertruck', collection: 'new-arrivals', name: 'Tesla Cybertruck', price: 49000, priceLabel: 'от 49 000 ₽', engine: 'Электро', power: '845 л.с.', drive: 'AWD', initial: 'CT', className: 'Электромобиль', status: 'new' },
  { id: 'aston-martin-db12', collection: 'new-arrivals', name: 'Aston Martin DB12', price: 74000, priceLabel: 'от 74 000 ₽', engine: '4.0 л', power: '680 л.с.', drive: 'RWD', initial: 'DB', className: 'Super tourer', status: 'new' },

  { id: 'rolls-royce-cullinan-black-badge', collection: 'influencers', name: 'Rolls-Royce Cullinan Black Badge', price: 95000, priceLabel: 'от 95 000 ₽', engine: '6.7 л', power: '600 л.с.', drive: 'AWD', initial: 'BB', className: 'Statement SUV', status: 'available' },
  { id: 'lamborghini-huracan-spyder', collection: 'influencers', name: 'Lamborghini Huracan EVO Spyder', price: 86000, priceLabel: 'от 86 000 ₽', engine: '5.2 л', power: '640 л.с.', drive: 'AWD', initial: 'H', className: 'Кабриолет', status: 'available' },
  { id: 'porsche-911-turbo-s-cabrio', collection: 'influencers', name: 'Porsche 911 Turbo S Cabrio', price: 64000, priceLabel: 'от 64 000 ₽', engine: '3.8 л', power: '650 л.с.', drive: 'AWD', initial: 'TS', className: 'Lifestyle sport', status: 'available' },
  { id: 'mercedes-v-class-vip', collection: 'influencers', name: 'Mercedes-Benz V-Class VIP', price: 32000, priceLabel: 'от 32 000 ₽', engine: '2.0 л', power: '239 л.с.', drive: '4Matic', initial: 'V', className: 'Гримерка на колесах', status: 'available' },
  { id: 'mercedes-amg-sl63', collection: 'influencers', name: 'Mercedes-AMG SL 63', price: 58000, priceLabel: 'от 58 000 ₽', engine: '4.0 л', power: '585 л.с.', drive: '4Matic', initial: 'SL', className: 'Roadster', status: 'available' },
  { id: 'ferrari-296-gts', collection: 'influencers', name: 'Ferrari 296 GTS', price: 98000, priceLabel: 'от 98 000 ₽', engine: '3.0 л', power: '830 л.с.', drive: 'RWD', initial: '296', className: 'Hybrid spider', status: 'available' }
];

export function getCarById(id) {
  return carsData.find(car => car.id === id);
}

export function getCarsByCollection(collectionId) {
  return carsData.filter(car => car.collection === collectionId);
}
