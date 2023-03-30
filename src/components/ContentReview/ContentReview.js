import React, { useState } from 'react';
import "./ContentReview.css";
import Sidebar from '../Dashboard/Sidebar';
import ContentArea from './ContentArea';
import AIBot from '../AIBot/AIBot.js';

const ContentReview = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="area-split">
            {showSidebar && <Sidebar />}
            <ContentArea showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <AIBot/>
        </div>
    );
};

export default ContentReview;