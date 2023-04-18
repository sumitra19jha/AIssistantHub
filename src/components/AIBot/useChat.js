import { useState, useEffect } from "react";
import api from "../../services/api";
import io from "socket.io-client";
import { AUTH_TOKEN } from "../../utils/constants";

const useChat = (contentId) => {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [currentAIMessage, setCurrentAIMessage] = useState(null);
    const [chatHistoryFetched, setChatHistoryFetched] = useState(false);

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

        newSocket.on("connect", () => {
            if (contentId) {
                newSocket.emit('JOIN_CONTENT_ROOM', { contentId: contentId }, (confirmation) => {
                    console.log(confirmation);
                });
            }

            if (contentId && !chatHistoryFetched) {
                fetchChatHistory();
                setChatHistoryFetched(true);
            }
        });

        console.log('Setting socket:', newSocket); // Add this log
        setSocket(newSocket);
        return () => newSocket.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (socket) {
            console.log("Inside Socket");
            let aiMessageParts = [];

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
            
            const handleMessage = (data) => {
                console.log("NEW_MESSAGE", data)
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
                            username: 'Proton',
                            timestamp: new Date(),
                        },
                    ]);
                    setCurrentAIMessage(null);
                    aiMessageParts = [];
                }
            }

            socket.on('NEW_MESSAGE', handleMessage);

            return () => {
                // Cleanup function: Remove the event listener when the effect is cleaned up
                socket.off('NEW_MESSAGE', handleMessage);
            };
        }
    }, [socket]);

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

    return { messages, userInput, setUserInput, handleSubmit, currentAIMessage };
}

export default useChat;