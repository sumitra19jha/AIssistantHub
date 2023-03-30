import React, { useState } from "react";
import "./AIBot.css";

// Replace this with your actual ChatGPT API request function
const fetchChatGPTResponse = async (userMessage) => {
    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: `AI response to "${userMessage}"` };
};

const AIBot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInput.trim()) {
            setMessages((prevMessages) => [...prevMessages, { type: 'user', content: userInput }]);
            setUserInput('');

            const aiResponse = await fetchChatGPTResponse(userInput);
            setMessages((prevMessages) => [...prevMessages, { type: 'ai', content: aiResponse.message }]);
        }
    };

    return (
        <div className="ai-bot">
            <div className="chat-header">
                <img className="ai-bot-image " src="/image.png" alt="AI Bot" />
                <div className="ai-model-name">ChatGPT</div>
                <div className="online">Online</div>
            </div>
            <div className="chat-container">
                <div className="chat-window">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            {message.content}
                        </div>
                    ))}
                </div>
                <form className="input-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="user-input"
                        value={userInput}
                        onChange={handleUserInputChange}
                        placeholder="Type your message here..."
                    />
                    <button type="submit" className="submit-button">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIBot;