from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, Profile
from home.models import Student, Teacher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher', 'is_headmaster')

class CustomRegisterSerializer(RegisterSerializer):

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_student', 'is_teacher')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_student': self.validated_data.get('is_student', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        if (request.data['is_student'] == True) :  
            user.is_student = True
        else:
            user.is_teacher = True
        user.save()
        adapter.save_user(request, user, self)
        if (request.data['is_student'] == True) :    
            create_student = Student(user= user)
            create_student.save()
        else:
            create_teacher = Teacher(user= user)
            create_teacher.save()
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        is_headmaster = serializer_data.get('is_headmaster')
        return {
            'is_student': is_student,
            'is_teacher': is_teacher,
            'is_headmaster': is_headmaster,
        }

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    pk = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Profile
        fields = ['pk','user', 'birth_date', 'gender', 'phone_number', 'profile_image']
        read_only_fields = ['pk']
        
    def update(self, instance, validated_data):
        print("Im here")
        instance.user = validated_data.get('user', instance.user)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance