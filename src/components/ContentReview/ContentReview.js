import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';
import html2pdf from "html2pdf.js";
import io from "socket.io-client";

import { createLinkDecorator } from './linkDecorator';
import { AUTH_TOKEN, SOCKET_API_BASE_URL } from '../../utils/constants';
import useSession from '../useToken';
import ContentArea from './ContentArea/ContentArea';
import AIBot from '../AIBot/AIBot.js';
import Header from './Header/Header';
import api from "../../services/api";
import styles from "./ContentReview.module.css";

const ContentReview = () => {
    const session = useSession();
    const getContentHTMLRef = useRef(null);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [content, setContent] = useState('');

    const { data } = location.state;
    const { contentId, topic } = data;

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            stateFromHTML(content),
            createLinkDecorator()
        )
    );

    useEffect(() => {
        const newSocket = io(SOCKET_API_BASE_URL, {
            extraHeaders: {
                authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });

        newSocket.on("connect", async () => {
            if (contentId) {
                newSocket.emit('JOIN_EDIT_ROOM', { contentId: contentId }, () => {
                    console.log('JOIN_CONTENT_ROOM event sent');
                });

                await fetchContent(newSocket);
            }
        });

        setSocket(newSocket);
        return () => newSocket.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentId]);

    useEffect(() => {
        if (socket) {
            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            const handleCreatedContent = (data) => {
                const newContent = data.message.replace(/ {2}/g, '\n\n');
                setContent((prevContent) => {
                    const updatedContent = prevContent + newContent;
                    const newEditorState = EditorState.createWithContent(
                        stateFromHTML(`<pre>${updatedContent}</pre>`),
                        createLinkDecorator()
                    );
                    setEditorState(newEditorState);
                    return updatedContent;
                });
            };

            socket.on('RECEIVE_CONTENT', handleCreatedContent);
            return () => {
                socket.off('RECEIVE_CONTENT', handleCreatedContent);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const fetchContent = async (newSocket) => {
        try {
            setIsLoading(true);
            const response = await api.post('/content/fetch', { content_id: contentId }, {
                headers: {
                    "Authorization": `Bearer ${session.session}`,
                }
            });

            if (response.data.success) {
                if (response.data.content && response.data.content.length > 0) {
                    const newContent = response.data.content.replace(/ {2}/g, '\n\n');
                    setContent(newContent);
                    const newEditorState = EditorState.createWithContent(
                        stateFromHTML(`<pre>${newContent}</pre>`),
                        createLinkDecorator()
                    );
                    setEditorState(newEditorState);
                } else {
                    newSocket.emit("CREATE_CONTENT", { contentId: contentId }, () => {
                        console.log("REQUEST_CONTENT event sent");
                    });
                }
            } else { }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleSave = useCallback(async (content) => {
        try {
            const response = await api.post('/dashboard/content/save', { content, contentId },
                {
                    headers: {
                        "Authorization": `Bearer ${session.session}`,
                    }
                }
            );

            if (!response.data.success) {
                console.error(response.data.content);
            }
        } catch (error) {
            console.error("Some issue occurred!", error);
        }
    }, [contentId]);

    const getContentHTML = () => {
        if (getContentHTMLRef.current) {
            return getContentHTMLRef.current();
        }
    };

    const handleExport = useCallback(async (htmlContent) => {
        try {
            const opt = {
                margin: [10, 10, 10, 10],
                filename: "social-media-post.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            html2pdf().set(opt).from(htmlContent).save();
        } catch (error) {
            console.error("Some issue occurred!", error);
        }
    }, []);

    return (
        <div className={styles.app_container}>
            <Header
                title={topic}
                onSave={handleSave}
                getContentHTML={getContentHTML}
                onExport={handleExport}
            />
            <div className={styles.area_split}>
                <ContentArea
                    isLoading={isLoading}
                    content={content}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    socket={socket}
                    contentId={contentId}
                    setGetContentHTML={(fn) => { getContentHTMLRef.current = fn; }}
                />
                <AIBot contentId={contentId} />
            </div>
        </div>
    );
};

export default ContentReview;