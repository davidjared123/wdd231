console.log("scripts.js loaded!");
document.addEventListener("DOMContentLoaded", () => {
  // Responsive menu
  const menuButton = document.querySelector("#menu-btn");
  const nav = document.querySelector("#nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      console.log("Menu button clicked!"); // For debugging
    });
  }

  // Fetch members
  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const members = await response.json();
      displayMembers(members);
      displaySpotlights(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }

  function displayMembers(members) {
    const container = document.getElementById("membersContainer");
    if (!container) return;
    container.innerHTML = "";
    members.forEach(member => {
      let card = document.createElement("div");
      card.classList.add("member-card");
      card.innerHTML = `
        <div class="card-header">
          <h3>${member.name}</h3>
          <p>${member.tagline}</p>
        </div>
        <hr>
        <div class="card-body">
          <img src="${member.image}" alt="${member.name}">
          <div class="card-info">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function getMembershipLevelString(level) {
    switch (level) {
      case 3:
        return "Gold Member";
      case 2:
        return "Silver Member";
      case 1:
        return "Bronze Member";
      default:
        return "Basic Member";
    }
  }

  function displaySpotlights(members) {
    const spotlightContainer = document.querySelector(".spotlight-cards");
    if (!spotlightContainer) return;

    const qualifiedMembers = members.filter(member => member.membership >= 2);
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-header">
          <h3>${member.name}</h3>
          <p>${member.tagline}</p>
        </div>
        <div class="card-body">
          <img src="${member.image}" alt="${member.name}">
          <div class="card-info">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${getMembershipLevelString(member.membership)}</p>
          </div>
        </div>
      `;
      spotlightContainer.appendChild(card);
    });
  }

  // Toggle views
  const gridView = document.getElementById("gridView");
  const listView = document.getElementById("listView");
  const membersContainer = document.getElementById("membersContainer");

  if (gridView && listView && membersContainer) {
    gridView.addEventListener("click", () => {
      membersContainer.className = "grid";
      gridView.classList.add("active");
      listView.classList.remove("active");
    });

    listView.addEventListener("click", () => {
      membersContainer.className = "list";
      listView.classList.add("active");
      gridView.classList.remove("active");
    });

    // Set initial active button
    gridView.classList.add("active");
  }

  async function getWeather() {
    console.log("getWeather() function executed!");
    const lat = 10.063611;
    const lon = -69.334724;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      // Fetch current weather
      const currentResponse = await fetch(currentWeatherUrl);
      if (!currentResponse.ok) {
        throw new Error(`HTTP error! status: ${currentResponse.status}`);
      }
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);

      // Fetch forecast
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error(`HTTP error! status: ${forecastResponse.status}`);
      }
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function displayCurrentWeather(data) {
    const weatherCard = document.querySelector(".weather.card .card-content");
    if (!weatherCard) return;

    weatherCard.innerHTML = `
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="weather-icon">
    `;
  }

  function displayForecast(data) {
    const forecastCard = document.querySelector(".forecast.card .card-content");
    if (!forecastCard) return;

    const forecastList = document.createElement("ul");
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: 'short' });
      const temp = forecast.main.temp;
      const listItem = document.createElement("li");
      listItem.innerHTML = `<img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}" class="weather-icon"> ${day}: ${temp}°C`;
      forecastList.appendChild(listItem);
    });

    forecastCard.innerHTML = "";
    forecastCard.appendChild(forecastList);
  }

  getMembers();
  getWeather();

  // Footer dynamic year & last modified
  const year = document.getElementById("year");
  const lastModified = document.getElementById("lastModified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});