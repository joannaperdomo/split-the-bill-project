// Elementos DOM para añadir personas
const comensal = document.getElementById('comensal');
const botonAñadirComensal = document.getElementById('boton-añadir-comensal');
const listadeComensales = document.getElementById('lista-de-comensales')
const comprador = document.getElementById('compradores');
let todosLosComensales = document.querySelectorAll('.opcion-comprador');

function Persona (nombre,deuda){
    this.nombre = nombre;
    this.deuda = deuda;
    this.productos = [];
    this.numero = listaDePersonas.length+1;
}

function producto (descripcion,precio,cantidad){
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
}


// total de la cuenta
let listaDePersonas = [];
let deudaTotal = 0;
const total = document.getElementById('total');

// Array con total de comensales 
const arrayListaDeComensales = [];

// Listener para añadir comensales
botonAñadirComensal.addEventListener('click', () => {    
    listaDePersonas.push(new Persona(comensal.value, 0));
    listadeComensales.innerHTML += `<li id="${comensal.value}" class="list-group-item opcion-comprador">${comensal.value} $0</li>`;
    comprador.innerHTML += `
    <input type="checkbox" class="checkbox-comprador" id="${comensal.value}">
    <label for="${comensal.value}">${comensal.value}</label>`
    comensal.value = "";
    total.style.visibility = 'hidden'&& (total.style.visibility = 'visible');

})


// Elementos para añadir productos
let descripcion = document.getElementById('producto-descripcion');
let precio = document.getElementById('producto-precio');
let cantidad = document.getElementById('producto-cantidad');
const botonAñadirProducto = document.getElementById('boton-añadir-producto');



function actualizarPersona (persona){
    const todosLosComensales = document.querySelectorAll('.opcion-comprador');
    todosLosComensales.forEach(e => {
        if (e.id == persona.nombre){
            e.innerText = `${persona.nombre} $${persona.deuda}`;
        }
    })
    // Actualizar total
    total.innerText = `$${deudaTotal}`;
}

// Añadir un producto a la cuenta

botonAñadirProducto.addEventListener('click', () =>{
    const listadeCompradores = document.querySelectorAll('.checkbox-comprador');
    let descripcionProducto = descripcion.value;
    let precioProducto = parseInt(precio.value);
    let cantidadProducto = cantidad.value;
    listadeCompradores.forEach(e => {
        // encontrar a las personas con check
        if (e.checked){
            let persona = listaDePersonas.find(elemento => elemento.nombre == e.id);
            // actualizar deuda y productos consumidos
            persona.deuda += precioProducto * cantidadProducto;
            persona.productos.push(new producto(descripcionProducto,precioProducto,cantidadProducto));
            deudaTotal += precioProducto * cantidadProducto;
            // actualizar HTML
            actualizarPersona(persona);
        }
    });
})

const botonWhatsapp = document.getElementById('boton-enviar-whatsapp');

botonWhatsapp.addEventListener('click', () =>{
    let linkWhatsapp = "https://api.whatsapp.com/send/?text=%F0%9F%92%B5%20Tu%20cuenta%20se%20divide%20as%C3%AD%3A%0A";
    for (let persona of listaDePersonas){
    linkWhatsapp += `${persona.nombre}:%20$${persona.deuda}%0A`;
    }
    linkWhatsapp += `Total%20a%20pagar:%20$${deudaTotal}`
    window.location.href = linkWhatsapp;
})


// Botones para modificar cantidad
const restarCantidad = document.getElementById('boton-restar-cantidad');
const sumarCantidad = document.getElementById('boton-sumar-cantidad');

sumarCantidad.addEventListener('click', () => {
    cantidad.value++
})

restarCantidad.addEventListener('click', () => {
    cantidad.value--
})

