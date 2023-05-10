import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import classes from "./SeoAnalysis.module.css";
import Dialog from './Dialog/Dialog';
import SnackbarMessage from "../SnackbarMessage";
import api from "../../services/api";
import useSession from "../useToken";
import Header from "./Header/Header";
import AIBotForSEO from "./AIBot/AIBotForSEO";
import NewsSeoAnalysis from "./NewsSeoAnalysis/NewsSeoAnalysis";
import MapsSeoAnalysis from "./MapsSeoAnalysis/MapsSeoAnalysis";
import SearchAnalysis from "./SearchAnalysis/SearchAnalysis";
import CompetitorAnalysis from "./CompetitorAnalysis/CompetitorAnalysis";
import { FaYoutube, FaRegNewspaper, FaMapSigns, FaGoogle, FaRegWindowMaximize, FaReddit } from "react-icons/fa";

const SeoAnalysis = () => {
    const session = useSession();
    const location = useLocation();
    const { data } = location.state;

    // Add activeTab state
    const [activeTab, setActiveTab] = useState(0);

    // Add a state for controlling the Dialog component
    const [dialogData, setDialogData] = useState({ isOpen: false, title: '', data: [] });

    // Change useState for each data to include loading and error states
    const [youtubeData, setYoutubeData] = useState({ data: [], loading: true, error: '' });
    const [newsData, setNewsData] = useState({ data: [], loading: true, error: '' });
    const [placesData, setPlacesData] = useState({ data: [], loading: true, error: '' });
    const [searchResults, setSearchResults] = useState({ data: [], loading: true, error: '' });
    const [competitorData, setCompetitorData] = useState({ data: [], loading: true, error: '' });
    const [onlineForums, setOnlineForums] = useState({ data: [], loading: true, error: '' });


    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Add a function to handle the "See more" button click
    const handleSeeMore = (title, data) => {
        setDialogData({ isOpen: true, title, data });
    };

    // Add a function to handle the Dialog close action
    const handleCloseDialog = () => {
        setDialogData({ isOpen: false, title: '', data: [] });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const { projectId } = data;

    // Update fetchData function
    const fetchData = async (endpoint, setData) => {
        try {
            const response = await api.post(endpoint, {
                project_id: parseInt(projectId),
            }, {
                headers: {
                    "Authorization": `Bearer ${session.session}`,
                },
            });

            if (response.data.success) {
                setData({ data: response.data, loading: false, error: '' });
            } else {
                setData({ data: [], loading: false, error: response.data.message });
            }
        } catch (error) {
            setData({ data: [], loading: false, error: 'Some issue occurred!' });
        }
    };

    // Call fetchData for each list item when the component mounts
    useEffect(() => {
        //fetchData('/dashboard/seo_optimisation/youtube', setYoutubeData);
        fetchData('/dashboard/seo_optimisation/news', setNewsData);
        fetchData('/dashboard/seo_optimisation/places', setPlacesData);
        fetchData('/dashboard/seo_optimisation/search_results', setSearchResults);
        fetchData('/dashboard/seo_optimisation/competitors', setCompetitorData);
        //fetchData('/dashboard/seo_optimisation/online_forums', setOnlineForums);
    }, []);

    const handleExport = async () => {
        try {
            console.log("Exporting...");
        } catch (error) {
            console.error("Some issue occurred!", error);
        }
    };

    const sections = [
        {
            title: 'News',
            data: newsData,
            icon: <FaRegNewspaper className="seo-icon" style={{ marginRight: "10px" }} />,
            content: (
                <NewsSeoAnalysis
                    newsData={newsData}
                    suggestionTitles={newsData.data.suggestion_titles}
                />
            ),
        },
        {
            title: "Maps",
            data: placesData,
            icon: <FaMapSigns className="seo-icon" style={{ marginRight: "10px" }} />,
            content: (
                <MapsSeoAnalysis mapsData={placesData} />
            )
        },
        {
            title: "Search",
            data: searchResults,
            icon: <FaGoogle className="seo-icon" style={{ marginRight: "10px" }} />,
            content: (
                <SearchAnalysis
                    searchData={searchResults}
                    suggestionTitles={searchResults.data.suggestion_titles}
                />
            )
        },
        {
            title: "Competitions",
            data: competitorData,
            icon: <FaRegWindowMaximize className="seo-icon" style={{ marginRight: "10px" }} />,
            content: (
                <CompetitorAnalysis
                    compData={competitorData}
                    suggestionTitles={competitorData.data.suggestion_titles}
                />
            )
        },
    ];

    // Update renderSectionContent function
    const renderSectionContent = (section) => {
        if (section.data.loading) {
            return (
                <div className={classes.spinnerContainer}>
                    <Spinner animation="border" size="sm" />
                </div>
            );
        } else if (section.data.error) {
            return (
                <SnackbarMessage
                    open={snackbarOpen}
                    onClose={handleCloseSnackbar}
                    message={section.data.error}
                />
            );
        } else {
            return section.content;
        }
    };


    return (
        <div className={classes.container}>

            <Header title="SEO Analysis" onExport={handleExport} />

            <div className={classes.content}>
                <div className={classes.leftSide}>
                    
                    {/* Add Tabs */}
                    <div className={classes.tabs}>
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`${classes.tab} ${activeTab === index ? classes.activeTab : ''}`}
                            >
                                {section.icon}
                                {section.title}
                            </div>
                        ))}
                    </div>
                    
                    {/* Render active tab content */}
                    {renderSectionContent(sections[activeTab])}
                </div>
                <AIBotForSEO contentId={1} />
            </div>

            <Dialog isOpen={dialogData.isOpen} title={dialogData.title} data={dialogData.data} renderItem={sections.find(s => s.title === dialogData.title)?.renderItem} onClose={handleCloseDialog} />

        </div>
    );
};
export default SeoAnalysis;