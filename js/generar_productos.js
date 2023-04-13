//obtener el contenedor padre de los productos
const containerPreview = document.querySelector('.carousel-row');
let data;

//realizar la solicitud GET al archivo JSON
fetch('../json/productos.json')
    .then(response => response.json())
    .then(data => {
        data = data.productos;

        data.forEach(producto =>{
            const card = document.createElement('div');
            card.className = 'carousel-item';

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            card.appendChild(img);

            const nombre_producto = document.createElement('h3');
            nombre_producto.className = 'item_title';
            nombre_producto.textContent = producto.nombre;
            card.appendChild(nombre_producto);

            const precio_producto = document.createElement('p');
            precio_producto.className = 'item_precio';
            precio_producto.textContent = producto.precio;
            card.appendChild(precio_producto);

            const btn_carrito = document.createElement('button');
            btn_carrito.className = 'add-to-cart';
            btn_carrito.textContent = "Agregar al carrito";
            card.appendChild(btn_carrito);

            containerPreview.appendChild(card);
        });
    });