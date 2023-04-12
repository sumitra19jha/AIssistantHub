import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
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
    const chatContainerRef = useRef(null);
    const chatHeaderRef = useRef(null);
    const [chatHistoryFetched, setChatHistoryFetched] = useState(false);

    const lastMessageRef = useRef(null);


    const fetchChatHistory = async () => {
        try {
            api.get('/dashboard/content/chat/history', {
                params: {
                    content_id: contentId,
                }
            })
                .then((response) => {
                    if (response.data.success) {
                        setMessages(response.data.history.map(message => ({
                            type: message.type,
                            content: message.content,
                            username: message.username,
                            timestamp: new Date(message.timestamp)
                        })));
                    } else {
                        console.log(response.data.message);
                    }

                })
                .catch((error) => {
                    console.log("Some issue occured!", error);
                });
        } catch (error) {
            alert('Error fetching chat history:', error);
        }
    };


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
        if (contentId && socket && !chatHistoryFetched) {
            fetchChatHistory();
            setChatHistoryFetched(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentId, socket, chatHistoryFetched]);


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
                            username: 'Content AI',
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

    useEffect(() => {
        if (chatContainerRef.current && chatHeaderRef.current) {
            const chatHeaderHeight = chatHeaderRef.current.offsetHeight;
            chatContainerRef.current.style.height = `calc(100% - ${chatHeaderHeight}px)`;
        }
    }, [messages]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    return (
        <div className="ai-bot">
            <div className="chat-header" ref={chatHeaderRef}>
                <img className="ai-bot-image" src="/image.png" alt="AI Bot" />
                <div className="ai-model-name">IntelliMate</div>
                <div className="online">Online</div>
            </div>

            <div className="chat-container" ref={chatContainerRef}>
                <div className="chat-window" >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.type}`}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                            <div className="message-info">
                                <span className="message-username">{message.username}</span>
                                <span className="message-timestamp">{formatTime(message.timestamp)}</span>
                            </div>
                            <div className="message-content">
                                {message.content.split('\n').map((part, index) => (
                                    <p key={index}>{part}</p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {currentAIMessage && (
                        <div className={`message ai`}>{currentAIMessage}</div>
                    )}
                    <div className={`space ai`} />
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
