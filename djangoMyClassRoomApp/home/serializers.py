from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from rest_framework import serializers
from accounts.models import User


class HeadMasterSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = HeadMaster
        fields = ['user']


class TeacherSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Teacher
        fields = ['pk', 'user', 'subject']


class StudentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Student
        fields = ['pk', 'user', 'grade', 'section', 'roll_number']


class StudentTeacherThroughSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTeacherThrough
        fields = ['student', 'teacher', 'is_starred', 'headmaster']