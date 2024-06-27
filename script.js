document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = '2d18329c31918022327e2134dc97e773'; // Вставьте сюда свой ключ API от OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = 'Please enter a city name.';
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            const errorMessage = document.getElementById('error-message');
            if (data.cod === 200) {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                weatherResult.innerHTML = `Temperature: ${temp}°C<br>Description: ${description}`;
                errorMessage.innerHTML = '';
            } else {
                weatherResult.innerHTML = '';
                errorMessage.innerHTML = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = `Error fetching the weather data: ${error.message}`;
        });
});