from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    """
    Serializes login requests, returns the basic information, and a new
    JWT token for the user being logged in.
    """

    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    # The client should'nt be able to send a token, and avatar along with a
    # login request. Making `token` and `avatar` read-only does that for us
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


class SignupSerializer(serializers.ModelSerializer):
    """
    Serializes registration requests and creates a new user.
    """

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)
    avatar = serializers.ImageField(use_url=True, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'avatar', 'token']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)
