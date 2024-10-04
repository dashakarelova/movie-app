const API_KEY = 'api_key=854a3f6f959e64bda2c718efe9a221db';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const container = document.getElementById('container');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then((res) => res.json()).then((data) => {
        showMovies(data.results);
    });

}

function showMovies(data) {
    container.innerHTML = '';
    
    data.forEach(film => {
        const {title, poster_path, vote_average} = film;
        const movieEL = document.createElement('div')
        movieEL.classList.add("film")
        movieEL.innerHTML = `
        <div class="film__inner">
          <img src="${IMG_URL+poster_path}" class="film__card" alt="${title}">
          <div class="film__inner-blackout"></div>
        </div>
        <div class="film__info">
          <div class="film__title">${title}</div>
          <div class="film__rating ${getColor(vote_average)}">${vote_average.toFixed(1)}</div>
        </div>
        `;

        container.appendChild(movieEL);
    });
}

function getColor(vote) {
    if(vote >= 7){
        return 'green'
    } else if(vote >= 6){
        return 'gray'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
})