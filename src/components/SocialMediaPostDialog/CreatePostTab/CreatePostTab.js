import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import useSession from '../../useToken';
import api from "../../../services/api";
import UrlInput from "../UrlInput/UrlInput";
import SnackbarMessage from "../../SnackbarMessage";
import LengthSelection from '../LengthSelection/LengthSelection';
import PipelineSelection from "../PipelineSelection/PipelineSelection";
import SelectPlatformTab from "../SelectPlatformTab/SelectPlatformTab";

import styles from "./CreatePostTab.module.css";

const CreatePostTab = () => {
    const session = useSession();
    const [platform, setPlatform] = useState(null);
    const [topic, setTopic] = useState("");
    const [urls, setUrls] = useState([]);
    const [length, setLength] = useState("SHORT");
    const [createPipeline, setCreatePipeline] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

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

        // Continue with form submission
        api.post('/content/create', {
            topic: topic,
            keywords: '',
            length: length.toUpperCase(),
            platform: platform.toUpperCase(),
            urls: urls,
        }, {
            headers: {
                "Authorization": `Bearer ${session.session}`,
            }
        }
        )
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    history(`/content-review?topic=${encodeURIComponent(topic)}&contentId=${encodeURIComponent(response.data.contentId)}`);
                } else {
                    setSnackbarOpen(true);
                    setApiError(response.data.message);
                }

            })
            .catch((error) => {
                setLoading(false);
                setApiError("Some issue occurred!");
                setSnackbarOpen(true);
                console.log(error);
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
        <div className={styles.post_tab}>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_content}>

                    {/** Platform selection */}
                    <label htmlFor="topic">Platform Type <span className={styles.required}>*</span></label>
                    <SelectPlatformTab
                        onPlatformSelect={handlePlatformSelect}
                        selectedPlatform={platform}
                    />
                    {!platformValid && <div className={styles.error_message}>Please select a platform.</div>}


                    {/** Providing the topic */}
                    <label htmlFor="topic">Provide topic for your post<span className={styles.required}>*</span></label>
                    <textarea
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Example: AI in Healthcare"
                        rows="4"
                        style={{ width: '100%' }}
                    ></textarea>
                    {!topicValid && <div className={styles.error_message}>Please provide a topic.</div>}


                    {/** Providing the URL */}
                    <label htmlFor="url">Proton will open URL to perform research before writing post (Optional)</label>
                    <UrlInput onUrlsChange={handleUrlsChange} />


                    <label htmlFor="length">Length of the Post<span className={styles.required}></span></label>
                    <LengthSelection
                        onLengthSelect={handleLengthSelect}
                        selectedLength={length}
                    />
                    {!lengthValid && <div className={styles.error_message}>Please select a length for the post.</div>}

                    <label htmlFor="create-pipeline">
                        Do you want to create a pipeline?<span className={styles.required}></span>
                    </label>
                    <PipelineSelection
                        onCreatePipelineChange={value => {
                            setCreatePipeline(value);
                            setPipelineValid(true);
                        }}
                        createPipeline={createPipeline}
                    />
                    {!pipelineValid && <div className={styles.error_message}>Please select if you want to create a pipeline or not.</div>}
                </div>

                <div className={styles.button_container}>
                    <button type="button" className={styles.clear_all} onClick={handleClearAll}>
                        Clear All
                    </button>
                    <button type="submit" className={styles.create_post}>
                        <div className={styles.spinner_and_text}>
                            {loading && ( // Conditionally render the spinner based on the loading state
                                <CircularProgress size={24} color="primary" classes={{ svg: styles.custom_color }}/>
                            )}
                            <span className={loading ? styles.hidden : ""}>Create Post</span>
                        </div>
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
