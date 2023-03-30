import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src="/keywordIQ.svg" alt="Logo" width="30" height="30" /> KeywordIQ
            </div>
            <ul>
                <li>
                    <a href="/dashboard">My Dashboard</a>
                </li>
                <li>
                    <a href="/settings">Settings</a>
                </li>
                <li>
                    <a href="/account">Account Information</a>
                </li>
                <li>
                    <a href="/help">Help Center</a>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-text">Version 1.0.0</div>
                <a href="/learn-more" className="sidebar-bottom-link">
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default Sidebar;

