
    function toggleCart() {
        const cartPopup = document.getElementById('cartPopup');
        cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
    }

    // Cerrar el carrito al hacer clic fuera de él
    window.onclick = function (event) {
        const cartPopup = document.getElementById('cartPopup');
        if (event.target !== cartPopup && !cartPopup.contains(event.target) && !event.target.classList.contains('nav-link')) {
            cartPopup.style.display = 'none';
        }
    };