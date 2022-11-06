import { paginationBtnHidden } from './paginationBtnHidden';
import { cleanRender } from './functionCleanRender';
import { refs } from '../../src/index';
import { fetchFilmsTrends } from './fetchFilmsTrends';
import { urlPart } from '../../src/index';
import { filmsTrendRender } from './filmsTrendRender';
//import { page } from '../../src/index';

export function displayPagination(totalPage, page, currentPage) {
  //console.log(arrFilms);
  refs.incrementBtnEl.addEventListener('click', onIncrDecrBtnElClick);
  refs.decrementBtnEl.addEventListener('click', onIncrDecrBtnElClick);
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
    paginationBtnHidden(page, paginationListEl, totalPage);
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
          currentItemLi.classList.remove('pagination__item--active');
        }

        paginationListEl
          .querySelector(liClass)
          .classList.add('pagination__item--active');
      }
    }
    paginationListEl.querySelector('.item2').textContent = '...';
    paginationListEl.querySelector('.item8').textContent = '...';
    paginationBtnHidden(page, paginationListEl, totalPage);
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
          currentItemLi.classList.remove('pagination__item--active');
        }

        paginationListEl
          .querySelector(liClass)
          .classList.add('pagination__item--active');
      }
      paginationListEl.querySelector('.item2').textContent = '...';
      paginationBtnHidden(page, paginationListEl, totalPage);
    }
  }
}
//------------------------------------
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
    }
  }
  currentPage = page;

  fetchFilmsTrends(page, urlPart).then(data => {
    const destinationEl = refs.galleryEl;
    filmsTrendRender(data, destinationEl);

    displayPagination(data.total_pages, page, currentPage);
  });
}
//---------------------------------
function onIncrDecrBtnElClick(evt) {
  cleanRender(refs.galleryEl);
  if (evt.currentTarget.dataset.action === 'increment') {
    page = Number(page) + 1;
  }
  if (evt.currentTarget.dataset.action === 'decrement') {
    page = Number(page) - 1;
  }
  currentPage = page;
  fetchFilmsTrends(page, urlPart).then(data => {
    const destinationEl = refs.galleryEl;
    filmsTrendRender(data, destinationEl);

    displayPagination(data.total_pages, page, currentPage);
  });
}
