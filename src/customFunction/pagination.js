import { paginationBtnHidden } from './paginationBtnHidden';
import { cleanRender } from './functionCleanRender';
import { refs } from '../../src/index';
import { fetchFilmsTrends } from './fetchFilmsTrends';
import { urlPart } from '../../src/index';
import { filmsTrendRender } from './filmsTrendRender';
import { buildUrl } from './fetchFilmsTrends';
//import { page } from '../../src/index';

export function paginationRender(
  totalPages,
  currentPage,
  mediaType,
  time_window
) {
  //console.log(arrFilms);
  //   refs.incrementBtnEl.addEventListener('click', onIncrDecrBtnElClick);
  //   refs.decrementBtnEl.addEventListener('click', onIncrDecrBtnElClick);
  //refs.paginationWrapEl.innerHTML = '<ul class="pagination__list list"></ul>';
  //paginationListEl = document.querySelector('.pagination__list');
  //paginationListEl.addEventListener('click', onPaginationLiElClick);
  let paginationArrBtn = [];
  let paginationArrAtr = [];
  let paginationLinks = '';

  //   for (let i = 1; i <= 9; i++) {
  //     const classEl = `item${i}`;
  // const liEl = document.createElement('li');
  // liEl.classList.add('pagination__item');
  // liEl.classList.add(classEl);
  // liEl.innerText = page;

  // paginationListEl.appendChild(liEl);
  // if (currentPage === i) {
  //   liEl.classList.add('pagination__item--active');
  // }
  //   }
  //   paginationListEl.firstChild.textContent = '1';

  //   paginationListEl.lastChild.textContent = totalPage;
  // ----- 1 Ver
  if (currentPage <= 6) {
    for (let i = 1; i <= 7; i++) {
      //const pageClass = `.item${i}`;
      //   paginationListEl.querySelector(pageClass).textContent = i;
      paginationArrBtn.push(i);
      paginationArrAtr.push(i);
    }
    paginationArrBtn.push('...');
    paginationArrAtr.push(8);
    paginationArrBtn.push(totalPages);
    paginationArrAtr.push(totalPages);
    // paginationListEl.querySelector('.item8').textContent = '...';
    // paginationBtnHidden(page, paginationListEl, totalPage);
  }
  // --- 2 Ver
  if (currentPage > 6 && currentPage < totalPages - 5) {
    paginationArrBtn.push(1);
    paginationArrAtr.push(1);
    paginationArrBtn.push('...');
    paginationArrAtr.push(currentPage - 3);
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      paginationArrBtn.push(i);
      paginationArrAtr.push(i);
      //   newBtnNumber = Number(currentPage) + i;
      //   liClass = `.item${i + 5}`;

      //   paginationListEl.querySelector(liClass).textContent = newBtnNumber;
      //   if (Number(currentPage) === newBtnNumber) {
      //     currentItemLi = document.querySelector('.pagination__item--active');
      //     if (currentItemLi) {
      //       currentItemLi.classList.remove('pagination__item--active');
      //     }

      // paginationListEl
      //   .querySelector(liClass)
      //   .classList.add('pagination__item--active');
    }
    paginationArrBtn.push('...');
    paginationArrAtr.push(currentPage + 3);
    paginationArrBtn.push(totalPages);
    paginationArrAtr.push(totalPages);
  }
  // paginationListEl.querySelector('.item2').textContent = '...';
  // paginationListEl.querySelector('.item8').textContent = '...';
  // paginationBtnHidden(page, paginationListEl, totalPage);
  //   }
  // ---- 3 Ver
  if (currentPage >= totalPages - 5) {
    paginationArrBtn.push(1);
    paginationArrAtr.push(1);
    paginationArrBtn.push('...');
    paginationArrAtr.push(totalPages - 7);
    for (let i = -6; i <= 0; i++) {
      //   newBtnNumber = totalPage + i;
      //   liClass = `.item${i + 9}`;
      paginationArrBtn.push(totalPages + i);
      paginationArrAtr.push(totalPages + i);
      //   paginationListEl.querySelector(liClass).textContent = newBtnNumber;

      //   paginationListEl.querySelector(liClass).textContent = newBtnNumber;
      //   if (Number(currentPage) === newBtnNumber) {
      //     currentItemLi = document.querySelector('.pagination__item--active');
      //     if (currentItemLi) {
      //       currentItemLi.classList.remove('pagination__item--active');
      //     }

      //     paginationListEl
      //       .querySelector(liClass)
      //       .classList.add('pagination__item--active');
      //   }
      //   paginationListEl.querySelector('.item2').textContent = '...';
      //   paginationBtnHidden(page, paginationListEl, totalPage);
      // }
    }
  }

  paginationArrBtn.forEach(pageNumber => {
    let itemClass = paginationArrBtn.indexOf(pageNumber) + 1;
    let activeClass =
      pageNumber === currentPage ? 'pagination__item--active' : '';

    paginationLinks =
      paginationLinks +
      `<li class="pagination__item item${itemClass}"><a data-page="${
        paginationArrAtr[itemClass - 1]
      }" href="${buildUrl(
        paginationArrAtr[itemClass - 1],
        mediaType,
        time_window
      )}" class="link pagination__link ${activeClass} ">${pageNumber}</a></li>`;
  });
  return `<button class="btn--decrement" data-page="${
    currentPage - 1
  }" type="button" >
    <svg data-page="${
      currentPage - 1
    }" class="pagination__icon"  width="16" height="16">
     <use href="./images/icons.svg#icon-arrow-left"></use>
    </svg>
  </button>
        <div class="pagination__wrap">
        <ul class="pagination__list">
        ${paginationLinks} </ul>
        </div>
        
        <button class="btn--increment" data-page="${
          currentPage + 1
        }" type="button" >
    <svg class="pagination__icon" data-page="${
      currentPage + 1
    } "width="16" height="16">
      <use href="./images/icons.svg#icon-arrow-right"></use>
    </svg>
  </button>`;
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

//data-action="increment"
