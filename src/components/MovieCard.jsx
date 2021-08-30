import css from './MovieCard.module.scss';

const MovieCard = ({
  imgUrl,
  title,
  year,
}) => (
  <div className={css.card}>
    <div className={css.card__img}>
      <img src={imgUrl} alt={title} />
    </div>
    <div className={css.card__title}>
      {title}
    </div>
  </div>
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
