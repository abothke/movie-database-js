// importieren des Arrays movies aus der Datei movies.js
import { movies, moviesPlus } from "./movies.js";

// festlegen des Containers, in dem die Filme angezeigt werden sollen
const movieContainer = document.getElementById("movie-container"); // Container, in dem die Filme angezeigt werden sollen
const counterContainer = document.getElementById("counter-container") // Container, in dem die Anzahl der Filme angezeigt, sowie der Text "results" angezeigt werden soll
const counter = document.getElementById("counter") // Container, in dem die Anzahl der Filme angezeigt werden soll
movieContainer.innerHTML = "" // leeren des Containers, damit die Filme nicht doppelt angezeigt werden

// Funktion, die die Filme in HTML-Elemente umwandelt und anzeigt
const movieElement = (movie) => {
    const movieDiv = document.createElement("div"); // Erstellen eines Div-Elements für jeden Film
    const bgDiv = document.createElement("div"); // Erstellen eines Div-Elements für den Hintergrund des Films
    const contentDiv = document.createElement("div"); // Erstellen eines Div-Elements für den Inhalt des Films
    let genre = "";
    // Wenn movie[4] ein Array ist, wird eine Liste für die Genres erstellt, ansonsten wird der Wert als einzelner Wert behandelt
    if (Array.isArray(movie[4])) {
        genre = movie[4].map((genre) => `<li>${genre}</li>`).join("");
    } else {
        genre = `<li>${movie[4]}</li>`; // Falls movie[4] kein Array ist, behandeln wir es als einzelnen Wert
    }
    movieDiv.className = "movie"; // Hinzufügen der Klasse "movie" zum Div-Element
    bgDiv.className = "movie-bg"; // Hinzufügen der Klasse "movie-bg" zum Div-Element
    contentDiv.className = "movie-content"; // Hinzufügen der Klasse "movie-content" zum Div-Element
    contentDiv.onclick = function () { // Funktion, die beim Klick auf den Film auf die IMDB-Seite des Films weiterleitet
        window.location.href = `https://www.imdb.com/title/${movie[6]}/`;
    };
    // Hinzufügen des Inhalts zum Div-Element "movie-content"
    contentDiv.innerHTML = ` 
          <h2>${movie[0]}</h2>
          <p class="movie-year">${movie[1]}</p>
          <p class="movie-producer">${movie[2]}</p>
          <p class="movie-length">${movie[3]}</p>
          <p class="movie-genre"><ul>${genre}</ul></p>
          <p class="movie-rating">${movie[5]}</p>
      `;
    // Hinzufügen des Hintergrundbildes zum Div-Element "movie-bg"
    if (movie[7] !== undefined) {
        bgDiv.style.backgroundImage = `url(${movie[7]})`;
        bgDiv.style.backgroundSize = "cover";
        bgDiv.style.backgroundPosition = "center";
        bgDiv.style.backgroundRepeat = "no-repeat";
    }
    movieDiv.appendChild(bgDiv); // Hinzufügen des Hintergrundes zum Div-Element "movie"
    movieDiv.appendChild(contentDiv); // Hinzufügen des Inhalts zum Div-Element "movie"
    counter.textContent = `${moviesPlus.length} `; // Anzeigen der Anzahl der Filme
    return movieDiv;
};

// for Schleife, um alle Filme anzuzeigen
for (let i = 0; i < moviesPlus.length; i++) {
    movieContainer.appendChild(movieElement(moviesPlus[i]));
}

// funktion, die die Filme nach dem Titel sortiert und in der richtigen Reihenfolge anzeigt
const sortMovies = () => {
    moviesPlus.sort(); // Sortieren der Filme nach dem Titel
    movieContainer.innerHTML = ""; // leeren des Containers, damit die Filme nicht doppelt angezeigt werden
    for (let i = 0; i < moviesPlus.length; i++) {
        movieContainer.appendChild(movieElement(moviesPlus[i]));
    }
    return sortMovies;
};
document.getElementById("alphabet-btn").addEventListener("click", sortMovies);

// Funktion, die die Filme aufsteigend nach Jahr sortiert und darstellt.
const sortMoviesByYearUp = () => {
    moviesPlus.sort((a, b) => a[1] - b[1]); // Sortieren der Filme nach dem Jahr aufsteigend (a[1] - b[1] = aufsteigend, b[1] - a[1] = absteigend)
    movieContainer.innerHTML = "";
    for (let i = 0; i < moviesPlus.length; i++) {
        movieContainer.appendChild(movieElement(moviesPlus[i]));
    }
    counter.textContent = `${moviesPlus.length} `
    return sortMoviesByYearUp;
};

document.getElementById("year-up-btn").addEventListener("click", sortMoviesByYearUp);

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

// Funktion, die die Filme nach dem Rating sortiert und in der richtigen Reihenfolge anzeigt
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
    const searchInput = document.getElementById("search").value; // Sucheingabe wird in Variable gespeichert
    const searchResult = moviesPlus.filter((movie) =>
        movie[0].toLowerCase().includes(searchInput.toLowerCase()) // Sucheingabe wird mit dem Titel der Filme verglichen. ToLowerCase, damit die Groß- und Kleinschreibung keine Rolle spielt.
    );
    movieContainer.innerHTML = "";

    // for Schleife, um die passenden Filme anzuzeigen und die Anzahl der Filme anzuzeigen
    for (let i = 0; i < searchResult.length; i++) {
        movieContainer.appendChild(movieElement(searchResult[i]));
    }
    if (searchResult.length == 0) {
        counterContainer.textContent = "Movie not found"; // Wenn kein Film gefunden wurde, wird "Movie not found" angezeigt
    } else {
        counterContainer.textContent = `${searchResult.length} results ` // Wenn ein Film gefunden wurde, wird die Anzahl der Filme angezeigt
    }
    counter.textContent = `${searchResult.length} `
    return searchMovie;
};

// Eventlistener, der die Suchfunktion ausführt, sobald eine Taste gedrückt wird, als eine Art Live-Suche
document.getElementById("search").addEventListener("keyup", searchMovie);

// Funktion, die die Filme nach dem Genre durchsucht und die passenden Filme anzeigt
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


// Function, welche anhand der ID die Details zu einem Film aus der API holt
// API: https://www.omdbapi.com/ API-Key: 9443afe5
async function fetchMovieDetails(movie) {
    const title = movie[0]; // Titel des Films
    const year = movie[1]; // Jahr des Films
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=9443afe5`); // API-Link mit Titel und Jahr des Films als Parameter
    const data = await response.json(); // Antwort der API wird in Variable gespeichert
    //  Wenn der Film gefunden wurde, wird die ID und das Poster in das Array gepusht
    if (data.Response === "True") {
        movie.push(data.imdbID); // ID des Films wird in das Array gepusht (wird für die Weiterleitung auf die IMDB-Seite benötigt)
        movie.push(data.Poster); // Poster des Films wird in das Array gepusht (wird für das Hintergrundbild benötigt)
    }
}

// Aufruf der Funktion, um die Details zu jedem Film zu holen
async function fetchAllMovieDetails() {
    for (let movie of movies) {
        await fetchMovieDetails(movie);
    }
}

// Anzeigen und Ausblenden der Eingabemaske newMovie um einen neuen Film hinzuzufügen
const displayMovieForm = () => {
    document.getElementById("newMovie").style.color = "white";

    // Eingabemaske für neuen Film
    document.getElementById("newMovie").innerHTML = `
    <form id="newMovieForm" onsubmit="return false">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Title">
                <label for="year">Year:</label>
                <input type="text" id="year" name="year" placeholder="Year">
                <label for="director">Director:</label>
                <input type="text" id="director" name="director" placeholder="Director">
                <label for="duration">Duration:</label>
                <input type="text" id="duration" name="duration" placeholder="Duration">
                <label for="genre">Genre:</label>
                <input type="text" id="genre" name="genre" placeholder="Genre">
                <label for="rating">Rating:</label>
                <input type="text" id="rating" name="rating" placeholder="Rating">
                <label for="poster">Poster:</label>
                <input type="text" id="poster" name="poster" placeholder="Poster">
                <button type="button" id="submit">Add movie</button>
            </form>`

    // Eventlistener, der die Funktion addMovie ausführt, sobald der Button "Add movie" geklickt wird
    document.getElementById("submit").addEventListener("click", addMovie);

    // Anzeigen und Ausblenden der Eingabemaske
    // Wenn der Button "Add a Movie?" oder "Add another Movie?" heißt, wird die Eingabemaske angezeigt ansonten ausgeblendet.
    if (document.getElementById("addMovie").textContent === "Add a Movie?" || document.getElementById("addMovie").textContent === "Add another Movie?") {
        document.getElementById("newMovie").style.visibility = "visible";
        document.getElementById("addMovie").textContent = "Hide Form";
    }
    else {
        (document.getElementById("newMovie").style.visibility = "visible");
        document.getElementById("newMovie").style.visibility = "";
        document.getElementById("addMovie").textContent = "Add a Movie?";
    }
};

// Eventlistener, der die Funktion displayMovieForm ausführt, sobald der Button "Add a Movie?" geklickt wird
document.getElementById("addMovie").addEventListener("click", displayMovieForm);

// Funktion, die die Eingaben aus der Eingabemaske newMovie in ein Array speichert und an das Array moviesPlus pusht

const addMovie = () => {
    const title = document.getElementById("title").value; // Eingabes Titels als title
    const year = document.getElementById("year").value; // Eingabes Jahres als year
    const producer = document.getElementById("director").value; // Eingabes Regisseurs als producer
    const duration = document.getElementById("duration").value; // Eingabes Dauer als duration
    const genre = document.getElementById("genre").value; // Eingabes Genres als genre
    const rating = document.getElementById("rating").value; // Eingabes Ratings als rating
    const poster = document.getElementById("poster").value; // Eingabes Posters als poster
    const imdbID = ""; // leere ID
    const movie = [title, year, producer, duration, genre, rating, imdbID, poster]; // Eingaben werden in ein Array gespeichert
    moviesPlus.push(movie); // Array wird an das Array moviesPlus gepusht
    // Eingabemaske wird geleert und Text wird angezeigt und die Farbe des Textes wird geändert
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("director").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("rating").value = "";
    // Erfolgsnachricht wird angezeigt und die Farbe des Textes wird geändert.
    document.getElementById("newMovie").textContent = "Movie added to the database!";
    document.getElementById("newMovie").style.color = "red";
    document.getElementById("addMovie").textContent = "Add another Movie?";
    for (let i = 0; i < moviesPlus.length; i++) {
        movieContainer.appendChild(movieElement(moviesPlus[i]));
    }
    return addMovie;
}