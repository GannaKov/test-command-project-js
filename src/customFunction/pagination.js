import { paginationBtnHidden } from './paginationBtnHidden';
// import { cleanRender } from './functionCleanRender';
// import { refs } from '../../src/index';
// import { fetchFilmsTrends } from './fetchFilmsTrends';
// import { urlPart } from '../../src/index';
// import { filmsTrendRender } from './filmsTrendRender';
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

  // ----- 1 Ver
  if (currentPage <= 6) {
    for (let i = 1; i <= 7; i++) {
      paginationArrBtn.push(i);
      paginationArrAtr.push(i);
    }
    paginationArrBtn.push('...');
    paginationArrAtr.push(8);
    paginationArrBtn.push(totalPages);
    paginationArrAtr.push(totalPages);
    paginationBtnHidden(currentPage, totalPages);
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
    }
    paginationArrBtn.push('...');
    paginationArrAtr.push(currentPage + 3);

    paginationArrBtn.push(totalPages);
    paginationArrAtr.push(totalPages);
    paginationBtnHidden(currentPage, totalPages);
  }

  // ---- 3 Ver
  if (currentPage >= totalPages - 5) {
    paginationArrBtn.push(1);
    paginationArrAtr.push(1);
    paginationArrBtn.push('...');
    paginationArrAtr.push(totalPages - 7);
    for (let i = -6; i <= 0; i++) {
      paginationArrBtn.push(totalPages + i);
      paginationArrAtr.push(totalPages + i);
      paginationBtnHidden(currentPage, totalPages);
    }
  }

  let itemClass = 0;
  paginationArrBtn.forEach(pageNumber => {
    itemClass += 1;

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
  const arrowLeft = require(`../images/arrow-left.svg`);
  const arrowRight = require(`../images/arrow-right.svg`);

  return `<button class="btn--decrement" data-page="${
    currentPage - 1
  }" type="button"><img src="${arrowLeft}" data-page="${
    currentPage - 1
  }" class="pagination__icon"  width="18" height="18"
      alt="selectedItem"></button>
        <div class="pagination__wrap">
        <ul class="pagination__list list">
        ${paginationLinks} </ul>
        </div>
        
        <button class="btn--increment" data-page="${
          currentPage + 1
        }" type="button" >
    <img src="${arrowRight}" class="pagination__icon" data-page="${
    currentPage + 1
  } "width="18" height="18"></button>
 `;
}
//from svg sprite !!!!
//const foto = require(`../images/icons.svg`);
//<use href="{arrowRight}#icon-arrow-left"></use>
//------------------------------------!!!!!
//<use href="./images/icons.svg#icon-arrow-left"></use>

// function onPaginationLiElClick(evt) {
//   currentItemLi = document.querySelector('.pagination__item--active');
//   if (currentItemLi) {
//     currentItemLi.classList.remove('pagination__item--active');
//   }
//   cleanRender(refs.galleryEl);

//   page = evt.target.innerText;
//   if (evt.target.innerText === '...') {
//     if (evt.target.classList.contains('item8')) {
//       page = Number(evt.target.previousSibling.innerText) + 1;
//     }
//     if (evt.target.classList.contains('item2')) {
//       page = Number(evt.target.nextSibling.innerText) - 1;
//     }
//   }
//   currentPage = page;

//   fetchFilmsTrends(page, urlPart).then(data => {
//     const destinationEl = refs.galleryEl;
//     filmsTrendRender(data, destinationEl);

//     displayPagination(data.total_pages, page, currentPage);
//   });
// }
//---------------------------------

//data-action="increment"
