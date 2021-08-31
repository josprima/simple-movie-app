import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

import { getMovieDetail } from '../api/client';

const Detail = () => {
  const { imdbId } = useParams('');
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await getMovieDetail(imdbId);
        setMovie(data);
        setLoading(false)
      } catch (error) {
        // TODO: add error handling
        setLoading(false)
      }
    }

    fetchData();
  }, [imdbId]);

  if (isLoading) {
    return <MovieCardSkeleton />
  }

  return (
    <MovieCard
      imgUrl={movie.Poster}
      title={movie.Title}
      year={movie.Year}
    />
  )
}

export default Detail;
