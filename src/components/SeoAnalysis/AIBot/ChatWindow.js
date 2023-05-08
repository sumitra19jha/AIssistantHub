import React, { useRef, useEffect } from "react";
import Message from "./Message";

const ChatWindow = ({ messages, currentAIMessage }) => {
    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="ai-bot-for-seo__chat-window" ref={chatContainerRef}>
            {messages.map((message, index) => (
                <Message key={index} message={message} ref={index === messages.length - 1 ? lastMessageRef : null} />
            ))}

            {currentAIMessage && (
                <div className={`ai-bot-for-seo__message ai`}>{currentAIMessage}</div>
            )}
            <div className={`ai-bot-for-seo__space ai`} />
        </div>
    );
};

export default ChatWindow;
