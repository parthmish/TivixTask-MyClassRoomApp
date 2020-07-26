from django.contrib import admin
from .models import HeadMaster, Teacher, Student, StudentTeacherThrough

class StudentTeacherThroughInline(admin.TabularInline):
    model = StudentTeacherThrough
    extra = 1

# Register your models here.
@admin.register(HeadMaster)
class HeadMasterAdmin(admin.ModelAdmin):
    list_disply = ('user',)
    inlines = [StudentTeacherThroughInline]
    class Meta:
        model = HeadMaster

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_disply = ('user', 'subject', 'student_obj')
    inlines = [StudentTeacherThroughInline]
    class Meta:
        model = Teacher
    
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_disply = ('user', 'grade', 'section')
    inlines = [StudentTeacherThroughInline]
    class Meta:
        model = Student

@admin.register(StudentTeacherThrough)
class StudentTeacherThroughAdmin(admin.ModelAdmin):
    list_disply = ('student', 'teacher', 'is_starred')
    