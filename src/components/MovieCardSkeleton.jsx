import css from './MovieCardSkeleton.module.scss';

const MovieCardSkeleton = ({
  imgUrl,
  title,
  year,
}) => (
  <div className={css.card}>
    <div className={css.card__img} />
    <div className={css.card__title} />
  </div>
);

MovieCardSkeleton.displayName = 'MovieCardSkeleton';

export default MovieCardSkeleton;
