from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from instagram.models import Post, Tag
from users.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of Tag instances.
    """

    description = serializers.CharField(
        max_length=50,
        validators=[UniqueValidator(queryset=Tag.objects.all())]
    )

    class Meta:
        model = Tag
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of Post instances.
    """

    tags = serializers.StringRelatedField(many=True)
    author = UserSerializer()

    class Meta:
        model = Post
        fields = '__all__'
