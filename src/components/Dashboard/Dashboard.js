import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { FaFileCode, FaSearch, FaImage } from 'react-icons/fa';
import ContentGenerationDialog from "../ContentCreationDialog/ContentGenerationDialog";
import SeoOptimisationDialog from "../SeoOptimisationDialog/SeoOptimisationDialog";
import ProjectHistory from "../ProjectHistory/ProjectHistory";

const handleUploadClick = (event) => {
    event.preventDefault();
    // handle file upload logic here
};

const Dashboard = () => {
    const [showContentGenerationDialog, setShowContentGenerationDialog] = useState(false);
    const [showSeoOptimisationDialog, setShowSeoOptimisationDialog] = useState(false);

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
            <div className={`dashboard ${(showContentGenerationDialog || showSeoOptimisationDialog) ? "dashboard-blur" : ""}`}>
                <Sidebar />
                <div className="dashboard-main">
                    <div className="dashboard-content">
                        <div className="dashboard-documents">

                            <h2>New Project</h2>

                            <div className="dashboard-options">
                                <div className="dashboard-options-container">
                                    <div className="dashboard-options-list">

                                        {/* 1. Content Generation Component */}
                                        <div className="dashboard-documents-upload">
                                            <OptionComponent
                                                option="Content Generation"
                                                icon={
                                                    <FaFileCode
                                                        className="option-icon"
                                                    />
                                                }
                                                backgroundColor="#FFA07A"
                                                showUpload={false}
                                                onClick={handleOptionClick}
                                                iconOption="Create"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/paper-robot.png"
                                            />
                                            <div className="options-component-upload-child">
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
                                        <div className="dashboard-documents-upload">
                                            <OptionComponent
                                                option="Social Media Post"
                                                icon={
                                                    <FaImage
                                                        className="option-icon"
                                                    />
                                                }
                                                backgroundColor="#90EE90"
                                                showUpload={false}
                                                onClick={() => { }}
                                                iconOption="Share"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/social-media-ai.png"
                                            />
                                            <div className="options-component-upload-child" />
                                        </div>

                                        {/* 2. SEO Optimization */}
                                        <div className="dashboard-documents-upload">
                                            <OptionComponent
                                                option="SEO Optimization"
                                                icon={
                                                    <FaSearch
                                                        className="option-icon"
                                                    />
                                                }
                                                backgroundColor="#ADD8E6"
                                                showUpload={false}
                                                onClick={handleSeoOptionClick}
                                                iconOption="Optimize"
                                                imageSrc="https://pigeon-website-images.s3.us-east-2.amazonaws.com/content-creator-ai.png"
                                            />
                                            <div className="options-component-upload-child" />
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
        </div>
    );
};

const OptionComponent = ({
    option,
    icon,
    backgroundColor,
    onClick,
    iconOption,
    imageSrc
}) => {
    return (
        <div className="options-component" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <img
                src={imageSrc}
                alt={option}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px"
                }}
            />
            <div className="options-component-text-icon">
                <div className="options-component-text">{option}</div>
                <div className="options-component-parent">
                    <div className="options-component-child">
                        {icon}
                        <span>{iconOption}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;                
