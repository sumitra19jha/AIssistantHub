import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCode,
    faSearch,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import ContentGenerationDialog from "../ContentCreationDialog/ContentGenerationDialog";
import SeoOptimisationDialog from "../SeoOptimisationDialog/SeoOptimisationDialog";

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
                                <div className="dashboard-options-list">

                                    {/* 1. Content Generation Component */}
                                    <div className=".dashboard-documents-upload">
                                        <OptionComponent
                                            option="Content Generation"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faFileCode}
                                                    className="option-icon"
                                                />
                                            }
                                            backgroundColor="#fff3cd"
                                            showUpload={false}
                                            onClick={handleOptionClick}
                                            iconOption="Create"
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

                                    {/* 2. SEO Optimization */}
                                    <div className=".dashboard-documents-upload">
                                        <OptionComponent
                                            option="SEO Optimization"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className="option-icon"
                                                />
                                            }
                                            backgroundColor="#d4edda"
                                            showUpload={false}
                                            onClick={handleSeoOptionClick}
                                            iconOption="Optimize"
                                        />
                                        <div className="options-component-upload-child" />
                                    </div>

                                    {/* 3. Social Media Post */}
                                    <div className=".dashboard-documents-upload">
                                        <OptionComponent
                                            option="Social Media Post"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faImage}
                                                    className="option-icon"
                                                />
                                            }
                                            backgroundColor="#cce5ff"
                                            showUpload={false}
                                            onClick={() => { }}
                                            iconOption="Share"
                                        />
                                        <div className="options-component-upload-child" />
                                    </div>
                                </div>
                            </div>
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
    iconOption
}) => {

    return (
        <div className="options-component" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <div className="options-component-text">{option}</div>
            <div className="options-component-parent">
                <div className="options-component-child">
                    {icon}
                    <span>{iconOption}</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;