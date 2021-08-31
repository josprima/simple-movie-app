import {
  START_FETCH_MOVIES,
  SUCCESS_FETCH_MOVIES,
  FAILED_FETCH_MOVIES,
  FAILED_FETCH_NEXT_MOVIES,
  START_FETCH_NEXT_MOVIES,
  SUCCESS_FETCH_NEXT_MOVIES,
  SET_SEARCH_KEYWORD,
} from "./movie.types";

const INITIAL_STATE = {
  isLoading: false,
  isFetchNextPage: false,
  data: [],
  errorMessage: "",
  page: 1,
  totalResult: 0,
  searchKeyword: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCH_MOVIES:
      return {
        ...state,
        errorMessage: "",
        isLoading: true,
        totalResult: 0,
        page: 1,
      };

    case SUCCESS_FETCH_MOVIES:
      return {
        ...state,
        data: action.payload.movies,
        totalResult: action.payload.totalResult,
        errorMessage: "",
        isLoading: false,
      };

    case FAILED_FETCH_MOVIES:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case START_FETCH_NEXT_MOVIES:
      return {
        ...state,
        isFetchNextPage: true,
      };

    case SUCCESS_FETCH_NEXT_MOVIES:
      return {
        ...state,
        isFetchNextPage: false,
        data: [
          ...state.data,
          ...action.payload.movies,
        ],
        page: action.payload.page,
      };

    case FAILED_FETCH_NEXT_MOVIES:
      return {
        ...state,
        isFetchNextPage: false,
        errorMessage: action.payload,
      };

    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload,
      }

    default:
      return state;
  }
};

export default reducer;
