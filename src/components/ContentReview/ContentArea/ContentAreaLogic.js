import { useEffect } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import { createLinkDecorator } from '../linkDecorator';
import { handleKeyDown } from "../function";

export const useGetContentHTML = (editorState, setGetContentHTML) => {
    useEffect(() => {
        const getContentHTML = () => {
            const contentState = editorState.getCurrentContent();
            const html = stateToHTML(contentState);
            return html;
        };

        setGetContentHTML(() => getContentHTML);
    }, [editorState]);
};

export const useSocketHandlers = (contentId, socket, setEditorState, setIsEditing) => {
    useEffect(() => {
        if (socket) {
            const handleContent = (data) => {
                console.log('EDIT_CONTENT event received', data);

                // Get the new content from the socket
                const newContent = data.message;

                // Update the entire content of the editor to the new content
                const newEditorState = EditorState.createWithContent(
                    stateFromHTML(newContent),
                    createLinkDecorator()
                );
                setEditorState(newEditorState);
            };

            // Add the event listener for the 'EDIT_CONTENT' event
            socket.on('EDIT_CONTENT', handleContent);

            const contentEditStatus = (data) => {
                setIsEditing(data.isGoing);
            };

            // Add the event listener for the 'EDIT_STATUS' event
            socket.on('EDIT_STATUS', contentEditStatus);

            return () => {
                // Cleanup function: Remove the event listener when the effect is cleaned up
                socket.off('EDIT_CONTENT', handleContent);
                socket.off('EDIT_STATUS', handleContent);
            };
        }
    }, [contentId, socket]);
};

export const useKeyDownHandler = (setShowLinkBox) => {
    useEffect(() => {
        document.addEventListener('keydown', (event) => handleKeyDown(event, setShowLinkBox));

        return () => {
            document.removeEventListener('keydown', (event) => handleKeyDown(event, setShowLinkBox));
        };
    }, []);
};
