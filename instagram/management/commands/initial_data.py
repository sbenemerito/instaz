from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from faker import Faker

from instagram.models import (
    Comment, Like, Post,
)

fake = Faker()
User = get_user_model()


class Command(BaseCommand):
    help = 'Creates initial data for the app, using Faker'

    def handle(self, *args, **options):
        # Create 5 users
        # Create 3 posts each
        # Each user should have at least 2 comments (random post)
        # Each user should like 5 random posts