from django.urls import include, path
from rest_framework import routers
from accounts import views
# from accounts.views import ProfileView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.ProfileViewSet, basename='profiles')
urlpatterns = [
    path('', include(router.urls)),
]