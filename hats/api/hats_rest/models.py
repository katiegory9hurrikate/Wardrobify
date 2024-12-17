from django.db import models
from django.urls import reverse
# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)


class Hat(models.Model):
    fabric = models.CharField(max_length=250)
    style = models.CharField(max_length=250)
    color = models.CharField(max_length=250)
    picture = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="location",
        on_delete=models.PROTECT
    )

    def get_api_url(self):
        return reverse("api_hats_list", kwargs={"pk": self.pk})

    def __str__(self):
        return self.picture


class Meta:
    ordering = ("color",)
