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
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def update(self, request, pk=None):
        profile = Profile.objects.get(pk=pk)
        # Here profile image is overwrite with old image. Not able to get data.
        request.data['profile_image'] = profile.profile_image
        serializer = ProfileSerializer(profile, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
