import axios from 'axios';

export const getMovies = (searchValue = '', page = 1) => {
  return axios.get(`http://www.omdbapi.com?apikey=faf7e5bb&s=${searchValue}&page=${page}`);
};
