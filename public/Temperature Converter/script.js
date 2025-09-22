document.addEventListener("DOMContentLoaded", () => {
    const tempConvert = new TemperatureConverter();
    document.getElementById("celsiusInput").addEventListener("input", () => tempConvert.fromCelsius());  
    document.getElementById("fahrenheitInput").addEventListener("input", () => tempConvert.fromFahrenheit());  
    document.getElementById("kelvinInput").addEventListener("input", () => tempConvert.fromKelvin());  
});

class TemperatureConverter{
    constructor(){
        this.celsiusInput = document.getElementById("celsiusInput");
        this.fahrenheitInput = document.getElementById("fahrenheitInput");
        this.kelvinInput = document.getElementById("kelvinInput");
    }

    fromCelsius = () => {
        const celsius = Number(this.celsiusInput.value);
        this.fahrenheitInput.value = (celsius * 9 / 5 + 32).toFixed(2);
        this.kelvinInput.value = (celsius + 273.15).toFixed(2);
    }

    fromFahrenheit = () => {
        const fahrenheit = Number(this.fahrenheitInput.value);
        this.celsiusInput.value = ((fahrenheit - 32) * 5 / 9).toFixed(2);
        this.kelvinInput.value = ((fahrenheit - 32) * 5 / 9 + 273.15).toFixed(2);
    } 

    fromKelvin = () => {
        const kelvin = Number(this.kelvinInput.value);
        this.celsiusInput.value = (kelvin - 273.15).toFixed(2);
        this.fahrenheitInput.value = ((kelvin - 273.15) * 9 /5 + 32).toFixed(2);
    }
}