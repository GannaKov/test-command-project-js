//import {displayPagination}//!!!!

const BASEURL = 'https://api.themoviedb.org/3/trending/';
const keyApi = '894ef72300682f1db325dae2afe3e7e2';

export function buildUrl(pageNumber, mediaType, time_window) {
  const key = '894ef72300682f1db325dae2afe3e7e2';
  const baseUrl = `https://api.themoviedb.org/3/trending/`;
  // const mediaType = `movie`;
  // const time_window = `day`;
  console.log(mediaType);
  return `${baseUrl}${mediaType}/${time_window}?api_key=${key}&page=${pageNumber}`;
}

export function fetchFilmsTrends(page, urlPart) {
  return fetch(`${BASEURL}${urlPart}?api_key=${keyApi}&page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
export function fetchFilms(page, mediaType, time_window) {
  return fetch(buildUrl(page, mediaType, time_window)).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
//https://api.themoviedb.org/3/trending/movie/week?api_key=894ef72300682f1db325dae2afe3e7e2&page=2
//export default async function
//const response = await axios.get(
