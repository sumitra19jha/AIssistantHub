import React from 'react';
import { FaImage, FaCopy, FaBold, FaItalic, FaUnderline, FaList, FaAlignJustify, FaLink } from 'react-icons/fa';
import "./Toolbar.css"

const Toolbar = ({ contentData, setEditorState, editorState, RichUtils, handleLink }) => {
    const isStyleActive = (style) => {
        const selection = editorState.getSelection();
        const currentInlineStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            return currentInlineStyle.has(style);
        } else {
            let hasStyle = false;
            const contentState = editorState.getCurrentContent();
            const startKey = selection.getStartKey();
            const endKey = selection.getEndKey();
            const startOffset = selection.getStartOffset();
            const endOffset = selection.getEndOffset();

            contentState.getBlockMap().skipUntil((_, k) => k === startKey).takeUntil((_, k) => k === endKey).concat([[endKey, contentState.getBlockForKey(endKey)]]).forEach((block) => {
                const blockKey = block.getKey();
                const start = blockKey === startKey ? startOffset : 0;
                const end = blockKey === endKey ? endOffset : block.getLength();
                for (let i = start; i < end; i++) {
                    if (block.getInlineStyleAt(i).has(style)) {
                        hasStyle = true;
                        break;
                    }
                }
            });
            return hasStyle;
        }
    };

    const handleBold = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const handleItalic = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    };

    const handleUnderline = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    };

    const handleUnorderedList = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    };

    const handleCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = contentData;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    };

    return (
        <div className="toolbar">
            <div className="toolbar-portion">
                <div className="toolbar-group">
                    <FaBold
                        className={`toolbar-icon ${isStyleActive("BOLD") ? "toolbar-icon-active" : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleBold();
                        }}
                    />
                    <FaItalic
                        className={`toolbar-icon ${isStyleActive("ITALIC") ? "toolbar-icon-active" : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleItalic();
                        }}
                    />
                    <FaUnderline
                        className={`toolbar-icon ${isStyleActive("UNDERLINE") ? "toolbar-icon-active" : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleUnderline();
                        }}
                    />
                </div>
                <div className="vertical-divider"></div>
                <div className="toolbar-group">
                    <FaList className="toolbar-icon" onClick={handleUnorderedList} />
                    <FaAlignJustify className="toolbar-icon" />
                </div>
                <div className="vertical-divider"></div>
                <div className="toolbar-group">
                    <FaLink className="toolbar-icon" onMouseDown={handleLink} />
                    <FaImage className="toolbar-icon" />
                </div>
            </div>
            <div className="toolbar-portion">
                <div className="toolbar-group">
                    <button className="copy-button" onClick={handleCopy}><FaCopy className="toolbar-icon" /> Copy</button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;