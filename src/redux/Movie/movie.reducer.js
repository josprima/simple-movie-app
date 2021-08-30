import { START_FETCH_MOVIES, SUCCESS_FETCH_MOVIES, FAILED_FETCH_MOVIES } from "./movie.types";

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  errorMessage: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCH_MOVIES:
      return {
        ...state,
        errorMessage: '',
        isLoading: true,
      };

    case SUCCESS_FETCH_MOVIES:
      return {
        data: action.payload,
        errorMessage: '',
        isLoading: false,
      };

    case FAILED_FETCH_MOVIES:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
