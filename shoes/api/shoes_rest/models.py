from django.db import models
from django.urls import reverse
# Create your models here.


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=250)
    model_name = models.CharField(max_length=250)
    shoe_color = models.CharField(max_length=250)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="bin",
        on_delete=models.PROTECT
    )


def get_api_url(self):
    return reverse("api_shoe", kwargs={"pk": self.pk})


def __str__(self):
    return f"{self.manufacturer} {self.model_name}"


class Meta:
    ordering = ("model_name",)
