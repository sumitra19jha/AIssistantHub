import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useSession from '../useToken';
import SnackbarMessage from "../SnackbarMessage";
import api from "../../services/api";
import Header from "../SocialMediaPostDialog/Header/Header";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

import "./SeoOptimisationDialog.css";

const SeoOptimisationDialog = ({ onClose }) => {
    const session = useSession();
    const [loading, setLoading] = useState(false);
    const [businessType, setBusinessType] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [industry, setIndustry] = useState('');
    //const [goals, setGoals] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [apiError, setApiError] = useState("");
    const history = useNavigate();

    // Validation states
    const [businessTypeValid, setBusinessTypeValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [industryValid, setIndustryValid] = useState(true);
    // const [goalsValid, setGoalsValid] = useState(true);

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

        // if (goals.length === 0) {
        //     setGoalsValid(false);
        //     formValid = false;
        // }

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
                    console.log("Project Id:",response.data.data.id)
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
        //setGoals([]);

        // Reset validation states
        setBusinessTypeValid(true);
        setTargetAudienceValid(true);
        setIndustryValid(true);
        //setGoalsValid(true);
    };

    return (loading ? <LoadingScreen /> :
        (<div className="seo-dialog__overlay">
            <div className="seo-dialog">
                <Header name="SEO Optimisation" onClose={onClose} />
                <div className="seo-dialog__dialog-content">
                    <div className="seo-dialog__form-elements">
                        <form onSubmit={handleSubmit}>
                            <div className="seo-dialog__form-content">
                                {/* Business Type */}
                                <label htmlFor="businessType">Business Type:</label>
                                <textarea
                                    type="text"
                                    id="businessType"
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                    placeholder="Enter type of business"
                                />
                                {!businessTypeValid && <div className="error-message">Please provide a Business Type.</div>}
                                <div className="form-divider" />

                                {/* Target Audience */}
                                <label htmlFor="targetAudience">Target Audience:</label>
                                <textarea
                                    type="text"
                                    id="targetAudience"
                                    value={targetAudience}
                                    onChange={(e) => setTargetAudience(e.target.value)}
                                    placeholder="Enter target audience"
                                />
                                {!targetAudienceValid && <div className="error-message">Please provide your target audience.</div>}
                                <div className="form-divider" />

                                {/* Industry */}
                                <label htmlFor="industry">Industry:</label>
                                <textarea
                                    type="text"
                                    id="industry"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder="Enter type of Industry"
                                />
                                {!industryValid && <div className="error-message">Please provide a Industry.</div>}
                                <div className="form-divider" />

                                {/* Goals 
                                <label>Goals:</label>
                                <div className="seo-dialog__form-content--checkboxes">
                                    <div className="seo-dialog__form-content--checkbox">
                                        <input
                                            type="checkbox"
                                            id="increaseRanking"
                                            value="Increase Website Ranking"
                                            checked={goals.includes('Increase Website Ranking')}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setGoals((prevGoals) => {
                                                    if (isChecked) {
                                                        return [...prevGoals, e.target.value];
                                                    } else {
                                                        return prevGoals.filter((goal) => goal !== e.target.value);
                                                    }
                                                });
                                            }}
                                        />
                                        <label type="checkbox-title" htmlFor="increaseRanking">Increase Website Ranking</label>
                                    </div>
                                    <div className="seo-dialog__form-content--checkbox">
                                        <input
                                            type="checkbox"
                                            id="driveTraffic"
                                            value="Drive More Traffic"
                                            checked={goals.includes('Drive More Traffic')}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setGoals((prevGoals) => {
                                                    if (isChecked) {
                                                        return [...prevGoals, e.target.value];
                                                    } else {
                                                        return prevGoals.filter((goal) => goal !== e.target.value);
                                                    }
                                                });
                                            }}
                                        />
                                        <label type="checkbox-title" htmlFor="driveTraffic">Drive More Traffic</label>
                                    </div>
                                    <div className="seo-dialog__form-content--checkbox">
                                        <input
                                            type="checkbox"
                                            id="improveConversion"
                                            value="Improve Conversion Rate"
                                            checked={goals.includes('Improve Conversion Rate')}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setGoals((prevGoals) => {
                                                    if (isChecked) {
                                                        return [...prevGoals, e.target.value];
                                                    } else {
                                                        return prevGoals.filter((goal) => goal !== e.target.value);
                                                    }
                                                });
                                            }}
                                        />
                                        <label type="checkbox-title" htmlFor="improveConversion">Improve Conversion Rate</label>
                                    </div>
                                    <div className="seo-dialog__form-content--checkbox">
                                        <input
                                            type="checkbox"
                                            id="buildBrandAwareness"
                                            value="Build Brand Awareness"
                                            checked={goals.includes('Build Brand Awareness')}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setGoals((prevGoals) => {
                                                    if (isChecked) {
                                                        return [...prevGoals, e.target.value];
                                                    } else {
                                                        return prevGoals.filter((goal) => goal !== e.target.value);
                                                    }
                                                });
                                            }}
                                        />
                                        <label type="checkbox-title" htmlFor="buildBrandAwareness">Build Brand Awareness</label>
                                    </div>
                                </div>
                                {!goalsValid && <div className="error-message">Please select goals.</div>}
                                <div className="form-divider" />
                                */}
                            </div>

                            {/* Add Buttons */}
                            <div className="seo-dialog__button-container">
                                <button type="button" className="seo-dialog__clear-all" onClick={handleClearAll}>
                                    Clear All
                                </button>
                                <button type="submit" className="seo-dialog__create-post">
                                    {loading ? ( // Conditionally render the spinner based on the loading state
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        "Analyse SEO"
                                    )}
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