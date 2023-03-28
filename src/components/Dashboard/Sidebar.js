import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src="/logo.svg" alt="Logo" width="30" height="30" /> My Dashboard
            </div>
            <ul>
                <li>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <a href="#">Account Information</a>
                </li>
                <li>
                    <a href="#">Help Center</a>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-text">Version 1.0.0</div>
                <a href="#" className="sidebar-bottom-link">
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default Sidebar;

