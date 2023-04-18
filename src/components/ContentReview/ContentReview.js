import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ContentArea from './ContentArea';
import AIBot from '../AIBot/AIBot.js';
import Header from './Header/Header';
import "./ContentReview.css";

const ContentReview = () => {
    const location = useLocation();
    const parsedQuery = queryString.parse(location.search);

    return (
        <div className="app-container">
            <Header title={parsedQuery.topic} />
            <div className="area-split">
                <ContentArea contentData={parsedQuery.generatedContent} contentId={parsedQuery.contentId} />
                <AIBot contentId={parsedQuery.contentId} />
            </div>
        </div>
    );
};

export default ContentReview;