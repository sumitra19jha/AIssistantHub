import React, { useState } from "react";
import { BsChat, BsListCheck } from "react-icons/bs";

const ChatHeader = () => {
    const [activeTab, setActiveTab] = useState("chat");

    return (
        <div className="ai-bot-for-seo__chat-header">
            <div className="ai-bot-for-seo__tab-container">
                <div
                    className={`ai-bot-for-seo__tab ai-bot-for-seo__chat-tab ${activeTab === "chat" ? "active" : ""}`}
                    onClick={() => setActiveTab("chat")}
                >
                    <BsChat className="ai-bot-for-seo__tab-icon" />
                    <span className="ai-bot-for-seo__tab-text">Chat</span>
                </div>
                <div
                    className={`ai-bot-for-seo__tab versions-tab ${activeTab === "versions" ? "active" : ""}`}
                    onClick={() => setActiveTab("versions")}
                >
                    <BsListCheck className="ai-bot-for-seo__tab-icon" />
                    <span className="ai-bot-for-seo__tab-text">Versions</span>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
