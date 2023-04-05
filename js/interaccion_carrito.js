const agregarAlCarritoBotones = document.querySelectorAll('.add-to-cart');
agregarAlCarritoBotones.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(evento) {
    const boton = evento.target;
    const item = boton.parentElement;
    const producto = item.dataset.producto;
    const precio = item.dataset.precio;
    agregarItemAlCarrito(producto, precio);
    actualizarCarrito();
}

function agregarItemAlCarrito(producto, precio) {
    const itemCarrito = document.createElement('li');
    itemCarrito.classList.add('cart-item');
    const itemCarritoContenido = `
        <span class="cart-item-title">${producto}</span>
        <span class="cart-item-price">$${precio}</span>
    `;
    itemCarrito.innerHTML = itemCarritoContenido;
    const carrito = document.querySelector('.cart-items');
    carrito.appendChild(itemCarrito);
}

function actualizarCarrito() {
    const carritoItems = document.querySelectorAll('.cart-item');
    const totalCarrito = document.querySelector('.cart-total');
    let total = 0;
    carritoItems.forEach(item => {
        const precioElemento = item.querySelector('.cart-item-price');
        const precio = Number(precioElemento.textContent.replace('$', ''));
        total = total + precio;
    });
    totalCarrito.textContent = total.toFixed(2);
}