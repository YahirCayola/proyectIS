# sitioWeb/urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import(
    login_view ,
    registroView ,
    baseView ,
    perfil_view ,
    logout_request,
    ofertarMView ,
    agregar_al_carrito,
    cargar_provincias_por_departamento,
) # Asegúrate de importar tu vista
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',baseView , name= 'base'),
    path('login/', login_view, name='login'),  # Define la URL para el login
    path('registro/',registroView,name='registro'),
    path('perfil/', perfil_view, name='perfil'),
    path('logout/',logout_request, name='logout'),#logout --es salirce o cerrar sesion
    path('ofertar/',ofertarMView,name = 'ofertar'),
    path('get_provincias/', cargar_provincias_por_departamento, name='get_provincias'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)