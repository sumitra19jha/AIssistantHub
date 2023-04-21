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
        <div className="chat-window" ref={chatContainerRef}>
            {messages.map((message, index) => (
                <Message key={index} message={message} ref={index === messages.length - 1 ? lastMessageRef : null} />
            ))}

            {currentAIMessage && (
                <div className={`message ai`}>{currentAIMessage}</div>
            )}
            <div className={`space ai`} />
        </div>
    );
};

export default ChatWindow;
