import { combineReducers } from 'redux';

import movieReducer from './Movie/movie.reducer';

const rootReducer = combineReducers({
  movie: movieReducer,
});

export default rootReducer;
