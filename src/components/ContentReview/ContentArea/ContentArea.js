import React, { useState, useRef } from 'react';
import 'draft-js/dist/Draft.css';
import { Editor } from 'draft-js';
import { CircularProgress } from "@mui/material";
import { CSSTransition } from 'react-transition-group';

import Toolbar from '../Toolbar/Toolbar';
import LinkBox from '../LinkBox/LinkBox';
import UpdateLinkBox from '../UpdateLinkBox/UpdateLinkBox';
import {
    handleCursorPosition,
    handleLink,
    myKeyBindingFn,
    handleKeyCommand,
    imageRenderer
} from "../function";

import styles from "./ContentArea.module.css";
import { useGetContentHTML, useSocketHandlers, useKeyDownHandler } from './ContentAreaLogic';

const styleMap = {
    HIGHLIGHT: {
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
    },
};

const ContentArea = ({ isLoading, content, editorState, setEditorState, socket, contentId, setGetContentHTML }) => {
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

    useGetContentHTML(editorState, setGetContentHTML);
    useSocketHandlers(contentId, socket, setEditorState, setIsEditing);
    useKeyDownHandler(setShowLinkBox);

    return (
        <div className={styles.content_area}>
            <CSSTransition
                in={isLoading}
                timeout={500}
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                }}
                unmountOnExit
            >
                <div className={styles.loading_box}>
                    <CircularProgress size={24} color="primary" />
                    <span className={styles.loading_text}>Loading...</span>
                </div>
            </CSSTransition>
            <CSSTransition
                in={!isLoading}
                timeout={500}
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                }}
                unmountOnExit
            >
                <div>
                    <Toolbar
                        contentData={content}
                        setEditorState={setEditorState}
                        editorState={editorState}
                        handleLink={() =>
                            handleLink(
                                editorState,
                                setLinkBoxPosition,
                                setShowLinkBox,
                                editorContainerRef
                            )
                        }
                    />
                    {showLinkBox && (
                        <LinkBox
                            left={linkBoxPosition.x}
                            top={linkBoxPosition.y}
                            showLinkBox={showLinkBox}
                            editorState={editorState}
                            setEditorState={setEditorState}
                            setShowLinkBox={setShowLinkBox}
                            lastEditorSelection={lastEditorSelection}
                        />
                    )}
                    {showEditLinkBox && (
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
                    )}
                    <div
                        ref={editorContainerRef}
                        className={`${styles.editor}`}
                        onClick={() => editorRef.current.focus()}
                    >
                        {isEditing && <div className={styles.loading_animation}></div>}
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            handleKeyCommand={(command, editorState) =>
                                handleKeyCommand(command, editorState, setEditorState)
                            }
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
            </CSSTransition>
        </div>
    );
};

export default ContentArea;