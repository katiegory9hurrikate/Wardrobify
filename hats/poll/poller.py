import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something
from hats_rest.models import LocationVO


def poll():
    while True:
        print('Hats poller polling for data!!!')
        try:
            response = requests.get('http://wardrobe-api:8000/api/locations/')
            # print("RESPONSE:", response)
            if response.status_code == 200:
                content = json.loads(response.content)
                # print("CONTENT:", content)
                for location_data in content["locations"]:
                    print("CONTENT:", location_data)
                    LocationVO.objects.update_or_create(
                        import_href=location_data["href"],
                        defaults={"import_href": location_data["href"]})
            # Write your polling logic, here
            else:
                print("whoopsie", file=sys.stderr)

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
