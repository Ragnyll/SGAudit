from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Team)
admin.site.register(Member)
admin.site.register(Alias)
admin.site.register(Service)
admin.site.register(Endpoint)
