from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator

class User(AbstractUser):
    is_student = models.BooleanField(verbose_name='Is Student?', default=False)
    is_teacher = models.BooleanField(verbose_name='Is Teacher?', default=False)
    is_headmaster = models.BooleanField(verbose_name='Is Head-Master?', default=False)
    
    def __str__(self):
        return self.username

class Profile(models.Model):
    gender_opt = (
        ('male', 'male'),
        ('female', 'female'),
        ('others', 'others'),
    )
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(verbose_name='Date of Birth', null=True, blank=True)
    gender = models.CharField(verbose_name='Gender', choices=gender_op`t, null=True, blank=True, max_length=10)
    phone_number = models.CharField(verbose_name='Phone Number', validators=[phone_regex], null=True, blank=True, max_length=15)
    profile_image = models.ImageField(verbose_name='Profile Photo', default='default.jpg', upload_to='profile_image')
    
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()