import React, { useState, useRef, useEffect } from 'react';
import { EditorState, Modifier } from 'draft-js';
import { createLinkDecorator } from './../linkDecorator';
import "./LinkBox.css"

const LinkBox = ({ left, top, showLinkBox, editorState, setEditorState, setShowLinkBox, lastEditorSelection }) => {
    const [inputURL, setInputURL] = useState('');
    const linkInputRef = useRef();
    useEffect(() => {
        if (showLinkBox) {
            setTimeout(() => {
                linkInputRef.current.focus();
            }, 0);
        }
    }, [showLinkBox]);

    const handleApplyLink = () => {
        if (!inputURL) {
            return;
        }

        let link = inputURL

        // Add 'http://' to the inputURL if it doesn't have it
        if (!/^http(s)?:\/\//.test(link)) {
            link = 'http://' + link;
        }

        const decorator = createLinkDecorator();
        const currentContent = editorState.getCurrentContent();
        const createEntity = currentContent.createEntity("LINK", "MUTABLE", {
            url: link,
        });

        const entityKey = createEntity.getLastCreatedEntityKey();
        const selection = lastEditorSelection || editorState.getSelection();
        const collapsedSelection = selection.merge({
            anchorOffset: selection.getStartOffset(),
            focusOffset: selection.getStartOffset(),
        }); // Add this line to collapse the selection
        const textWithEntity = Modifier.insertText(
            currentContent,
            collapsedSelection, // Update this line to use the collapsed selection
            link,
            null,
            entityKey
        );
        const newState = EditorState.createWithContent(textWithEntity, decorator);
        setEditorState(newState);
        setInputURL('');
        setShowLinkBox(false);
    };


    return (
        <div
            data-role="positioned-container"
            className="parent-link-box"
            style={{ left: left, top: top }}
        >
            <div className="link-box" >
                <input
                    ref={linkInputRef}
                    className="link-box-url-input link-box-url-holder link-box-link-base"
                    type="text"
                    placeholder="Enter Link URL"
                    value={inputURL}
                    onChange={(e) => setInputURL(e.target.value)}
                />
                <button className="link-box-button-text link-box-button-form link-box-button-appearance" onClick={handleApplyLink}>Apply</button>
            </div>
        </div>
    );
};

export default LinkBox;