from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from instaz.models import (
    Comment, Like, Post, Tag,
)


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


class CommentSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of Comment instances.
    """

    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        author = None
        if 'request' in self.context:
            author = self.context['request'].user

        # Use request.user as author
        validated_data.update({
            'author': author,
        })

        return Comment.objects.create(**validated_data)

    def get_author(self, obj):
        if obj.author:
            request = self.context.get('request')

            return {
                'username': obj.author.username,
                'avatar': request.build_absolute_uri(obj.author.avatar.url)
            }

        return None


class PostSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of Post instances.
    """

    tags = serializers.StringRelatedField(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    author = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        author = None
        if 'request' in self.context:
            author = self.context['request'].user

        # Use request.user as author
        validated_data.update({
            'author': author,
            'is_active': True,  # is_active becomes False for some reason,
                                # force as True (when creating)
        })

        return Post.objects.create(**validated_data)

    def get_likes(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        if 'request' in self.context:
            return obj.is_liked_by(self.context['request'].user)

        return False

    def get_author(self, obj):
        if obj.author:
            request = self.context.get('request')

            return {
                'username': obj.author.username,
                'avatar': request.build_absolute_uri(obj.author.avatar.url)
            }

        return None


class LikeSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of Like instances.
    """

    class Meta:
        model = Like
        fields = '__all__'
