import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaShoppingCart, FaCog, FaInfoCircle } from 'react-icons/fa';
import "./Sidebar.css";

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "active-link" : "";
    }

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                AIssistantHub
            </div>
            <ul>
                <li>
                    <Link to="/dashboard" className={`sidebar-link ${isActive("/dashboard")}`}>
                        <FaHome className="menu-icon" />
                        My Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/user-subscription" className={`sidebar-link ${isActive("/user-subscription")}`}>
                        <FaShoppingCart className="menu-icon" />
                        My Purchase
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className={`sidebar-link ${isActive("/settings")}`}>
                        <FaCog className="menu-icon" />
                        My Settings
                    </Link>
                </li>
                <li>
                    <Link to="/help" className={`sidebar-link ${isActive("/help")}`}>
                        <FaInfoCircle className="menu-icon" />
                        Help Center
                    </Link>
                </li>
                <li>
                    <a className="logout">
                        <FaSignOutAlt className="menu-icon logout-icon" />
                        Logout
                    </a>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-text">Version 1.0.0</div>
                <Link to="/learn-more" className="sidebar-bottom-link">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;