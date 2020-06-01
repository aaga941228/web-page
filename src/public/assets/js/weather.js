class WeatherStore {
  constructor() {
    this.city, (this.defaultCity = "Merida");
  }

  getLocation() {
    if (localStorage.getItem("city") === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem("city");
    }
    return this.city;
  }

  setLocation(city) {
    localStorage.setItem("city", city);
  }
}

class Weather {
  constructor(city) {
    this.city = city;
    this.apiKey = "d24d014f7ad8373112e8cca15fef2894";
  }
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    return data;
  }

  setLocation(city) {
    this.city = city;
  }
}

class WeatherUi {
  constructor() {
    this.location = document.getElementById("weather-location");
    this.desc = document.getElementById("weather-description");
    this.string = document.getElementById("weather-string");
    this.humidity = document.getElementById("weather-humidity");
    this.wind = document.getElementById("weather-wind");
  }

  render(weather) {
    this.location.textContent = `${weather.name} / ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${weather.main.temp} °C`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity} °C`;
    this.wind.textContent = `Weather ${weather.wind.speed} m/s`;
  }
}
