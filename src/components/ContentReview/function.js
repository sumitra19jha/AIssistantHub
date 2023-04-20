import { EditorState, RichUtils, getDefaultKeyBinding, Modifier, SelectionState } from 'draft-js';
import { Map } from 'immutable';

const Image = (props) => {
    const { contentState, block } = props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    return <img src={data.src} alt="" style={{ maxWidth: '100%' }} />;
};

export const getCaretCoordinates = () => {
    // ... (function code)
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

export const handleCursorPosition = (editorFocused, editorState, editorContainerRef, setEditLinkBoxPosition, setShowEditLinkBox, currentLinkKey, setCurrentLinkKey, setEditedURL) => {
    // ... (function code)
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

export const handleLink = (editorState, setLinkBoxPosition, setShowLinkBox, editorContainerRef) => {
    // ... (function code)
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

export const handleKeyDown = (event, setShowLinkBox) => {
    // ... (function code)
    if (event.key === 'Escape') {
        setShowLinkBox(false);
    }
};

export const myKeyBindingFn = (e) => {
    // ... (function code)
    if (e.keyCode === 9 /* Tab */) {
        e.preventDefault();
        if (e.shiftKey) {
            return 'tab-outdent';
        }
        return 'tab-indent';
    }
    return getDefaultKeyBinding(e);
};

export const handleKeyCommand = (command, editorState, setEditorState) => {
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

export const indentList = (editorState) => {
    // ... (function code)
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

export const outdentList = (editorState) => {
    // ... (function code)
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

export const imageRenderer = (contentBlock) => {
    // ... (function code)
    const type = contentBlock.getType();
    if (type === 'atomic') {
        return {
            component: Image,
            editable: false,
        };
    }
};