import { createFilmMarkup } from './trendfilmsMarkup';

export function filmsTrendRender(data, destinationEl) {
  const imgMarkUp = createFilmMarkup(data.results);
  destinationEl.insertAdjacentHTML('beforeend', imgMarkUp);
}
