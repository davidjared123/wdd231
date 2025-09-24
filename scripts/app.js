const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Course data
const courses = [
  {
    subject: 'WDD',
    number: 100,
    title: 'Web and Computer Programming',
    credits: 3,
    certificate: 'Web and Computer Programming',
    description: 'This course provides an introduction to web and computer programming. Students will learn the fundamentals of HTML, CSS, and JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript']
  },
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 3,
    certificate: 'Web and Computer Programming',
    description: 'This course provides an introduction to programming using Python.',
    technology: ['Python']
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Frontend Development I',
    credits: 3,
    certificate: 'Web and Computer Programming',
    description: 'This course provides an introduction to web frontend development. Students will learn the fundamentals of HTML, CSS, and JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript']
  }
  // Add more courses as needed
];

const courseCardsContainer = document.querySelector('#course-cards');
const courseDetails = document.querySelector('#course-details');
const totalCreditsContainer = document.querySelector('#total-credits');

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();

  const closeModal = document.getElementById('closeModal');
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

function createCourseCard(course) {
  const courseCard = document.createElement('div');
  courseCard.classList.add('course-card');
  courseCard.innerHTML = `
    <h3>${course.subject} ${course.number}</h3>
    <h4>${course.title}</h4>
    <p>Credits: ${course.credits}</p>
  `;
  courseCard.addEventListener('click', () => {
    displayCourseDetails(course);
  });
  return courseCard;
}

function displayCourses(filteredCourses) {
  courseCardsContainer.innerHTML = '';
  let totalCredits = 0;
  filteredCourses.forEach(course => {
    const courseCard = createCourseCard(course);
    courseCardsContainer.appendChild(courseCard);
    totalCredits += course.credits;
  });
  totalCreditsContainer.textContent = `Total Credits: ${totalCredits}`;
}

document.querySelector('#all-courses').addEventListener('click', () => displayCourses(courses));
document.querySelector('#wdd-courses').addEventListener('click', () => {
  const wddCourses = courses.filter(course => course.subject === 'WDD');
  displayCourses(wddCourses);
});
document.querySelector('#cse-courses').addEventListener('click', () => {
  const cseCourses = courses.filter(course => course.subject === 'CSE');
  displayCourses(cseCourses);
});

// Initially display all courses
displayCourses(courses);
