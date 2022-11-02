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

let currentPage = 1;
let totalHitsPhotos;
let inputValue = '';
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.films-gallery'),
  paginationEl: document.querySelector('.pagination'),
};
let paginationLiElArr;
let paginationListEl;
let paginationLiEl;
let currentPageLiEl;
let liArr;

//---- создает 1 страницу трендов
fetchFilmsTrends(page).then(response => {
  // getGenreName(response.results);
  const imgMarkUp = createFilmMarkup(response.results);
  refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
  console.log(response);
  totalPage = response.total_pages;
  if (totalPage > 1) {
    displayPagination(response.results);
    // displayPaginationActiveBtn(page);
    // paginationLiElArr = paginationListEl.querySelectorAll('li');
    // console.log(paginationListLiElArr);
    // for (let i = 0; i < 9; i++) {
    //   paginationLiElArr[i].addEventListener('click', onPaginationLiElClick);
    // }
    //currentPageLiEl.addEventListener('click', onPageLiElClick());
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
  console.log('i', currentPage);
  refs.paginationEl.innerHTML = '<ul class="pagination__list list"></ul>';
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
    paginationListEl.querySelector('.item8').setAttribute('action', 'plus');
  }
  // --- 2 Ver
  if (page > 6 && page <= totalPage - 5) {
    for (let i = -2; i <= +2; i++) {
      let newBtnNumber = Number(currentPage) + i;
      let liClass = `.item${i + 5}`;

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
    }
  }
}

// function displayPaginationActiveBtn(page) {
//   const pageCurrentclass = `.item${page}`;
//   currentPageLiEl = document.querySelector(pageCurrentclass);
//   currentPageLiEl.classList.add('pagination__item--active');
// }
function onPaginationLiElClick(evt) {
  console.log(evt.target.attributes.action);
  let currentItemLi = document.querySelector('.pagination__item--active');
  if (currentItemLi) {
    console.log('ja onClick');
    currentItemLi.classList.remove('pagination__item--active');
  }
  cleanRender(refs.galleryEl);
  // cleanRender(currentPageLiEl);

  // const targetPage = evt.target.innerText;
  page = evt.target.innerText;
  // if ((evt.target.innerText = '...')) {
  //   switch (evt.target.attributes.action) {
  //     case 'plus':
  //       break;
  //     case 'minus':
  //       break;
  //   }
  // }
  currentPage = page;

  //targetPage внизу
  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);

    displayPagination(response.results);
    // displayPaginationActiveBtn(page); //targetPage
  });
}
