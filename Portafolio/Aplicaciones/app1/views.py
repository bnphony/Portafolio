from typing import Any, Dict

from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

# Create your views here.

class PrincipalView(TemplateView):
    template_name = "app1/inicio.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


    def post(self, request, *args, **kwargs):
        data: Dict[str, Any] = {}
        try:
            pass
        except Exception as e:
            data["error"] = str(e)
        return JsonResponse(data)
    
    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        context = super().get_context_data(**kwargs)
        return context