document.addEventListener('DOMContentLoaded', () => {
    // --- LocalStorage Visit Message ---
    const visitMessageElement = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisitDiscoverPage');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeSinceLastVisit = now - lastVisit;
        const daysSinceLastVisit = Math.floor(timeSinceLastVisit / oneDay);

        if (timeSinceLastVisit < oneDay) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    // Store the current visit date
    localStorage.setItem('lastVisitDiscoverPage', now);


    // --- Dynamic Attraction Cards ---
    const attractionsGrid = document.getElementById('attractions-grid');
    const attractionsDataUrl = 'data/attractions.json';

    async function loadAttractions() {
        try {
            const response = await fetch(attractionsDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayAttractions(data.attractions);
        } catch (error) {
            console.error('Error fetching attractions data:', error);
            attractionsGrid.innerHTML = '<p>Could not load attractions data.</p>';
        }
    }

    function displayAttractions(attractions) {
        attractionsGrid.innerHTML = ''; // Clear existing content
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';

            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button>Learn More</button>
            `;
            attractionsGrid.appendChild(card);
        });
    }

    loadAttractions();
});