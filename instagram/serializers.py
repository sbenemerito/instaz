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
    likes = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_likes(self, obj):
        return obj.likes

    def get_is_liked(self, obj):
        if 'request' in self.context:
            return obj.is_liked_by(self.context['request'].user)

        return False
