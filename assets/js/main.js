// importieren des Arrays movies aus der Datei movies.js
import { movies, moviesPlus } from "./movies.js";

// festlegen des Containers, in dem die Filme angezeigt werden sollen
const movieContainer = document.getElementById("movie-container");
const counterContainer = document.getElementById("counter-container")
const counter = document.getElementById("counter")
movieContainer.innerHTML = ""
// for-schleife, die für jedes Element des Arrays movies ein Film-Element erstellt und in den Container einfügt

const movieElement = (movie) => {
    console.log(movie);
    const movieDiv = document.createElement("div");
    const bgDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    let genre = movie[4].map((genre) => `<li>${genre}</li>`).join("");
    movieDiv.className = "movie";
    bgDiv.className = "movie-bg";
    contentDiv.className = "movie-content";
    contentDiv.onclick = function() {
        window.location.href = `https://www.imdb.com/title/${movie[6]}/`;
    };
    contentDiv.innerHTML = ` 
          <h2>${movie[0]}</h2>
          <p class="movie-year">${movie[1]}</p>
          <p class="movie-producer">${movie[2]}</p>
          <p class="movie-length">${movie[3]}</p>
          <p class="movie-genre"><ul>${genre}</ul></p>
          <p class="movie-rating">${movie[5]}</p>
      `;
    if (movie[7] !== undefined) {
      bgDiv.style.backgroundImage = `url(${movie[7]})`;
      bgDiv.style.backgroundSize = "cover";
      bgDiv.style.backgroundPosition = "center";
      bgDiv.style.backgroundRepeat = "no-repeat";
    }
    movieDiv.appendChild(bgDiv);
    movieDiv.appendChild(contentDiv);
    console.log(movie);
    counter.textContent = `${moviesPlus.length} `;
    return movieDiv;
  };
  
for (let i = 0; i < moviesPlus.length; i++) {
  movieContainer.appendChild(movieElement(moviesPlus[i]));
}

// funktion, die die Filme nach dem Titel sortiert und in der richtigen Reihenfolge anzeigt
const sortMovies = () => {
  moviesPlus.sort();
  movieContainer.innerHTML = "";
  for (let i = 0; i < moviesPlus.length; i++) {
    movieContainer.appendChild(movieElement(moviesPlus[i]));
  }
  return sortMovies;
};
document.getElementById("alphabet-btn").addEventListener("click", sortMovies);

// Funktion, die die Filme aufsteigend nach Jahr sortiert und darstellt.
const sortMoviesByYearUp = () => {
  moviesPlus.sort((a, b) => a[1] - b[1]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < moviesPlus.length; i++) {
    movieContainer.appendChild(movieElement(moviesPlus[i]));
  }
  counter.textContent = `${moviesPlus.length} `
  return sortMoviesByYearUp;
};
document
  .getElementById("year-up-btn")
  .addEventListener("click", sortMoviesByYearUp);

// Funktion, die die Filme absteigend nach Jahr sortiert und darstellt.
const sortMoviesByYearDown = () => {
  moviesPlus.sort((a, b) => b[1] - a[1]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < moviesPlus.length; i++) {
    movieContainer.appendChild(movieElement(moviesPlus[i]));
  }
  counter.textContent = `${moviesPlus.length} `
  return sortMoviesByYearDown;
};
document
  .getElementById("year-down-btn")
  .addEventListener("click", sortMoviesByYearDown);

// funktion, die die Filme nach dem Rating sortiert und in der richtigen Reihenfolge anzeigt
const sortMoviesByRating = () => {
  moviesPlus.sort((a, b) => b[5] - a[5]);
  movieContainer.innerHTML = "";
  for (let i = 0; i < moviesPlus.length; i++) {
    movieContainer.appendChild(movieElement(moviesPlus[i]));
  }
  return sortMoviesByRating;
};
document
  .getElementById("best-rating-btn")
  .addEventListener("click", sortMoviesByRating);

// Suchfunktion, die die Filme nach dem Titel durchsucht und die passenden Filme anzeigt
const searchMovie = () => {
  const searchInput = document.getElementById("search").value;
  const searchResult = moviesPlus.filter((movie) =>
    movie[0].toLowerCase().includes(searchInput.toLowerCase())
  );
  movieContainer.innerHTML = "";
  for (let i = 0; i < searchResult.length; i++) {
    movieContainer.appendChild(movieElement(searchResult[i]));
  }
  if (searchResult.length == 0){
    counterContainer.textContent = "Movie not found";
  } else {
    counterContainer.textContent = `${searchResult.length} results `
  }
  counter.textContent = `${searchResult.length} `
  return searchMovie;
};

// Eventlistener, der die Suchfunktion ausführt, sobald eine Taste gedrückt wird, als eine Art Live-Suche
document.getElementById("search").addEventListener("keyup", searchMovie);

const searchGenre = () => {
    const genreInput = document.querySelector("#movie-genre-select").value;
    const genreResult = moviesPlus.filter((movie) =>
    movie[4].some(genre => genre.toLowerCase() === genreInput.toLowerCase())
  );
    movieContainer.innerHTML = "";
    for (let i = 0; i < genreResult.length; i++) {
        movieContainer.appendChild(movieElement(genreResult[i]));
    }
    counter.textContent = `${genreResult.length} `
    return searchGenre;
}
document.querySelector("#movie-genre-select").addEventListener("change", searchGenre)



async function fetchMovieDetails(movie) {
    const title = movie[0];
    const year = movie[1];
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=9443afe5`);
    const data = await response.json();
  
    if (data.Response === "True") {
      movie.push(data.imdbID);
      movie.push(data.Poster);
    }
  }
  
  async function fetchAllMovieDetails() {
    for (let movie of movies) {
      await fetchMovieDetails(movie);
    }
  }