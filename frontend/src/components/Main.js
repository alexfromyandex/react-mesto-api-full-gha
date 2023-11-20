import React from 'react';
import editIcon from '../images/edit-icon.png';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardLike,
  onCardDelete,
  setNavigation
}) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setNavigation({ link: 'sign-in', title: 'Выйти' });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__icon" onClick={onEditAvatar}>
          <img className="profile__icon-image" src={currentUser.avatar} alt="аватар" />
          <div className="profile__icon-overlay">
            <img className="profile__hover-picture" src={editIcon} alt="Смена аватара" />
          </div>
        </div>
        <div className="profile__personal-data">
          <div className="profile__name-block">
            <h1 className="profile__username">{currentUser.name}</h1>
            <button
              aria-label="Редактировать профиль"
              className="profile__button profile__button_type_edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          aria-label="Добавить карточку"
          className="profile__button profile__button_type_add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="posts">
        <ul className="photo-grid">
          {cards.map(card => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
