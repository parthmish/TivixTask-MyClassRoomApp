# Generated by Django 2.2 on 2020-07-25 22:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200726_0246'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='date_of_birth',
            new_name='birth_date',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='is_profile_approved',
        ),
    ]