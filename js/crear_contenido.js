function pintarOrden() {
    const tbody = document.querySelector('table tbody');
    limpiarHTML(tbody)
    productosSeleccionados.forEach(producto => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdPrice = document.createElement('td');
        const tdQty = document.createElement('td');
        tdQty.classList.add("cantidadInput");
        const inputQty = document.createElement("input");
        inputQty.type = 'text';
        inputQty.classList.add('form-control', "cantidadInput");
        inputQty.value = producto.cantidadProducto;
        inputQty.disabled = true;
        tdQty.append(inputQty);
        tdName.textContent = producto.nombreProducto;
        tdPrice.textContent = producto.precioProducto;
        tr.append(tdName);
        tr.append(tdPrice);
        tr.append(tdQty);
        tbody.append(tr);
    });
    //generarOrden();
}

