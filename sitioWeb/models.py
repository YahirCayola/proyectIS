from django.db import models
from django.utils import timezone
# Create your models here.

# Modelo Usuario
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True,null= False ,blank=False)  # Identificador único del usuario
    nombre = models.CharField(max_length=100,null= False ,blank=False)  # Nombre del usuario
    contraseña = models.CharField(max_length=100,null= False ,blank=False,default='00000000')  # Contraseña del usuario
    correo = models.EmailField(unique=True,null= False ,blank=False,)  # Correo único
    celular = models.CharField(max_length=15, null=True, blank=True)  # Campo nuevo para celular
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)  # Foto de perfil
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación
    estadoUsuario = models.BooleanField(default=True)  # Estado del usuario (habilitado o no)

    class Meta:
        db_table = "Usuarios"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.nombre

# Modelo Categoria
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        db_table = "Categorias"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.nombre

class subCategoria(models.Model):
    nombre = models.CharField(max_length=100,null= False ,blank=False)  # Nombre de la categoría (Madera, Ladrillo, etc.)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="subcategorias",null=False)

    class Meta:
        db_table = "subCategorias"
        verbose_name = "subCategoria"
        verbose_name_plural = "subCategorias"

    def __str__(self):
        return self.nombre
    


    
class Departamento(models.Model):
    nombre = models.CharField(max_length=100,null= False ,blank=False)  # Nombre del departamento

    class Meta:
        db_table = "Departamentos"
        verbose_name = "Departamento"
        verbose_name_plural = "Departamentos"

    def __str__(self):
        return self.nombre

class Provincia(models.Model):
    nombre = models.CharField(max_length=100)  # Nombre de la provincia
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='provincias')  # Relación con el departamento

    class Meta:
        db_table = "Provincias"
        verbose_name = "Provincia"
        verbose_name_plural = "Provincias"

    def __str__(self):
        return self.nombre

# Modelo EstadoDelProducto
class EstadoDelProducto(models.Model):
    estado = models.CharField(max_length=100)  # Estado del producto (nuevo, viejo, usado, seminuevo)

    class Meta:
        db_table = "EstadosDelProducto"
        verbose_name = "Estado del Producto"
        verbose_name_plural = "Estados del Producto"

    def __str__(self):
        return self.estado

# Modelo Producto
class Producto(models.Model):
    nombre = models.CharField(max_length=100 ,null= False ,blank=False)  # Nombre del producto
    descripcion = models.TextField(blank=True, null=True)  # Descripción del producto
    precio = models.DecimalField(max_digits=10, decimal_places=2,null= True ,blank=True)  # Precio del producto
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE,null= True ,blank=True)  # Relación con el usuario
    subcategoria = models.ForeignKey(subCategoria, on_delete=models.CASCADE,null= True ,blank=True)  # Relación con la categoría
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, null=True, blank=True)  # Relación con la provincia
    estado = models.ForeignKey(EstadoDelProducto, on_delete=models.CASCADE, null=True, blank=True)  # Relación con el estado del producto
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación del producto
    estado_producto = models.BooleanField(default=True,null=True, blank=True)  # Estado del producto (activo o inactivo)

    class Meta:
        db_table = "Productos"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.nombre

# Modelo Imagenes
class Imagenes(models.Model):
    ruta = models.ImageField(upload_to='productos/')  # Ruta o archivo de la imagen
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes',null= True ,blank=True)  # Relación con el producto

    class Meta:
        db_table = "ProductImages"
        verbose_name = "Imagen del Producto"
        verbose_name_plural = "Imágenes del Producto"

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"
    
    
# Modelo CarritoProducto (relaciona usuarios y productos)
class CarritoProducto(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='productos_en_carrito')  # Relación con el usuario
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='usuarios_en_carrito')  # Relación con el producto  

    class Meta:
        db_table = "Carrito_Productos"
        verbose_name = "Producto en Carrito"
        verbose_name_plural = "Productos en Carrito"

    def __str__(self):
        return f"{self.producto.nombre} en el carrito de {self.usuario.nombre}"
