from django.contrib import admin
from .models import LocationVO, Hat
# Register your models here.


@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    list_display = [
        "id",
    ]


@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    list_display = [
        "style",
        "fabric",
        "color",
        "id",
    ]
