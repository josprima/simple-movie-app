import { useState } from 'react';
import { connect } from "react-redux";

import { fetchMovies } from "./redux/Movie/movie.actions";

import MovieCard from "./components/MovieCard";
import MovieCardSkeleton from "./components/MovieCardSkeleton";
import SearchInput from "./components/SearchInput";

import css from "./App.module.scss";

function App({ movie, fetchMovies }) {
  const [isTyping, setTyping] = useState(false);

  const renderMovie = () => {
    if (movie.isLoading || isTyping) {
      return <MovieCardSkeleton />;
    }

    if (movie.errorMessage) {
      return <div>{movie.errorMessage}</div>;
    }

    return movie.data.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        imgUrl={movie.Poster}
        title={movie.Title}
        year={movie.Year}
      />
    ));
  };

  return (
    <div className={css.wrapper}>
      <SearchInput
        onChange={
          (searchValue) => {
            fetchMovies(searchValue);
            setTyping(false);
          }
        }
        onTyping={() => setTyping(true)}
      />

      {renderMovie()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {
  fetchMovies,
})(App);
