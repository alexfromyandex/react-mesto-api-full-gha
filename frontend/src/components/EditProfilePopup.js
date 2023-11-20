import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-user"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          value={name || ''}
          onChange={handleNameChange}
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__form-input-error name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          name="about"
          value={description || ''}
          onChange={handleDescriptionChange}
          placeholder="О себе"
          className="popup__input popup__input_type_job"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__form-input-error about-error"></span>
      </label>
    </PopupWithForm>
  );
}
