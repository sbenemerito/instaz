from django.contrib import admin
from django.apps import apps

app = apps.get_app_config('instagram')


for model_name, model in app.models.items():
    if hasattr(model._meta, 'verbose_name') and 'relationship' not in model._meta.verbose_name:
        admin.site.register(model)
