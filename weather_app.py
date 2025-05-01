from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Get API key from environment variable
API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY not set in .env file")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    if not city:
        return jsonify({'error': 'City name is required'}), 400

    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'  # Use Celsius
    }

    try:
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if data.get('cod') != 200:
            return jsonify({'error': data.get('message', 'City not found')}), 404

        weather = {
            'city': data['name'],
        'temperature': data['main']['temp'],
        'feels_like': data['main']['feels_like'],
        'description': data['weather'][0]['description'].capitalize(),
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed'],
        'pressure': data['main']['pressure'],
        'icon': data['weather'][0]['icon']
        }
        return jsonify(weather)

    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching weather data'}), 500

if __name__ == '__main__':
    app.run(debug=True)