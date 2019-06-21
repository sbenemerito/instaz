from django.urls import path

from users.api import LoginView


urlpatterns = [
    path('login/', LoginView.as_view()),
]
