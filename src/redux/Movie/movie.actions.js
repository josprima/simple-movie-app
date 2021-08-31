import { getMovies } from "../../api/client";

import {
  START_FETCH_MOVIES,
  SUCCESS_FETCH_MOVIES,
  FAILED_FETCH_MOVIES,
  FAILED_FETCH_NEXT_MOVIES,
  SET_SEARCH_KEYWORD,
  START_FETCH_NEXT_MOVIES,
  SUCCESS_FETCH_NEXT_MOVIES,
} from "./movie.types";

export const fetchMovies = () => async (dispatch, getState) => {
  dispatch({ type: START_FETCH_MOVIES });

  const movieState = getState().movie;

  try {
    const { data } = await getMovies(movieState.searchKeyword);

    if (data.Response === 'True') {
      dispatch({
        type: SUCCESS_FETCH_MOVIES,
        payload: {
          movies: data.Search,
          totalResult: Number(data.totalResults),
        },
      });
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

export const fetchNextMovies = () => async (dispatch, getState) => {
  const movieState = getState().movie;

  if (movieState.data.length >= movieState.totalResult) {
    return;
  }

  dispatch({ type: START_FETCH_NEXT_MOVIES });

  try {
    const { data } = await getMovies(movieState.searchKeyword, movieState.page + 1);

    if (data.Response === 'True') {
      dispatch({
        type: SUCCESS_FETCH_NEXT_MOVIES,
        payload: {
          movies: data.Search,
          page: movieState.page + 1,
        },
      });
    } else {
      dispatch({ type: FAILED_FETCH_NEXT_MOVIES, payload: 'Terjadi kesalahan' });
    }
  } catch (error) {
    dispatch({ type: FAILED_FETCH_NEXT_MOVIES, payload: 'Terjadi kesalahan' });
  }
};

export const setSearchKeyword = (searchValue) => (dispatch) => {
  dispatch({ type: SET_SEARCH_KEYWORD, payload: searchValue })
};
