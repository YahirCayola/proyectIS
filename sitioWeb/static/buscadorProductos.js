// Escuchar el evento "keypress" en el campo de búsqueda para ejecutar la función al presionar Enter
document.getElementById('inputBuscar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarProducto();
    }
});

function buscarProducto() {
    // Obtener el valor del input
    const searchInput = document.getElementById('inputBuscar').value.toLowerCase();
    
    // Obtener todos los productos (product-card)
    const products = document.getElementsByClassName('product-card');
    
    // Variable para verificar si se encontró algún producto
    let found = false;
    
    // Recorrer todos los productos y filtrar por el texto ingresado
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].getElementsByTagName('h3')[0].textContent.toLowerCase();
        
        // Mostrar u ocultar el producto según la coincidencia con el valor de búsqueda
        if (productName.indexOf(searchInput) > -1) {
            products[i].style.display = "";
            found = true;  // Se encontró al menos un producto
        } else {
            products[i].style.display = "none";
        }
    }
    
    // Mostrar el mensaje si no se encontró ningún producto
    const noResultMessage = document.getElementById('noResultMessage');
    if (!found) {
        noResultMessage.style.display = "block";
    } else {
        noResultMessage.style.display = "none";
    }
}