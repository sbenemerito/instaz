from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from instagram.models import Tag


class TagSerializer(serializers.ModelSerializer):
    """
    Handles serialization and deserialization of User instances.
    """

    description = serializers.CharField(
        max_length=50,
        validators=[UniqueValidator(queryset=Tag.objects.all())]
    )

    class Meta:
        model = Tag
        fields = '__all__'
