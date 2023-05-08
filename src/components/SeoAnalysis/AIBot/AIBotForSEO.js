import React from "react";

import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import MessageForm from "./MessageForm";
import useChat from "./useChat";

import "./AIBotForSEO.css";


const AIBotForSEO = ({ contentId }) => {
    const { messages, userInput, setUserInput, handleSubmit, currentAIMessage, isLoading } = useChat(contentId);

    return (
        <div className="ai-bot-for-seo">
            <ChatHeader />
            <div className="ai-bot-for-seo__chat-container">
                {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <div className="ai-bot-for-seo__loading-animation"></div>
                    </div>
                ) : 
                    <ChatWindow messages={messages} currentAIMessage={currentAIMessage} />
                }
                <MessageForm
                    userInput={userInput}
                    setUserInput={setUserInput}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default AIBotForSEO;