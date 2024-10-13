document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Cerrar todas las subcategorías y remover clases activas
        document.querySelectorAll('.subcategory-list').forEach(list => {
            list.style.display = 'none';
        });
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Abrir solo la subcategoría de la categoría actual y marcarla como activa
        const subcategoryList = this.nextElementSibling;
        if (subcategoryList.style.display === 'block') {
            subcategoryList.style.display = 'none';
        } else {
            subcategoryList.style.display = 'block';
            this.classList.add('active');
        }
    });
});
