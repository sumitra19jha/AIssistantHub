import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSession from '../useToken';
import SnackbarMessage from "../SnackbarMessage";
import api from "../../services/api";
import Header from "../SocialMediaPostDialog/Header/Header";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

import styles from "./SeoOptimisationDialog.module.css";

const SeoOptimisationDialog = ({ onClose }) => {
    const session = useSession();
    const [loading, setLoading] = useState(false);
    const [businessType, setBusinessType] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [industry, setIndustry] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [apiError, setApiError] = useState("");
    const history = useNavigate();

    // Validation states
    const [businessTypeValid, setBusinessTypeValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [industryValid, setIndustryValid] = useState(true);

    // Add a function to close the snackbars
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let formValid = true;

        if (!businessType.trim()) {
            setBusinessTypeValid(false);
            formValid = false;
        }

        if (!targetAudience.trim()) {
            setTargetAudienceValid(false);
            formValid = false;
        }

        if (!industry.trim()) {
            setIndustryValid(false);
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        // Set loading to true when the form is submitted
        setLoading(true);

        // Continue with form submission
        api.post('/dashboard/seo_optimisation/create', {
            business_type: businessType,
            target_audience: targetAudience,
            industry: industry,
            goals: ["Increase traffic", "Increase sales", "Increase brand awareness"],
        }, {
            headers: {
                "Authorization": `Bearer ${session.session}`,
            }
        }
        )
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    // Continue with form submission
                    console.log("Project Id:", response.data.data.id)
                    history('/seo', {
                        state: {
                            data: {
                                projectId: response.data.data.id
                            }
                        }
                    });
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

    const handleClearAll = () => {
        setBusinessType('');
        setTargetAudience('');
        setTargetAudience('');
        setIndustry('');

        // Reset validation states
        setBusinessTypeValid(true);
        setTargetAudienceValid(true);
        setIndustryValid(true);
    };

    return (loading ? <LoadingScreen /> :
        (<div className={styles.seo_dialog__overlay}>
            <div className={styles.seo_dialog}>

                <Header name="SEO Optimisation" onClose={onClose} />

                <div className={styles.seo_dialog__dialog_content}>
                    <div className={styles.seo_dialog__form_elements}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.seo_dialog__form_content}>

                                {/* Business Type */}
                                <label htmlFor="businessType">Business Type:</label>
                                <textarea
                                    type="text"
                                    id="businessType"
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                    placeholder="Enter type of business"
                                />
                                {!businessTypeValid && <div className={styles.error_message}>Please provide a Business Type.</div>}

                                {/* Target Audience */}
                                <label htmlFor="targetAudience">Target Audience:</label>
                                <textarea
                                    type="text"
                                    id="targetAudience"
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                    placeholder="Enter target audience"
                                />
                                {!targetAudienceValid && <div className={styles.error_message}>Please provide your target audience.</div>}

                                {/* Industry */}
                                <label htmlFor="industry">Industry:</label>
                                <textarea
                                    type="text"
                                    id="industry"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder="Enter type of Industry"
                                />
                                {!industryValid && <div className={styles.error_message}>Please provide a Industry.</div>}
                            </div>

                            {/* Add Buttons */}
                            <div className={styles.seo_dialog__button_container}>
                                <button type="button" className={styles.seo_dialog__clear_all} onClick={handleClearAll}>
                                    Clear All
                                </button>
                                <button type="submit" className={styles.seo_dialog__create_post}>
                                    Analyse SEO
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <SnackbarMessage
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={apiError}
            />
        </div >)
    );

};

export default SeoOptimisationDialog;