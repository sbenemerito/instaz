from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    avatar = serializers.ImageField(use_url=True, read_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError(
                'A username is required to login'
            )

        if not password:
            raise serializers.ValidationError(
                'A password is required to login'
            )

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError(
                'No user with the given credentials was found'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'User has been deactivated'
            )

        return {
            'username': user.username,
            'avatar': user.avatar,
            'token': user.token,
        }
