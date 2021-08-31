import { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from "react-redux";

import { fetchMovies, setSearchKeyword, fetchNextMovies } from "./redux/Movie/movie.actions";

import debounce from './lib/debounce';

import MovieCard from "./components/MovieCard";
import MovieCardSkeleton from "./components/MovieCardSkeleton";
import SearchInput from "./components/SearchInput";
import Popup from "./components/Popup";

import css from "./App.module.scss";

function App({ movie, fetchMovies, setSearchKeyword, fetchNextMovies }) {
  const [isTyping, setTyping] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  console.log(selectedMovie, '<<< selected movie');

  const containerRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      const container = containerRef.current;

      if (container.getBoundingClientRect().bottom <= window.innerHeight) {
        fetchNextMovies();
      }
    }, 500),
    [containerRef]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
        onClick={() => setSelectedMovie(movie)}
      />
    ));
  };

  const clearSelectedMovie = () => {
    setSelectedMovie({});
  };

  return (
    <>
      <div className={css.wrapper}>
        <SearchInput
          onChange={
            (searchValue) => {
              setSearchKeyword(searchValue);
              fetchMovies(searchValue);
              setTyping(false);
            }
          }
          onTyping={() => setTyping(true)}
        />

        <div ref={containerRef} className={css.container}>
          {renderMovie()}
          {movie.isFetchNextPage && <MovieCardSkeleton />}
        </div>
      </div>

      <Popup
        isShow={selectedMovie.imdbID ? true : false}
        imageUrl={selectedMovie.Poster}
        imdbId={selectedMovie.imdbID}
        onClose={clearSelectedMovie}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {
  fetchMovies,
  fetchNextMovies,
  setSearchKeyword,
})(App);
