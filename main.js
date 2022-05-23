// Elementos para añadir comensales
const comensal = document.getElementById('comensal');
const botonAñadirComensal = document.getElementById('boton-añadir-comensal');
const listadeComensales = document.getElementById('lista-de-comensales')

// Elementos para añadir productos
const listaDeCompradores = document.getElementById('producto-comprador');


// Array con total de comensales
const arrayListaDeComensales = [];

// Listener para añadir comensales
botonAñadirComensal.addEventListener('click', () => {
    nombre = comensal.value;
    arrayListaDeComensales.push(nombre);
    listadeComensales.innerHTML += `<li class="list-group-item">${nombre}</li>`;
    listaDeCompradores.innerHTML += `<option value="1">${nombre}</option>`
    comensal.value = "";
})

// Añadir un producto a la cuenta