import { getMovies } from "../../api/client";

import {
  START_FETCH_MOVIES,
  SUCCESS_FETCH_MOVIES,
  FAILED_FETCH_MOVIES,
} from "./movie.types";

export const fetchMovies = (searchValue) => async (dispatch) => {
  dispatch({ type: START_FETCH_MOVIES });

  try {
    const { data } = await getMovies(searchValue);

    if (data.Response === 'True') {
      dispatch({ type: SUCCESS_FETCH_MOVIES, payload: data.Search });
    } else {
      if (data.Error === 'Movie not found!') {
        dispatch({ type: FAILED_FETCH_MOVIES, payload: 'Movie not found' });
      } else if (data.Error === 'Too many results.') {
        dispatch({ type: FAILED_FETCH_MOVIES, payload: 'Try to search more specific keyword' });
      } else if (data.Error === 'Incorrect IMDb ID.') {
        dispatch({ type: SUCCESS_FETCH_MOVIES, payload: [] });
      }else {
        dispatch({ type: FAILED_FETCH_MOVIES, payload: 'Terjadi kesalahan' });
      }
    }
  } catch (error) {
    dispatch({ type: FAILED_FETCH_MOVIES, payload: 'Terjadi kesalahan' });
  }
};
