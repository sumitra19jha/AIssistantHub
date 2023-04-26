import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthDialog from '../AuthDialog/AuthDialog';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Import hamburger menu icon
import './Header.css';

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // State for mobile nav menu

  const toggleMobileNav = () => { // Toggle mobile nav menu
    setMobileNavOpen(!mobileNavOpen);
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleAuthDialogClose = () => {
    setAuthDialogOpen(false);
  };

  const handleAuthDialogOpen = () => {
    setAuthDialogOpen(true);
  };

  return (
    <header className="header">
      <button className="header__mobile-nav-toggle" onClick={toggleMobileNav}><AiOutlineMenu /></button>
      <div className="header__logo">
        <Link to="/" style={{ textDecoration: 'none' }}><h1>AIssistantHub</h1></Link>
      </div>

      <nav className={`header__nav ${mobileNavOpen ? 'header__nav--mobile-open' : ''}`}>
        <button className="header__mobile-nav-close" onClick={toggleMobileNav}><AiOutlineClose /></button>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className={`header__nav-link ${activePath === '/' ? 'active' : ''}`}>Home</Link>
          </li>

          <li className="header__nav-item">
            <Link to="/explore" className={`header__nav-link ${activePath === '/explore' ? 'active' : ''}`}>Explore</Link>
          </li>

          <li className="header__nav-item">
            <Link to="/subscriptions" className={`header__nav-link ${activePath === '/subscriptions' ? 'active' : ''}`}>Subscriptions</Link>
          </li>
        </ul>
      </nav>


      <button className="header__login-btn" onClick={handleAuthDialogOpen}>Log In</button>
      <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} />
    </header>
  );
};

export default Header;