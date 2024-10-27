"use strict";
let city = prompt("Skriv by");

async function fetchWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=9f78e267248a400990a145120242710&q=${city}&aqi=no`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Kunne ikke hente data. Tjek bynavn og prøv igen.");
    }

    const data = await response.json();

    if (data) {
      document.getElementById("output").textContent =
        data.current.temp_c + "°C";
      console.log(`Vejret i ${data.location.name}`);
      console.log(`Temperatur: ${data.current.temp_c}°C`);
      console.log(
        `Vinden blæser med ${data.current.wind_kph} kilometer i timen`
      );
    } else {
      console.log("Kunne ikke finde vejroplysninger for den valgte by.");
    }
  } catch (error) {
    console.error("Fejl ved hentning af data:", error.message);
  }
}

// Kald funktionen med den by, brugeren har angivet
fetchWeatherData(city);
