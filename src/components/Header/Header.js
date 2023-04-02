/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import AuthDialog from '../AuthDialog/AuthDialog';
import './Header.css';

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
  };

  const handleAuthDialogOpen = () => {
    setAuthDialogOpen(true);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/" style={{ textDecoration: 'none' }}><h1>KeywordIQ</h1></a>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a href="/explore" className="header__nav-link">Explore</a>
          </li>
          <li className="header__nav-item">
            <a href="/subscriptions" className="header__nav-link">Subscriptions</a>
          </li>
        </ul>
      </nav>
      <button className="header__login-btn" onClick={handleAuthDialogOpen}>Log In</button>
      <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} />
    </header>
  );
};

export default Header;
