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
let paginationLiElArr;
let paginationListEl;
let paginationLiEl;
let currentPageLiEl;
let liArr;
// refs.formEl.addEventListener('submit', onFormSubmit);

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   page = 1;
//   inputValue = evt.target.elements.searchQuery.value.toLowerCase().trim();
//   fetchFilms(inputValue, page).then(response => {
//     cleanRender(refs.galleryEl);
//   });
// }

//---- создает 1 страницу трендов
fetchFilmsTrends(page).then(response => {
  // getGenreName(response.results);
  const imgMarkUp = createFilmMarkup(response.results);
  refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
  console.log(response);
  totalPage = response.total_pages;
  if (totalPage > 1) {
    displayPagination(response.results);
    displayPaginationActiveBtn(page);
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
  console.log('i', page);
  refs.paginationEl.innerHTML = '<ul class="pagination__list list"></ul>';
  paginationListEl = document.querySelector('.pagination__list');
  paginationListEl.addEventListener('click', onPaginationLiElClick);
  for (let i = 1; i <= 9; i++) {
    paginationListEl.insertAdjacentHTML(
      'beforeend',
      `<li class="pagination__item item${i}"></li>`
    );
    paginationListEl.firstChild.textContent = '1';
    const firstChild = paginationListEl.firstChild;
    paginationListEl.lastChild.textContent = totalPage;
  }
  liArr = paginationListEl.querySelectorAll('li');
  console.log(liArr);
  if (page <= 6) {
    for (let i = 2; i <= 7; i++) {
      const pageClass = `.item${i}`;
      paginationListEl.querySelector(pageClass).textContent = i;
    }
    paginationListEl.querySelector('.item8').textContent = '...';
  }
  if (page > 6 && page <= totalPage - 5) {
    // const curr = document.querySelector('pagination__item--active');
    // curr.classList.remove('pagination__item--active');
    // for (let i = 2; i <= 6; i++) {
    //   console.log('tut');
    //   const liEl = document.createElement('li');
    //   liEl.classList.add('pagination__item aaa');
    //   liEl.innerText = i;
    //   // paginationListEl.insertAdjacentHTML(
    //   //   'beforeend',
    //   //   `<li class="pagination__item item${i}"></li>`
    //   // );
    //   firstChild.after(liEl);
    // }

    paginationListEl.firstChild.textContent = '1';

    paginationListEl.lastChild.textContent = totalPage;
    for (let i = -2; i <= +2; i++) {
      const newBtn = Number(page) + i;
      const pageClass = `.item${i + 5}`;
      paginationListEl.querySelector(pageClass).textContent = newBtn;
    }
    paginationListEl.querySelector('.item2').textContent = '...';
    paginationListEl.querySelector('.item8').textContent = '...';
  }
}

function displayPaginationActiveBtn(page) {
  const pageCurrentclass = `.item${page}`;
  currentPageLiEl = document.querySelector(pageCurrentclass);
  currentPageLiEl.classList.add('pagination__item--active');
}
function onPaginationLiElClick(evt) {
  cleanRender(refs.galleryEl);
  cleanRender(currentPageLiEl);
  console.dir(evt.target.innerText);
  // const targetPage = evt.target.innerText;
  page = evt.target.innerText;
  console.dir(evt.target);
  //targetPage внизу
  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
    displayPagination(response.results);
    displayPaginationActiveBtn(page); //targetPage
  });
}
