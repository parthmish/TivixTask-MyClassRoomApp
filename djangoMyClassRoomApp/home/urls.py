from django.urls import include, path
from rest_framework import routers
from home import views
from home.views import (
    StudentClassView,
    MyTeachersClassView,
    StarredStudentsClassView,
    SuggestedTeachersClassView,
    MyStudentsClassView,
    GetStarsClassView,
    StudentStateWrtTeacherView,
    )

router = routers.DefaultRouter()
router.register(r'headmasters', views.HeadMasterViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'throughtable', views.StudentTeacherThroughViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('classroom/<int:pk>', StudentClassView.as_view(), name='student-classroom'),
    path('myteachers/<int:pk>', MyTeachersClassView.as_view(), name='my-teachers'),
    path('starredstudents/<str:slug>/<int:pk>', StarredStudentsClassView.as_view(), name='starred-students'),
    path('suggestedteachers/<int:pk>', SuggestedTeachersClassView.as_view(), name='suggested-teachers'),
    path('my-students/<int:pk>', MyStudentsClassView.as_view(), name='my-students'),
    path('get-stars/<int:pk>', GetStarsClassView.as_view(), name='my-classmates-stars'),
    path('student-state-wrt-teacher/<int:student>/<int:teacher>/', StudentStateWrtTeacherView.as_view(), name='student-state-wrt-teacher'),
]