import React, { useState, useRef, useEffect } from 'react';
import io from "socket.io-client";
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, EditorState } from 'draft-js';
import { diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL } from 'diff-match-patch';

import { AUTH_TOKEN, SOCKET_API_BASE_URL } from '../../../utils/constants';
import { createLinkDecorator } from '../linkDecorator';
import Toolbar from '../Toolbar/Toolbar';
import LinkBox from '../LinkBox/LinkBox';
import UpdateLinkBox from '../UpdateLinkBox/UpdateLinkBox';
import { 
    handleCursorPosition, 
    handleLink, 
    handleKeyDown, 
    myKeyBindingFn, 
    handleKeyCommand, 
    imageRenderer 
} from "../function";
import "./ContentArea.css";

const styleMap = {
    HIGHLIGHT: {
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
    },
};


const ContentArea = ({ contentData, contentId, setGetContentHTML }) => {
    const [socket, setSocket] = useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            stateFromHTML(contentData),
            createLinkDecorator()
        )
    );

    const editorRef = useRef();
    const editorContainerRef = useRef();
    const [showLinkBox, setShowLinkBox] = useState(false);
    const [linkBoxPosition, setLinkBoxPosition] = useState({ x: 0, y: 0 });
    const [lastEditorSelection, setLastEditorSelection] = useState(null);
    const [showEditLinkBox, setShowEditLinkBox] = useState(false);
    const [editLinkBoxPosition, setEditLinkBoxPosition] = useState({ x: 0, y: 0 });
    const [editedURL, setEditedURL] = useState('');
    const [editorFocused, setEditorFocused] = useState(false);
    const [currentLinkKey, setCurrentLinkKey] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getContentHTML = () => {
            const contentState = editorState.getCurrentContent();
            const html = stateToHTML(contentState);
            return html;
        };

        setGetContentHTML(() => getContentHTML);
    }, [editorState]);

    // Socket Connection
    useEffect(() => {
        const newSocket = io(SOCKET_API_BASE_URL, {
            extraHeaders: {
                authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });

        newSocket.on("connect", () => {
            if (contentId) {
                newSocket.emit('JOIN_EDIT_ROOM', { contentId: contentId }, () => {
                    console.log('JOIN_CONTENT_ROOM event sent');
                });
            }
        });

        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            const handleContent = (data) => {
                console.log('EDIT_CONTENT event received', data);
                // Get the old content from the editor
                const oldContent = editorState.getCurrentContent().getPlainText();

                // Get the new content from the socket
                const newContent = data.message;

                // Compute the differences between the old and new content
                const dmp = new diff_match_patch();
                const diffs = dmp.diff_main(oldContent, newContent);
                dmp.diff_cleanupSemantic(diffs);

                // Add highlights to the new content based on the differences
                let highlightedNewContent = '';
                diffs.forEach(([operation, text]) => {
                    switch (operation) {
                        case DIFF_DELETE:
                            highlightedNewContent += `<del style="background-color: #fdd">${text}</del>`;
                            break;
                        case DIFF_INSERT:
                            highlightedNewContent += `<ins style="background-color: #dfd">${text}</ins>`;
                            break;
                        case DIFF_EQUAL:
                            highlightedNewContent += text;
                            break;
                    }
                });

                // Update the entire content of the editor to the highlighted new content
                const newEditorState = EditorState.createWithContent(
                    stateFromHTML(highlightedNewContent),
                    createLinkDecorator()
                );
                setEditorState(newEditorState);
            };

            // CHANGE: Add the event listener for the 'EDIT_CONTENT' event
            socket.on('EDIT_CONTENT', handleContent);

            const contentEditStatus = (data) => {
                setIsEditing(data.isGoing);
            };

            // CHANGE: Add the event listener for the 'EDIT_CONTENT' event
            socket.on('EDIT_STATUS', contentEditStatus);

            return () => {
                // Cleanup function: Remove the event listener when the effect is cleaned up
                socket.off('EDIT_CONTENT', handleContent);
                socket.off('EDIT_STATUS', handleContent);
            };
        }
    }, [contentId, socket]);

    useEffect(() => {
        document.addEventListener('keydown', (event) => handleKeyDown(event, setShowLinkBox));

        return () => {
            document.removeEventListener('keydown', (event) => handleKeyDown(event, setShowLinkBox));
        };
    }, []);


    return (
        <div className="content-area">
            <Toolbar
                contentData={contentData}
                setEditorState={setEditorState}
                editorState={editorState}
                handleLink={() => handleLink(editorState, setLinkBoxPosition, setShowLinkBox, editorContainerRef)}
            />
            {showLinkBox &&
                <LinkBox
                    left={linkBoxPosition.x}
                    top={linkBoxPosition.y}
                    showLinkBox={showLinkBox}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    setShowLinkBox={setShowLinkBox}
                    lastEditorSelection={lastEditorSelection}
                />
            }
            {showEditLinkBox &&
                <UpdateLinkBox
                    left={editLinkBoxPosition.x}
                    top={editLinkBoxPosition.y}
                    editorState={editorState}
                    editedURL={editedURL}
                    setEditorState={setEditorState}
                    setShowEditLinkBox={setShowEditLinkBox}
                    setCurrentLinkKey={setCurrentLinkKey}
                    setEditedURL={setEditedURL}
                />
            }
            <div
                ref={editorContainerRef}
                className={`editor fqelrj5`}
                onClick={() => editorRef.current.focus()}
            >
                {isEditing && <div className="loading-animation"></div>}
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    handleKeyCommand={(command, editorState) => handleKeyCommand(command, editorState, setEditorState)}
                    keyBindingFn={(event) => myKeyBindingFn(event)}
                    blockRendererFn={(contentBlock) => imageRenderer(contentBlock)}
                    onChange={(newState) => {
                        setLastEditorSelection(newState.getSelection());
                        setEditorState(newState);
                        handleCursorPosition(
                            editorFocused,
                            editorState,
                            editorContainerRef,
                            setEditLinkBoxPosition,
                            setShowEditLinkBox,
                            currentLinkKey,
                            setCurrentLinkKey,
                            setEditedURL
                        );
                    }}
                    onBlur={() => setEditorFocused(false)}
                    onFocus={() => setEditorFocused(true)}
                    customStyleMap={styleMap}
                />
            </div>
        </div>
    );
};

export default ContentArea;