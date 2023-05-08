import React from "react";
import { formatTime } from "../../../utils/constants";

const Message = ({ message }) => {
    return (
        <div className={`ai-bot-for-seo__message ${message.type}`}>
            <div className="ai-bot-for-seo__message-info">
                <span className="ai-bot-for-seo__message-username">{message.username}</span>
                <span className="ai-bot-for-seo__message-timestamp">{formatTime(message.timestamp)}</span>
            </div>
            <div className="ai-bot-for-seo__message-content">
                {`${message.content}`.split("\n").map((part, index) => (
                    <p key={index} className="ai-bot-for-seo__message-p">{part}</p>
                ))}
            </div>
        </div>
    );
};

export default Message;
