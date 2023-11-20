import React from 'react';
export default function Login({ handleLogin, setNavigation }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue);
    setFormValue({ email: '', password: '' });
  };

  React.useEffect(() => {
    setNavigation({ link: 'signup', title: 'Регистрация' });
  }, []);

  return (
    <div className="authPage__container">
      <form onSubmit={handleSubmit} className="authPage__form">
        <p className="authPage__heading">Вход</p>
        <input
          name="email"
          value={formValue.email || ''}
          onChange={handleChange}
          className="authPage__input"
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={formValue.password || ''}
          onChange={handleChange}
          className="authPage__input"
          type="password"
          placeholder="Пароль"
        />
        <button className="authPage__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
