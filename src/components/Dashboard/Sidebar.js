import React from "react";
import { FaSignOutAlt, FaHome, FaShoppingCart, FaCog, FaInfoCircle } from 'react-icons/fa';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                AIssistantHub
            </div>
            <ul>
                <li>
                    <a href="/dashboard">
                        <FaHome className="menu-icon" />
                        My Dashboard
                    </a>
                </li>
                <li>
                    <a href="/user-subscription">
                        <FaShoppingCart className="menu-icon" />
                        My Purchase
                    </a>
                </li>
                <li>
                    <a href="/settings">
                        <FaCog className="menu-icon" />
                        My Settings
                    </a>
                </li>
                <li>
                    <a href="/help">
                        <FaInfoCircle className="menu-icon" />
                        Help Center
                    </a>
                </li>
                <li>
                    <a href="/logout" className="logout">
                        <FaSignOutAlt className="menu-icon logout-icon" />
                        Logout
                    </a>
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
