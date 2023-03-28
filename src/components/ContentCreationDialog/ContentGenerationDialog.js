import React, { useState } from "react";
import "./ContentGenerationDialog.css";

const ContentGenerationDialog = ({ onClose }) => {
    const [contentType, setContentType] = useState("");
    const [topic, setTopic] = useState("");
    const [contentLength, setContentLength] = useState("");
    const [advancedSettings, setAdvancedSettings] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");

    const handleContentTypeChange = (event) => {
        setContentType(event.target.value);
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
        // Here, you would process the user's inputs and generate the content.
        // For now, let's just display a placeholder message.

        setGeneratedContent("Your generated content goes here!");
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
                        <option value="blog post">Blog Post</option>
                        <option value="article">Article</option>
                        <option value="listicle">Listicle</option>
                        <option value="video script">Video Script</option>
                    </select>
                </div>

                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="topic-input">
                        Provide Topic or Keyword(s):
                    </label>
                    <input className="content-generation-dialog-input" id="topic-input" type="text" value={topic} onChange={handleTopicChange} />
                </div>

                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="content-length-select">
                        Choose Content Length:
                    </label>
                    <select className="content-generation-dialog-select" id="content-length-select" value={contentLength} onChange={handleContentLengthChange}>
                        <option value="">Select Content Length</option>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
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
                        Generate Content
                    </button>
                </div>

                {generatedContent && (
                    <div className="content-generation-dialog-generated-content">
                        <label className="content-generation-dialog-label" htmlFor="generated-content-textarea">
                            Generated Content:
                        </label>
                        <textarea className="content-generation-dialog-textarea" id="generated-content-textarea" value={generatedContent} readOnly />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentGenerationDialog;