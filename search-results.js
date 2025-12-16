const API_KEY = "48f905b8";

const goBackButton = document.getElementById('go-back');
    goBackButton.addEventListener('click', () => {
        window.history.back();

}); 

const resultsContainer = document.getElementById("results");
const searchTitle = document.getElementById("searchTitle");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (!query) {
  searchTitle.textContent = "No search query provided";
} else {
  searchTitle.textContent = `Search results for "${query}"`;
  fetchMovies(query);
}

searchTitle.classList.add("top");

async function fetchMovies(searchTerm) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      resultsContainer.innerHTML = "<p>No movies found</p>";
      return;
    }

    data.Search.forEach(movie => {
      const card = document.createElement("div");
      card.className = "both";

      card.innerHTML = `
        <div class="item">
          <img src="${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "assets/placeholder.jpg"
          }" alt="${movie.Title}">
        </div>
        <p>${movie.Title}</p>
        <div class="info">
          <a href="#">${movie.Year}</a>
        </div>
        <button>Preview</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        window.location.href = `movie.html?id=${movie.imdbID}`;
      });

      resultsContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}
