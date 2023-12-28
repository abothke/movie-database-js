// importieren des Arrays movies aus der Datei movies.js
import { movies } from "./movies.js";

// festlegen des Containers, in dem die Filme angezeigt werden sollen
const movieContainer = document.getElementById("movie-container");

// for-schleife, die für jedes Element des Arrays movies ein Film-Element erstellt und in den Container einfügt
for (let i = 0; i < movies.length; i++) {
  const movieDiv = document.createElement("div");
  let movie = movies[i];
  movieDiv.className = "movie";
  movieDiv.innerHTML = `
        <div class="movie-content">
            <h2>${movie[0]}</h2>
            <p class="movie-year">${movie[1]}</p>
            <p class="movie-producer">${movie[2]}</p>
            <p class="movie-length">${movie[3]}</p>
            <p class="movie-genre">
            <ul>
            ${movie[4].map((genre) => `<li>${genre}</li>`).join("")}
            </ul></p>
            <p class="movie-rating">${movie[5]}</p>
        </div>
    `;
  movieContainer.appendChild(movieDiv);
}

// funktion, die die Filme nach dem Titel sortiert und in der richtigen Reihenfolge anzeigt
const sortMovies = () => {
  movies.sort();
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    movieContainer.appendChild(movieElement(movies[i]));
  }
  return sortMovies;
};
document.getElementById("alphabet-btn").addEventListener("click", sortMovies);

// Funktion, die die Filme aufsteigend nach Jahr sortiert und darstellt.
const sortMoviesByYearUp = () => {
  movies.sort((a, b) => a[1] - b[1]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    movieContainer.appendChild(movieElement(movies[i]));
  }
  return sortMoviesByYearUp;
};
document
  .getElementById("year-up-btn")
  .addEventListener("click", sortMoviesByYearUp);

// Funktion, die die Filme absteigend nach Jahr sortiert und darstellt.
const sortMoviesByYearDown = () => {
  movies.sort((a, b) => b[1] - a[1]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    movieContainer.appendChild(movieElement(movies[i]));
  }
  return sortMoviesByYearDown;
};
document
  .getElementById("year-down-btn")
  .addEventListener("click", sortMoviesByYearDown);

// funktion, die die Filme nach dem Rating sortiert und in der richtigen Reihenfolge anzeigt
const sortMoviesByRating = () => {
  movies.sort((a, b) => b[5] - a[5]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    movieContainer.appendChild(movieElement(movies[i]));
  }
  return sortMoviesByRating;
};
document
  .getElementById("best-rating-btn")
  .addEventListener("click", sortMoviesByRating);

// Suchfunktion, die die Filme nach dem Titel durchsucht und die passenden Filme anzeigt
const searchMovie = () => {
  const searchInput = document.getElementById("search").value;
  const searchResult = movies.filter((movie) =>
    movie[0].toLowerCase().includes(searchInput.toLowerCase())
  );
  movieContainer.innerHTML = "";
  for (let i = 0; i < searchResult.length; i++) {
    movieContainer.appendChild(movieElement(searchResult[i]));
  }
  return searchMovie;
};
// Eventlistener, der die Suchfunktion ausführt, sobald eine Taste gedrückt wird, als eine Art Live-Suche
document.getElementById("search").addEventListener("keyup", searchMovie);
