
let queryString = location.search;       /* Obtiene los parámetros de búsqueda de mi URL despues del ? */

let params = new URLSearchParams(queryString);       /* Me permite manipular los parámetros de mi URL */

let id = params.get('id');    /* Me consigue el id de mi URL */

let container = document.getElementById('detailsContainer');


fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        let evento = data.events.find(event => event._id == id); /* Busca en el array data.events el id que coincida con el id de mi URL
                                                             y me devuelve el objeto que contenga el id*/

        container.innerHTML =
            `<div class="row g-0" style="height: 100%;">
    <div class="col-md-6">
        <img src=${evento.image} class="img-fluid rounded-start"
            alt="imagen_evento" style="height: 100%; object-fit: cover;">
    </div>
    <div class="col-md-6">
        <div class="card-body flex-column align-items-center justify-content-center" style="height: 100%;">
            <h2 class="card-title mb-5 " style="text-align: center;">${evento.name}</h2>
            <ul class="list-unstyled offset-1 mt-5">
                <li class="mb-2">Date: ${evento.date}</li>
                <li class="mb-2">Description: ${evento.description}</li>
                <li class="mb-2">Place: ${evento.place}</li>
                <li class="mb-2">Capacity: ${evento.capacity}</li>
                <li class="mb-2">Price: $${evento.price}</li>
            </ul>
        </div>
    </div>
</div>
`
    })
    .catch(error => console.log(error));


