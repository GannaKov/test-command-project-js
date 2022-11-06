import fetchGenreId from './customFunction/fetchGenreId';
import { fetchFilmsTrends } from './customFunction/fetchFilmsTrends'; //Q
import { paginationRender } from './customFunction/pagination';
import { filmsTrendRender } from './customFunction/filmsTrendRender';
import { fetchFilms } from './customFunction/fetchFilmsTrends';
import '../css/index.css';
//ost
export const urlPart = 'movie/week';
export let genreIdArr = []; //не трогать

fetchGenreId()
  .then(genreId => {
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

export const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.films-gallery'),
  paginationEl: document.querySelector('.pagination'),
  paginationWrapEl: document.querySelector('.pagination__wrap'),
  decrementBtnEl: document.querySelector(`button[data-action="decrement"]`),
  incrementBtnEl: document.querySelector(`button[data-action="increment"]`),
}; //******

// let paginationLiElArr;
let paginationListEl; //**** */
// let paginationLiEl;
// let currentPageLiEl;
// let liArr;
let currentItemLi; //**** */
let newBtnNumber; //**** */
let liClass; //***** */
let page = 1;

function fetchMovies(page) {
  fetchFilms(page).then(data => {
    const destinationEl = refs.galleryEl;
    filmsTrendRender(data, destinationEl);
    let totalPage = data.total_pages;

    if (totalPage > 1) {
      const renderedPagination = paginationRender(
        Number(data.total_pages),
        Number(data.page)
      );
      refs.paginationEl.innerHTML = renderedPagination;
    }
  });
}

refs.paginationEl.addEventListener('click', e => {
  e.preventDefault();
  console.log(e.target, e.target.dataset.page);
  fetchMovies(e.target.dataset.page);
  console.log('ku');
});

// function onIncrDecrBtnElClick(evt) {
//   cleanRender(refs.galleryEl);
//   if (evt.currentTarget.dataset.action === 'increment') {
//     page = Number(page) + 1;
//   }
//   if (evt.currentTarget.dataset.action === 'decrement') {
//     page = Number(page) - 1;
//   }
//   currentPage = page;
//   fetchFilmsTrends(page, urlPart).then(data => {
//     const destinationEl = refs.galleryEl;
//     filmsTrendRender(data, destinationEl);

//     displayPagination(data.total_pages, page, currentPage);
//   });
// }
fetchMovies(page);
