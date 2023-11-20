import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Register = ({ setNavigation, toggleTooltip }) => {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then(res => {
        toggleTooltip({ isOpen: true, isRegDone: true });
        navigate('/signin', { replace: true });
      })
      .catch(err => {
        toggleTooltip({ isOpen: true, isRegDone: false });
      });
  };

  React.useEffect(() => {
    setNavigation({ link: 'signin', title: 'Войти' });
  }, []);

  return (
    <div className="authPage__container">
      <form onSubmit={handleSubmit} className="authPage__form">
        <p className="authPage__heading">Регистрация</p>
        <input
          name="email"
          value={formValue.email}
          onChange={handleChange}
          className="authPage__input"
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={formValue.password}
          onChange={handleChange}
          className="authPage__input"
          type="password"
          placeholder="Пароль"
        />
        <button className="authPage__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <p className="authPage__caption">
          Уже зарегистрированы?{' '}
          <Link to="/signin" className="authPage__caption-link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
