import fetchGenreId from './customFunction/fetchGenreId';
import { fetchFilmsTrends } from './customFunction/fetchFilmsTrends'; //Q
import { paginationRender } from './customFunction/pagination';
import { filmsTrendRender } from './customFunction/filmsTrendRender';
import { fetchFilms } from './customFunction/fetchFilmsTrends';
import '../css/index.css';
import { cleanRender } from './customFunction/functionCleanRender';

export let genreIdArr = []; //не трогать

fetchGenreId()
  .then(genreId => {
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

export const refs = {
  galleryEl: document.querySelector('.films-gallery'),
  paginationEl: document.querySelector('.pagination'),
  // paginationWrapEl: document.querySelector('.pagination__wrap'),
  // decrementBtnEl: document.querySelector(`button[data-action="decrement"]`),
  // incrementBtnEl: document.querySelector(`button[data-action="increment"]`),
}; //******

// let paginationListEl; //**** */

// let currentItemLi; //**** */
// let newBtnNumber; //**** */
// let liClass; //***** */
let page = 1;

function fetchMovies(page) {
  fetchFilms(page, 'movie', 'week').then(data => {
    const destinationEl = refs.galleryEl;

    filmsTrendRender(data, destinationEl);
    let totalPage = data.total_pages;

    if (totalPage > 1) {
      const renderedPagination = paginationRender(
        Number(data.total_pages),
        Number(data.page),
        'movie',
        'week'
      );
      refs.paginationEl.innerHTML = renderedPagination;
    }
  });
}

refs.paginationEl.addEventListener('click', e => {
  e.preventDefault();
  cleanRender(refs.galleryEl);
  console.log('e', e.target.dataset.page);
  fetchMovies(e.target.dataset.page);
});

fetchMovies(page);
