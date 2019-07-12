from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from rest_framework import serializers

from instaz.serializers import PostSerializer

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

        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        request = self.context.get('request')

        return {
            'username': user.username,
            'avatar': request.build_absolute_uri(user.avatar.url),
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
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'avatar', 'token']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)

    def get_avatar(self, obj):
        if 'request' in self.context:
            return self.context['request'].build_absolute_uri(obj.avatar.url)

        return None


class UserSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of User instances.
    """

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('groups', 'user_permissions', 'is_superuser', 'is_staff',
                   'first_name', 'last_name',)

    def update(self, instance, validated_data):
        """
        Performs an update on a User.
        """

        # Passwords should not be handled with `setattr`, unlike other fields.
        # We should use Django's set_password() method for encryption
        password = validated_data.pop('password', None)

        if password is not None:
            instance.set_password(password)

        # Set all other keys, except password, from `validated_data` to
        # the current `User` instance
        for (key, value) in validated_data.items():
            # For the keys remaining in `validated_data`, we will set them on
            # the current `User` instance one at a time.
            setattr(instance, key, value)

        instance.save()
        return instance

    def get_posts(self, obj):
        request = self.context.get('request')
        user_posts = obj.post_set.filter(is_active=True).order_by('-date_created')

        if user_posts.exists() and request is not None:
            return PostSerializer(user_posts, many=True, context={'request': request}).data

        return None
