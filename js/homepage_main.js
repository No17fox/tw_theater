const classification = document.getElementById('classification');
const data = new MovieData(movie);
const list = document.getElementsByClassName('movie_list')[0];
let count = 0;
let movies = data.searchByGenre(['剧情']);
showMovies(20, movies, list);
classification.addEventListener('click', event => {
  count = 0;
  clearMovieList();
  switchGenre(event.target);
  movies = data.searchByGenre([event.target.innerText]);
  showMovies(20, movies, list);
});

function search() {
  let value = document.getElementById('search').value;
  count = 0;
  movies = [];
  clearInput();
  clearMovieList();
  if (data.nameToId.has(value)) {
    movies.push(data.searchByName(value));
    showMovies(1, movies, list);
  } else if (data.genresToId[value]) {
    movies = data.searchByGenre([value]);
    showMovies(20, movies, list);
  } else if (data.idToDetail.has(parseInt(value))) {
    movies.push(data.searchById(parseInt(value)));
    showMovies(1, movies, list);
  } else {
    showErrorMessege(true);
  }
}

function showMovies(num, movies, dom) {
  if (count < movies.length - num) {
    for (let i = count; i < count + num; i++) {
      generateMovieList(list, movies[i].id);
    }
    count += num;
  } else if (count < movies.length) {
    for (let i = count; i < movies.length; i++) {
      generateMovieList(list, movies[i].id);
    }
    count = movies.length;
  }
  toggleLoadMore();
}

function isAllMoviesDisplayed() {
  return count === movies.length;
}

function loadMore() {
  showMovies(20, movies, list);
}