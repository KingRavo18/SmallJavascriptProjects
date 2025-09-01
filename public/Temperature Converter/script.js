const celsiusInput = document.getElementById("celsiusInput"),
      fahrenheitInput = document.getElementById("fahrenheitInput"),
      kelvinInput = document.getElementById("kelvinInput"),

fromCelsius = () => {
    const celsius = Number(celsiusInput.value);
    fahrenheitInput.value = (celsius * 9 / 5 + 32).toFixed(2);
    kelvinInput.value = (celsius + 273.15).toFixed(2);
},

fromFahrenheit = () => {
    const fahrenheit = Number(fahrenheitInput.value);
    celsiusInput.value = ((fahrenheit - 32) * 5 / 9).toFixed(2);
    kelvinInput.value = ((fahrenheit - 32) * 5 / 9 + 273.15).toFixed(2);
},

fromKelvin = () => {
    const kelvin = Number(kelvinInput.value);
    celsiusInput.value = (kelvin - 273.15).toFixed(2);
    fahrenheitInput.value = ((kelvin - 273.15) * 9 /5 + 32).toFixed(2);
};