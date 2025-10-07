
document.addEventListener('DOMContentLoaded', () => {
    const teachersGrid = document.getElementById('teachers-grid');
    const modal = document.getElementById('teacher-modal');
    const closeButton = document.querySelector('.close-button');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalInstrument = document.getElementById('modal-instrument');
    const modalBio = document.getElementById('modal-bio');

    const apiUrl = 'data/teachers.json';

    async function getTeachers() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const teachers = await response.json();
            displayTeachers(teachers);
        } catch (error) {
            console.error('Fetch error:', error);
            if (teachersGrid) {
                teachersGrid.innerHTML = '<p>Could not load teacher data. Please try again later.</p>';
            }
        }
    }

    function displayTeachers(teachers) {
        if (!teachersGrid) return;
        teachersGrid.innerHTML = ''; // Clear existing content

        teachers.forEach(teacher => {
            const card = document.createElement('div');
            card.className = 'teacher-card';
            card.innerHTML = `
                <img src="${teacher.imageUrl}" alt="${teacher.name}" loading="lazy">
                <h4>${teacher.name}</h4>
                <p>${teacher.instrument}</p>
            `;

            card.addEventListener('click', () => {
                modalImg.src = teacher.imageUrl;
                modalName.textContent = teacher.name;
                modalInstrument.textContent = teacher.instrument;
                modalBio.textContent = teacher.bio;
                modal.style.display = 'block';
            });

            teachersGrid.appendChild(card);
        });
    }

    if (teachersGrid) {
        getTeachers();
    }

    if (modal) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});
