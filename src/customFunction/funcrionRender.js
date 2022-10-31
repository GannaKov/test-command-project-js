export default function createFilmMarkup(arrFilms) {
  return arrFilms
    .map(({ original_title, release_date, genre_ids, backdrop_path }) => {
      // const genre = genre_ids.map(genre_id => {
      //   genreIdArray.find(genreIdItem => genreIdItem.id === genre_id);
      // });
      // const genrej = genreIdArray.map(genre_idIt => console.log(genre_idIt));
      // genre_ids.forEach(genre_id => {
      //   genreIdArray.find(genreIdItem => {
      //     genreIdItem.id === genre_id;
      //   });
      //   genre.push(genreIdItem.name);
      // });
      // console.log(genre);
      return `<div class="film-card">
      <a class="film-card__link link" href="">
        <img class="film-card__img"
          src="https://www.themoviedb.org/t/p/w220_and_h330_face${backdrop_path}"
          alt=""
        />
        <div class="film-card__info">
          <p class="film-card__name film-card__item">
            ${original_title}
          </p>
          <p class="film-card__genre film-card__item">
            Genre
          </p>
          <p class="film-card__year film-card__item">
            ${release_date}
          </p>
        </div>
      </a>
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
