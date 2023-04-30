import React from 'react';
import './UserSubscriptionTabs.css';

const Tab = ({ title, active, onClick }) => {
    return (
        <div
            className={`user-subscription-tab__subscription-tab ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
};

export default Tab;