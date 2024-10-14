// Módulo de validación y manejo de archivos
const validarArchivos = () => {
    const archivoInput = document.getElementById('archivo');
    const fileNameDisplay = document.getElementById('file-name');
    const previewContainer = document.getElementById('preview-container');
    
    if (!archivoInput) return false;

    const fileList = Array.from(archivoInput.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB en bytes
    const validFiles = [];
    const removedFiles = [];

    // Limpiar cualquier vista previa anterior
    previewContainer.innerHTML = "";

    // Filtrar archivos válidos y acumular los que se eliminarán
    fileList.forEach(file => {
        const isValidType = validTypes.includes(file.type);
        const isValidSize = file.size <= maxFileSize;

        if (!isValidType || !isValidSize) {
            removedFiles.push(file.name);
        } else {
            validFiles.push(file);

            // Crear una miniatura para cada imagen válida
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img); // Añadir la miniatura al contenedor
            };
            reader.readAsDataURL(file); // Leer el archivo como DataURL para mostrar la imagen
        }
    });
    
    // Mostrar alerta personalizada si hay archivos eliminados
    if (removedFiles.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Archivos eliminados',
            text: `Los siguientes archivos fueron eliminados porque no cumplen las especificaciones: ${removedFiles.join(', ')}`,
            footer: '<label> Archivos validos[.jpg, .jpeg] que no pesen mas de 2mb</>' // Puedes personalizar el footer o quitarlo
        });
    }
    // Mostrar nombres de archivos seleccionados en el elemento <span>
    if (validFiles.length > 0) {
        fileNameDisplay.textContent = `Archivos seleccionados: ${validFiles.map(file => file.name).join(', ')}`;
    } else {
        fileNameDisplay.textContent = "No se ha seleccionado archivo válido";
    }
    return validFiles.length > 0; // Retorna true si hay archivos válidos
};





// Habilitar o deshabilitar el botón de ofertar
const actualizarEstadoBotonOfertar = () => {
    const buttonOfertar = document.getElementById('button-ofertar');
    const provincia = document.getElementById('provincia').value;
    const urlMapa = document.getElementById('urlMapa').value;
    const material = document.getElementById('material').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value; // Nueva validación
    const departamento = document.getElementById('departamento').value; // Nueva validación
    const terminos = document.getElementById('terminos').checked;

    const camposCompletos = provincia && urlMapa && material && precio > 0 && descripcion && departamento && terminos;

    if (camposCompletos) {
        buttonOfertar.disabled = false;
        buttonOfertar.style.backgroundColor = '#014040'; // Verde oscuro
    } else {
        buttonOfertar.disabled = true;
        buttonOfertar.style.backgroundColor = '#4c9c8d'; // Verde claro (cuando está deshabilitado)
    }
};

// Módulo de validación del formulario y tardanza del envio del Form, tod para que se vea la alerta
const validarFormulario = (event) => {
    // Mostrar la alerta de éxito y retrasar el envío del formulario
    event.preventDefault(); // Prevenir el envío del formulario
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tu oferta fue publicada correctamente",
        showConfirmButton: false,
        timer: 1750 // 1.5 segundos
    });

    setTimeout(() => {
        event.target.submit(); // Enviar el formulario después del tiempo de la alerta
    }, 1750);
};

// Módulo de inicialización de eventos
const inicializarEventos = () => {
    //Añadir reporte de JS al apretar el boton Cancelar
    document.getElementById('button-cancelar').addEventListener('click', function() {
        Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Los datos ingresados NO se guardaran!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#014040",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "¡Oferta eliminada!",
            text: "Tu publicacion ha sido eliminado correctamente",
            icon: "success"
        }).then(() => {
            // Redireccionar a la página home.html
            window.location.href = '/';
        });   
        }
        });
    });       

    // Asociar la validación de archivos al cambio del input de archivos
    document.getElementById('archivo').addEventListener('change', validarArchivos);

    // Asociar la validación completa del formulario al submit
    document.getElementById('ofertaForm').addEventListener('submit', validarFormulario);

     // Habilitar y deshabilitar el botón de Ofertar según la validación
    document.querySelectorAll('#provincia, #urlMapa, #material, #precio, #descripcion, #departamento, #terminos')
    .forEach(input => input.addEventListener('input', actualizarEstadoBotonOfertar));

    // Asociar el cambio del departamento para actualizar las provincias
    document.getElementById('departamento').addEventListener('change', function() {
        const provinciaSelect = document.getElementById('provincia');
        provinciaSelect.innerHTML = '<option value="" disabled selected>Seleccionar Provincia</option>';

        const provincias = JSON.parse(this.options[this.selectedIndex].getAttribute('data-provincias'));

        provincias.forEach(function(provincia) {
            const option = document.createElement('option');
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });
    });   
};

// Inicializar eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarEventos);



