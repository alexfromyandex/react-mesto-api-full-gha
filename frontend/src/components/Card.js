import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, currentUser);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  console.log(props.card);
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `photo-grid__like-button ${
    isLiked && 'photo-grid__like-button_active'
  }`;

  return (
    <li className="photo-grid__element">
      {isOwn && <button className="photo-grid__delete-button" onClick={handleDeleteClick} />}
      <img
        className="photo-grid__picture"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="photo-grid__description-bar">
        <h2 className="photo-grid__description">{props.card.name}</h2>
        <div className="photo-grid__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="photo-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
