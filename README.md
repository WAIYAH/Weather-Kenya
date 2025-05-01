# Weather-Kenya
A weather application for Nairobi and its environs (Thika, Kiambu, Machakos) built with Flask, HTML, Tailwind CSS, and JavaScript. Uses the OpenWeatherMap API to display detailed weather information.

## Features

Select Nairobi or nearby cities from a dropdown.
View temperature, feels-like, humidity, wind speed, pressure, and weather description.
Dynamic background based on weather conditions.
Responsive design for desktop and mobile.

## Setup

Clone the Repository:
git clone https://github.com/your-username/Weather-Kenya.git
cd Weather-Kenya


Set Up Virtual Environment:
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows


Install Dependencies:
pip install -r requirements.txt


Configure Environment:

Copy .env.example to .env and add your OpenWeatherMap API key:OPENWEATHER_API_KEY=your_api_key




Run the Application:
python weather_app.py


Open http://127.0.0.1:5000 in your browser.



## Project Structure
Weather-Kenya/
├── venv/                     # Virtual environment
├── templates/                # HTML templates
│   └── index.html
├── static/                   # Static files
│   ├── css/styles.css
│   ├── js/script.js
│   └── images/
├── .gitignore
├── README.md
├── requirements.txt
├── weather_app.py
└── .env

## Dependencies

Flask
requests
python-dotenv

