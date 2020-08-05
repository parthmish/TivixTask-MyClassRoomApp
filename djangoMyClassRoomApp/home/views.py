from django.shortcuts import render
from rest_framework import viewsets
from .models import HeadMaster, Teacher, Student, StudentTeacherThrough
from .serializers import HeadMasterSerializer, TeacherSerializer, StudentSerializer, StudentTeacherThroughSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

# Create your views here.
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    
    def update(self, request, pk=None):
        teacher = Teacher.objects.get(pk=pk)
        serializer = TeacherSerializer(teacher, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def update(self, request, pk=None):
        student = Student.objects.get(pk=pk)
        serializer = StudentSerializer(student, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StudentClassView(APIView):
    def get(self, request, pk, format=None):
        request_student = Student.objects.get(pk=pk)
        class_students = Student.objects.filter(grade=request_student.grade, section=request_student.section)
        serializer = StudentSerializer(class_students, many=True)
        return Response(serializer.data)

class MyTeachersClassView(APIView):
    def get(self, request, pk, format=None):
        request_student = Student.objects.get(pk=pk)
        class_teachers = Teacher.objects.filter(student_obj=request_student)
        serializer = TeacherSerializer(class_teachers, many=True)
        return Response(serializer.data)

class SuggestedTeachersClassView(APIView):
    def get(self, request, pk, format=None):
        request_student = Student.objects.get(pk=pk)
        class_teachers_suggested = Teacher.objects.exclude(student_obj=request_student)            
        serializer = TeacherSerializer(class_teachers_suggested, many=True)
        return Response(serializer.data)

class StarredStudentsClassView(APIView):
    def get(self, request, slug, pk, format=None):
        if slug == "studentprofile":
            request_student = Student.objects.get(pk = pk)
            class_students = Student.objects.filter(grade=request_student.grade, section=request_student.section)
            class_starred = StudentTeacherThrough.objects.filter(is_starred=True, student__user__in=class_students).values('student')
            class_starred_students = Student.objects.filter(user__in=class_starred)
            serializer = StudentSerializer(class_starred_students, many=True)
            return Response(serializer.data)
        if slug == "teacherprofile":
            request_teacher = Teacher.objects.get(pk=pk)
            class_starred = StudentTeacherThrough.objects.filter(is_starred=True, teacher__user=request_teacher).values('student')
            class_starred_students = Student.objects.filter(user__in=class_starred)
            serializer = StudentSerializer(class_starred_students, many=True)
            return Response(serializer.data)
        if slug == "headmasterprofile":
            request_headmaster = HeadMaster.objects.get(pk=pk)
            class_starred = StudentTeacherThrough.objects.filter(is_starred=True, headmaster__user=request_headmaster).values('student')
            class_starred_students = Student.objects.filter(user__in=class_starred)
            serializer = StudentSerializer(class_starred_students, many=True)
            return Response(serializer.data)

            
class MyStudentsClassView(APIView):
    def get(self, request, pk, format=None):
        request_teacher = Teacher.objects.get(pk=pk)
        class_students = StudentTeacherThrough.objects.filter(teacher__user=request_teacher).values('student')
        class_students_data = Student.objects.filter(user__in=class_students)
        serializer = StudentSerializer(class_students_data, many=True)
        return Response(serializer.data)


def getStarJson(queryset):
    data_list = []
    group_by_students = queryset.values('student').annotate(stars=Count('student'))
    for each_group in group_by_students:
        temp_json_string = {'pk': each_group['student'], 'stars': each_group['stars']}
        data_list.append(temp_json_string)
    return data_list

class GetStarsClassView(APIView):
    def get(self, request, pk, format=None):
        request_student = Student.objects.get(pk=pk)
        class_students = Student.objects.filter(grade=request_student.grade, section=request_student.section)
        class_starred = StudentTeacherThrough.objects.filter(is_starred=True, student__user__in=class_students)
        data_list_json = getStarJson(class_starred)
        return Response(data_list_json)

class StudentStateWrtTeacherView(APIView):
    def get(self, request, *args, **kwargs):
        pk_request_student = kwargs.get('student')
        pk_request_teacher = kwargs.get('teacher')
        try:
            relation = StudentTeacherThrough.objects.get(teacher__pk=pk_request_teacher, student__pk=pk_request_student)
            action_json = {"studentTeacherRelationShip":True, "studentStarred":relation.is_starred}
        except ObjectDoesNotExist:
            relation = None
            action_json = {"studentTeacherRelationShip":False, "studentStarred":False}
        return Response(action_json)

    def put(self, request,  *args, **kwargs):
        pk_request_student = kwargs.get('student')
        pk_request_teacher = kwargs.get('teacher')
        data_json = request.data
        data_json_update = {'student': pk_request_student, 'teacher': pk_request_teacher, 'is_starred':  data_json['studentStarred'], 'headmaster':23}
        relation = StudentTeacherThrough.objects.get(teacher__pk=pk_request_teacher, student__pk=pk_request_student)
        serializer = StudentTeacherThroughSerializer(relation, data=data_json_update)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request,  *args, **kwargs):
        pk_request_student = kwargs.get('student')
        pk_request_teacher = kwargs.get('teacher')
        data_json = request.data
        data_json_update = {'student': pk_request_student, 'teacher': pk_request_teacher, 'is_starred':  data_json['studentStarred'], 'headmaster':23}
        serializer = StudentTeacherThroughSerializer(data=data_json_update)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,  *args, **kwargs):
        pk_request_student = kwargs.get('student')
        pk_request_teacher = kwargs.get('teacher')
        relation = StudentTeacherThrough.objects.get(teacher__pk=pk_request_teacher, student__pk=pk_request_student)
        relation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# class HeadMasterViewSet(viewsets.ModelViewSet):
#     queryset = HeadMaster.objects.all()
#     serializer_class = HeadMasterSerializer

# class StudentTeacherThroughViewSet(viewsets.ModelViewSet):
#     queryset = StudentTeacherThrough.objects.all()
#     serializer_class = StudentTeacherThroughSerializer