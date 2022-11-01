import { Notify } from 'notiflix';
import { Report } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import createFilmMarkup from './customFunction/funcrionRender';
import cleanRender from './customFunction/functionCleanRender';
import fetchGenreId from './customFunction/fetchGenreId';
import fetchFilmsTrends from './customFunction/fetchFilmsTrends';

// import './css/styles.css';
import '../css/index.css';

let genreIdArr = [];
// let genreName = [];

fetchGenreId()
  .then(genreId => {
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

let page = 1;
let totalPage;
let currentPage;
let totalHitsPhotos;
let inputValue = '';
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.films-gallery'),
  paginationEl: document.querySelector('.pagination'),
};
// refs.formEl.addEventListener('submit', onFormSubmit);

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   page = 1;
//   inputValue = evt.target.elements.searchQuery.value.toLowerCase().trim();
//   fetchFilms(inputValue, page).then(response => {
//     cleanRender(refs.galleryEl);
//   });
// }

//---- создает страницу трендов
fetchFilmsTrends(page).then(response => {
  // getGenreName(response.results);
  const imgMarkUp = createFilmMarkup(response.results);
  refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
  console.log(response);
  totalPage = response.total_pages;
  if (totalPage > 1) {
    displayPagination(response.results);
    displayPaginationBtn();
  }
  // console.log(response.data.results);
  // console.log(response.data.results.original_name);
});
//---------------------

// --- жанры
export default function getGenreName(genre_ids) {
  let genreName = [];
  genre_ids.forEach(genre_id => {
    genreName.push(genreIdArr.find(genre => genre.id === genre_id).name);
  });
  return genreName;
}
//-------------------
//----- Pagination -----
function displayPagination(arrFilms) {
  console.log(page + 3);
  refs.paginationEl.innerHTML = '<ul class="pagination__list list"></ul>';
  const paginationListEl = document.querySelector('.pagination__list');
  for (let i = 1; i <= 9; i++) {
    paginationListEl.insertAdjacentHTML(
      'beforeend',
      `<li class="pagination__item item${i}"></li>`
    );
  }

  paginationListEl.firstChild.textContent = '1';
  paginationListEl.lastChild.textContent = totalPage;

  if (page < 6) {
    for (let i = 2; i <= 7; i++) {
      const pageA = `.item${i}`;
      paginationListEl.querySelector(pageA).textContent = i;
    }
    paginationListEl.querySelector('.item8').textContent = '...';
  }
}
function displayPaginationBtn() {}
// '' function fetchFilmsTrends() {
//   page = 1;
//   fetchFilms(page).
// }
// if (inputValue === '') {
//   cleanRender(refs.galleryEl);
//   Report.info('Please', 'Fill in the search field!', 'Okay', {
//     backOverlayClickToClose: true,
//   });
//   return;
// }
//       const imgMarkUp = createSmallImgMarkup(response.data.hits);
//       refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
//       if (response.data.totalHits <= perPage) {
//         refs.loadMoreBtnEl.setAttribute('hidden', true);
//         Notify.warning(
//           'We are sorry, but you have reached the end of search results.',
//           optionsNotify
//         );
//       }
//     })
//     .catch(error => console.log(error));
// }

// function onLoad() {
//   if (inputValue === '') {
//     return;
//   }

//   page += 1;
//   console.log(page);
//   console.log(totalPage);
//   fetchPhotos(inputValue, perPage, page).then(response => {
//     const imgMarkUp = createSmallImgMarkup(response.data.hits);
//     refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
//     // //*********************************
//     const { height: cardHeight } =
//       refs.galleryEl.firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//     //*************************************
//     lightbox.refresh();
//   });

//   if (totalHitsPhotos > 0 && page >= totalPage) {
//     console.log('Yes');
//     refs.loadMoreBtnEl.setAttribute('hidden', true);
//     Notify.warning(
//       'We are sorry, but you have reached the end of search results.',
//       optionsNotify
//     );

//     return;
// }
// ----
