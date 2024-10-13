// Obtener el modal
var modal = document.getElementById("loginModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("loginBtn"); // Utiliza el id que agregamos al botón

// Obtener el elemento <span> que cierra el modal
var span = document.getElementById("closeModal");

// Cuando el usuario hace clic en el botón, abrir el modal
if (btn) {  // Asegúrate de que el botón exista en la página
    btn.onclick = function() {
        modal.style.display = "block";
    }
}

// Cuando el usuario hace clic en <span> (x), cerrar el modal
if (span) {
    span.onclick = function() {
        modal.style.display = "none";  // Ocultar el modal de login
    }
}

// Cuando el usuario hace clic en cualquier parte fuera del modal, cerrarlo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Cerrar el modal cuando el formulario de login sea enviado exitosamente
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Si el login es exitoso (el servidor valida las credenciales), cerramos el modal
    modal.style.display = "none";
    // Aquí puedes agregar código para mostrar un mensaje o redirigir al usuario si el login es exitoso.
});