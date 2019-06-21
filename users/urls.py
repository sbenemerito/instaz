from django.urls import include, path

from users.api import (
    LoginAPIView,
    SignupAPIView,
    UserRetrieveUpdateAPIView,
)


auth_urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('signup/', SignupAPIView.as_view()),
]

urlpatterns = [
    path('auth/', include(auth_urlpatterns)),
    path('<str:username>/', UserRetrieveUpdateAPIView.as_view()),
]
