// importieren des Arrays movies aus der Datei movies.js
import {movies} from './movies.js';

// festlegen des Containers, in dem die Filme angezeigt werden sollen
const movieContainer = document.getElementById("movie-container");
// funktion, die ein einzelnes Film-Element erstellt
const movieElement = (movie) => {
    console.log(movie);
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie";
    movieDiv.innerHTML = `
        <div class="movie-content">
            <h2>${movie[0]}</h2>
            <p class="movie-year">${movie[1]}</p>
            <p class="movie-producer">${movie[2]}</p>
            <p class="movie-length">${movie[3]}</p>
            <p class="movie-genre-one">${movie[4][0]}</p>
            <p class="movie-genre-two">${movie[4][1]}</p>
            <p class="movie-genre-three">${movie[4][2]}</p>
            <p class="movie-rating">${movie[5]}</p>
        </div>
    `;
    return movieDiv;
}

// for-schleife, die für jedes Element des Arrays movies ein Film-Element erstellt und in den Container einfügt
for (let i = 0; i < movies.length; i++) {
    movieContainer.appendChild(movieElement(movies[i]));
}

// funktion, die die Filme nach dem Titel sortiert und in der richtigen Reihenfolge anzeigt
const sortMovies = () => {
    movies.sort();
    movieContainer.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        movieContainer.appendChild(movieElement(movies[i]));
    }
    return sortMovies
}
document.getElementById("alphabet-btn").addEventListener("click", sortMovies);
