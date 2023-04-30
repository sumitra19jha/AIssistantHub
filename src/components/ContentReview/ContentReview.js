import React, { useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import html2pdf from "html2pdf.js";

import useSession from '../useToken';
import ContentArea from './ContentArea/ContentArea';
import AIBot from '../AIBot/AIBot.js';
import Header from './Header/Header';
import api from "../../services/api";
import "./ContentReview.css";

const ContentReview = () => {
    const session = useSession();
    const getContentHTMLRef = useRef(null);
    const location = useLocation();
    const parsedQuery = queryString.parse(location.search);

    const handleSave = useCallback(async (content) => {
        try {
            const response = await api.post(
                '/dashboard/content/save', 
                { content, contentId: parsedQuery.contentId },
                {
                    headers: {
                        "Authorization": `Bearer ${session.session}`,
                    }
                }
            );

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

    const handleExport = useCallback(async (htmlContent) => {
        try {
            const opt = {
                margin: [10, 10, 10, 10],
                filename: "social-media-post.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            html2pdf().set(opt).from(htmlContent).save();
        } catch (error) {
            console.error("Some issue occurred!", error);
        }
    }, [parsedQuery.contentId]);

    return (
        <div className="app-container">
            <Header title={parsedQuery.topic} onSave={handleSave} getContentHTML={getContentHTML} onExport={handleExport} />
            <div className="area-split">
                <ContentArea contentData={parsedQuery.generatedContent} contentId={parsedQuery.contentId} setGetContentHTML={(fn) => { getContentHTMLRef.current = fn; }} />
                <AIBot contentId={parsedQuery.contentId} />
            </div>
        </div>
    );
};

export default ContentReview;