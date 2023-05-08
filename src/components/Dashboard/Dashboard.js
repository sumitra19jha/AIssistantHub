import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaSearch, FaImage, FaBlogger, FaFileAlt, FaEnvelope } from "react-icons/fa";

import "./Dashboard.css";
import Sidebar from "./Sidebar";
import ProjectHistory from "../ProjectHistory/ProjectHistory";
import SeoOptimisationDialog from "../SeoOptimisationDialog/SeoOptimisationDialog";
import SocialMediaPostDialog from "../SocialMediaPostDialog/SocialMediaPostDialog";
import ContentGenerationDialog from "../ContentCreationDialog/ContentGenerationDialog";
import OptionComponent from "./OptionComponent/OptionComponent";

const Dashboard = () => {
    const [showContentGenerationDialog, setShowContentGenerationDialog] = useState(false);
    const [showSeoOptimisationDialog, setShowSeoOptimisationDialog] = useState(false);
    const [showSocialMediaPostDialog, setShowSocialMediaPostDialog] = useState(false);
    const [selectedAI, setSelectedAI] = useState("Proton");
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    /*
    const handleUploadClick = (event) => {
        event.preventDefault();
    };
    */

    const toggleMobileSidebar = () => {
        setShowMobileSidebar(!showMobileSidebar);
    };

    const handleAIChange = (event) => {
        setSelectedAI(event.target.value);
    };

    const handleSocialMediaPostOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowSocialMediaPostDialog(true);
        }
    };

    const handleCloseSocialMediaPostDialog = () => {
        setShowSocialMediaPostDialog(false);
    };

    /*
    const handleOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowContentGenerationDialog(true);
        }
    };
    */

    const handleSeoOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowSeoOptimisationDialog(true);
        }
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

    const renderHamburgerIconAndAiSelect = () => {
        return (
            <div className="dashboard__ai-selection">
                <div className="dashboard__hamburger-icon" onClick={toggleMobileSidebar}>
                    <FaBars />
                </div>
                <select
                    name="ai"
                    id="ai-select"
                    value={selectedAI}
                    onChange={handleAIChange}
                    className="dashboard__ai-select"
                >
                    <option value="Proton">Proton AI</option>
                </select>
            </div>
        );
    };

    const renderDashboardOptions = () => {
        return (
            <div className="dashboard__dashboard-options-list">
                {/* 1. Content Generation Component */}
                {/*
                <OptionComponentWrapper
                    option="Content Generation"
                    icon={<FaFileCode className="dashboard__option-icon" />}
                    backgroundColor="#FFA07A"
                    onClick={handleOptionClick}
                    iconOption="Create"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/paper-robot.png"
                    handleUploadClick={handleUploadClick}
                />
        */}
                
                {/* 3. SEO Optimization */}
                <OptionComponentWrapper
                    option="SEO Optimization"
                    icon={<FaSearch className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/seo-lion.png"
                />

                {/* 2. Social Media Post */}
                <OptionComponentWrapper
                    option="Social Media Post"
                    icon={<FaImage className="dashboard__option-icon" />}
                    backgroundColor="#90EE90"
                    onClick={handleSocialMediaPostOptionClick}
                    iconOption="Share"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/social-media-penguin.png"
                />

                {/* 4. Blog Creation */}
                <OptionComponentWrapper
                    option="Blog Creation"
                    icon={<FaBlogger className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/blog.png"
                />

                {/* 5. Article Creation */}
                <OptionComponentWrapper
                    option="Article Creation"
                    icon={<FaFileAlt className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/article-writing.png"
                />

                {/* 6. Email Marketing */}
                <OptionComponentWrapper
                    option="Email Marketing"
                    icon={<FaEnvelope className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/email-marketing.png"
                />

                {/* 7. News Letter */}
                <OptionComponentWrapper
                    option="News Letter"
                    icon={<FaEnvelope className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/newsletter.png"
                />

                {/* 8. Product Description */}
                <OptionComponentWrapper
                    option="Product Description"
                    icon={<FaEnvelope className="dashboard__option-icon" />}
                    backgroundColor="#ADD8E6"
                    onClick={handleSeoOptionClick}
                    iconOption="Optimize"
                    imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/product-description.png"
                />
            </div>
        );
    };

    const OptionComponentWrapper = ({
        option,
        icon,
        backgroundColor,
        onClick,
        iconOption,
        imageSrc,
        handleUploadClick,
    }) => {
        return (
            <div className="dashboard__dashboard-documents-upload">
                <OptionComponent
                    option={option}
                    icon={icon}
                    backgroundColor={backgroundColor}
                    showUpload={false}
                    onClick={onClick}
                    iconOption={iconOption}
                    imageSrc={imageSrc}
                />
            </div>
        );
    };

    return (
        <div>
            <div
                className={`dashboard ${(showContentGenerationDialog || showSeoOptimisationDialog) ? "dashboard__background-blur" : ""}`}>
                <Sidebar
                    showMobileSidebar={showMobileSidebar}
                    toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="dashboard__dashboard-main">

                    {renderHamburgerIconAndAiSelect()}

                    <div className="dashboard__dashboard-content">
                        <div className="dashboard__dashboard-documents">
                            <h2>New Project</h2>
                            <div className="dashboard__dashboard-options">
                                <div className="dashboard__dashboard-options-container">
                                    {renderDashboardOptions()}
                                </div>
                            </div>
                            <h2>Project History</h2>
                            <ProjectHistory />
                        </div>
                    </div>
                </div>
            </div>
            {renderDialogs()}
        </div>
    );
};

export default Dashboard;