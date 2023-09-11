let currentDate = "2023-01-01";
let contenedorCartas = document.getElementById('card-container');
let checkbox = document.getElementById('_checklist');
let searchBar = document.getElementById('searchBar');
let submitBtn = document.getElementById('submitBtn');
let searchBarInput = document.querySelector('.form-control');
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    upcomingData = data.events.filter(evento => Date.parse(evento.date) > Date.parse(currentDate));
    let arrayNombresEventos = upcomingData.map(evento => evento.category);
    let eventosUnicos = [...new Set(arrayNombresEventos)];
    checkbox.innerHTML = crearCheckbox(eventosUnicos);
    imprimirCard(cardContent(upcomingData), contenedorCartas);
    searchBar.addEventListener('keyup', (e) => {
      let returnCombinado = filtrosCombinados(upcomingData, searchBarInput);
      imprimirCard(cardContent(returnCombinado), contenedorCartas);
    }
    )
    checkbox.addEventListener('change', (e) => {
      let returnCombinado = filtrosCombinados(upcomingData, searchBarInput);
      imprimirCard(cardContent(returnCombinado), contenedorCartas);
    })
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
    });
  })
  .catch(error => console.log(error));
function crearCheckbox(array) {
  let template = '';
  for (let evento of array) {
    template += `
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="kjs" value="${evento}">
      <label class="form-check-label" for="${evento}">${evento}</label>
    </div>
    `
  }
  return template;
};
function cardContent(array) {
  let content = '';
  for (let evento of array) {
    content +=
      `<div class="card mb-3 carta" style="width: 18rem;">
      <img src="${evento.image}" class="card-img-top" style="height: 12rem" alt="imagen_evento">
      <label class="container">
          <input type="checkbox" class="checkbox" id="like">
          <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path></svg>
      </label>
<div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title" style="font-weight: bold">${evento.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${evento.category}</h6>
    <p class="card-text">${evento.description}</p>
    <div class="details d-flex align-items-center justify-content-between">
        <p class="mb-0" style="font-size: 1.1rem">Price<br><b>$${evento.price}</b></p>
        <a href="Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
    </div>
</div>
</div>
`;
  }
  return content;
}
function imprimirCard(string, elementoHTML) {
  if (string !== '') {
    elementoHTML.innerHTML = string;
  } else elementoHTML.innerHTML = `<div class="alert alert-danger" role="alert">
No se han encontrado coincidencias.
</div>`
}
function filtrarPorBusqueda(array, input) {
  let stringBusqueda = input.value;
  let busquedaFiltrada = array.filter(evento => evento.name.toLowerCase().includes(stringBusqueda.toLowerCase()));
  return busquedaFiltrada;
}
function filtrarPorCheck(array) {
  let nodeList = document.querySelectorAll('input[type="checkbox"]:checked');
  let arrayMarcados = Array.from(nodeList).map(input => input.value);
  if (arrayMarcados.length !== 0) {
    let filtradosPorCheck = array.filter(evento => arrayMarcados.includes(evento.category));
    return filtradosPorCheck;
  } else {
    return array;
  }
}
function filtrosCombinados(array, input) {
  let filtroChecks = filtrarPorCheck(array);
  let filtroChecksYBusqueda = filtrarPorBusqueda(filtroChecks, input);
  return filtroChecksYBusqueda;
}
