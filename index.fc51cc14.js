function e(e,n,t,i){Object.defineProperty(e,n,{get:t,set:i,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},a=n.parcelRequired7c6;function s(e,n){e<6&&(u.paginationEl.classList.contains("item--hidden-mob--2")&&u.paginationEl.classList.remove("item--hidden-mob--2"),u.paginationEl.classList.contains("item--hidden-mob--3")&&u.paginationEl.classList.remove("item--hidden-mob--3"),u.paginationEl.classList.add("item--hidden-mob--1")),e>=6&&e<=n-5&&(u.paginationEl.classList.contains("item--hidden-mob--1")&&u.paginationEl.classList.remove("item--hidden-mob--1"),u.paginationEl.classList.contains("item--hidden-mob--3")&&u.paginationEl.classList.remove("item--hidden-mob--3"),u.paginationEl.classList.add("item--hidden-mob--2")),e>n-5&&(u.paginationEl.classList.contains("item--hidden-mob--1")&&u.paginationEl.classList.remove("item--hidden-mob--1"),u.paginationEl.classList.contains("item--hidden-mob--2")&&u.paginationEl.classList.remove("item--hidden-mob--2"),u.paginationEl.classList.add("item--hidden-mob--3"))}null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,n){i[e]=n},n.parcelRequired7c6=a),a.register("kyEFX",(function(n,t){var i,a;e(n.exports,"register",(function(){return i}),(function(e){return i=e})),e(n.exports,"resolve",(function(){return a}),(function(e){return a=e}));var s={};i=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)s[n[t]]=e[n[t]]},a=function(e){var n=s[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),a.register("gqZwz",(function(e,n){e.exports=new URL(a("kyEFX").resolve("dWPdL"),import.meta.url).toString()})),a.register("cfERB",(function(e,n){e.exports=new URL(a("kyEFX").resolve("1WDdE"),import.meta.url).toString()})),a("kyEFX").register(JSON.parse('{"5ZPII":"index.fc51cc14.js","dWPdL":"arrow-left.2b7bce11.svg","1WDdE":"arrow-right.91990ac8.svg","fvck6":"index.7ad156d9.css"}'));function o(e,n,t){return`https://api.themoviedb.org/3/trending/${n}/${t}?api_key=894ef72300682f1db325dae2afe3e7e2&page=${e}`}function r(e,n,t,i){let r=[],l=[],d="";if(n<=6){for(let e=1;e<=7;e++)r.push(e),l.push(e);r.push("..."),l.push(8),r.push(e),l.push(e),s(n,e)}if(n>6&&n<e-5){r.push(1),l.push(1),r.push("..."),l.push(n-3);for(let e=n-2;e<=n+2;e++)r.push(e),l.push(e);r.push("..."),l.push(n+3),r.push(e),l.push(e),s(n,e)}if(n>=e-5){r.push(1),l.push(1),r.push("..."),l.push(e-7);for(let t=-6;t<=0;t++)r.push(e+t),l.push(e+t),s(n,e)}let c=0;r.forEach((e=>{c+=1;let a=e===n?"pagination__item--active":"";d+=`<li class="pagination__item item${c}"><a data-page="${l[c-1]}" href="${o(l[c-1],t,i)}" class="link pagination__link ${a} ">${e}</a></li>`}));const p=a("gqZwz"),u=a("cfERB");return`<button class="btn--decrement" data-page="${n-1}" type="button"><img src="${p}" data-page="${n-1}" class="pagination__icon"  width="18" height="18"\n      alt="selectedItem"></button>\n        <div class="pagination__wrap">\n        <ul class="pagination__list list">\n        ${d} </ul>\n        </div>\n        \n        <button class="btn--increment" data-page="${n+1}" type="button" >\n    <img src="${u}" class="pagination__icon" data-page="${n+1} "width="18" height="18"></button>\n `}function l(e){let n=[];return e.forEach((e=>{n.push(p.find((n=>n.id===e)).name)})),n}function d(e){return e.map((({original_title:e,release_date:n,genre_ids:t,poster_path:i})=>{let a=l(t);a.length>2&&(a=a.slice(0,2),a.push("Other")),a=a.join(", ");return`<div class="film-card">\n      <div class="film-card__img-box">\n        <a class="film-card__link link" href="">\n        <img class="film-card__img"\n          src="https://www.themoviedb.org/t/p/w500/${i}"\n          alt=""\n        />\n        </a></div>\n      \n        <div class="film-card__info">\n          <h2 class="film-card__name film-card__item">\n            ${e}\n          </h2>\n          <p class="film-card__data film-card__item">\n            ${a} | ${new Date(n).getFullYear()}\n          </p>\n        </div>\n      \n    </div>`})).join("")}function c(e,n){const t=d(e.results);n.insertAdjacentHTML("beforeend",t)}let p=[];fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=894ef72300682f1db325dae2afe3e7e2&language=en-US").then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>{p=e.genres})).catch((e=>console.log(e)));const u={galleryEl:document.querySelector(".films-gallery"),paginationEl:document.querySelector(".pagination")};function g(e){var n,t,i;(n=e,t="movie",i="week",fetch(o(n,t,i)).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).then((e=>{if(c(e,u.galleryEl),e.total_pages>1){const n=r(Number(e.total_pages),Number(e.page),"movie","week");u.paginationEl.innerHTML=n}}))}u.paginationEl.addEventListener("click",(e=>{e.preventDefault(),u.galleryEl.innerHTML="",console.log("e",e.target.dataset.page),g(e.target.dataset.page)})),g(1);
//# sourceMappingURL=index.fc51cc14.js.map
