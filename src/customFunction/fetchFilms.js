import axios from 'axios';
const BASEURL = 'https://api.themoviedb.org/3/trending/';
const keyApi = '894ef72300682f1db325dae2afe3e7e2';

export default async function fetchPhotos(page) {
  const response = await axios.get(
    `${BASEURL}movie/week?api_key=${keyApi}&page=${page}`
  );

  return response;
}
//https://api.themoviedb.org/3/trending/movie/week?api_key=894ef72300682f1db325dae2afe3e7e2&page=2
