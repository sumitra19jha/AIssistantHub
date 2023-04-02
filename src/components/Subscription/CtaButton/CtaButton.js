import React from 'react';
import './CtaButton.css';

export const CtaButton = ({ children, onClick }) => {
    return (
        <button className="cta-button" onClick={onClick}>
            {children}
        </button>
    );
};