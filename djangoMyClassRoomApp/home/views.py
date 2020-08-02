from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from .serializers import HeadMasterSerializer, TeacherSerializer, StudentSerializer, StudentTeacherThroughSerializer

# Create your views here.
"""
Student: 
    Student List View
    Student Create View
    Student Edit View
    Student Delete View

Teacher: 
    Teacher List View
    Teacher Create View
    Teacher Edit View
    Teacher Delete View

Relations:
    (Use APIView)
    StudentTeacher Through List View 
    StudentTeacher Through Create View 
    StudentTeacher Through Edit View 
    StudentTeacher Through Delete View 
    
    Friends List View 
    Friends Create View 
    Friends Edit View 
    Friends Delete View 
"""


#################################################### Model Viewset ^^^ Above make Types of views required...
class HeadMasterViewSet(viewsets.ModelViewSet):
    queryset = HeadMaster.objects.all()
    serializer_class = HeadMasterSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class StudentTeacherThroughViewSet(viewsets.ModelViewSet):
    queryset = StudentTeacherThrough.objects.all()
    serializer_class = StudentTeacherThroughSerializer
    # permission_classes = [permissions.IsAuthenticated]