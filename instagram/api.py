from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView
from rest_framework.viewsets import ModelViewSet

from instagram.models import Post, Tag
from instagram.permissions import IsAuthorOrReadOnly
from instagram.serializers import PostSerializer, TagSerializer


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
