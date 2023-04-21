import React from 'react';
import './UserSubscriptionTabs.css';

const Tab = ({ title, active, onClick }) => {
    return (
        <div
            className={`subscription-tab ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
};

export default Tab;