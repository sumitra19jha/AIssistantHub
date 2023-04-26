import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaShoppingCart, FaCog, FaInfoCircle } from 'react-icons/fa';

import api from "../../services/api";
import SnackbarMessage from "../SnackbarMessage";
import "./Sidebar.css";

const Sidebar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "active-link" : "";
    }

    // Add a function to close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await api.post('/user/logout');

            if (response.data.success) {
                localStorage.removeItem('session_id');
                setLoading(false);
                window.location.href = "/";
            } else {
                setSnackbarOpen(true);
                setLoading(false);
                setApiError(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            setApiError("Some issue occurred!");
            setSnackbarOpen(true);
        }
    };

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
                    <Link className="logout" onClick={handleLogout}>
                        {loading ? // Conditionally render the spinner based on the loading state
                            <div className="loading-spinner" />
                            : <FaSignOutAlt className="menu-icon logout-icon" />}

                        Logout
                    </Link>
                </li>
            </ul>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-text">Version 1.0.0</div>
                <Link to="/learn-more" className="sidebar-bottom-link">
                    Learn More
                </Link>
            </div>
            <SnackbarMessage
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={apiError}
            />
        </div>
    );
};

export default Sidebar;