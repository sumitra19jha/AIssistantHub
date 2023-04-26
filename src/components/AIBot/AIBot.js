import React from "react";
import "./AIBot.css";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import MessageForm from "./MessageForm";
import useChat from "./useChat";


const AIBot = ({ contentId }) => {
    const { messages, userInput, setUserInput, handleSubmit, currentAIMessage, isLoading } = useChat(contentId);

    return (
        <div className="ai-bot">
            <ChatHeader />
            <div className="chat-container">
                {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <div className="loading-animation"></div>
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

export default AIBot;