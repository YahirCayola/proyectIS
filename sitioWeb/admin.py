from django.contrib import admin
from .models import Usuario ,Categoria, subCategoria , Producto , Imagenes ,Departamento,Provincia,EstadoDelProducto,CarritoProducto

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    fields=["nombre","contraseña","correo","celular","foto","estadoUsuario"]
    list_display =["nombre","correo"] #lo que se va mostrar
admin.site.register(Usuario,UserAdmin)#forma para registrar 1


@admin.register(Categoria)#forma para registrar 2
class CategoriaAdmin(admin.ModelAdmin):#lo que se puede editar
    fields=["nombre"]
    list_display =["nombre"]

@admin.register(subCategoria)#forma para registrar 2
class subCategoriaAdmin(admin.ModelAdmin):#lo que se puede editar
    fields=["nombre","categoria"]
    list_display =["nombre","categoria"]

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    fields=["nombre","descripcion","precio","usuario","subcategoria","provincia","estado"]
    list_display =["nombre","precio","subcategoria"]

@admin.register(Imagenes)
class ProductImageAdmin(admin.ModelAdmin):
    fields=["ruta","producto"]
    list_display =["ruta","producto"]

@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    fields=["nombre"]
    list_display =["nombre"]

@admin.register(Provincia)
class ProvinciaAdmin(admin.ModelAdmin):
    fields=["nombre","departamento"]
    list_display =["nombre","departamento"]
    
@admin.register(EstadoDelProducto)
class EstadoProductoAdmin(admin.ModelAdmin):
    fields=["estado"]
    list_display =["estado"]

@admin.register(CarritoProducto)
class CarritoAdmin(admin.ModelAdmin):
    fields=["usuario","producto"]
    list_display=["usuario","producto"]