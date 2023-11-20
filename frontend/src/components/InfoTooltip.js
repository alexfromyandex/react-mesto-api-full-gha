import React from 'react';
import regFailed from '../images/reg-failed.svg';
import regSuccess from '../images/reg-success.svg';

export default function InfoTooltip({ tooltipInfo, setTooltipInfo }) {
  function handleClose() {
    setTooltipInfo({ isOpen: false, isRegDone: false });
  }
  if (tooltipInfo.isOpen) {
    return (
      <section className="popup popup_type_reg-reply popup_opened">
        <div className="popup__container">
          <div className="popup__content popup__content_type_announcement">
            <button
              aria-label="Закрыть"
              className="popup__button popup__button_type_cancel"
              type="button"
              onClick={handleClose}
            />
            <img
              className="popup__registration-result"
              src={tooltipInfo.isRegDone ? regSuccess : regFailed}
              alt="результат регистрации"
            />
            <p className="popup__reg-result-description">
              {tooltipInfo.isRegDone
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
