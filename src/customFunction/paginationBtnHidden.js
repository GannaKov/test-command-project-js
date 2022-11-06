export function paginationBtnHidden(page, paginationListEl, totalPage) {
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
