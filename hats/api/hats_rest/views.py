# from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Hat, LocationVO

# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href"]


# class HatListEncoder(ModelEncoder):
#     model = Hat
#     properties = [
#         "id",
#         "picture",
#         "location",
#     ]
#     encoders = {"location": LocationVODetailEncoder()}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style",
        "color",
        "picture",
        "location",
    ]
    encoders = {"location": LocationVODetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"Hats": hats},
            encoder=HatDetailEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            locate = content["location"]
            print("LOCATE:", locate)
            location_href = f"/api/locations/{locate}/"
            location = LocationVO.objects.get(import_href=location_href)
            print("LOCATION:", location)
            content["location"] = location
            print("CONTENT:", content)
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "whoopsie"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_hat_detail(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            hat = Hat.objects.get(id=pk)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
