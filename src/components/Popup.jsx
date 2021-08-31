import { Link } from 'react-router-dom';

import css from './Popup.module.scss';

const Popup = ({ imageUrl, imdbId, isShow, onClose }) => {

  return (
    <div className={`${css.popup} ${isShow && css['popup--shown']}`}>
      <div className={css.popup__img}>
        <img src={imageUrl} alt={imdbId} />
      </div>
  
      <div className={css.popup__action}>
        <button className={`${css['button']} ${css['button--secondary']}`} onClick={onClose}>
          Close
        </button>
        <Link to={`/${imdbId}`} className={`${css['button']} ${css['button--primary']}`}>
          See detail
        </Link>
      </div>
    </div>
  );
};

export default Popup;
