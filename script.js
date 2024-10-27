"use strict";
let cityInput = document.querySelector("input");
let btn = document.querySelector("button");

btn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  fetchWeatherData(cityInput.value);
}

async function fetchWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=9f78e267248a400990a145120242710&q=${city}&aqi=no`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Kunne ikke hente data. Tjek bynavn og prøv igen.");
    }

    const data = await response.json();

    if (data) {
      insertData(data);
    } else {
      console.log("Kunne ikke finde vejroplysninger for den valgte by.");
    }
  } catch (error) {
    console.error("Fejl ved hentning af data:", error.message);
  }
}

function insertData(data) {
  // Endpoint variabler
  let locationCity = data.location.name;
  let locationCountry = data.location.country;
  let overallConditionText = data.current.condition.text;
  let overallConditionIcon = data.current.condition.icon;
  let temperature = data.current.temp_c;
  let feelsLike = data.current.feelslike_c;
  let windspeed = data.current.wind_kph;
  let gust = data.current.gust_kph;
  let humidity = data.current.humidity;
  let uv = data.current.uv;

  // DOM-elementer
  let locationTag = document.getElementById("location");
  let overallConditionTextTag = document.getElementById("overallConditionText");
  let overallConditionIconTag = document.getElementById("overallConditionIcon");
  let temperatureTag = document.getElementById("temperature");
  let feelsLikeTag = document.getElementById("feelslike");
  let windspeedTag = document.getElementById("windspeed");
  let gustTag = document.getElementById("gust");
  let humidityTag = document.getElementById("humidity");
  let uvTag = document.getElementById("uv");

  // Updater DOM
  locationTag.textContent = locationCity + ", " + locationCountry;
  overallConditionTextTag.textContent = overallConditionText;
  overallConditionIconTag.src = overallConditionIcon;
  temperatureTag.textContent = `${temperature}°C`;
  feelsLikeTag.textContent = `Feels like: ${feelsLike}°C`;
  windspeedTag.textContent = `${windspeed} kph`;
  gustTag.textContent = `Gusts: ${gust} kph`;
  humidityTag.textContent = `Humidity: ${humidity}%`;
  uvTag.textContent = `UV Index: ${uv}`;
}
