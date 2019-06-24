from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet

from instagram.models import (
    Comment, Post, Tag,
)
from instagram.permissions import IsAuthorOrReadOnly
from instagram.serializers import (
    CommentSerializer, PostSerializer, TagSerializer,
)


class TagListCreateAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PostViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly,)
    queryset = Post.objects.filter(is_active=True)
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = self.queryset

        hashtag = self.request.query_params.get('hashtag', None)
        if hashtag:
            pattern = r'(?:\s|^)#[({0})\-\.\_]+(?:\s|$)'.format(hashtag)
            queryset = queryset.filter(caption__iregex=pattern)

        return queryset


class CommentViewSet(ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = self.queryset

        post = self.request.query_params.get('post', None)
        if post:
            queryset = queryset.filter(post=post)

        return queryset
