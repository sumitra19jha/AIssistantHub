import React from "react";
import { formatTime } from "./../../utils/constants";

const Message = ({ message }) => {
    return (
        <div className={`message ${message.type}`}>
            <div className="message-info">
                <span className="message-username">{message.username}</span>
                <span className="message-timestamp">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-content">
                {`${message.content}`.split("\n").map((part, index) => (
                    <p key={index} className="message-p">{part}</p>
                ))}
            </div>
        </div>
    );
};

export default Message;
