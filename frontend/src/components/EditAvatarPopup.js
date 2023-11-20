import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const updatedAvatarLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: updatedAvatarLink.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="url"
          name="avatarLink"
          ref={updatedAvatarLink}
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_avatar-link"
          required
        />
        <span className="popup__form-input-error avatarLink-error"></span>
      </label>
    </PopupWithForm>
  );
}
