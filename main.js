// Elementos DOM para añadir personas
const comensal = document.getElementById('comensal');
const botonAñadirComensal = document.getElementById('boton-añadir-comensal');
const listadeComensales = document.getElementById('lista-de-comensales')
const comprador = document.getElementById('compradores');

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

// totales
let listaDePersonas = [];
let deudaTotal = 0;
const total = document.getElementById('total');

// Array con total de personas 
const arrayListaDeComensales = [];

// Listener para añadir personas
botonAñadirComensal.addEventListener('click', () => {    
    listaDePersonas.push(new Persona(comensal.value, 0));
    listadeComensales.innerHTML += `<li id="${comensal.value}-li" class="list-group-item opcion-comprador">${comensal.value}: $0</li>`;
    comprador.innerHTML += `
    <input name="chckbox" type="checkbox" class="btn-check form-check-input checkbox-comprador" id="${comensal.value}">
    <label class="form-check-label btn btn-outline-primary checkbox-label" for="${comensal.value}">${comensal.value}</label>`
    comensal.value = "";
    total.style.visibility = 'hidden'&& (total.style.visibility = 'visible');
    compartidoContainer.style.visibility = 'hidden'&& (compartidoContainer.style.visibility = 'visible');

})


// Elementos para añadir productos
let descripcion = document.getElementById('producto-descripcion');
let precio = document.getElementById('producto-precio');
let cantidad = document.getElementById('producto-cantidad');
const botonAñadirProducto = document.getElementById('boton-añadir-producto');
let compartido = document.getElementById('compartido');
const compartidoContainer = document.getElementById('compartido-container');

// Actualizar la deuda de la persona

function actualizarPersona (persona){
    const todosLosComensales = document.querySelectorAll('.opcion-comprador');
    todosLosComensales.forEach(e => {
        if (e.id == `${persona.nombre}-li`){
            e.innerText = `${persona.nombre}: $${persona.deuda}`;
        }
    })
    // Actualizar total
    total.innerText = `$${deudaTotal}`;
}

// Añadir un producto a la cuenta
botonAñadirProducto.addEventListener('click', () =>{
    const listadeCompradores = document.querySelectorAll('input[name="chckbox"]:checked');
    let descripcionProducto = descripcion.value;
    let precioProducto = parseInt(precio.value);
    let cantidadProducto = cantidad.value;
    listadeCompradores.forEach(e => {
            let persona = listaDePersonas.find(elemento => elemento.nombre == e.id);
            // actualizar deuda y productos consumidos
            persona.productos.push(new producto(descripcionProducto,precioProducto,cantidadProducto));
            deudaTotal += precioProducto * cantidadProducto;
            if (compartido.checked) {
                persona.deuda += ((precioProducto * cantidadProducto) / listadeCompradores.length);
            } else {
                persona.deuda += precioProducto * cantidadProducto;
            }
            // actualizar HTML
            actualizarPersona(persona);
        });
})

// Enviar resumen por whatsapp
const botonWhatsapp = document.getElementById('boton-enviar-whatsapp');
botonWhatsapp.addEventListener('click', () =>{
    let linkWhatsapp = "https://api.whatsapp.com/send/?text=%F0%9F%92%B5%20Tu%20cuenta%20se%20divide%20as%C3%AD%3A%0A";
    for (let persona of listaDePersonas){
    linkWhatsapp += `•%20${persona.nombre}:%20$${persona.deuda}%0A`;
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

// Comenzar de nuevo
const botonBorrar = document.getElementById('boton-borrar');
botonBorrar.onclick = () => {
    listadeComensales.innerHTML = "";
    listaDePersonas = "";
    total.innerText = "$0";
    comprador.innerHTML = "";
    total.style.visibility = "hidden";
    compartidoContainer.style.visibility = "hidden";
    cantidad.value = "";
    descripcion.value = "";
    precio.value = "";
}


