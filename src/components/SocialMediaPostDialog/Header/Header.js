import React from 'react';
import './Header.css';

const Header = ({onClose}) => {
    return (
        <div className="headerContainer">
            <button className="close-button-social-media-dialog" onClick={onClose}>
                &times;
            </button>
            <h1 className="title-social-media-dialog">Social Media Post</h1>
        </div>
    );
};

export default Header;
