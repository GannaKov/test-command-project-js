// import { Notify } from 'notiflix';
// import { Report } from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

import createFilmMarkup from './customFunction/funcrionRender';
import cleanRender from './customFunction/functionCleanRender';
import fetchGenreId from './customFunction/fetchGenreId';
import fetchFilmsTrends from './customFunction/fetchFilmsTrends';

// import './css/styles.css';
import '../css/index.css';

let genreIdArr = [];

fetchGenreId()
  .then(genreId => {
    console.log('FFF', genreId);
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

let page = 1;
let totalPage; //**** */

let currentPage = 1;
// let totalHitsPhotos;
// let inputValue = '';
const refs = {
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
fetchFilmsTrends(page).then(response => {
  const imgMarkUp = createFilmMarkup(response.results);
  refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
  console.log(response);
  console.log(response.results);
  totalPage = response.total_pages;
  if (totalPage > 1) {
    displayPagination(response.results);
  }
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
  refs.incrementBtnEl.addEventListener('click', onIncrementBtnElClick);
  refs.decrementBtnEl.addEventListener('click', onDecrementBtnElClick);

  console.log('i', currentPage);
  refs.paginationWrapEl.innerHTML = '<ul class="pagination__list list"></ul>';
  paginationListEl = document.querySelector('.pagination__list');
  paginationListEl.addEventListener('click', onPaginationLiElClick);
  for (let i = 1; i <= 9; i++) {
    const classEl = `item${i}`;
    const liEl = document.createElement('li');
    liEl.classList.add('pagination__item');
    liEl.classList.add(classEl);
    liEl.innerText = page;
    paginationListEl.appendChild(liEl);
    if (Number(currentPage) === i) {
      liEl.classList.add('pagination__item--active');
    }
  }
  paginationListEl.firstChild.textContent = '1';

  paginationListEl.lastChild.textContent = totalPage;
  // ----- 1 Ver
  if (page <= 6) {
    for (let i = 2; i <= 7; i++) {
      const pageClass = `.item${i}`;
      paginationListEl.querySelector(pageClass).textContent = i;
    }
    paginationListEl.querySelector('.item8').textContent = '...';
    paginationBtnHidden();
    //paginationListEl.classList.add('item--hidden-mob--1'); //!!!!!!!

    // paginationListEl.querySelector('.item6').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item7').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item8').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item9').classList.add('item--hidden-mob');
  }
  // --- 2 Ver
  if (page > 6 && page < totalPage - 5) {
    for (let i = -2; i <= +2; i++) {
      newBtnNumber = Number(currentPage) + i;
      liClass = `.item${i + 5}`;

      paginationListEl.querySelector(liClass).textContent = newBtnNumber;
      if (Number(currentPage) === newBtnNumber) {
        currentItemLi = document.querySelector('.pagination__item--active');
        if (currentItemLi) {
          console.log('ja 2');
          currentItemLi.classList.remove('pagination__item--active');
        }

        paginationListEl
          .querySelector(liClass)
          .classList.add('pagination__item--active');
      }
    }
    paginationListEl.querySelector('.item2').textContent = '...';
    paginationListEl.querySelector('.item8').textContent = '...';
    paginationBtnHidden();
    //paginationListEl.classList.add('item--hidden-mob--2'); //!!!!!!!
    // paginationListEl.querySelector('.item8').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item9').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item1').classList.add('item--hidden-mob');
    // paginationListEl.querySelector('.item2').classList.add('item--hidden-mob');
  }
  // ---- 3 Ver
  if (page >= totalPage - 5) {
    for (let i = -6; i <= 0; i++) {
      newBtnNumber = totalPage + i;
      liClass = `.item${i + 9}`;

      paginationListEl.querySelector(liClass).textContent = newBtnNumber;

      paginationListEl.querySelector(liClass).textContent = newBtnNumber;
      if (Number(currentPage) === newBtnNumber) {
        currentItemLi = document.querySelector('.pagination__item--active');
        if (currentItemLi) {
          console.log('ja 2');
          currentItemLi.classList.remove('pagination__item--active');
        }

        paginationListEl
          .querySelector(liClass)
          .classList.add('pagination__item--active');
      }
      paginationListEl.querySelector('.item2').textContent = '...';
      paginationBtnHidden();
      // paginationListEl.classList.add('item--hidden-mob--3'); //!!!!!!
      // paginationListEl
      //   .querySelector('.item1')
      //   .classList.add('item--hidden-mob');
      // paginationListEl
      //   .querySelector('.item2')
      //   .classList.add('item--hidden-mob');
      // paginationListEl
      //   .querySelector('.item3')
      //   .classList.add('item--hidden-mob');
      // paginationListEl
      //   .querySelector('.item4')
      //   .classList.add('item--hidden-mob');
    }
  }
}

function onPaginationLiElClick(evt) {
  currentItemLi = document.querySelector('.pagination__item--active');
  if (currentItemLi) {
    currentItemLi.classList.remove('pagination__item--active');
  }
  cleanRender(refs.galleryEl);

  page = evt.target.innerText;
  if (evt.target.innerText === '...') {
    if (evt.target.classList.contains('item8')) {
      page = Number(evt.target.previousSibling.innerText) + 1;
    }
    if (evt.target.classList.contains('item2')) {
      page = Number(evt.target.nextSibling.innerText) - 1;
      console.log(page);
    }
  }
  currentPage = page;

  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);

    displayPagination(response.results);
    // displayPaginationActiveBtn(page); //targetPage
  });
}
//------------------------------------
function paginationBtnHidden() {
  if (page < 6) {
    paginationListEl.classList.add('item--hidden-mob--1');
  }
  if (page >= 6 && page <= totalPage - 5) {
    paginationListEl.classList.add('item--hidden-mob--2');
  }
  if (page > totalPage - 5) {
    paginationListEl.classList.add('item--hidden-mob--3');
  }
}
//------------------------
function onIncrementBtnElClick() {
  cleanRender(refs.galleryEl);
  page = Number(page) + 1;
  currentPage = page;
  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
    displayPagination(response.results);
  });
}
function onDecrementBtnElClick() {
  cleanRender(refs.galleryEl);
  page = Number(page) - 1;
  currentPage = page;
  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);

    displayPagination(response.results);
  });
}
