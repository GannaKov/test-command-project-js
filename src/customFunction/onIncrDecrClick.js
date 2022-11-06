import { fetchFilmsTrends } from './fetchFilmsTrends';
import { cleanRender } from './functionCleanRender';
import { galleryEl } from '../index';

export function onIncrDecrBtnElClick(evt, page) {
  console.log(evt);
  galleryEl = document.querySelector('.films-gallery');
  //cleanRender(galleryEl);
  if (evt.currentTarget.dataset.action === 'increment') {
    page = Number(page) + 1;
    console.log('plus');
  }
  if (evt.currentTarget.dataset.action === 'decrement') {
    page = Number(page) - 1;
    console.log('min');
  }
  currentPage = page;
  fetchFilmsTrends(page).then(response => {
    const imgMarkUp = createFilmMarkup(response.results);
    galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
    displayPagination(response.results);
  });
}
