import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink
    });
  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place-info"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="placeName"
          value={placeName || ''}
          onChange={handlePlaceNameChange}
          placeholder="Название"
          className="popup__input popup__input_type_place-name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-input-error placeName-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          name="placeLink"
          value={placeLink || ''}
          onChange={handlePlaceLinkChange}
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_place-link"
          required
        />
        <span className="popup__form-input-error placeLink-error"></span>
      </label>
    </PopupWithForm>
  );
}
