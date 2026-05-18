export const collections = [
  { id: 'season-hits', title: 'Хиты сезона', link: 'Все автомобили' },
  { id: 'new-arrivals', title: 'Новые поступления', link: 'Все автомобили' },
  { id: 'influencers', title: 'Для инфлюенсеров', link: 'Все автомобили' }
];

let carsDataPromise;

export async function fetchCarsData() {
  if (!carsDataPromise) {
    const dataUrl = `${import.meta.env.BASE_URL}data/cars.json`;

    carsDataPromise = fetch(dataUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Не удалось загрузить данные автомобилей: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Файл cars.json должен содержать массив автомобилей');
        }
        return data;
      });
  }

  return carsDataPromise;
}

export async function getCarById(id) {
  const carsData = await fetchCarsData();
  return carsData.find(car => car.id === id);
}

export async function getCarsByCollection(collectionId) {
  const carsData = await fetchCarsData();
  return carsData.filter(car => car.collection === collectionId);
}
