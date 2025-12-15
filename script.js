// API keys = "48f905b8", "d234eab1"
const API_KEY = "d234eab1";

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




// following navbar on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
  }
});

// TO GO TO SEARCH PAGE
// const searchIcon = document.querySelector(".search-icon");
// const searchOverlay = document.getElementById("searchOverlay");
// const searchInput = document.getElementById("searchInput");
// const searchBtn = document.getElementById("searchBtn");

// searchIcon.addEventListener("click", () => {
//   searchOverlay.style.display = "flex";
//   searchInput.focus();
// });

// searchOverlay.addEventListener("click", () => {
//   searchOverlay.style.display = "none";
// });

// window.addEventListener("click", e => {
//   if (!searchIcon.contains(e.target) && !searchOverlay.contains(e.target)) {
//     searchOverlay.style.display = "none";

//   }
// })

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



// TRENDING SECTION

const trendingContainer = document.getElementById("trendingMovies");

// TRENDING MOVIES
const trendingTitles = [
  "Sinners",
  "Mantis",
  "Demon City",
];

async function loadTrendingMovies() {
  trendingContainer.innerHTML = "";

  for (let title of trendingTitles) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
      );
      const movie = await response.json();

      if (movie.Response === "False") continue;

      const card = document.createElement("div");
      card.className = "both";

      card.innerHTML = `
        <div class="item">
          <a href="#">
            <img 
              src="${movie.Poster !== "N/A" ? movie.Poster : "assets/placeholder.jpg"}" 
              alt="${movie.Title}"
            >
          </a>
        </div>

        <p>${movie.Title}</p>

        <div class="info">
          ${movie.Genre
            .split(",")
            .slice(0, 2)
            .map(genre => `<a href="#">${genre.trim()}</a>`)
            .join(", ")}
          . / <a href="#">${movie.imdbVotes !== "N/A" ? movie.imdbVotes : "No"} reviews</a>
        </div>

        <button type="button" data-id="${movie.imdbID}">
          Preview
        </button>
      `;

      const button = card.querySelector("button");
      button.addEventListener("click", () => openPreview(movie.imdbID));

      trendingContainer.appendChild(card);

    } catch (error) {
      console.error("Error fetching:", title);
    }
  }
}

function openPreview(imdbID) {
  console.log("Preview movie:", imdbID);
  // later you can connect this to your preview carousel or modal
}

/* Load when DOM is ready */
document.addEventListener("DOMContentLoaded", loadTrendingMovies);


// CAROUSEL......
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

// genre section

const genreSection = document.querySelector('.genre-section');
// Define your genres and movies manually
const genreMovies = {
    "Action":  ["Sinners", "Mission: Impossible ", "Deadpool", "Captain America: Brave New World", "Mortal Kombat 2","Predator: Badlands" ,"Now You See Me: Now You Don’", "John Wick: Chapter 4", "The Equalizer 3", "Ambulance", "Fast X", "The Gray Man", "Black Adam"],
    "Adventure": ["Spider Man Across the Spider Verse", "Jurassic World", "Jumanji: Welcome to the Jungle", "The Lost City", "Dungeons & Dragons: Honor Among Thieves", "Uncharted", "The Hobbit", "Pirates of the Caribbean", "The Revenant", "Life of Pi"],
    "Comedy": ["Deadpool", "The Mask", "Superbad", "Step Brothers", "The Hangover", "Bridesmaids", "Zoolander", "Dumb and Dumber", "21 Jump Street"],
    "Drama": ["The Shawshank Redemption", "Forrest Gump", "The Godfather", "Fight Club", "The Pursuit of Happyness", "A Beautiful Mind", "The Green Mile", "Good Will Hunting"],
    "Horror": ["The Conjuring", "It", "A Quiet Place", "Hereditary", "Get Out", "The Exorcist", "Halloween", "The Shining", "Insidious", "The Babadook", "M3GAN"],
    "Sci-Fi": ["Interstellar", "Inception", "The Matrix", "Blade Runner 2049", "Arrival", "Ex Machina", "Gravity", "District 9", "E.T. the Extra-Terrestrial", "Avatar", "Dune", "The Martian"],
    "Cartoon": ["Toy Story", "Finding Nemo", "The Lion King", "Shrek", "Frozen", "Moana", "Coco", "Zootopia", "Despicable Me", "The Incredibles", "Ratatouille", "Kung Fu Panda", "How to Train Your Dragon"],
    "K-Drama": ["Crash Landing on You", "Goblin", "Itaewon Class", "Descendants of the Sun", "My Love from the Star", "Vincenzo", "Hotel Del Luna", "The World of the Married", "Start-Up", "It's Okay to Not Be Okay"]
};

// Create modal for movie preview
const modal = document.createElement('div');
modal.classList.add('movie-modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <img src="" alt="Movie Poster">
        <h2></h2>
        <p></p>
        <div class="info"></div>
    </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const modalTitle = modal.querySelector('h2');
const modalPlot = modal.querySelector('p');
const modalInfo = modal.querySelector('.info');
const closeModal = modal.querySelector('.close');

// Close modal
closeModal.onclick = () => modal.style.display = 'none';

async function loadGenresWithMovies() {
    // Prepare all genre rows as promises
    const genrePromises = Object.entries(genreMovies).map(async ([genre, movies]) => {
        const row = document.createElement('div');
        const rowID = genre.toLowerCase();
        row.setAttribute('id', rowID);
        console.log(rowID);
        
        row.classList.add('genre-row');
        

        const title = document.createElement('p');
        title.textContent = genre;
        row.appendChild(title);

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('genre-movies');

        // Fetch all movies in this genre in parallel
        const moviePromises = movies.map(async movieTitle => {
            const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
            const movie = await response.json();
            if (movie.Response === "True") {
                const card = document.createElement('div');
                card.classList.add('genre-movie-card');
                card.innerHTML = `<img src="${movie.Poster !== "N/A" ? movie.Poster : ''}" alt="${movie.Title}">`;

                // Click to open modal
                card.addEventListener('click', () => {
                    modalImg.src = movie.Poster !== "N/A" ? movie.Poster : '';
                    modalTitle.textContent = movie.Title;
                    modalPlot.textContent = movie.Plot;
                    modalInfo.textContent = `Genre: ${movie.Genre} | IMDb: ${movie.imdbRating}`;
                    modal.style.display = 'flex';
                });

                movieContainer.appendChild(card);
            }
        });

        await Promise.all(moviePromises);
        row.appendChild(movieContainer);
        return row;
    });

    // Wait for all genres to finish fetching, then append at once
    const rows = await Promise.all(genrePromises);
    rows.forEach(row => genreSection.appendChild(row));
}

// Initialize
loadGenresWithMovies();

// FOR RESPONSIVENESS

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

// SUPPORT PAGE
document.querySelectorAll('.faq .question').forEach(q => {
    q.addEventListener('click', () => {
        q.classList.toggle('active');
    });
});



// COMMUNITY PAGE
// const postBtn = document.querySelector('.post-box button');
// const textarea = document.querySelector('.post-box textarea');
// const feed = document.querySelector('.community-feed');

// postBtn.addEventListener('click', () => {
//     if (textarea.value.trim() === "") return;

//     const post = document.createElement('div');
//     post.classList.add('post');
//     post.innerHTML = `
//         <h3>You</h3>
//         <p>${textarea.value}</p>
//         <div class="post-actions">
//             <span>👍 0</span>
//             <span>💬 0</span>
//         </div>
//     `;

//     feed.insertBefore(post, feed.children[1]);
//     textarea.value = "";
// });


