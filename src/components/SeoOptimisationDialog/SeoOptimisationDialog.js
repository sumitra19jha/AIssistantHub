import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeoOptimisationDialog.css";


const UrlTextComponent = () => {
    const [url, setUrl] = useState("");
    const handleTopicChange = (event) => {
        setUrl(event.target.value);
    };


    return (
        <div className="content-generation-dialog-field">
            <label className="content-generation-dialog-label" htmlFor="topic-input">
                Provide Url for SEO Optimisation:
            </label>
            <input className="content-generation-dialog-input" id="topic-input" type="text" value={url} onChange={handleTopicChange} />
        </div>
    );
}


const TextComponent = () => {
    const [topic, setTopic] = useState("");
    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };


    return (
        <div className="content-generation-dialog-field">
            <label className="content-generation-dialog-label" htmlFor="topic-input">
                Provide Text for SEO Optimisation:
            </label>
            <input className="content-generation-dialog-input" id="topic-input" type="text" value={topic} onChange={handleTopicChange} />
        </div>
    );
}

const TargetKeywords = () => {
    const [keywords, setKeywords] = useState("");
    const handleTopicChange = (event) => {
        setKeywords(event.target.value);
    };


    return (
        <div className="content-generation-dialog-field">
            <label className="content-generation-dialog-label" htmlFor="topic-input">
                Keywords:
            </label>
            <input className="content-generation-dialog-input" id="topic-input" type="text" value={keywords} onChange={handleTopicChange} />
        </div>
    );
}



const SeoOptimisationDialog = ({ onClose }) => {
    const [seoType, setSeoType] = useState("");
    const [generatedContent, setGeneratedContent] = useState("");
    const history = useNavigate();

    const handleContentTypeChange = (event) => {
        console.log(event.target.value)
        setSeoType(event.target.value);
    };

    const handleGenerateContentClick = () => {
        setGeneratedContent("Your generated content goes here!");
        history(`/seo-editor?generatedContent=${encodeURIComponent(generatedContent)}`);
    };

    return (
        <div className="content-generation-dialog">
            <div className="content-generation-dialog-header">
                <h2 className="content-generation-dialog-title">SEO Optimization</h2>
                <button className="content-generation-dialog-close-button" onClick={onClose}>
                    &times;
                </button>
            </div>

            <div className="content-generation-dialog-content">
                <div className="content-generation-dialog-field">
                    <label className="content-generation-dialog-label" htmlFor="content-type-select">
                        Select Type:
                    </label>
                    <select className="content-generation-dialog-select" id="content-type-select" value={seoType} onChange={handleContentTypeChange}>
                        <option value="">Select Type</option>
                        <option value="url">Url</option>
                        <option value="text">Text</option>
                    </select>
                </div>

                {seoType == "url" ? <UrlTextComponent /> : seoType == "text" ? <TextComponent /> : null}
                {seoType == "" ? null : <TargetKeywords />}

                <div className="content-generation-dialog-field">
                    <button className="content-generation-dialog-generate-content-button" onClick={handleGenerateContentClick}>
                        Optimise
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeoOptimisationDialog;