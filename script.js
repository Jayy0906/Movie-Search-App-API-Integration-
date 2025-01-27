const apiKey = "6ec081f1"; // Replace with your actual API key
const apiUrl = "https://www.omdbapi.com/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const moviesContainer = document.getElementById("movies-container");
const loadingSpinner = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const noResultsMessage = document.getElementById("no-results");

async function fetchMovies(query) {
  try {
    // Reset UI
    loadingSpinner.style.display = "block";
    errorMessage.style.display = "none";
    noResultsMessage.style.display = "none";
    moviesContainer.innerHTML = "";

    // API Request
    const response = await fetch(
      `${apiUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    loadingSpinner.style.display = "none";

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      noResultsMessage.textContent = "No movies found. Try a different title!";
      noResultsMessage.style.display = "block";
    }
  } catch (error) {
    loadingSpinner.style.display = "none";
    errorMessage.textContent =
      "Failed to fetch movies. Please check your internet connection or try again later.";
    errorMessage.style.display = "block";
  }
}

async function fetchRandomMovie() {
  try {
    const randomTitles = [
      "Inception",
      "Titanic",
      "Avatar",
      "The Dark Knight",
      "Frozen",
    ];
    const randomTitle =
      randomTitles[Math.floor(Math.random() * randomTitles.length)];
    await fetchMovies(randomTitle);
  } catch (error) {
    loadingSpinner.style.display = "none";
    errorMessage.textContent =
      "Failed to fetch a random movie. Please try again later.";
    errorMessage.style.display = "block";
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = movies
    .map(
      (movie) => `
                    <div class="col-md-4">
                        <div class="movie-card">
                            <img src="${
                              movie.Poster !== "N/A"
                                ? movie.Poster
                                : "https://via.placeholder.com/300x450"
                            }" class="img-fluid" alt="${movie.Title}">
                            <div class="p-3">
                                <h5>${movie.Title}</h5>
                                <p>Year: ${movie.Year}</p>
                            </div>
                        </div>
                    </div>
                `
    )
    .join("");
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    noResultsMessage.textContent = "Please enter a movie title to search.";
    noResultsMessage.style.display = "block";
  }
});

randomButton.addEventListener("click", fetchRandomMovie);
