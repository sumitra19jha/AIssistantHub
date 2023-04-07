import React, { useState, useEffect } from "react";
import "./AIBot.css";
import { AUTH_TOKEN } from '../../utils/constants';
import io from "socket.io-client";

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
};



const AIBot = ({ contentId }) => {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [currentAIMessage, setCurrentAIMessage] = useState(null);


    // Socket Connection
    useEffect(() => {
        const newSocket = io('http://localhost:3001', {
            extraHeaders: {
                authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('JOIN_CONTENT_ROOM', { contentId: contentId }, () => {
                console.log('JOIN_CONTENT_ROOM event sent');
            });

            let aiMessageParts = [];
            socket.on('NEW_MESSAGE', (data) => {
                if (!data.streamEnd) {
                    aiMessageParts.push(data.message);
                    setCurrentAIMessage((prev) => (prev ? prev + data.message : data.message));
                } else {
                    const all_message = aiMessageParts.join('') + data.message;
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            type: 'ai',
                            content: all_message,
                            username: 'AI Bot',
                            timestamp: new Date(),
                        },
                    ]);
                    setCurrentAIMessage(null);
                    aiMessageParts = [];
                }
            });

        }
    }, [contentId, socket]);

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (socket) {
            console.log("Inside Socket")
            const userMessage = { contentId: contentId, message: userInput };
            socket.emit('CHAT_MESSAGE', userMessage);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    type: 'user',
                    content: userInput,
                    username: 'You',
                    timestamp: new Date(),
                },
            ]);
            setUserInput("");
        }
    };


    return (
        <div className="ai-bot">
            <div className="chat-header">
                <img className="ai-bot-image" src="/image.png" alt="AI Bot" />
                <div className="ai-model-name">ChatGPT</div>
                <div className="online">Online</div>
            </div>
            <div className="chat-container">
                <div className="chat-window">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-info">
                                <span className="message-username">{message.username}</span>
                                <span className="message-timestamp">{formatTime(message.timestamp)}</span>
                            </div>
                            <div className="message-content">{message.content}</div>
                        </div>
                    ))}

                    {currentAIMessage && (
                        <div className={`message ai`}>{currentAIMessage}</div>
                    )}
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
