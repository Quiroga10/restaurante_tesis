let productosSeleccionados = [];
//obtener el contenedor padre de los productos
const containerPreview = document.querySelector('.carousel-row');
let productos;
let inicio = 0;
let numpages = 15;
const paginationButtons = document.querySelectorAll('.container_pages button');

paginationButtons[0].addEventListener('click', function() {
    inicio = 0;
    numpages=15;
    containerPreview.innerHTML = ''; //borramos el contenido anterior
    cargarProductos(inicio,numpages);
    console.log("cargarProductos");
});

paginationButtons[1].addEventListener('click', function() {
    const currentCarousel = document.querySelector('.carousel-row');
    //currentCarousel.style.transform = `translateX(-${currentCarousel.clientWidth}px)`;
    inicio = 15; //agregamos numpages al inicio
    containerPreview.innerHTML = ''; //borramos el contenido anterior
    numpages = 21;
    cargarProductos(inicio,numpages); //cargamos los productos con la nueva posición
});

function cargarProductos(init,numPage) {
    //realizar la solicitud GET al archivo JSON
    fetch('http://localhost:3100/api/productos')
    .then(response => response.json())
    .then(data => {
        productos = data.products.slice(init, numPage);
        productos.forEach(producto =>{
            const card = document.createElement('div');
            card.className = 'carousel-item';
            card.setAttribute('data-producto', producto.title);
            card.setAttribute('data-precio', producto.precio);

            const img = document.createElement('img');
            img.src = producto.url;
            img.alt = producto.title;
            card.appendChild(img);

            console.log(producto.url);

            const nombre_producto = document.createElement('h3');
            nombre_producto.className = 'item_title';
            nombre_producto.textContent = producto.title;
            card.appendChild(nombre_producto);

            const precio_producto = document.createElement('p');
            precio_producto.className = 'item_precio';
            precio_producto.textContent = "S/" + producto.precio;
            card.appendChild(precio_producto);

            const btn_carrito = document.createElement('button');
            btn_carrito.className = 'add-to-cart';
            btn_carrito.textContent = "Agregar al carro";
            card.appendChild(btn_carrito);

            containerPreview.appendChild(card);
        });
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
            let productoExistente = productosSeleccionados.find(
                (item) => item.producto === producto
            );

            if (productoExistente){
                productoExistente.cantidad++;
            }else{
                productosSeleccionados.push({ producto, precio, cantidad: 1});
            }
        }
        function actualizarCarrito() {
            const carritoItems = document.querySelector('.cart-items');
            carritoItems.innerHTML = '';

            let total = 0;
            for (let i = 0; i < productosSeleccionados.length; i++) {
                const item = productosSeleccionados[i];

                const itemCarrito = document.createElement('li');
                itemCarrito.classList.add('cart-item');
                const itemCarritoContenido = `
                    <span class="cart-item-title">${item.producto}</span>
                    <span class="cart-item-price">S/${item.precio.toFixed(2)}</span>
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
            if (productosSeleccionados.length > 0) {
                botonesEliminar.forEach(boton => {
                    boton.style.display = 'inline-block';
                });
            } else {
                botonesEliminar.forEach(boton => {
                    boton.style.display = 'none';
                });
            }
            localStorage.setItem('carrito',JSON.stringify(productosSeleccionados));
        }
        function eliminarItemDelCarrito(index) {
            productosSeleccionados.splice(index, 1);
            localStorage.setItem('carrito',JSON.stringify(productosSeleccionados));
        }
    });
}
cargarProductos(inicio,numpages);
const btnRealizarPedido = document.getElementById('realizar-pedido');
btnRealizarPedido.addEventListener('click', () => {
    // Obtener la información del carrito desde el almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    // Redirigir al usuario a la página "detalle_pedido.html" y pasar la información del carrito como parámetro en la URL
    window.location.href = `../detalle_pedido.html?carrito=${JSON.stringify(carrito)}`;
});

// Obtener la información del carrito desde la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const carritoString = urlParams.get('carrito');
const carrito = JSON.parse(carritoString);

// Mostrar la información del carrito en la página
const detallePedido = document.getElementById('detalle-pedido');
carrito.forEach(item => {
    const detallePedidoItem = document.createElement('div');
    detallePedidoItem.classList.add('detalle-pedido-item');
    const detallePedidoItemContenido = `
        <span class="detalle-pedido-item-title">${item.producto}</span>
        <span class="detalle-pedido-item-price">S/${item.precio.toFixed(2)}</span>
        <span class="detalle-pedido-item-quantity">${item.cantidad}</span>
    `;
    detallePedidoItem.innerHTML = detallePedidoItemContenido;
    detallePedido.appendChild(detallePedidoItem);
});


//filtrar por categoria

//usar map o filter
//un nuevo array con los productos filtrados
//LIMPIAR html del contenedor de productos
//crear un forEach y pintar