from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView

from users.permissions import IsSelfOrReadOnly
from users.serializers import (
    LoginSerializer,
    SignupSerializer,
    UserSerializer,
)

User = get_user_model()


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class SignupAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsSelfOrReadOnly,)
    serializer_class = UserSerializer

    def get_object(self):
        # Get the specific User through the username URL kwarg
        username = self.kwargs.get('username', None)
        obj = get_object_or_404(User, username=username)
        self.check_object_permissions(self.request, obj)
        return obj
