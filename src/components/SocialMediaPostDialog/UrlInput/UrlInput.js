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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
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
                setUrls([...urls, inputValue]);
                onUrlsChange([...urls, inputValue]);
                setInputValue("");
            }
        }
    };

    const removeUrl = (index) => {
        const newUrls = urls.filter((_, i) => i !== index);
        setUrls(newUrls);
        onUrlsChange(newUrls);
    };

    return (
        <div className="url-input-container">
            {urls.map((url, index) => (
                <div className="url-box" key={index}>
                    {url}
                    <button
                        className="remove-url"
                        type="button"
                        onClick={() => removeUrl(index)}
                    >
                        &times;
                    </button>
                </div>
            ))}
            {urls.length < 5 && (
                <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Example: https://example.com/ai-healthcare"
                        className="url-input"
                    />
                    <span className="url-error">{urlError}</span>
                </>
            )}
        </div>
    );
};

export default UrlInput;
