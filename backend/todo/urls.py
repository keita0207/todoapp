from rest_framework import routers
from .views import TodoViewset
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'todo', TodoViewset)

urlpatterns = [
    path('', include(router.urls)),
]