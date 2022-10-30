import { Notify } from 'notiflix';
import { Report } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import fetchFilms from './customFunction/fetchFilms';
import createFilmMarkup from './customFunction/funcrionRender';
import cleanRender from './customFunction/functionCleanRender';
// import './css/styles.css';
import '../css/index.css';
let genreIdArray;
function fetchGenreId() {
  return fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=894ef72300682f1db325dae2afe3e7e2&language=en-US'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
fetchGenreId()
  .then(genreId => {
    genreIdArray = genreId.genres;
    console.log(genreId.genres);
  })
  .catch(error => console.log(error));

// -----------------

// -------------------

// const optionsNotify = {
//   position: 'center-bottom',
//   showOnlyTheLastOne: true,
//   timeout: 4000,
// };
let page;
let perPage = 40;
let totalPage;
let totalHitsPhotos;
let inputValue = '';
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.films-gallery'),
};
refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  page = 1;
  inputValue = evt.target.elements.searchQuery.value.toLowerCase().trim();
  fetchFilms(inputValue, page).then(response => {
    cleanRender(refs.galleryEl);
  });
}
function fetchFilmsTrends() {
  page = 1;
  fetchFilms(page).then(response => {
    console.log(response.data.results);
    const imgMarkUp = createFilmMarkup(response.data.results);
    refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
    // console.log(response.data.results.genre);
    // console.log(response.data.results.original_name);
  });
}
fetchFilmsTrends();
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
