export default function ImagePopup(props) {
  if (props.card.link !== '') {
    return (
      <section className="popup popup_type_picture popup_opened">
        <div className="popup__container">
          <button
            aria-label="Закрыть"
            className="popup__button popup__button_type_cancel"
            type="button"
            onClick={props.onClose}
          ></button>
          <img className="popup__picture" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__picture-caption">{props.card.name}</h2>
        </div>
      </section>
    );
  }
}
