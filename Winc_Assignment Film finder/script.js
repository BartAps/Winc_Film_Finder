const addMoviesToDom = movies => movies.map(movie => createLi(movie));

const mainUl = document.getElementById("listofmovies");
const radiobuttons = document.getElementsByName("radio");
const searchbar = document.getElementById("search");

const createLi = function (movie) {
    const newLi = document.createElement("li");
    mainUl.appendChild(newLi);
    newLi.appendChild(createLink(movie));
}

const createLink = function (movie) {
    const newA = document.createElement("a");
    newA.href = `http://www.imdb.com/title/${movie.imdbID}`;
    newA.appendChild(showImage(movie));
    return newA;
}

const showImage = function (movie) {
    const showImageTag = document.createElement("img");
    showImageTag.src = movie.poster;
    return showImageTag;
}

const searchFilm = () => filterMovies(search.value.toLowerCase());

const filterMovies = function (searchFilm) {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchFilm));
    removeMovies();
    addMoviesToDom(filteredMovies);
}

search.addEventListener('input', searchFilm);

const filterLatestMovies = function () {
    const filteredMovies = movies.filter(movie => movie.year > 2013);
    removeMovies();
    addMoviesToDom(filteredMovies);
}

const removeMovies = function () {
    while (mainUl.lastElementChild) {
        mainUl.removeChild(mainUl.lastElementChild);
    }
}

const changeEvent = function (e) {
    const switchEvent = e.target.value.toLowerCase();

    switch (switchEvent) {
        case 'latestmovies':
            filterLatestMovies();
            break;

        case 'allmovies':
            removeMovies();
            addMoviesToDom(movies);
            break;

        case 'avenger':
        case 'x-men':
        case 'princess':
        case 'batman':
            filterMovies(switchEvent);
            break;

        default:
            removeMovies();
            console.log("No films selected");
    }
}

Array.from(radiobuttons).forEach(radiobutton => radiobutton.addEventListener('change', changeEvent));

addMoviesToDom(movies);