

// following navbar on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
  }
});

// carousel
const slidesContainer = document.querySelector('.slides');
const apiKey = "d234eab1";

// Option 1: specific movies
const movies = [
    "Spider Man Across the Spider Verse",
    "mantis",
    "The Dark Knight",
    "Inception",
    "The Matrix",
    "Interstellar",
    "The Shawshank Redemption",
    "The Godfather",
    "Pulp Fiction",
    "Forrest Gump"
];

// Fetch each movie from OMDb and create a slide
async function loadMovies() {
    for (const title of movies) {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            const slide = document.createElement('div');
            slide.classList.add('slide');

            slide.innerHTML = `
                <div class="movie-poster">
                    <img src="${data.Poster}" alt="${data.Title}">
                </div>
                <div class="movie-details">
                    <h2>${data.Title} (${data.Year})</h2>
                    <p>${data.Plot}</p>
                    <div class="info">Genre: ${data.Genre} | IMDb: ${data.imdbRating}</div>
                    <button>Rate Now</button>
                </div>
            `;

            slidesContainer.appendChild(slide);
        }
    }

    startCarousel();
}

let index = 0;
function startCarousel() {
    const slides = document.querySelectorAll('.slide');
    setInterval(() => {
        index++;
        if (index >= slides.length) index = 0;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }, 15000); // 5 seconds per slide
}

// Initialize
loadMovies();

