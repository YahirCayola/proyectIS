from django.shortcuts import render, redirect, get_object_or_404
from django.urls import path
from django.contrib import admin
from .models import Usuario , Producto ,Categoria,CarritoProducto , Departamento,Provincia,subCategoria,EstadoDelProducto,Imagenes
from django.http import HttpResponse ,JsonResponse
from django.contrib.auth import authenticate, login ,logout , authenticate
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def baseView(request):
    '''Esto es la pagina principal'''
        
    user_id = request.session.get('user_id')
    user = None
    if user_id:
        user = Usuario.objects.get(idUsuario=user_id)
    productos = Producto.objects.all() 
    categorias = Categoria.objects.prefetch_related('subcategorias').all()  # Obtiene todas las categorías y sus subcategorías   
    return render(request, "base.html",{'user': user, 'productos': productos, 'categorias': categorias})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Autenticar usuario
        user = Usuario.objects.filter(nombre=username, contraseña=password).first()

        if user:
            # Guardar usuario en la sesión
            request.session['user_id'] = user.idUsuario
            request.session['username'] = user.nombre  # Guardar el nombre del usuario en la sesión
            messages.success(request, '¡Bienvenido, {}! Has iniciado sesión correctamente.'.format(user.nombre))
            return redirect('base')  # Redirige a la página principal
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
            return redirect('base')  # Redirige a la página principal
    
    return render(request, 'base.html')

def registroView(request):
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.POST.get('username')
        correo = request.POST.get('email')
        contraseña = request.POST.get('password')
        confirmar_contraseña = request.POST.get('confirmPassword')

        # Validación básica
        if contraseña != confirmar_contraseña:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('registro')

        if Usuario.objects.filter(correo=correo).exists():
            messages.error(request, 'El correo electrónico ya está registrado.')
            return redirect('registro')

        # Crear y guardar el usuario en la base de datos
        usuario = Usuario(nombre=nombre, correo=correo, contraseña=contraseña)
        try:
            usuario.save()
            messages.success(request, 'Usuario registrado exitosamente.')
            return redirect('base')  # Redirige al login después del registro
        except ValidationError as e:
            messages.error(request, 'Ocurrió un error al guardar el usuario.')
            return redirect('registro')

    return render(request, 'registro.html')

def perfil_view(request):
    user_id = request.session.get('user_id')
    
    if not user_id:
        return redirect('login')  # Redirigir al login si no está autenticado
    
    user = Usuario.objects.get(idUsuario=user_id)

    if request.method == 'POST':
        # Si hay un archivo de imagen en la solicitud
        if 'imagenPerfil' in request.FILES:
            user.foto = request.FILES['imagenPerfil']  # Asigna la nueva imagen
        
        # Actualizar el nombre y el correo electrónico
        user.nombre = request.POST.get('nombre', user.nombre)  # Obtiene el nuevo nombre, o mantiene el antiguo
        user.correo = request.POST.get('correo', user.correo)  # Actualiza el correo electrónico

        nueva_contraseña = request.POST.get('contraseña')
        if nueva_contraseña:  # Si se proporcionó una nueva contraseña
            user.contraseña = nueva_contraseña  # Asigna la nueva contraseña

        nuevo_celular = request.POST.get('celular')
        if nuevo_celular:  # Si se proporcionó una nueva contraseña
            user.celular = nuevo_celular  # Asigna la nueva contraseña
            
        user.save()  # Guarda los cambios en la base de datos

    return render(request, 'perfil.html', {'user': user})

def logout_request(request):
    logout(request)
    messages.info(request, "Saliste exitosamente")
    return redirect("base")

# Solo temporal, asegúrate de corregir la gestión del token CSRF.
@require_POST
def agregar_al_carrito(request):
    try:
        # Obtener los datos del cuerpo de la solicitud
        data = json.loads(request.body)
        producto_id = data.get('producto_id')

        # Obtener el usuario en sesión
        user_id = request.session.get('user_id')
        if not user_id:
            return JsonResponse({'success': False, 'message': 'Producto agregado al carrito'}, status=401)

        user = Usuario.objects.get(idUsuario=user_id)
        producto = get_object_or_404(Producto, id=producto_id)

        # Agregar producto al carrito
        carrito_producto, created = CarritoProducto.objects.get_or_create(usuario=user, producto=producto)

        if created:
            message = 'Producto agregado al carrito'
        else:
            message = 'El producto ya está en el carrito'

        return JsonResponse({'success': True, 'message': message})

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Datos inválidos'}, status=400)
    except Producto.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Producto no encontrado'}, status=404)
    except Usuario.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Usuario no encontrado'}, status=404)
    
# Vista para obtener provincias según el departamento seleccionado
def cargar_provincias_por_departamento(request):
    departamento_id = request.GET.get('departamento_id')
    if departamento_id:
        provincias = Provincia.objects.filter(departamento_id=departamento_id).values('id', 'nombre')
        return JsonResponse({'provincias': list(provincias)}, status=200)
    return JsonResponse({'error': 'No se encontraron provincias'}, status=404)

#Esta funcion deberia manejar el formulario que esta en el archivo ofertar.html, En si ESTO IGUAL ES OTRO FORMULARIO, PERO ESTE DEBERIA GUARDAR LOS DATOS EN MI 
from django.shortcuts import get_object_or_404

def ofertarMView(request):
    # Obtener el usuario desde la sesión
    user_id = request.session.get('user_id')

    # Si no hay usuario en sesión, redirigir al login
    if not user_id:
        return redirect('login')

    # Obtener el usuario o lanzar un 404 si no existe
    user = get_object_or_404(Usuario, idUsuario=user_id)

    if request.method == 'POST':
        # Obtener los datos del formulario
        titulo = request.POST.get('titulo')
        provincia = 'Yacuma'
        direccion = request.POST.get('urlMapa')
        material = request.POST.get('material')
        precio = request.POST.get('precio')
        estados = request.POST.get('estado')
        descripcion = request.POST.get('descripcion')

        print(f"Material recibido: {material}")
        print(f"provincia: {provincia}")
        print(f"estado: {estados}")
        # Recuperar las instancias necesarias
        subcategoria_obj = subCategoria.objects.get(nombre=material)
        estado_obj = EstadoDelProducto.objects.get(estado=estados)
        provincia_obj = Provincia.objects.get(nombre=provincia)

        # Crear el nuevo producto
        producto = Producto(
            nombre=titulo,
            provincia=provincia_obj,
            subcategoria=subcategoria_obj,
            precio=precio,
            descripcion=descripcion,
            estado=estado_obj,
            usuario=user  # Relacionar el producto con el usuario actual
        )

        # Guardar el producto
        producto.save()

        # Guardar las imágenes subidas
        for archivo in request.FILES.getlist('archivo'):
            imagen = Imagenes(ruta=archivo, producto=producto)
            imagen.save()

        messages.success(request, '¡Oferta creada exitosamente!')
        return redirect('base')

    # Si la solicitud es GET, renderizar el formulario con el usuario
    return render(request, 'ofertar.html', {'user': user})
