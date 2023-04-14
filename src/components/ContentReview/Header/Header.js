import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = ({ title }) => {
    const navigate = useNavigate();

    const handleArrowBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="content-editor-header">
            <div className="arrow-back-container" onClick={handleArrowBackClick}>
                <IoIosArrowBack className="arrow-back-icon" />
            </div>

            <h2 className="header-title" title={title}>
                {title}
            </h2>
            
            <button className="header-button header-button-cancel">Share</button>
            
            <div className="vertical-divider"></div>
            
            <button className="header-button header-button-create-new">
                Export
            </button>
            
            <button className="header-button header-button-save">Save</button>
        </div>
    );
};

export default Header;
