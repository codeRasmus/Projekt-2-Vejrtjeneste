"use strict";
document
  .querySelector(".fa-magnifying-glass")
  .addEventListener("click", function () {
    const searchInput = document.getElementById("searchinput");
    searchInput.classList.toggle("active");
    handleClick(searchInput.value);
  });

function handleClick(data) {
  if (data) {
    fetchWeatherData(data);
    document.getElementById("placeholder").style.display = "none";
  }
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
      document.querySelector("#content_wrapper").removeAttribute("hidden");
      console.log("We've got data: ", data);
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
  let overallConditionText = data.current.condition.text;
  let temperature = Math.trunc(data.current.temp_c);
  let feelsLike = Math.trunc(data.current.feelslike_c);
  let windspeed = data.current.wind_kph;
  let gust = data.current.gust_kph;
  let windDir = getWindDirection(data.current.wind_degree);
  let windDeg = data.current.wind_degree;
  let precip = data.current.precip_mm;

  setDirIcon(windDeg);

  // DOM-elementer
  let locationTag = document.getElementById("location");
  let overallConditionIconTag = document.getElementById("overallConditionIcon");
  let temperatureTag = document.getElementById("temperature");
  let feelsLikeTag = document.getElementById("feelslike");
  let windDirTag = document.getElementById("windDegree");
  let gustTag = document.getElementById("gust");
  let precipTag = document.getElementById("precip");

  // Updater DOM
  locationTag.textContent = locationCity;
  console.log(overallConditionText);
  overallConditionIconTag.src = getIcon(overallConditionText);
  temperatureTag.textContent = `${temperature}°`;
  feelsLikeTag.textContent = `Føles som: ${feelsLike}°`;
  setDirIcon(windDeg);
  windDirTag.textContent = `${windDir} - ${Math.round(
    Math.trunc(windspeed / 3.6)
  )} m/s`;
  gustTag.textContent = `Vindstød: ${Math.trunc(gust / 3.6)} m/s`;
  precipTag.textContent = `Nedbør: ${Math.trunc(precip)} mm`;
}
function getWindDirection(degree) {
  if (degree === 0 || degree === 360) return "N";
  if (degree === 90) return "Ø";
  if (degree === 180) return "S";
  if (degree === 270) return "V";
  if (degree > 0 && degree < 90) return "NØ";
  if (degree > 90 && degree < 180) return "SØ";
  if (degree > 180 && degree < 270) return "SV";
  if (degree > 270 && degree < 360) return "NV";
  return "-";
}

function setDirIcon(degree) {
  const windIcon = document.getElementById("windicon");
  if (windIcon) {
    windIcon.style.transform = `rotate(${degree + 90}deg)`;
  }
}

function getIcon(overallConditionText) {
  switch (overallConditionText) {
    case "Partly cloudy":
      return "assets/icons/partly_cloudy_day.svg";
      break;
    case "Overcast":
      return "assets/icons/double_cloud.svg";
      break;
    case "Cloudy":
      return "assets/icons/double_cloud.svg";
      break;
    case "Sunny":
      return "assets/icons/clear_sky_day.svg";
      break;
    case "Clear":
      return "assets/icons/clear_sky_day.svg";
      break;
    case "Light rain":
      return "assets/icons/rain.svg";
      break;
    case "Mist":
      return "assets/icons/fog.svg";
      break;
    case "Light drizzle":
      return "assets/icons/rain.svg";
      break;
    default:
      return "-";
      break;
  }
}

function changeTable() {
  const img = document.querySelector("#table img");

  if (img.src.includes("assets/scrndump_table_days.png")) {
    img.src = "assets/scrndump_table_hours.png";
    document.getElementById("prognosis").textContent = "Time for time";
  } else {
    img.src = "assets/scrndump_table_days.png";
    document.getElementById("prognosis").textContent = "5-døgns prognose";
  }
}

document.querySelector("#table img").addEventListener("click", changeTable);
