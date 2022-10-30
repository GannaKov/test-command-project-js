export default function createSmallImgMarkup(arrPhotos) {
  return arrPhotos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="film-card">
      <a class="film-card__link link" href="${largeImageURL}">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
          alt=""
        />
        <div class="film-card__info">
          <p class="film-card__name film-card__item">
            <b>Name</b>
          </p>
          <p class="film-card__genre film-card__item">
            <b>Genre</b>
          </p>
          <p class="film-card__year film-card__item">
            <b>Year</b>
          </p>
        </div>
      </a>
    </div>`;
      }
    )
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
