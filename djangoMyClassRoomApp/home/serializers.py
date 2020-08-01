from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from rest_framework import serializers
from accounts.models import User


class HeadMasterSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name='headmaster-detail', queryset=HeadMaster.objects.all())
    class Meta:
        model = HeadMaster
        fields = ['user']


class TeacherSerializer(serializers.ModelSerializer):
    # user = serializers.HyperlinkedRelatedField(view_name='teacher-detail', queryset=Teacher.objects.all())
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Teacher
        fields = ['pk', 'user', 'subject', 'student_obj']


class StudentSerializer(serializers.ModelSerializer):
    # pk = serializers.HyperlinkedRelatedField(view_name='student-detail', queryset=Student.objects.all())
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Student
        fields = ['pk', 'user', 'grade', 'section', 'roll_number']


class StudentTeacherThroughSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StudentTeacherThrough
        fields = ['student', 'teacher', 'is_starred', 'headmaster']