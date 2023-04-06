import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import "./ContentReview.css";
import Sidebar from '../Dashboard/Sidebar';
import ContentArea from './ContentArea';
import AIBot from '../AIBot/AIBot.js';

const ContentReview = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const parsedQuery = queryString.parse(location.search);
    console.log(parsedQuery.generatedContent)

    return (
        <div className="area-split">
            {showSidebar && <Sidebar />}
            <ContentArea showSidebar={showSidebar} setShowSidebar={setShowSidebar} contentData={parsedQuery.generatedContent}/>
            <AIBot/>
        </div>
    );
};

export default ContentReview;