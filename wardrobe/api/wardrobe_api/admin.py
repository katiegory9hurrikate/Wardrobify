from django.contrib import admin
from .models import Bin
from .models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
        list_display = [
        "closet_name",
        "id",
    ]



@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
        list_display = [
        "closet_name",
        "id",
    ]
