from django.urls import path

from instagram.api import TagListCreateAPIView


urlpatterns = [
    path('tags/', TagListCreateAPIView.as_view()),
]
