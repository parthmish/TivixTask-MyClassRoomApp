# Generated by Django 2.2 on 2020-07-25 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='birth_date',
            new_name='date_of_birth',
        ),
        migrations.AddField(
            model_name='profile',
            name='is_profile_approved',
            field=models.BooleanField(default=False, verbose_name='Is Profile approved?'),
        ),
    ]
