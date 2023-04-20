import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ContentArea from './ContentArea';
import AIBot from '../AIBot/AIBot.js';
import Header from './Header/Header';
import api from "../../services/api";
import "./ContentReview.css";

const ContentReview = () => {
    const getContentHTMLRef = useRef(null);
    const location = useLocation();
    const parsedQuery = queryString.parse(location.search);

    const handleSave = useCallback(async (content) => {
        try {
            const response = await api.post('/dashboard/content/save', { content, contentId: parsedQuery.contentId });
            if (!response.data.success) {
                console.error(response.data.content);
            }
        } catch (error) {
            console.error("Some issue occurred!", error);
        }
    }, [parsedQuery.contentId]);

    const getContentHTML = () => {
        if (getContentHTMLRef.current) {
            return getContentHTMLRef.current();
        }
    };

    return (
        <div className="app-container">
            <Header title={parsedQuery.topic} onSave={handleSave} getContentHTML={getContentHTML} />
            <div className="area-split">
                <ContentArea contentData={parsedQuery.generatedContent} contentId={parsedQuery.contentId} setGetContentHTML={(fn) => { getContentHTMLRef.current = fn; }} />
                <AIBot contentId={parsedQuery.contentId} />
            </div>
        </div>
    );
};

export default ContentReview;