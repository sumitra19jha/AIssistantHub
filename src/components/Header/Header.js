/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Header.css';

const Header = ({onLoginClick}) => {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>KeywordIQ</h1>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">Explore</a>
          </li>
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">Subscriptions</a>
          </li>
          <li className="header__nav-item">
            <a href="#" className="header__nav-link">Saved</a>
          </li>
        </ul>
      </nav>
      <button className="header__login-btn" onClick={onLoginClick}>Log In</button>
    </header>
  );
};

export default Header;
