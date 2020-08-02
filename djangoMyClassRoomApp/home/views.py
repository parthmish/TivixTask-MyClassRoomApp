from django.shortcuts import render
from rest_framework import viewsets
from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from .serializers import HeadMasterSerializer, TeacherSerializer, StudentSerializer, StudentTeacherThroughSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404

# Create your views here.
# User for profile details #myprofileview.jsx
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

##myclasslistview.jsx same class students
class StudentClassView(APIView):
    def get(self, request, pk, format=None):
            request_student = Student.objects.get(pk=pk)
            class_students = Student.objects.filter(grade=request_student.grade, section=request_student.section).exclude(pk=pk)
            serializer = StudentSerializer(class_students, many=True)
            return Response(serializer.data)


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

class StudentTeacherThroughViewSet(viewsets.ModelViewSet):
    queryset = StudentTeacherThrough.objects.all()
    serializer_class = StudentTeacherThroughSerializer