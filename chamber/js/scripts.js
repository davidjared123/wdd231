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

  getMembers();

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