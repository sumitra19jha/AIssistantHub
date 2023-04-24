import React, { useState } from "react";
import "./UrlInput.css";


const validateUrl = (input) => {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
    );
    return urlPattern.test(input);
};


const UrlInput = ({ onUrlsChange }) => {
    const [urls, setUrls] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [urlError, setUrlError] = useState("");
    const [urlType, setUrlType] = useState("Research");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTypeChange = (e) => {
        setUrlType(e.target.value);
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Tab") {
            if (!validateUrl(inputValue)) {
                setUrlError("Please enter a valid URL.");
                return;
            }

            if (inputValue.trim() !== "" && urls.length < 5) {
                if (e.key === "Tab") {
                    e.preventDefault();
                }
    
                setUrlError("");
                setUrls([...urls, { type: urlType, url: inputValue }]);
                onUrlsChange([...urls, { type: urlType, url: inputValue }]);
                setInputValue("");
            }
        }
    };

    const removeUrl = (index) => {
        const newUrls = urls.filter((_, i) => i !== index);
        setUrls(newUrls);
        onUrlsChange(newUrls);
    };

    const inputStyle = {
        borderColor: urlType === "Research" ? "blue" : "red",
    };

    return (
        <div className="url-input-container">
            <div className="url-type-input-container">
                <select value={urlType} onChange={handleTypeChange} style={{width: "fit-content"}}>
                    <option value="Research">Research</option>
                    <option value="Competition">Competition</option>
                </select>
                {urls.length < 5 && (
                    <>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Example: https://example.com/ai-healthcare"
                            className="url-input"
                            style={inputStyle}
                        />
                    </>
                )}
            </div>
            <span className="url-error">{urlError}</span>
            <div className="url-list">
                {urls.map((url, index) => (
                    <div className="url-box" key={index}>
                        {url.type}: {url.url}
                        <button
                            className="remove-url"
                            type="button"
                            onClick={() => removeUrl(index)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UrlInput;