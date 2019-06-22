from django.urls import path
from rest_framework.routers import DefaultRouter

from instagram.api import PostViewSet, TagListCreateAPIView


router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('tags/', TagListCreateAPIView.as_view()),
] + router.urls
