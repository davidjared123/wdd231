document.addEventListener("DOMContentLoaded", () => {
  console.log("scripts.js loaded!");

  // --- Footer Info ---
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

  // --- Responsive Menu ---
  const menuButton = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
  }

  // --- Page-specific Logic ---
  // Determine which page is currently loaded
  const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/chamber/");
  const isDirectoryPage = window.location.pathname.endsWith("directory.html");

  // --- Weather ---
  async function getWeather() {
    // Barquisimeto coordinates
    const lat = 10.075;
    const lon = -69.322;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(forecastUrl);
      if (!response.ok) throw new Error(`Weather data fetch failed: ${response.status}`);
      const data = await response.json();
      
      displayCurrentWeather(data.list[0]);
      displayForecast(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function displayCurrentWeather(current) {
    const tempSpan = document.getElementById("current-temp");
    const descSpan = document.getElementById("weather-desc");
    const iconImg = document.getElementById("weather-icon");

    if (tempSpan) tempSpan.textContent = `${current.main.temp.toFixed(0)}°C`;
    if (descSpan) descSpan.textContent = current.weather[0].description;
    if (iconImg) {
      const iconCode = current.weather[0].icon;
      iconImg.src = `https://openweathermap.org/img/w/${iconCode}.png`;
      iconImg.alt = current.weather[0].description;
    }
  }

  function displayForecast(forecastList) {
    const forecastContainer = document.getElementById("forecast-list");
    if (!forecastContainer) return;

    // Filter for one forecast per day (e.g., at noon) for the next 3 days
    const nextThreeDays = new Date().getDate() + 3;
    const dailyForecasts = forecastList.filter(item => {
        const itemDate = new Date(item.dt_txt);
        return item.dt_txt.includes("12:00:00") && itemDate.getDate() < nextThreeDays && itemDate.getDate() > new Date().getDate();
    }).slice(0, 3);

    forecastContainer.innerHTML = ""; // Clear previous forecast
    dailyForecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: 'short' });
      const temp = forecast.main.temp.toFixed(0);
      
      const forecastItem = document.createElement("p");
      forecastItem.textContent = `${day}: ${temp}°C`;
      forecastContainer.appendChild(forecastItem);
    });
  }

  // --- Members Data ---
  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error(`Members data fetch failed: ${response.status}`);
      const members = await response.json();
      
      if (isHomePage) displaySpotlights(members);
      if (isDirectoryPage) displayMembers(members);

    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }

  function displaySpotlights(members) {
    const spotlightContainer = document.getElementById("spotlight-container");
    if (!spotlightContainer) return;

    // Filter for Gold (3) and Silver (2) members
    const qualifiedMembers = members.filter(m => m.membership === 3 || m.membership === 2);
    
    // Shuffle and select 2 or 3
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectionCount = Math.min(shuffled.length, Math.floor(Math.random() * 2) + 2); // Randomly 2 or 3
    const selected = shuffled.slice(0, selectionCount);

    spotlightContainer.innerHTML = ""; // Clear previous spotlights
    selected.forEach(member => {
      let card = document.createElement("div");
      card.classList.add("spotlight-card");
      // The JSON provides full image URLs, so we use the direct link
      card.innerHTML = `
          <img src="${member.image}" alt="${member.name} Logo">
          <h4>${member.name}</h4>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });
  }

  function displayMembers(members) {
    const container = document.getElementById("membersContainer");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content
    members.forEach(member => {
      let card = document.createElement("div");
      card.classList.add("member-card"); // A consistent class for styling
      // Using full image URL from JSON
      card.innerHTML = `
          <img src="${member.image}" alt="${member.name} Logo">
          <h3>${member.name}</h3>
          <p class="phone">${member.phone}</p>
          <p class="address">${member.address}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="tagline"><em>"${member.tagline}"</em></p>
      `;
      container.appendChild(card);
    });
  }

  // --- Initial Calls ---
  if (isHomePage) {
    getWeather();
    getMembers();
  }
  
  if (isDirectoryPage) {
      getMembers();

      // Logic for grid/list view toggle
      const gridViewBtn = document.getElementById("gridView");
      const listViewBtn = document.getElementById("listView");
      const membersContainer = document.getElementById("membersContainer");

      if (gridViewBtn && listViewBtn && membersContainer) {
        gridViewBtn.addEventListener("click", () => {
          membersContainer.classList.remove("list");
          membersContainer.classList.add("grid");
        });

        listViewBtn.addEventListener("click", () => {
          membersContainer.classList.remove("grid");
          membersContainer.classList.add("list");
        });
      }
  }
});
