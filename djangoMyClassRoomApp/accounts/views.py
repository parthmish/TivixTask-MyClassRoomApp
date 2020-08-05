from django.contrib.auth.models import Group
from .models import User, Profile
from rest_framework import viewsets
from .serializers import UserSerializer, ProfileSerializer
from rest_framework import permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

# class ProfileViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows profiles to be viewed or edited.
#     """
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     # permission_classes = [permissions.IsAuthenticated]

class ProfileView(APIView):

    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        profile_obj = self.get_object(pk)
        serializer = ProfileSerializer(profile_obj)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print("Welcome")
        profile_obj = self.get_object(pk)
        print(profile_obj.profile_image, request.data.FILE)
        serializer = ProfileSerializer(profile_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        