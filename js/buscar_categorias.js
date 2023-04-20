function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.carousel-row > .producto');
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        if (producto.dataset.category === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    }
}