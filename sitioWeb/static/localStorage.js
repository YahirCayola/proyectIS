// Verificar si el usuario está registrado
const userId = "{{ request.session.user_id|default:'' }}";

// Inicializar carrito desde localStorage (para usuarios no registrados)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para agregar productos al carrito
function addToCart(productId, productName, productPrice) {
    if (userId) {
        // Si el usuario está registrado, hacer una solicitud AJAX para guardar en la base de datos
        saveProductToDatabase(productId);
    } else {
        // Si el usuario no está registrado, agregar a localStorage
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// Función para renderizar los productos en la ventana del carrito
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cartCount');

    cartItemsContainer.innerHTML = ''; // Limpiar el carrito anterior
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <li class="cart-item">
                <span>${item.name} - ${item.price.toFixed(2)} bs x ${item.quantity} = ${itemTotal.toFixed(2)} bs</span>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            </li>
        `;
    });

    cartTotalElement.textContent = total.toFixed(2) + ' bs';
    cartCountElement.textContent = cart.length;
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// Función para guardar el producto en la base de datos (AJAX)
function saveProductToDatabase(productId) {
    fetch('/agregar-al-carrito/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}'
        },
        body: JSON.stringify({ producto_id: productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            // Renderizar los productos desde la base de datos o actualizar la interfaz
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Cargar los productos del carrito al abrir la página
document.addEventListener('DOMContentLoaded', renderCartItems);