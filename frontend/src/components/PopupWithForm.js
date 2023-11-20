export default function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  children
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__content popup__content_type_form">
          <button
            aria-label="Закрыть"
            className="popup__button popup__button_type_cancel"
            type="button"
            onClick={onClose}
          />
          <h2 className={`popup__heading popup__heading_type_${name}`}>{title}</h2>
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            {children}
            <button className="popup__button popup__button_type_submit" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
