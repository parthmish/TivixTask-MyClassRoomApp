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

class FriendThrough(models.Model):
    ## when saving through table: user should be what's comming from profile: that user is the currrent user....and friend user will be the user selected...
    user = models.ForeignKey("Profile", on_delete=models.CASCADE)
    friend_user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(verbose_name='Is Request Confirmed?', default=False)
    
    class Meta:
        unique_together = ["user", "friend_user"]

    def __str__(self):
        return "Added by: " + str(self.user) + " - " + "Added :" + self.friend_user.username

class Profile(models.Model):
    gender_opt = (
        ('male', 'male'),
        ('female', 'female'),
        ('others', 'others'),
    )
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

    user =  models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    birth_date = models.DateField(verbose_name='Date of Birth', null=True, blank=True)
    gender = models.CharField(verbose_name='Gender', choices=gender_opt, null=True, blank=True, max_length=10)
    phone_number = models.CharField(verbose_name='Phone Number', validators=[phone_regex], null=True, blank=True, max_length=15)
    profile_image = models.ImageField(verbose_name='Profile Photo', default='default.jpg', upload_to='profile_image')
    friends_obj = models.ManyToManyField(User, related_name="friends_obj", blank=True, through=FriendThrough)
    
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
