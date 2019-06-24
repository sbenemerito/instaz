from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from instagram.models import (
    Comment, Like, Post, Tag,
)
from instagram.permissions import IsAuthorOrReadOnly
from instagram.serializers import (
    CommentSerializer, LikeSerializer, PostSerializer, TagSerializer,
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

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        obj, created = Like.objects.get_or_create(
            user=request.user,
            post=post,
        )

        # If not created, just toggle `is_active` field
        if not created:
            obj.is_active = not obj.is_active
            obj.save()

        liked_or_unliked = 'liked' if obj.is_active else 'unliked'

        return Response({
            'detail': 'Successfully {} post!'.format(liked_or_unliked)
        }, status=status.HTTP_200_OK)


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


class LikeAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        if not post_id:
            return Response({
                'detail': 'Post was not provided!'
            }, status=status.HTTP_400_BAD_REQUEST)

        post = get_object_or_404(Post, id=post_id)

        obj, created = Like.objects.get_or_create(
            user=request.user,
            post=post,
        )

        if created:
            return Response(LikeSerializer(instance=obj).data,
                            status=status.HTTP_201_CREATED)

        obj.is_active = not obj.is_active
        obj.save()

        return Response(LikeSerializer(instance=obj).data,
                        status=status.HTTP_200_OK)
