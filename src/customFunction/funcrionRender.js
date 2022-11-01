import getGenreName from '../index.js';
export default function createFilmMarkup(arrFilms) {
  return arrFilms
    .map(({ original_title, release_date, genre_ids, poster_path }) => {
      let genres = getGenreName(genre_ids);
      const date = new Date(release_date);
      const yearRelease = date.getFullYear();
      return `<div class="film-card">
      <div class="film-card__img-box">
        <a class="film-card__link link" href="">
        <img class="film-card__img"
          src="https://www.themoviedb.org/t/p/w500/${poster_path}"
          alt=""
        />
        </a></div>
      
        <div class="film-card__info">
          <h2 class="film-card__name film-card__item">
            ${original_title}
          </h2>
          <p class="film-card__data film-card__item">
            ${genres} | ${yearRelease}
          </p>
        </div>
      
    </div>`;
    })
    .join('');
}
// `<div class="photo-card">
//         <a class="gallery__link link" href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags} loading="lazy" /></a>
//     <div class="info">
//       <p class="info-item">
//         <b>Likes ${likes}</b>
//       </p>
//       <p class="info-item">
//         <b>Views ${views}</b>
//       </p>
//       <p class="info-item">
//         <b>Comments ${comments}</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads ${downloads}</b>
//       </p>
//     </div>
//   </div>
//   `;