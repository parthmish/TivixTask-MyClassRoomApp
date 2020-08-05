"""
    djangoMyClassRoomApp URL Configuration
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from home.urls import router as home_router
from accounts.urls import router as accounts_router
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.registry.extend(accounts_router.registry)
router.registry.extend(home_router.registry)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/home/', include('home.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    