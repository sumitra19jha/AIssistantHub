import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { Map } from 'immutable';
import 'draft-js/dist/Draft.css';
import "./ContentArea.css";
import { createLinkDecorator } from './linkDecorator';
import Toolbar from './Toolbar';

const ContentArea = ({ contentData }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            stateFromHTML(contentData),
            createLinkDecorator()
        )
    );

    const editorRef = useRef();
    const editorContainerRef = useRef();
    const linkInputRef = useRef();
    const [showLinkBox, setShowLinkBox] = useState(false);
    const [linkBoxPosition, setLinkBoxPosition] = useState({ x: 0, y: 0 });
    const [lastEditorSelection, setLastEditorSelection] = useState(null);
    const [inputURL, setInputURL] = useState('');


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

    useEffect(() => {
        if (showLinkBox) {
            setTimeout(() => {
                linkInputRef.current.focus();
            }, 0);
        }
    }, [showLinkBox]);

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

    return (
        <div className="content-area">

            <Toolbar
                contentData={contentData}
                setEditorState={setEditorState}
                editorState={editorState}
                RichUtils={RichUtils}
                handleLink={handleLink}
            />

            {showLinkBox &&
                <div
                    data-role="positioned-container"
                    className="wrapper_f1x2i2y1"
                    style={{ left: linkBoxPosition.x, top: linkBoxPosition.y }}
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
                        <button className="fqlvlsm f2phmyy f1gcrnub" onClick={handleApplyLink}>Apply</button>
                    </div>
                </div>
            }

            <div ref={editorContainerRef} className="editor" onClick={() => editorRef.current.focus()}>
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={myKeyBindingFn}
                    onChange={(newState) => {
                        setLastEditorSelection(newState.getSelection());
                        setEditorState(newState);
                    }}
                //customStyleMap={styleMap}
                />
            </div>
        </div>
    );
};

export default ContentArea;