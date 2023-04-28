import React, { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaShoppingCart, FaCog, FaInfoCircle } from 'react-icons/fa';

import useSession from '../useToken';
import api from "../../services/api";
import SnackbarMessage from "../SnackbarMessage";
import "./Sidebar.css";


const Sidebar = ({ showMobileSidebar, toggleMobileSidebar }) => {
    return (
        <>
            <div className="sidebar__desktop_view">
                <SidebarComponent />
            </div>

            {/* Add mobile sidebar */}
            {showMobileSidebar && (
                <div className="sidebar__mobile_view">
                    <div className="sidebar__mobile_view--close-icon">
                        <FaTimes onClick={toggleMobileSidebar} />
                    </div>
                    <SidebarComponent />
                </div>
            )}
        </>
    );
}



const SidebarComponent = () => {
    const session = useSession();
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
            const response = await api.post(
                '/user/logout',
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${session.session}`,
                    }
                }
            );

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
            <div className="sidebar__company_name">
                AIssistantHub
            </div>
            <ul>
                <li>
                    <Link to="/dashboard" className={`sidebar__page-link ${isActive("/dashboard")}`}>
                        <FaHome className="sidebar__menu-icon" />
                        My Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/user-subscription" className={`sidebar__page-link ${isActive("/user-subscription")}`}>
                        <FaShoppingCart className="sidebar__menu-icon" />
                        My Purchase
                    </Link>
                </li>
                {/* Add a link to the settings page 
                <li>
                    <Link to="/settings" className={`sidebar__page-link ${isActive("/settings")}`}>
                        <FaCog className="sidebar__menu-icon" />
                        My Settings
                    </Link>
                </li>
                */}
                {/* Add a link to the help page 
                <li>
                    <Link to="/help" className={`sidebar__page-link ${isActive("/help")}`}>
                        <FaInfoCircle className="sidebar__menu-icon" />
                        Help Center
                    </Link>
                </li>
                */}

                <li>
                    <Link className="sidebar__logout" onClick={handleLogout}>
                        {loading ?
                            <div className="sidebar__loading-spinner" />
                            : <FaSignOutAlt className="sidebar__menu-icon sidebar__logout-icon" />}

                        Logout
                    </Link>
                </li>
            </ul>
            <div className="sidebar__bottom-container">
                <div className="sidebar__frontend-version">Version 1.0.0</div>
                <Link to="/learn-more" className="sidebar__bottom-page-link">
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