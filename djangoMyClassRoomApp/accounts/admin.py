from django.contrib import admin
from .models import User, Profile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm


# Register your models here.
class UserAdminChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm

    list_display = BaseUserAdmin.list_display + ('is_teacher','is_student', 'is_headmaster')
    list_filter = BaseUserAdmin.list_filter + ('is_teacher','is_student', 'is_headmaster')

    fieldsets = BaseUserAdmin.fieldsets +  (
            ('Authorization', {'fields': ('is_teacher','is_student', 'is_headmaster')}),
        )

admin.site.register(User, UserAdmin)


@admin.register(Profile)
class ProfielAdmin(admin.ModelAdmin):
    list_display=('name', 'gender', 'birth_date')
    search_fields = ('name',)
    list_filter = ( 'gender',)
    readonly_fields = ['user',]

    def name(self, obj):
        name = obj.user.username
        return name

admin.site.site_header = "MyClassRoomApp Administration"
