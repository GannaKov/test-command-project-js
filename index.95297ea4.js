!function(){function t(t,e){return fetch("".concat("https://api.themoviedb.org/3/trending/").concat(e,"?api_key=").concat("894ef72300682f1db325dae2afe3e7e2","&page=").concat(t)).then((function(t){if(!t.ok)throw new Error(t.status);return t.json()}))}function e(t,e,n){t<6&&e.classList.add("item--hidden-mob--1"),t>=6&&t<=n-5&&e.classList.add("item--hidden-mob--2"),t>n-5&&e.classList.add("item--hidden-mob--3")}function n(t){t.innerHTML=""}function i(t){var e=[];return t.forEach((function(t){e.push(u.find((function(e){return e.id===t})).name)})),e}function a(t){return t.map((function(t){var e=t.original_title,n=t.release_date,a=t.genre_ids,r=t.poster_path,o=i(a);o.length>2&&(o=o.slice(0,2)).push("Other"),o=o.join(", ");var c=new Date(n).getFullYear();return'<div class="film-card">\n      <div class="film-card__img-box">\n        <a class="film-card__link link" href="">\n        <img class="film-card__img"\n          src="https://www.themoviedb.org/t/p/w500/'.concat(r,'"\n          alt=""\n        />\n        </a></div>\n      \n        <div class="film-card__info">\n          <h2 class="film-card__name film-card__item">\n            ').concat(e,'\n          </h2>\n          <p class="film-card__data film-card__item">\n            ').concat(o," | ").concat(c,"\n          </p>\n        </div>\n      \n    </div>")})).join("")}function r(t,e){var n=a(t.results);e.insertAdjacentHTML("beforeend",n)}function o(t,n,i){m.incrementBtnEl.addEventListener("click",l),m.decrementBtnEl.addEventListener("click",l),m.paginationWrapEl.innerHTML='<ul class="pagination__list list"></ul>',paginationListEl=document.querySelector(".pagination__list"),paginationListEl.addEventListener("click",c);for(var a=1;a<=9;a++){var r="item".concat(a),o=document.createElement("li");o.classList.add("pagination__item"),o.classList.add(r),o.innerText=n,paginationListEl.appendChild(o),Number(i)===a&&o.classList.add("pagination__item--active")}if(paginationListEl.firstChild.textContent="1",paginationListEl.lastChild.textContent=t,n<=6){for(var s=2;s<=7;s++){var u=".item".concat(s);paginationListEl.querySelector(u).textContent=s}paginationListEl.querySelector(".item8").textContent="...",e(n,paginationListEl,t)}if(n>6&&n<t-5){for(var g=-2;g<=2;g++)newBtnNumber=Number(i)+g,liClass=".item".concat(g+5),paginationListEl.querySelector(liClass).textContent=newBtnNumber,Number(i)===newBtnNumber&&(currentItemLi=document.querySelector(".pagination__item--active"),currentItemLi&&currentItemLi.classList.remove("pagination__item--active"),paginationListEl.querySelector(liClass).classList.add("pagination__item--active"));paginationListEl.querySelector(".item2").textContent="...",paginationListEl.querySelector(".item8").textContent="...",e(n,paginationListEl,t)}if(n>=t-5)for(var d=-6;d<=0;d++)newBtnNumber=t+d,liClass=".item".concat(d+9),paginationListEl.querySelector(liClass).textContent=newBtnNumber,paginationListEl.querySelector(liClass).textContent=newBtnNumber,Number(i)===newBtnNumber&&(currentItemLi=document.querySelector(".pagination__item--active"),currentItemLi&&currentItemLi.classList.remove("pagination__item--active"),paginationListEl.querySelector(liClass).classList.add("pagination__item--active")),paginationListEl.querySelector(".item2").textContent="...",e(n,paginationListEl,t)}function c(e){currentItemLi=document.querySelector(".pagination__item--active"),currentItemLi&&currentItemLi.classList.remove("pagination__item--active"),n(m.galleryEl),page=e.target.innerText,"..."===e.target.innerText&&(e.target.classList.contains("item8")&&(page=Number(e.target.previousSibling.innerText)+1),e.target.classList.contains("item2")&&(page=Number(e.target.nextSibling.innerText)-1)),currentPage=page,t(page,s).then((function(t){r(t,m.galleryEl),o(t.total_pages,page,currentPage)}))}function l(e){n(m.galleryEl),"increment"===e.currentTarget.dataset.action&&(page=Number(page)+1),"decrement"===e.currentTarget.dataset.action&&(page=Number(page)-1),currentPage=page,t(page,s).then((function(t){r(t,m.galleryEl),o(t.total_pages,page,currentPage)}))}var s="movie/week",u=[];fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=894ef72300682f1db325dae2afe3e7e2&language=en-US").then((function(t){if(!t.ok)throw new Error(t.status);return t.json()})).then((function(t){u=t.genres})).catch((function(t){return console.log(t)}));var m={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".films-gallery"),paginationEl:document.querySelector(".pagination"),paginationWrapEl:document.querySelector(".pagination__wrap"),decrementBtnEl:document.querySelector('button[data-action="decrement"]'),incrementBtnEl:document.querySelector('button[data-action="increment"]')};t(1,s).then((function(t){r(t,m.galleryEl);t.total_pages>1&&(console.log("in index 2"),o(t.total_pages,1,1))}))}();
//# sourceMappingURL=index.95297ea4.js.map
