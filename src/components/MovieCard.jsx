import css from './MovieCard.module.scss';

const MovieCard = ({
  imgUrl,
  title,
  year,
  onClick,
}) => (
  <div className={css.card}>
    <div className={css.card__img} onClick={onClick}>
      <img src={imgUrl} alt={title} />
    </div>
    <div className={css.card__title}>
      {title}
    </div>
  </div>
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
