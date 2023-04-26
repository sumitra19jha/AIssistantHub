import React, { useState } from "react";
import { BsChat, BsListCheck } from "react-icons/bs";

const ChatHeader = () => {
    const [activeTab, setActiveTab] = useState("chat");

    return (
        <div className="chat-header">
            <div className="tab-container">
                <div
                    className={`tab chat-tab ${activeTab === "chat" ? "active" : ""}`}
                    onClick={() => setActiveTab("chat")}
                >
                    <BsChat className="tab-icon" />
                    <span className="tab-text">Chat</span>
                </div>
                <div
                    className={`tab versions-tab ${activeTab === "versions" ? "active" : ""}`}
                    onClick={() => setActiveTab("versions")}
                >
                    <BsListCheck className="tab-icon" />
                    <span className="tab-text">Versions</span>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
