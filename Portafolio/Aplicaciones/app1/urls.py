from django.urls import path

from Aplicaciones.app1.views import PrincipalView, ProyectosListView

app_name = "app1"

urlpatterns = [
    #Principal
    path("", PrincipalView.as_view(), name="home"),
    path("proyectos/", ProyectosListView.as_view(), name="proyectos_list"),
]
