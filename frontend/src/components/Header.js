import logo from '../images/header.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ pageNavigation, handleLogOut, email }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="логотип Место" />
      <div className="header__navigation">
        {pageNavigation.title === 'Выйти' && <p className="header__user-email">{email}</p>}
        <Link
          to={pageNavigation.link}
          onClick={pageNavigation.title === 'Выйти' ? handleLogOut : ''}
          className="header__togglePage"
        >
          {pageNavigation.title}
        </Link>
      </div>
    </header>
  );
}
