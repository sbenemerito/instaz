import requests
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError
from faker import Faker

from instaz.models import (
    Comment, Like, Post,
)

fake = Faker()
User = get_user_model()


def download_image():
    response = requests .get(fake.image_url(width=500, height=500))
    if response.status_code == requests.codes.ok:
        return response.content

    return None


def create_initial_posts(user):
    word_list = [
        'hello', 'world', 'japan', '#happy', '#nofilter',
        'happy', 'life', 'weather', '#selfie', '#abstract',
        'lorem', 'ipsum', 'yes', '#art', '#colors',
    ]

    for _ in range(3):
        post = Post(
            caption=fake.sentence(ext_word_list=word_list),
            author=user
        )

        downloaded_image = download_image()
        if downloaded_image:
            post.image.save('image.jpg', ContentFile(downloaded_image), save=True)


def create_user(create_posts=False):
    user = User(username=fake.user_name(), email=fake.email(), bio=fake.text())

    # all initial accounts will have the same password
    user.set_password('p4ssword1')
    user.save()

    if create_posts:
        create_initial_posts(user)

    return user


def interact_with_posts(user, posts):
    for post in posts:
        # Just a random way to create variance
        if post.id % user.id == 0:
            Like.objects.create(user=user, post=post)
            Comment.objects.create(
                message=fake.sentence(),
                post=post,
                author=user
            )


class Command(BaseCommand):
    help = 'Creates initial data for the app, using Faker'

    def handle(self, *args, **options):
        # Create 5 users, with each having 3 posts
        fake_users = [create_user(create_posts=True) for _ in range(5)]
        posts = Post.objects.all()

        for user in fake_users:
            interact_with_posts(user, posts)
