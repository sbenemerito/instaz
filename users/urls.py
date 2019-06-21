from django.urls import path

from users.api import (
    LoginAPIView,
    SignupAPIView,
    UserRetrieveUpdateAPIView,
)


urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('signup/', SignupAPIView.as_view()),
    path('<str:username>/', UserRetrieveUpdateAPIView.as_view()),
]
