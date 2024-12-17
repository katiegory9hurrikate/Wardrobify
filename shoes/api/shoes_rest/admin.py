from django.contrib import admin
from .models import Shoe, BinVO


@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
        list_display = [
        "manufacturer",
        "model_name",
        "shoe_color",
        "id",
    ]


@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    list_display = [
          "id"
    ]
