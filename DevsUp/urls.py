from django.contrib import admin
from django.urls import include,path

from sitioWeb.views import baseView, login_view ,registroView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('sitioWeb.urls')),
]