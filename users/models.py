from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    bio = models.CharField(max_length=200, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
