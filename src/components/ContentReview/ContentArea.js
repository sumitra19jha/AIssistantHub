import io from "socket.io-client";
import { Map } from 'immutable';
import 'draft-js/dist/Draft.css';
import { stateFromHTML } from 'draft-js-import-html';
import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier, SelectionState } from 'draft-js';
import { diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL } from 'diff-match-patch';

import { AUTH_TOKEN } from '../../utils/constants';
import { createLinkDecorator } from './linkDecorator';
import Toolbar from './Toolbar/Toolbar';
import LinkBox from './LinkBox/LinkBox';
import UpdateLinkBox from './UpdateLinkBox/UpdateLinkBox';

import "./ContentArea.css";

const styleMap = {
    HIGHLIGHT: {
        backgroundColor: 'rgba(255, 255, 0, 0.3)', // Set the background color to a light yellow
    },
};


const Image = (props) => {
    const { contentState, block } = props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    return <img src={data.src} alt="" style={{ maxWidth: '100%' }} />;
};


const ContentArea = ({ contentData, contentId }) => {
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

    // Socket Connection
    useEffect(() => {
        const newSocket = io('http://localhost:3001', {
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

            return () => {
                // Cleanup function: Remove the event listener when the effect is cleaned up
                socket.off('EDIT_CONTENT', handleContent);
            };
        }
    }, [contentId, socket]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowLinkBox(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const getCaretCoordinates = () => {
        const sel = window.getSelection();
        if (!sel.rangeCount) {
            return null;
        }
        const range = sel.getRangeAt(0).cloneRange(); // Clone the range to avoid modifying the original range
        const dummy = document.createElement("span");

        range.collapse(false); // Collapse the range to the end point
        range.insertNode(dummy);

        const rect = dummy.getBoundingClientRect();
        dummy.parentNode.removeChild(dummy);
        return { x: rect.left, y: rect.top };
    };

    const handleCursorPosition = () => {
        if (!editorFocused) {
            return;
        }

        const selection = editorState.getSelection();
        const startOffset = selection.getStartOffset();
        const endOffset = selection.getEndOffset();
        const contentState = editorState.getCurrentContent();
        const blockKey = selection.getStartKey();
        const block = contentState.getBlockForKey(blockKey);
        const linkKey = block.getEntityAt(startOffset);

        if (linkKey && startOffset === endOffset) {
            const linkInstance = contentState.getEntity(linkKey);
            const linkType = linkInstance.getType();

            if (linkType === "LINK" && currentLinkKey !== linkKey) {
                const caretCoordinates = getCaretCoordinates();
                if (!caretCoordinates) {
                    return;
                }

                const iconHeight = 20;
                const x = caretCoordinates.x - editorContainerRef.current.scrollLeft;
                const y = caretCoordinates.y - editorContainerRef.current.scrollTop + iconHeight;
                setEditLinkBoxPosition({ x, y });
                setShowEditLinkBox(true);
                setCurrentLinkKey(linkKey);

                const linkData = linkInstance.getData();
                setEditedURL(linkData.url);
            } else if (linkType !== "LINK" && currentLinkKey !== null) {
                setShowEditLinkBox(false);
                setCurrentLinkKey(null);
            }
        } else {
            setShowEditLinkBox(false);
            setCurrentLinkKey(null);
        }
    };


    const handleLink = (event) => {
        const caretCoordinates = getCaretCoordinates();
        if (!caretCoordinates) {
            return;
        }
        const iconHeight = 20; // Height of the link icon
        const x = caretCoordinates.x - editorContainerRef.current.scrollLeft;
        const y = caretCoordinates.y - editorContainerRef.current.scrollTop + iconHeight;
        setLinkBoxPosition({ x, y });
        setShowLinkBox(true);
    };


    const myKeyBindingFn = (e) => {
        if (e.keyCode === 9 /* Tab */) {
            e.preventDefault();
            if (e.shiftKey) {
                return 'tab-outdent';
            }
            return 'tab-indent';
        }
        return getDefaultKeyBinding(e);
    };

    const indentList = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const startKey = selectionState.getStartKey();
        const block = contentState.getBlockForKey(startKey);
        const blockType = block.getType();

        if (blockType === 'unordered-list-item') {
            const currentDepth = block.getDepth();
            if (currentDepth < 4) {
                const newContentState = Modifier.setBlockData(
                    contentState,
                    selectionState,
                    Map({ depth: currentDepth + 1 })
                );
                return EditorState.push(editorState, newContentState, 'change-block-data');
            }
        }

        return editorState;
    };

    const outdentList = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const startKey = selectionState.getStartKey();
        const block = contentState.getBlockForKey(startKey);
        const blockType = block.getType();

        if (blockType === 'unordered-list-item') {
            const currentDepth = block.getDepth();
            if (currentDepth > 0) {
                const newContentState = Modifier.setBlockData(
                    contentState,
                    selectionState,
                    Map({ depth: currentDepth - 1 })
                );
                return EditorState.push(editorState, newContentState, 'change-block-data');
            }
        }

        return editorState;
    };


    const handleKeyCommand = (command, editorState) => {
        if (command === 'tab-indent') {
            const newState = indentList(editorState);
            if (newState !== editorState) {
                setEditorState(newState);
                return 'handled';
            }
        } else if (command === 'tab-outdent') {
            const newState = outdentList(editorState);
            if (newState !== editorState) {
                setEditorState(newState);
                return 'handled';
            }
        }

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };


    const imageRenderer = (contentBlock) => {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            return {
                component: Image,
                editable: false,
            };
        }
    };


    return (
        <div className="content-area">

            <Toolbar
                contentData={contentData}
                setEditorState={setEditorState}
                editorState={editorState}
                handleLink={handleLink}
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


            <div ref={editorContainerRef} className="editor fqelrj5" onClick={() => editorRef.current.focus()}>
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={myKeyBindingFn}
                    blockRendererFn={imageRenderer}
                    onChange={(newState) => {
                        setLastEditorSelection(newState.getSelection());
                        setEditorState(newState);
                        handleCursorPosition();
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