from django.urls import include, path
from rest_framework import routers
from home import views

router = routers.DefaultRouter()
router.register(r'headmasters', views.HeadMasterViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'throughtable', views.StudentTeacherThroughViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]