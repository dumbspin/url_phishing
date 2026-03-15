import requests

url = "http://localhost:8000/analyze"
data = {"url": "https://google.com"}

try:
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Headers: {response.headers}")
    print(f"Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
