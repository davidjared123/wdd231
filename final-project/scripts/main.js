
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Dynamic Copyright Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Local Storage - Page Visit Counter
    const visitCounter = () => {
        let visits = localStorage.getItem('pageVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('pageVisits', visits);
        return visits;
    };

    const visits = visitCounter();
    // For demonstration, let's add the visit count to the footer.
    const footerRight = document.querySelector('.footer-right');
    if (footerRight) {
        const visitElement = document.createElement('p');
        visitElement.textContent = `Page visits: ${visits}`;
        visitElement.style.fontSize = '0.8rem';
        footerRight.appendChild(visitElement);
    }
});
