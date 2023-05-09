import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaShoppingCart, FaPlus } from 'react-icons/fa';

import useSession from '../useToken';
import api from "../../services/api";
import SnackbarMessage from "../SnackbarMessage";
import ContentGenerationDialog from "../ContentCreationDialog/ContentGenerationDialog";
import SeoOptimisationDialog from "../SeoOptimisationDialog/SeoOptimisationDialog";
import SocialMediaPostDialog from "../SocialMediaPostDialog/SocialMediaPostDialog";
import sidebarStyle from "./Sidebar.module.css";
import styles from "../Dashboard/Dashboard.module.css"


const Sidebar = ({ showMobileSidebar, toggleMobileSidebar }) => {
    return (
        <>
            <div className={styles.sidebar__desktop_view}>
                <SidebarComponent />
            </div>

            {/* Add mobile sidebar */}
            {showMobileSidebar && (
                <div className={styles.sidebar__mobile_view}>
                    <div className={styles.sidebar__mobile_view__close_icon}>
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

    const [showContentGenerationDialog, setShowContentGenerationDialog] = useState(false);
    const [showSeoOptimisationDialog, setShowSeoOptimisationDialog] = useState(false);
    const [showSocialMediaPostDialog, setShowSocialMediaPostDialog] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? sidebarStyle.active_link : "";
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

    const handleSocialMediaPostOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowSocialMediaPostDialog(true);
        }
    };

    const handleSeoOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowSeoOptimisationDialog(true);
        }
    };

    const handleCloseSocialMediaPostDialog = () => {
        setShowSocialMediaPostDialog(false);
    };

    const handleCloseContentGenerationDialog = () => {
        setShowContentGenerationDialog(false);
    };

    const handleCloseSeoContentGenerationDialog = () => {
        setShowSeoOptimisationDialog(false);
    };

    const renderDialogs = () => {
        return (
            <>
                {showContentGenerationDialog && (
                    <ContentGenerationDialog onClose={handleCloseContentGenerationDialog} />
                )}
                {showSeoOptimisationDialog && (
                    <SeoOptimisationDialog onClose={handleCloseSeoContentGenerationDialog} />
                )}
                {showSocialMediaPostDialog && (
                    <SocialMediaPostDialog onClose={handleCloseSocialMediaPostDialog} />
                )}
            </>
        );
    };

    return (
        <div className={sidebarStyle.sidebar}>
            
            <div className={sidebarStyle.sidebar__top}>
                <div className={sidebarStyle.sidebar__company_name}>
                    <select className={sidebarStyle.header__ai_dropdown}>
                        <option value="ai1">Content Writer AI</option>
                        <option value="ai2">AI 2</option>
                        <option value="ai3">AI 3</option>
                    </select>
                </div>
            </div>

            <div className={sidebarStyle.sidebar__mid}>
                <ul>
                    <li>
                        <Link to="/dashboard" className={`${sidebarStyle.sidebar__page_link} ${isActive("/dashboard")}`}>
                            <FaHome className={sidebarStyle.sidebar__menu_icon} />
                            My Dashboard
                        </Link>
                        <div className={sidebarStyle.sidebar__form_divider} />
                        <div className={sidebarStyle.sidebar__submenu}>
                            <li>
                                <Link
                                    className={`${sidebarStyle.sidebar__page_link} ${isActive("/content-generation")}`}
                                    onClick={handleSeoOptionClick}
                                >
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    SEO Optimisation
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`${sidebarStyle.sidebar__page_link} ${isActive("/social-media-post")}`}
                                    onClick={handleSocialMediaPostOptionClick}
                                >
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    Social Media Post
                                </Link>
                            </li>
                            <li>
                                <Link to="/seo-optimization" className={`${sidebarStyle.sidebar__page_link} ${isActive("/seo-optimization")}`}>
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    Blog Creation
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog-creation" className={`${sidebarStyle.sidebar__page_link} ${isActive("/blog-creation")}`}>
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    Article Writing
                                </Link>
                            </li>
                            <li>
                                <Link to="/article-creation" className={`${sidebarStyle.sidebar__page_link} ${isActive("/article-creation")}`}>
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    Email Marketing
                                </Link>
                            </li>
                            <li>
                                <Link to="/newsletter" className={`${sidebarStyle.sidebar__page_link} ${isActive("/newsletter")}`}>
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    News Letter
                                </Link>
                            </li>
                            <li>
                                <Link to="/product-description" className={`${sidebarStyle.sidebar__page_link} ${isActive("/product-description")}`}>
                                    <FaPlus className={sidebarStyle.sidebar__menu_icon} />
                                    Product Description
                                </Link>
                            </li>
                        </div>

                    </li>

                    <li>
                        <Link to="/user-subscription" className={`${sidebarStyle.sidebar__page_link} ${isActive("/user-subscription")}`}>
                            <FaShoppingCart className={sidebarStyle.sidebar__menu_icon} />
                            My Purchase
                        </Link>
                        <div className={sidebarStyle.sidebar__form_divider} />
                    </li>
                    {/* Add a link to the settings page 
                <li>
                    <Link to="/settings" className={`${sidebarStyle.sidebar__page_link} ${isActive("/settings")}`}>
                        <FaCog className={sidebarStyle.sidebar__menu_icon} />
                        My Settings
                    </Link>
                </li>
                */}
                    {/* Add a link to the help page 
                <li>
                    <Link to="/help" className={`${sidebarStyle.sidebar__page_link} ${isActive("/help")}`}>
                        <FaInfoCircle className={sidebarStyle.sidebar__menu_icon} />
                        Help Center
                    </Link>
                </li>
                */}

                    <li>
                        <Link className={sidebarStyle.sidebar__logout} onClick={handleLogout}>
                            {loading ?
                                <div className={sidebarStyle.sidebar__loading_spinner} />
                                : <FaSignOutAlt className={`${sidebarStyle.sidebar__menu_icon} ${sidebarStyle.sidebar__logout_icon}`} />}
                            Logout
                        </Link>
                        <div className={sidebarStyle.sidebar__form_divider} />
                    </li>
                </ul>
            </div>
            {/* Mid Section Ended */}
            <div className={sidebarStyle.sidebar__bottom}>
                <div className={sidebarStyle.sidebar__bottom_container}>
                    <div className={sidebarStyle.sidebar__frontend_version}>Version 1.0.0</div>
                    <Link to="/learn-more" className={sidebarStyle.sidebar__bottom_page_link}>
                        Learn More
                    </Link>
                </div>
            </div>
            <SnackbarMessage
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={apiError}
            />
            {renderDialogs()}
        </div>
    );
};

export default Sidebar;