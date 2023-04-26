import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";
import UrlInput from "../UrlInput/UrlInput";
import SnackbarMessage from "../../SnackbarMessage";
import LengthSelection from '../LengthSelection/LengthSelection';
import PipelineSelection from "../PipelineSelection/PipelineSelection";
import SelectPlatformTab from "../SelectPlatformTab/SelectPlatformTab";

import "./CreatePostTab.css";

const CreatePostTab = ({loading, setLoading}) => {
    const [platform, setPlatform] = useState(null);
    const [topic, setTopic] = useState("");
    const [urls, setUrls] = useState([]);
    const [length, setLength] = useState("SHORT");
    const [createPipeline, setCreatePipeline] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [apiError, setApiError] = useState("");
    const history = useNavigate();

    // Validation states
    const [platformValid, setPlatformValid] = useState(true);
    const [topicValid, setTopicValid] = useState(true);
    const [lengthValid, setLengthValid] = useState(true);
    const [pipelineValid, setPipelineValid] = useState(true);

    const handleUrlsChange = (newUrls) => {
        setUrls(newUrls);
    };

    const handleLengthSelect = (selectedLength) => {
        setLength(selectedLength);
        setLengthValid(true);
    };

    const handlePlatformSelect = (selectedPlatform) => {
        setPlatform(selectedPlatform);
        setPlatformValid(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValid = true;

        if (!platform) {
            setPlatformValid(false);
            formValid = false;
        }

        if (!topic.trim()) {
            setTopicValid(false);
            formValid = false;
        }

        if (!length) {
            setLengthValid(false);
            formValid = false;
        }

        if (createPipeline === null) {
            setPipelineValid(false);
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        // Set loading to true when the form is submitted
        setLoading(true);

        // Continue with form submission
        api.post('/dashboard/social_media_post/generator/content', {
            topic: topic,
            keywords: '',
            length: length.toUpperCase(),
            platform: platform.toUpperCase(),
            urls: urls,
        })
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    history(`/content-review?generatedContent=${encodeURIComponent(response.data.content)}&contentId=${encodeURIComponent(response.data.contentId)}&topic=${encodeURIComponent(topic)}`);
                } else {
                    setSnackbarOpen(true);
                    setApiError(response.data.message);
                }

            })
            .catch((error) => {
                setLoading(false);
                setApiError("Some issue occurred!");
                setSnackbarOpen(true);
                console.log(error)
            });
    };

    // Add a function to close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClearAll = () => {
        setPlatform(null);
        setTopic("");
        setUrls([]);
        setLength("SHORT");
        setCreatePipeline(false);

        // Reset validation states
        setPlatformValid(true);
        setTopicValid(true);
        setLengthValid(true);
        setPipelineValid(true);
    };

    return (
        <div className="post-tab">
            <form onSubmit={handleSubmit}>
                <div className="form-content">

                    {/** Platform selection */}
                    <label htmlFor="topic">Platform Type <span className="required">*</span></label>
                    <SelectPlatformTab
                        onPlatformSelect={handlePlatformSelect}
                        selectedPlatform={platform}
                    />
                    {!platformValid && <div className="error-message">Please select a platform.</div>}
                    <div className="form-divider" />

                    {/** Providing the topic */}
                    <label htmlFor="topic">Provide topic for your post<span className="required">*</span></label>
                    <textarea
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Example: AI in Healthcare"
                        rows="4"
                        style={{ width: '100%' }}
                    ></textarea>
                    {!topicValid && <div className="error-message">Please provide a topic.</div>}
                    <div className="form-divider" />

                    {/** Providing the URL */}
                    <label htmlFor="url">Proton will open URL to perform research before writing post (Optional)</label>
                    <UrlInput onUrlsChange={handleUrlsChange} />
                    <div className="form-divider" />
                    
                    <label htmlFor="length">Length of the Post<span className="required"></span></label>
                    <LengthSelection
                        onLengthSelect={handleLengthSelect}
                        selectedLength={length}
                    />
                    {!lengthValid && <div className="error-message">Please select a length for the post.</div>}
                    <div className="form-divider" />
                    <label htmlFor="create-pipeline">
                        Do you want to create a pipeline?<span className="required"></span>
                    </label>
                    <PipelineSelection
                        onCreatePipelineChange={value => {
                            setCreatePipeline(value);
                            setPipelineValid(true);
                        }}
                        createPipeline={createPipeline}
                    />
                    {!pipelineValid && <div className="error-message">Please select if you want to create a pipeline or not.</div>}
                    <div className="form-divider" />
                </div><div className="button-container">
                    <button type="button" className="clear-all" onClick={handleClearAll}>
                        Clear All
                    </button>
                    <button type="submit" className="create-post">
                        {loading ? ( // Conditionally render the spinner based on the loading state
                            <Spinner animation="border" size="sm" />
                        ) : (
                            "Create Post"
                        )}
                    </button>
                </div>
            </form>
            {/* Add the SnackbarMessage component */}
            <SnackbarMessage
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={apiError}
            />
        </div>
    );
};

export default CreatePostTab;
