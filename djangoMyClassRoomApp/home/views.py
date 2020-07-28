from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from .serializers import HeadMasterSerializer, TeacherSerializer, StudentSerializer, StudentTeacherThroughSerializer

# Create your views here.
class HeadMasterViewSet(viewsets.ModelViewSet):
    queryset = HeadMaster.objects.all()
    serializer_class = HeadMasterSerializer
    permission_classes = [permissions.IsAuthenticated]

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class StudentTeacherThroughViewSet(viewsets.ModelViewSet):
    queryset = StudentTeacherThrough.objects.all()
    serializer_class = StudentTeacherThroughSerializer
    permission_classes = [permissions.IsAuthenticated]