from django.urls import path

from Aplicaciones.app1.views import PrincipalView

app_name = "app1"

urlpatterns = [
    #Principal
    path("", PrincipalView.as_view(), name="home"),
]
