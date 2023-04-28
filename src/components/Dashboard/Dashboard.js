import React, { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { FaFileCode, FaSearch, FaImage } from 'react-icons/fa';

import "./Dashboard.css";
import Sidebar from "./Sidebar";
import ProjectHistory from "../ProjectHistory/ProjectHistory";
import SeoOptimisationDialog from "../SeoOptimisationDialog/SeoOptimisationDialog";
import SocialMediaPostDialog from "../SocialMediaPostDialog/SocialMediaPostDialog";
import ContentGenerationDialog from "../ContentCreationDialog/ContentGenerationDialog";
import OptionComponent from "./OptionComponent/OptionComponent";

const handleUploadClick = (event) => {
    event.preventDefault();
};

const Dashboard = () => {
    const [showContentGenerationDialog, setShowContentGenerationDialog] = useState(false);
    const [showSeoOptimisationDialog, setShowSeoOptimisationDialog] = useState(false);
    const [showSocialMediaPostDialog, setShowSocialMediaPostDialog] = useState(false);
    const [selectedAI, setSelectedAI] = useState("Proton");

    // Add state for mobile sidebar
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    // Add toggleMobileSidebar function
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

    const handleOptionClick = (event) => {
        if (event.target.tagName !== "BUTTON") {
            setShowContentGenerationDialog(true);
        }
    };

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

    return (
        <div>
            <div className={`dashboard ${(showContentGenerationDialog || showSeoOptimisationDialog) ? "dashboard__background-blur" : ""}`}>
                <Sidebar showMobileSidebar={showMobileSidebar} toggleMobileSidebar={toggleMobileSidebar} />
                <div className="dashboard__dashboard-main">
                    {/* Add Hamburger icon */}
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

                    <div className="dashboard__dashboard-content">
                        <div className="dashboard__dashboard-documents">

                            <h2>New Project</h2>
                            <div className="dashboard__dashboard-options">
                                <div className="dashboard__dashboard-options-container">
                                    <div className="dashboard__dashboard-options-list">

                                        {/* 1. Content Generation Component */}
                                        <div className="dashboard__dashboard-documents-upload">
                                            <OptionComponent
                                                option="Content Generation"
                                                icon={
                                                    <FaFileCode
                                                        className="dashboard__option-icon"
                                                    />
                                                }
                                                backgroundColor="#FFA07A"
                                                showUpload={false}
                                                onClick={handleOptionClick}
                                                iconOption="Create"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/paper-robot.png"
                                            />
                                            <div className="dashboard__options-component-upload-child">
                                                <form>
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        onChange={handleUploadClick}
                                                    />
                                                </form>
                                            </div>
                                        </div>

                                        {/* 3. Social Media Post */}
                                        <div className="dashboard__dashboard-documents-upload">
                                            <OptionComponent
                                                option="Social Media Post"
                                                icon={
                                                    <FaImage
                                                        className="dashboard__option-icon"
                                                    />
                                                }
                                                backgroundColor="#90EE90"
                                                showUpload={false}
                                                onClick={handleSocialMediaPostOptionClick}
                                                iconOption="Share"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/social-media-ai.png"
                                            />
                                            <div className="dashboard__options-component-upload-child" />
                                        </div>

                                        {/* 2. SEO Optimization */}
                                        <div className="dashboard__dashboard-documents-upload">
                                            <OptionComponent
                                                option="SEO Optimization"
                                                icon={
                                                    <FaSearch
                                                        className="dashboard__option-icon"
                                                    />
                                                }
                                                backgroundColor="#ADD8E6"
                                                showUpload={false}
                                                onClick={handleSeoOptionClick}
                                                iconOption="Optimize"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/content-creator-ai.png"
                                            />
                                            <div className="dashboard__options-component-upload-child" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h2>Project History</h2>
                            <ProjectHistory />
                        </div>
                    </div>
                </div>
            </div>
            {showContentGenerationDialog && (
                <ContentGenerationDialog onClose={handleCloseContentGenerationDialog} />
            )}
            {showSeoOptimisationDialog && (
                <SeoOptimisationDialog onClose={handleCloseSeoContentGenerationDialog} />
            )}
            {showSocialMediaPostDialog && (
                <SocialMediaPostDialog onClose={handleCloseSocialMediaPostDialog} />
            )}
        </div>
    );
};

export default Dashboard;
