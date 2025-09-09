const cityNameInput = document.getElementById("cityNameInput");
const weatherContainer = document.getElementById("weather-display-container");
const errorMessage = document.getElementById("errorMessage");
const apiKey = "NotTelling";

async function getWeather(){
    try{
        const cityName = cityNameInput.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        if(!response.ok){
            weatherContainer.style.display = "none";
            errorMessage.style.display = "block";
            throw new Error("Could not fetch resource");
        }
        errorMessage.style.display = "none";
        weatherContainer.style.display = "block";

        const data = await response.json();
        const {
                main: {temp, feels_like, humidity},
                wind: {speed},
                weather: [{id, description}]
              } = data;

        document.getElementById("weather-symbol").textContent = weatherSymbol(id);
        document.getElementById("temperature").textContent = String((Number(temp) - 273.15).toFixed(2)) + "°C";
        document.getElementById("description").textContent = description;
        document.getElementById("feelsLike").textContent = "Feels like: " + String((Number(feels_like) - 273.15).toFixed(2)) + "°C";
        document.getElementById("humidity").textContent = "Humidity: " + humidity + "%";
        document.getElementById("windSpeed").textContent = "Wind Speed: " + speed + "m/s";

    }
    catch(error){
        errorMessage.textContent = error;
    }
}

function weatherSymbol(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 500):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}