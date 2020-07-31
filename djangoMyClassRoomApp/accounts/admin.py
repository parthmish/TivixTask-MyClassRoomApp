from django.contrib import admin
from .models import User, Profile, FriendThrough
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


class FriendThroughInline(admin.TabularInline):
    model = FriendThrough
    extra = 1

    

@admin.register(FriendThrough)
class FriendThroughAdmin(admin.ModelAdmin):
    list_disply = ('user', 'friend_user', 'is_confirmed')
    

@admin.register(Profile)
class ProfielAdmin(admin.ModelAdmin):
    list_display=('name', 'gender', 'birth_date',)
    search_fields = ('name',)
    list_filter = ( 'gender',)
    readonly_fields = ['user',]
    inlines = [FriendThroughInline]

    def name(self, obj):
        name = obj.user.username
        return name

    class Meta:
        Profile

admin.site.site_header = "MyClassRoomApp Administration"
