import React from "react";
import "./AIBot.css";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import MessageForm from "./MessageForm";
import useChat from "./useChat";

const AIBot = ({ contentId }) => {
    const { messages, userInput, setUserInput, handleSubmit, currentAIMessage } = useChat(contentId);

    return (
        <div className="ai-bot">
            <ChatHeader />
            <div className="chat-container">
                <ChatWindow messages={messages} currentAIMessage={currentAIMessage} />
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