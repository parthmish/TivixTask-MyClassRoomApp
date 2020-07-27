from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from rest_framework import serializers
from accounts.models import User


class HeadMasterSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='headmaster-detail', queryset=HeadMaster.objects.all())
    class Meta:
        model = HeadMaster
        fields = ['user']


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='teacher-detail', queryset=Teacher.objects.all())
    class Meta:
        model = Teacher
        fields = ['user', 'subject', 'student_obj']


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='student-detail', queryset=Student.objects.all())
    class Meta:
        model = Student
        fields = ['user', 'grade', 'section', 'roll_number', 'teacher_obj']


class StudentTeacherThroughSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StudentTeacherThrough
        fields = ['student', 'teacher', 'is_starred', 'headmaster']