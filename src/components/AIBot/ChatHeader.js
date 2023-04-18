import React from "react";

const ChatHeader = () => {
    return (
        <div className="chat-header">
            <img className="ai-bot-image" src="/image.png" alt="AI Bot" />
            <div className="ai-model-name">Proton</div>
            <div className="online">Online</div>
        </div>
    );
};

export default ChatHeader;
