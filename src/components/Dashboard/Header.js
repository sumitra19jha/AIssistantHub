import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <div/>
            <div>
                <span className={classes.header__credits}>Credits Left: 100</span>
                <i className={classes.header__user_icon}></i>
            </div>
        </header>
    );
};

export default Header;