from django.db import models
from accounts.models import User

# Create your models here.

class HeadMaster(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    classroom = models.ForeignKey('StudentTeacherThrough', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

## Using OneToOneField instead of ForeignKey. Just to make it concept specific.
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    subject = models.CharField(verbose_name="Subjects Tought", max_length=255) 
    student_obj = models.ManyToManyField('Student', verbose_name='Student Teaching', through='StudentTeacherThrough')

    def __str__(self):
        return self.user.username

class StudentTeacherThrough(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    is_starred = models.BooleanField(verbose_name='Is Student Extraordinary?', default=False, blank=True)

    def __str__(self):
        return self.is_starred

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    grade_opt = (
        ('1st grade', '1st grade'),
        ('2nd grade', '2nd grade'),
        ('3rd grade', '3rd grade'),
        ('4th grade', '4th grade'),
        ('5th grade', '5th grade'),
        ('6th grade', '6th grade'),
        ('7th grade', '7th grade'),
        ('8th grade', '8th grade'),
        ('9th grade', '9th grade'),
        ('9th grade', '9th grade'),
        ('10th grade', '10th grade'),
    )
    section_opt = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('E', 'E'),
    )
    grade = models.CharField(verbose_name='Grade/Class', choices=grade_opt , max_length=10, blank=True)
    section = models.CharField(verbose_name='Section', choices=section_opt, max_length=1, blank=True)
    roll_number = models.IntegerField(verbose_name='Roll Number of Student', blank=True, null=True)
    teacher_obj = models.ManyToManyField(Teacher, verbose_name='My Teachers', through=StudentTeacherThrough)

    def __str__(self):
        return self.user.username
