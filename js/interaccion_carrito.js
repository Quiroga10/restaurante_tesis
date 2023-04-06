const agregarAlCarritoBotones = document.querySelectorAll('.add-to-cart');
agregarAlCarritoBotones.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

const carrito = [];

function agregarAlCarrito(evento) {
    const boton = evento.target;
    const item = boton.parentElement;
    const producto = item.dataset.producto;
    const precio = parseFloat(item.dataset.precio);
    agregarItemAlCarrito(producto, precio);
    actualizarCarrito();
}

function agregarItemAlCarrito(producto, precio) {
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        if (item.producto === producto) {
            item.cantidad++;
            return;
        }
    }
    carrito.push({ producto, precio, cantidad: 1 });
}

function actualizarCarrito() {
    const carritoItems = document.querySelector('.cart-items');
    carritoItems.innerHTML = '';

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];

        const itemCarrito = document.createElement('li');
        itemCarrito.classList.add('cart-item');
        const itemCarritoContenido = `
            <span class="cart-item-title">${item.producto}</span>
            <span class="cart-item-price">$${item.precio.toFixed(2)}</span>
            <span class="cart-item-quantity">${item.cantidad}</span>
            <i class="fa fa-times-circle"></i>
        `;
        itemCarrito.innerHTML = itemCarritoContenido;
        carritoItems.appendChild(itemCarrito);

        total += item.precio * item.cantidad;

        const eliminarProducto = itemCarrito.querySelector('.fa-times-circle');
        eliminarProducto.addEventListener('click', () => {
            eliminarItemDelCarrito(i);
            actualizarCarrito();
        });
    }
    const totalCarrito = document.querySelector('.cart-total');
    totalCarrito.textContent = total.toFixed(2);

    const botonesEliminar = document.querySelectorAll('.fa-times-circle');
    if (carrito.length > 0) {
        botonesEliminar.forEach(boton => {
            boton.style.display = 'inline-block';
        });
    } else {
        botonesEliminar.forEach(boton => {
            boton.style.display = 'none';
        });
    }
}

function eliminarItemDelCarrito(index) {
    carrito.splice(index, 1);
}

