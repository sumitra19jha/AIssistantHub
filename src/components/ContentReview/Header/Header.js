import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = ({ title, onSave, getContentHTML }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleArrowBackClick = () => {
        navigate(-1);
    };

    const saveContent = async (event) => {
        try {
            setIsLoading(true);
            const content = getContentHTML();
            await onSave(content());
        } catch (error) {
            console.error("Some issue occurred!", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="content-editor-header">
            <div className="arrow-back-container" onClick={handleArrowBackClick}>
                <IoIosArrowBack className="arrow-back-icon" />
            </div>

            <h2 className="header-title" title={title}>{title}</h2>
            <button className="header-button header-button-cancel">Share</button>
            <div className="vertical-divider"></div>
            <button className="header-button header-button-create-new">Export</button>


            <button className="header-button header-button-save" onClick={saveContent}>{isLoading ? <div className="loading-spinner" /> : "Save"}</button>
        </div>
    );
};

export default Header;
