import requests
import json

try:
    response = requests.post("http://localhost:8000/generate", json={"city": "Paris", "days": 3, "budget": 1000})
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
