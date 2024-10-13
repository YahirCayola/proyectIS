// JavaScript para abrir la ventana de selección de archivos
document.getElementById('editar-imagen').addEventListener('click', function() {
    document.getElementById('imagenPerfil').click(); // Simula el clic en el input de archivo
});

// Opcional: Mostrar una vista previa de la imagen seleccionada
document.getElementById('imagenPerfil').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        const reader = new FileReader(); // Crea un nuevo objeto FileReader
        reader.onload = function(e) {
            const preview = document.getElementById('preview'); // Encuentra el elemento de vista previa
            preview.src = e.target.result; // Asigna el resultado a la imagen de vista previa
            preview.style.display = 'block'; // Muestra la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});