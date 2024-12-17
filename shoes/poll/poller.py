import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from shoes_rest, here.
# from shoes_rest.models import Something

# from shoes_rest.models import Shoe
from shoes_rest.models import BinVO


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            response = requests.get("http://wardrobe-api:8000/api/bins/")
            if response.status_code == 200:
                content = json.loads(response.content)
                for bin_data in content["bins"]:
                    BinVO.objects.update_or_create(import_href=bin_data["href"])
            else:
                print('Failed to fetch bins', file=sys.stderr)
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
