function e(e){return`https://api.themoviedb.org/3/trending/movie/day?api_key=894ef72300682f1db325dae2afe3e7e2&page=${e}`}function n(n){return fetch(e(n)).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}function t(e){let n=[];return e.forEach((e=>{n.push(r.find((n=>n.id===e)).name)})),n}function a(e){return e.map((({original_title:e,release_date:n,genre_ids:a,poster_path:i})=>{let s=t(a);s.length>2&&(s=s.slice(0,2),s.push("Other")),s=s.join(", ");return`<div class="film-card">\n      <div class="film-card__img-box">\n        <a class="film-card__link link" href="">\n        <img class="film-card__img"\n          src="https://www.themoviedb.org/t/p/w500/${i}"\n          alt=""\n        />\n        </a></div>\n      \n        <div class="film-card__info">\n          <h2 class="film-card__name film-card__item">\n            ${e}\n          </h2>\n          <p class="film-card__data film-card__item">\n            ${s} | ${new Date(n).getFullYear()}\n          </p>\n        </div>\n      \n    </div>`})).join("")}function i(e,n){const t=a(e.results);n.insertAdjacentHTML("beforeend",t)}function s(n,t){let a=[],i=[],s="";if(t<=6){for(let e=1;e<=7;e++)a.push(e),i.push(e);a.push("..."),i.push(8),a.push(n),i.push(n)}if(t>6&&t<n-5){a.push(1),i.push(1),a.push("..."),i.push(t-3);for(let e=t-2;e<=t+2;e++)a.push(e),i.push(e);a.push("..."),i.push(t+3),a.push(n),i.push(n)}if(t>=n-5){a.push(1),i.push(1),a.push("..."),i.push(n-7);for(let e=-6;e<=0;e++)a.push(n+e),i.push(n+e)}return a.forEach((n=>{let r=a.indexOf(n)+1,o=n===t?"pagination__item--active":"";s+=`<li class="pagination__item item${r}"><a data-page="${i[r-1]}" href="${e(i[r-1])}" class="link pagination__link ${o} ">${n}</a></li>`})),`<button class="btn--decrement" data-page="${t-1}" type="button" >\n    <svg data-page="${t-1}" class="pagination__icon"  width="16" height="16">\n     <use href="./images/icons.svg#icon-arrow-left"></use>\n    </svg>\n  </button>\n        <div class="pagination__wrap">\n        <ul class="pagination__list">\n        ${s} </ul>\n        </div>\n        \n        <button class="btn--increment" data-page="${t+1}" type="button" >\n    <svg class="pagination__icon" data-page="${t+1} "width="16" height="16">\n      <use href="./images/icons.svg#icon-arrow-right"></use>\n    </svg>\n  </button>`}let r=[];fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=894ef72300682f1db325dae2afe3e7e2&language=en-US").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{r=e.genres})).catch((e=>console.log(e)));const o={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".films-gallery"),paginationEl:document.querySelector(".pagination"),paginationWrapEl:document.querySelector(".pagination__wrap"),decrementBtnEl:document.querySelector('button[data-action="decrement"]'),incrementBtnEl:document.querySelector('button[data-action="increment"]')};function l(e){n(e).then((e=>{if(i(e,o.galleryEl),e.total_pages>1){const n=s(Number(e.total_pages),Number(e.page));o.paginationEl.innerHTML=n}}))}o.paginationEl.addEventListener("click",(e=>{e.preventDefault(),console.log(e.target,e.target.dataset.page),l(e.target.dataset.page),console.log("ku")})),l(1);
//# sourceMappingURL=index.95e4407a.js.map
