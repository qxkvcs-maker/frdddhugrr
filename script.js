const bunkerData = [
  {
    name: "Вход в бункер (1)",
    lat: 55.987173,
    lon: 37.153091,
    desc: "Спуск вниз, железные двери, как будто для въезда машинам."
  },
  {
    name: "Вход в бункер (2)",
    lat: 55.987338,
    lon: 37.154248,
    desc: "Видно убежище через двери, кнопка вызова охраны возможно реально их вызывает. Нужно также спустится, как и на 1 бункере."
  },
  {
    name: "Вход в бункер (3)",
    lat: 55.986685,
    lon: 37.153730,
    desc: "Нужно подойти к этому месту, и убедится, что дверь бункера, открыта."
  }
];

let map;
let placemarks = {};

ymaps.ready(init);

function init() {
  map = new ymaps.Map("map", {
    center: [55.987173, 37.153091],
    zoom: 16,
    type: "yandex#hybrid"
  });

  renderBunkers();
}

function renderBunkers() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  bunkerData.forEach((bunker, index) => {
    // Добавляем метку
    const placemark = new ymaps.Placemark([bunker.lat, bunker.lon], {
      balloonContent: `<strong>${bunker.name}</strong><br>${bunker.desc}`
    }, {
      preset: "islands#redDotIcon"
    });
    map.geoObjects.add(placemark);
    placemarks[bunker.name] = placemark;

    // Создаем плашку
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <button class="delete-btn">&times;</button>
      <h2>${bunker.name}</h2>
      <p>${bunker.desc}</p>
      <p><strong>Координаты:</strong><br>${bunker.lat}, ${bunker.lon}</p>
    `;

    // Удаление
    card.querySelector(".delete-btn").addEventListener("click", () => {
      map.geoObjects.remove(placemarks[bunker.name]);
      delete placemarks[bunker.name];
      card.remove();
    });

    cardsContainer.appendChild(card);
  });
}