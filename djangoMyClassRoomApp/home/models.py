from django.db import models
from accounts.models import User

# Create your models here.
class HeadMaster(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    def __str__(self):
        return self.user.username

## Using OneToOneField instead of ForeignKey. Just to make it concept specific. Primary Key i.e PK of User will give model values directly.
class Teacher(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    subject = models.CharField(verbose_name="Subjects Tought", max_length=255) 
    student_obj = models.ManyToManyField('Student', verbose_name='Student Teaching', through='StudentTeacherThrough')

    def __str__(self):
        return self.user.username

## It's more like a through table.
class StudentTeacherThrough(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    is_starred = models.BooleanField(verbose_name='Is Student Extraordinary?', default=False)
    headmaster = models.ForeignKey(HeadMaster, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["student", "teacher", "headmaster"]

    def __str__(self):
        return  "Student: " + self.student.user.username + ' - ' + "Teacher: " + self.teacher.user.username

class Student(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)

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

    def nameFile(instance, filename):
        return '/'.join(['images', str(instance.name), filename])
