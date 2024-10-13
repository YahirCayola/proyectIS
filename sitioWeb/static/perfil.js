// JavaScript para abrir la ventana de selección de archivos
document.getElementById('editar-imagen').addEventListener('click', function() {
    document.getElementById('imagenPerfil').click(); // Simula el clic en el input de archivo
    
});

// Opcional: Mostrar una vista previa de la imagen seleccionada
document.getElementById('imagenPerfil').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        const reader = new FileReader(); // Crea una única instancia de FileReader
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            const previewed = document.getElementById('previewed');

            if (preview && previewed) {
                preview.src = e.target.result; // Asigna el resultado a la primera imagen
                previewed.src = e.target.result; // Asigna el resultado a la segunda imagen
                
                // Asegúrate de que las imágenes sean visibles
                preview.style.display = 'block';
                previewed.style.display = 'block';
            }
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        alert("Imagen seleccionada. ¡No te olvides guardar los cambios!");
        const saveButton = document.querySelector('.save-imagen');
        saveButton.style.display = 'flex';  // Muestra el botón como flexbox para centrar el texto
        saveButton.style.justifyContent = 'center';  // Centra el texto horizontalmente
        saveButton.style.alignItems = 'center';  // Centra el texto verticalmentee
        
    }  
});

document.getElementById('editar-datos').addEventListener('click', function() {
     // Habilitar los inputs para edición
     document.getElementById('name').removeAttribute('readonly');
     document.getElementById('email').removeAttribute('readonly');
     document.getElementById('celular').removeAttribute('readonly');
  // Validar nombre: solo letras y espacios
  document.getElementById('name').addEventListener('blur', function() {
    const nombre = this.value;
    const regexNombre = /^[A-Za-z\s]+$/; // Solo permite letras y espacios
    if (!regexNombre.test(nombre)) {
        alert('El nombre solo puede contener letras y espacios.');
        this.value = nombre.slice(0, -1); // Elimina el último carácter
    }
});

  document.getElementById('celular').addEventListener('blur', function() {
    const celular = this.value;
    const regexCelular = /^[0-9]{8}$/; // Exactamente 8 dígitos

    // Validar si el número tiene exactamente 8 dígitos
    if (!regexCelular.test(celular)) {
        alert('El número de celular debe tener exactamente 8 dígitos.');
        this.value = ''; // Limpia el input si no es válido
    }
});

  document.getElementById('email').addEventListener('blur', function() {
    const correo = this.value;
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Solo permite correos que terminen en @gmail.com
    if (!regexCorreo.test(correo)) {
        alert('El correo debe ser una dirección válida de @gmail.com.');
        this.value = ''; // Limpia el input si no es válido
    }
});
const saveButton = document.querySelector('.save');
        saveButton.style.display = 'flex';  // Muestra el botón como flexbox para centrar el texto
        saveButton.style.justifyContent = 'center';  // Centra el texto horizontalmente
        saveButton.style.alignItems = 'center';  // Centra el texto verticalmentee
        
const cancelarButton = document.querySelector('.cancelar');
        cancelarButton.style.display = 'flex';  // Muestra el botón como flexbox para centrar el texto
        cancelarButton.style.justifyContent = 'center';  // Centra el texto horizontalmente
        cancelarButton.style.alignItems = 'center';  // Centra el texto verticalmentee
});