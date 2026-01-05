// API keys = "48f905b8", "d234eab1"
const API_KEY = "48f905b8";

// MAKE PAGE ACTIVE
const navLinks = document.querySelectorAll('.nav a');
const currentPath = window.location.pathname;
const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    const linkPage = linkHref.substring(linkHref.lastIndexOf('/') + 1);
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// FOLLOWING NAVBAR ON SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// SEARCH PAGE
const searchIcon = document.querySelector(".search-icon");
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");

// Open overlay when clicking the search icon
searchIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent window click from immediately closing it
  searchOverlay.style.display = "flex";
  searchInput.focus();
});

// Prevent clicks inside the overlay from closing it
searchOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Close overlay when clicking outside
searchOverlay.addEventListener("click", () => {
  if (searchOverlay.style.display === "flex") {
    searchOverlay.style.display = "none";
  }
});

// Optional: close overlay on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchOverlay.style.display = "none";
  }
});


searchInput.addEventListener("click", e => e.stopPropagation());
searchBtn.addEventListener("click", e => e.stopPropagation());

searchBtn.addEventListener("click", goToSearchPage);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") goToSearchPage();
});

function goToSearchPage() {
  const query = searchInput.value.trim();
  if (!query) return;

  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// -------------------
// MODAL & RATING SYSTEM
// -------------------
const modal = document.createElement('div');
modal.classList.add('movie-modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <img src="" alt="Movie Poster">
        <h2></h2>
        <p></p>
        <div class="info"></div>
        <div class="rating">
            <span class="star" data-value="1">&#9733;</span>
            <span class="star" data-value="2">&#9733;</span>
            <span class="star" data-value="3">&#9733;</span>
            <span class="star" data-value="4">&#9733;</span>
            <span class="star" data-value="5">&#9733;</span>
        </div>
        <button class="rate-button">Rate</button>
    </div>
`;
document.body.appendChild(modal);

const modalPoster = modal.querySelector('img');
const trendModalTitle = modal.querySelector('h2');
const trendModalPlot = modal.querySelector('p');
const modalInfo = modal.querySelector('.info');
const closeModal = modal.querySelector('.close');
const stars = modal.querySelectorAll('.star');
const rateButton = modal.querySelector('.rate-button');

let selectedRating = 0;
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value'));
        stars.forEach(s => {
            s.style.color = parseInt(s.getAttribute('data-value')) <= selectedRating ? 'gold' : 'gray';
        });
    });
});
rateButton.addEventListener('click', () => {
    if (selectedRating > 0) {
        alert(`You rated ${trendModalTitle.textContent} ${selectedRating} stars!`);
        modal.style.display = 'none';
        selectedRating = 0;
        stars.forEach(s => s.style.color = 'gray');
    } else {
        alert('Please select a star rating first.');
    }
});
closeModal.onclick = () => modal.style.display = 'none';

// -------------------
// TRENDING SECTION
// -------------------
const trendingContainer = document.getElementById("trendingMovies");
const trendingTitles = ["Sinners", "Mantis", "Demon City"];
async function loadTrendingMovies() {
    trendingContainer.innerHTML = "";
    for (let title of trendingTitles) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
            const movie = await response.json();
            if (movie.Response === "False") continue;
            const card = document.createElement("div");
            card.className = "both";
            card.innerHTML = `
                <div class="item">
                    <a href="#"><img src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.jpg"}" alt="${movie.Title}"></a>
                </div>
                <p>${movie.Title}</p>
                <div class="info">
                    ${movie.Genre.split(",").slice(0, 2).map(g => `<a href="#">${g.trim()}</a>`).join(", ")}
                    . / <a href="#">${movie.imdbVotes !== "N/A" ? movie.imdbVotes : "No"} reviews</a>
                </div>
                <button type="button">Preview</button>
            `;
            card.querySelector("button").addEventListener('click', () => openMovieModal(movie));
            trendingContainer.appendChild(card);
        } catch (err) {
            console.error(err);
        }
    }
}
function openMovieModal(movie) {
    modalPoster.src = movie.Poster !== "N/A" ? movie.Poster : '';
    trendModalTitle.textContent = `${movie.Title} (${movie.Year})`;
    trendModalPlot.textContent = movie.Plot;
    modalInfo.textContent = `Genre: ${movie.Genre} | IMDb: ${movie.imdbRating}`;
    modal.style.display = 'flex';
    selectedRating = 0;
    stars.forEach(s => s.style.color = 'gray');
}
document.addEventListener("DOMContentLoaded", loadTrendingMovies);

// -------------------
// GENRE SECTION
// -------------------
const genreSection = document.querySelector('.genre-section');
const genreMovies = {
    "Action": ["Sinners", "Mission: Impossible ", "Deadpool", "Captain America: Brave New World", "Mortal Kombat 2","Predator: Badlands" ,"Now You See Me: Now You Don’", "John Wick: Chapter 4", "The Equalizer 3", "Ambulance", "Fast X", "The Gray Man", "Black Adam"],
    "Adventure": ["Spider Man Across the Spider Verse", "Jurassic World", "Jumanji: Welcome to the Jungle", "The Lost City", "Dungeons & Dragons: Honor Among Thieves", "Uncharted", "The Hobbit", "Pirates of the Caribbean", "The Revenant", "Life of Pi"], 
    "Comedy": ["Deadpool", "The Mask", "Superbad", "Step Brothers", "The Hangover", "Bridesmaids", "Zoolander", "Dumb and Dumber", "21 Jump Street", "Anchorman", "Pitch Perfect", "Guardians of the Galaxy"], 
    "Drama": ["The Shawshank Redemption", "Forrest Gump", "The Godfather", "Fight Club", "The Pursuit of Happyness", "A Beautiful Mind", "The Green Mile", "Good Will Hunting", "The Social Network", "La La Land", "The King's Speech", "Slumdog Millionaire"], 
    "Horror": ["The Conjuring", "It", "A Quiet Place", "Hereditary", "Get Out", "The Exorcist", "Halloween", "The Shining", "Insidious", "The Babadook", "M3GAN", "The Ring"], 
    "Sci-Fi": ["Interstellar", "Inception", "The Matrix", "Blade Runner 2049", "Arrival", "Ex Machina", "Gravity", "District 9", "E.T. the Extra-Terrestrial", "Avatar", "Dune", "The Martian"], 
    "Cartoon": ["Toy Story", "Finding Nemo", "The Lion King", "Shrek", "Frozen", "Moana", "Coco", "Zootopia", "Despicable Me", "The Incredibles", "Ratatouille", "Kung Fu Panda", "How to Train Your Dragon"], 
    "K-Drama": ["Crash Landing on You", "Goblin", "Itaewon Class", "Descendants of the Sun", "My Love from the Star", "Vincenzo", "Hotel Del Luna", "The World of the Married", "Start-Up", "It's Okay to Not Be Okay"] };
async function loadGenresWithMovies() {
    const genrePromises = Object.entries(genreMovies).map(async ([genre, movies]) => {
        const row = document.createElement('div');
        row.classList.add('genre-row');
        row.id = genre.toLowerCase();
        const title = document.createElement('p');
        title.textContent = genre;
        row.appendChild(title);
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('genre-movies');
        const moviePromises = movies.map(async movieTitle => {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
            const movie = await response.json();
            if (movie.Response === "True") {
                const card = document.createElement('div');
                card.classList.add('genre-movie-card');
                card.innerHTML = `<img src="${movie.Poster !== "N/A" ? movie.Poster : ''}" alt="${movie.Title}">`;
                card.addEventListener('click', () => openMovieModal(movie));
                movieContainer.appendChild(card);
            }
        });
        await Promise.all(moviePromises);
        row.appendChild(movieContainer);
        return row;
    });
    const rows = await Promise.all(genrePromises);
    rows.forEach(r => genreSection.appendChild(r));
}
loadGenresWithMovies();

// -------------------
// CAROUSEL SECTION
// -------------------
const slidesContainer = document.querySelector('.slides');
const moviesCarousel = ["Spider Man Across the Spider Verse","mantis","The Dark Knight"];
async function loadMoviesCarousel() {
    for (const title of moviesCarousel) {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
        const movie = await response.json();
        if (movie.Response === "True") {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.innerHTML = `
                <div class="movie-poster"><img src="${movie.Poster}" alt="${movie.Title}"></div>
                <div class="movie-details">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <p>${movie.Plot}</p>
                    <div class="info">Genre: ${movie.Genre} | IMDb: ${movie.imdbRating}</div>
                    <button>Rate Now</button>
                </div>
            `;
            slide.querySelector('button').addEventListener('click', () => openMovieModal(movie));
            slidesContainer.appendChild(slide);
        }
    }
}
loadMoviesCarousel();

// CAROUSEL AUTO-SLIDE
let index = 0;
function startCarousel() {
    const slides = document.querySelectorAll('.slide');
    setInterval(() => {
        index++;
        if (index >= slides.length) index = 0;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }, 15000);
}
startCarousel();

// RESPONSIVENESS JS
// const menuToggle = document.querySelector('.menu-toggle');
// const nav = document.querySelector('.nav');

// // Toggle main nav
// menuToggle.addEventListener('click', () => {
//     nav.classList.toggle('show');
// });

// // Toggle dropdowns in mobile
// const dropdowns = document.querySelectorAll('.nav .dropdown');

// dropdowns.forEach(drop => {
//     const trigger = drop.querySelector('.drop');
//     trigger.addEventListener('click', (e) => {
//         e.preventDefault();
//         drop.classList.toggle('show');
//     });
// });

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Toggle main nav
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Toggle dropdowns in mobile
const dropdowns = document.querySelectorAll('.nav .dropdown');

dropdowns.forEach(drop => {
    const trigger = drop.querySelector('.drop');
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        drop.classList.toggle('show');
    });
});


