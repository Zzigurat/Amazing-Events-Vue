let bodyTabla_1 = document.getElementById('bodyTabla_1');
let bodyTabla_2 = document.getElementById('bodyTabla_2');
let bodyTabla_3 = document.getElementById('bodyTabla_3');
let currentDate = "2023-01-01";
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        pastData = data.events.filter(evento => Date.parse(evento.date) < Date.parse(currentDate));
        upcomingData = data.events.filter(evento => Date.parse(evento.date) > Date.parse(currentDate));
        pastData.sort((a, b) => (b.assistance / b.capacity) - (a.assistance / a.capacity));
        let stringCeldasTabla1 = crearCeldasTabla_1(pastData);
        imprimirCeldas(stringCeldasTabla1, bodyTabla_1)
        let stringCeldasTabla2 = crearCeldasTabla_2y3(pastData);
        imprimirCeldas(stringCeldasTabla2, bodyTabla_2);
        let stringCeldasTabla3 = crearCeldasTabla_2y3(upcomingData);
        imprimirCeldas(stringCeldasTabla3, bodyTabla_3);
    })
    .catch(error => console.log(error));

function crearCeldasTabla_2y3(array) {
    let template = '';
    for (let evento of array) {
        if (!template.includes(evento.category)) {
            let returnPrecioTotal = precioTotal(array, evento.category)
            let returnAsistenciaTotal = asistenciaTotal(array, evento.category)
            let returnCapacidadTotal = capacidadTotal(array, evento.category)
            template += `
        <tr>
            <td>${evento.category}</td>
            <td>$${(returnPrecioTotal).toLocaleString("en-US")}</td>
            <td>${(returnAsistenciaTotal * 100 / returnCapacidadTotal).toFixed(2)}%</td>
        </tr>
        `
        }
    }
    return template;
}
function crearCeldasTabla_1(array) {
    let returnMayorPorcentajeDeAsistencia = mayorPorcentajeDeAsistencia(array)
    let returnMenorPorcentajeDeAsistencia = menorPorcentajeDeAsistencia(array)
    let returnmayorCapacidad = mayorCapacidad(array)
    template = `
        <tr>
            <td>${returnMayorPorcentajeDeAsistencia}</td>
            <td>${returnMenorPorcentajeDeAsistencia}</td>
            <td>${returnmayorCapacidad}</td>
        </tr>
        `
    return template;
}
function imprimirCeldas(string, elementoHTML) {
    elementoHTML.innerHTML = string;
}
function precioTotal(array, categoria) {
    let total = array.reduce((acumulador, evento) => {
        if (evento.category === categoria) {
            return evento.assistance ? acumulador + evento.assistance * evento.price : acumulador + evento.estimate * evento.price
        }
        else {
            return acumulador;
        }
    }, 0);
    return total;
}
function asistenciaTotal(array, categoria) {
    let total = array.reduce((acumulador, evento) => {
        if (evento.category === categoria) {
            return evento.assistance ? acumulador + evento.assistance : acumulador + evento.estimate;
        } else {
            return acumulador;
        }
    }, 0);
    return total;
}
function capacidadTotal(array, categoria) {
    let total = array.reduce((acumulador, evento) => {
        if (evento.category === categoria) {
            return acumulador + evento.capacity
        } else {
            return acumulador;
        }
    }, 0);
    return total;
}
function mayorPorcentajeDeAsistencia(array) {
    let asistencia = 0
    let mayorPorcentaje;
    for (let evento of array) {
        if ((evento.assistance * 100 / evento.capacity) > asistencia) {
            asistencia = evento.assistance * 100 / evento.capacity
            mayorPorcentaje = `${evento.name} ${(evento.assistance * 100 / evento.capacity).toFixed(2)}%`;
        }
    }
    return mayorPorcentaje;
}
function menorPorcentajeDeAsistencia(array) {
    let asistencia = 100000000000
    let menorPorcentaje;
    for (let evento of array) {
        if ((evento.assistance * 100 / evento.capacity) < asistencia) {
            asistencia = evento.assistance * 100 / evento.capacity;
            menorPorcentaje = `${evento.name} ${(evento.assistance * 100 / evento.capacity).toFixed(2)}%`;
        }
    }
    return menorPorcentaje;
}
function mayorCapacidad(array) {
    let capacidad = 0
    let mayorCapacidad;
    for (let evento of array) {
        if (evento.capacity > capacidad) {
            capacidad = evento.capacity
            mayorCapacidad = `${evento.name} ${evento.capacity}`
        }
    }
    return mayorCapacidad;
}
