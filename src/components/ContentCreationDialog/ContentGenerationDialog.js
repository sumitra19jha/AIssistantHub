import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import api from "./../../services/api";
import { CONTENT_TYPES } from "./../../utils/constants"
import "./ContentGenerationDialog.css";

const contentTypeList = [
    "Social Media Post",
    "Blog Post",
    "Article",
    "Email Marketing",
    "Newsletter",
    "Product Description",
    "Case Study",
    "Whitepaper",
    "Video Script"
];

const ContentGenerationDialog = ({ onClose }) => {
    const [contentType, setContentType] = useState("");
    const [topic, setTopic] = useState("");
    const [purposeType, setPurposeType] = useState("");
    const [platformType, setPlatformType] = useState("");
    const [contentLength, setContentLength] = useState("");
    const [advancedSettings, setAdvancedSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useNavigate();

    const handleContentTypeChange = (event) => {
        setContentType(event.target.value);
        setPurposeType("");
    };

    const handlePurposeTypeChange = (event) => {
        setPurposeType(event.target.value);
    };

    const handlePlatformTypeChange = (event) => {
        setPlatformType(event.target.value);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleContentLengthChange = (event) => {
        setContentLength(event.target.value);
    };

    const handleAdvancedSettingsClick = () => {
        setAdvancedSettings(!advancedSettings);
    };

    const handleGenerateContentClick = () => {
        if (contentType === "" || topic === "" || contentLength === "") {
            setError("Please fill in all fields before generating content.");
            return;
        }

        setError("");
        setIsLoading(true);

        api.get('/dashboard/generator/content', {
            params: {
                type: contentType.toUpperCase(),
                topic: topic,
                keywords: '',
                length: contentLength.toUpperCase(),
                platform: platformType.toUpperCase(),
                purpose: purposeType.toUpperCase(),
            }
        })
            .then((response) => {
                setIsLoading(false);
                if(response.data.success){
                    history(`/content-review?generatedContent=${encodeURIComponent(response.data.content)}&contentId=${encodeURIComponent(response.data.contentId)}`);
                }else{
                    alert(response.data.message);
                }
                
            })
            .catch((error) => {
                alert("Some issue occured!");
                setIsLoading(false);
            });
    };

    const renderPlatformOptions = () => {
        return CONTENT_TYPES[contentType].platformOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
        ));
    };

    const renderPurposeOptions = () => {
        return CONTENT_TYPES[contentType].purposeOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
        ));
    };

    return (
        <div className="content-generation-dialog">
            <div className="content-generation-dialog-header">
                <h2 className="content-generation-dialog-title">Content Generation</h2>
                <button className="content-generation-dialog-close-button" onClick={onClose}>
                    &times;
                </button>
            </div>

            <div className="content-generation-dialog-content">
                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="content-type-select">
                        Select Content Type:
                    </label>
                    <select className="content-generation-dialog-select" id="content-type-select" value={contentType} onChange={handleContentTypeChange}>
                        <option value="">Select Content Type</option>
                        {contentTypeList.map(element => (
                            <option value={element} key={element}>{element}</option>
                        ))}
                    </select>
                </div>

                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="topic-input">
                        Provide Topic:
                    </label>
                    {error && <div className="content-generation-dialog-error">{error}</div>}
                    <input className="content-generation-dialog-input" id="topic-input" type="text" value={topic} onChange={handleTopicChange} />
                </div>

                {contentType && CONTENT_TYPES[contentType].platformOptions && (
                    <div className="content-generation-dialog-field">
                        <label className="content-generation-dialog-label" htmlFor="content-platform-select">
                            Select Platform:
                        </label>
                        <select className="content-generation-dialog-select" id="content-platform-select" value={platformType} onChange={handlePlatformTypeChange}>
                            <option value="">Select Platform</option>
                            {renderPlatformOptions()}
                        </select>
                    </div>
                )}

                {contentType && CONTENT_TYPES[contentType].purposeOptions && (
                    <div className="content-generation-dialog-field">
                        <label className="content-generation-dialog-label" htmlFor="content-purpose-select">
                            Select Purpose:
                        </label>
                        <select className="content-generation-dialog-select" id="content-purpose-select" value={purposeType} onChange={handlePurposeTypeChange}>
                            <option value="">Select Purpose</option>
                            {renderPurposeOptions()}
                        </select>
                    </div>
                )}

                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="content-length-select">
                        Choose Content Length:
                    </label>
                    <select className="content-generation-dialog-select" id="content-length-select" value={contentLength} onChange={handleContentLengthChange}>
                        <option value="">Select Content Length</option>
                        <option value="short">SHORT</option>
                        <option value="medium">MEDIUM</option>
                        <option value="long">LONG</option>
                    </select>
                </div>

                <div className="content-generation-dialog-field">
                    <button className="content-generation-dialog-advanced-settings-toggle" onClick={handleAdvancedSettingsClick}>
                        {advancedSettings ? "Hide" : "Show"} Advanced Settings
                    </button>
                    {advancedSettings && (
                        <div className="content-generation-dialog-advanced-settings">
                            <label className="content-generation-dialog-label" htmlFor="target-audience-input">
                                Target Audience:
                            </label>
                            <input className="content-generation-dialog-input" id="target-audience-input" type="text" placeholder="Target Audience" />

                            <label className="content-generation-dialog-label" htmlFor="tone-input">
                                Tone:
                            </label>
                            <input className="content-generation-dialog-input" id="tone-input" type="text" placeholder="Tone" />

                            <label className="content-generation-dialog-label" htmlFor="specific-sections-input">
                                Specific Sections:
                            </label>
                            <input className="content-generation-dialog-input" id="specific-sections-input" type="text" placeholder="Specific Sections" />
                        </div>
                    )}
                </div>

                <div className="content-generation-dialog-field">
                    <button className="content-generation-dialog-generate-content-button" onClick={handleGenerateContentClick}>
                        {isLoading ? <BeatLoader size={10} color={"#ffffff"} /> : "Generate Content"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentGenerationDialog;