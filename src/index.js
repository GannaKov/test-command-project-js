import fetchGenreId from './customFunction/fetchGenreId';
import { fetchFilmsTrends } from './customFunction/fetchFilmsTrends'; //Q
import { displayPagination } from './customFunction/pagination';
import { filmsTrendRender } from './customFunction/filmsTrendRender';

import '../css/index.css';
let page = 1; //ost
export const urlPart = 'movie/week';
export let genreIdArr = []; //не трогать

fetchGenreId()
  .then(genreId => {
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

//let totalPage; //**** */

// let currentPage = 1;

//const galleryEl = document.querySelector('.films-gallery');
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

//---- создает 1 страницу трендов
fetchFilmsTrends(page, urlPart).then(data => {
  const destinationEl = refs.galleryEl;
  filmsTrendRender(data, destinationEl);
  let totalPage = data.total_pages;
  let currentPage = 1;
  if (totalPage > 1) {
    console.log('in index 2');
    displayPagination(data.total_pages, page, currentPage);
  }
});

//----- Pagination -----

//------------------------------------

//------------------------
