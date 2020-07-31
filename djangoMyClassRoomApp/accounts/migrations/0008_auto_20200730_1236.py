# Generated by Django 2.2 on 2020-07-30 07:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20200730_1033'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='firends_obj',
            new_name='friends_obj',
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]