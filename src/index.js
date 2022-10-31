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
let genreName = [];
fetchGenreId()
  .then(genreId => {
    genreIdArr = genreId.genres;
  })
  .catch(error => console.log(error));

// -----------------

let page = 1;
let perPage = 40;
let totalPage;
let totalHitsPhotos;
let inputValue = '';
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.films-gallery'),
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

fetchFilmsTrends(page).then(response => {
  getGenreName(response.results);
  const imgMarkUp = createFilmMarkup(response.results);
  refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
  // console.log(response.data.results.genre);
  // console.log(response.data.results.original_name);
});
// let aaaa;
function getGenreName(objFilms) {
  console.log('objFilms!', objFilms);
  console.log('genreIdArray!', genreIdArr);
  objFilms.map(({ genre_ids }) => {
    console.log(genre_ids);
    genreName = [];
    genre_ids.forEach(genre_id => {
      console.log(genre_id);
      let aaaa = genreIdArr.find(genre => genre.id === genre_id);
      // console.log(genre.id, genre.name);

      console.log(aaaa.name);
      genreName.push(aaaa.name);
    });
    console.log(genreName);
  });

  // objFilms.forEach(film => {
  //   genreIdArray.find(genreIdItem => {
  //     genreIdItem.id === film.genre_ids;
  //   });
  //   genreName.push(genreIdItem.name);
  // });
}
// function fetchFilmsTrends() {
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
