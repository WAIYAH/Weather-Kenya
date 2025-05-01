document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelect');
    const cityInput = document.getElementById('cityInput');
    const weatherForm = document.getElementById('weatherForm');
    const weatherResult = document.getElementById('weatherResult');
    const body = document.body;

    // Show/hide custom city input based on dropdown selection
    citySelect.addEventListener('change', () => {
        cityInput.classList.toggle('hidden', citySelect.value !== '');
        cityInput.value = '';
    });

    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let city = citySelect.value;
        if (city === '') {
            city = cityInput.value.trim();
        }

        if (!city) {
            weatherResult.innerHTML = '<p class="text-red-500">Please select or enter a city name.</p>';
            return;
        }

        try {
            const response = await fetch('/get_weather', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `city=${encodeURIComponent(city)}`
            });
            const data = await response.json();

            if (response.ok) {
                // Update background based on weather condition
                body.classList.remove('weather-bg-clear', 'weather-bg-clouds', 'weather-bg-rain', 'weather-bg-default');
                if (data.description.toLowerCase().includes('clear')) {
                    body.classList.add('weather-bg-clear');
                } else if (data.description.toLowerCase().includes('cloud')) {
                    body.classList.add('weather-bg-clouds');
                } else if (data.description.toLowerCase().includes('rain')) {
                    body.classList.add('weather-bg-rain');
                } else {
                    body.classList.add('weather-bg-default');
                }

                // Display weather data
                weatherResult.innerHTML = `
                    <div class="flex flex-col items-center gap-4">
                        <h2 class="text-2xl font-semibold text-gray-800">${data.city}</h2>
                        <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon" class="w-20 h-20">
                        <p class="text-lg">Temperature: ${data.temperature}°C</p>
                        <p class="text-lg">Feels Like: ${data.feels_like}°C</p>
                        <p class="text-lg">Description: ${data.description}</p>
                        <p class="text-lg">Humidity: ${data.humidity}%</p>
                        <p class="text-lg">Wind Speed: ${data.wind_speed} m/s</p>
                        <p class="text-lg">Pressure: ${data.pressure} hPa</p>
                    </div>
                `;
            } else {
                weatherResult.innerHTML = `<p class="text-red-500">${data.error}</p>`;
            }
        } catch (error) {
            weatherResult.innerHTML = '<p class="text-red-500">Error fetching weather data. Please try again.</p>';
        }
    });
});