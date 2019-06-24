from django.urls import path
from rest_framework.routers import DefaultRouter

from instagram.api import (
    CommentViewSet, LikeAPIView, PostViewSet, TagListCreateAPIView,
)


router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('like/<int:post_id>/', LikeAPIView.as_view()),
    path('tags/', TagListCreateAPIView.as_view()),
] + router.urls
