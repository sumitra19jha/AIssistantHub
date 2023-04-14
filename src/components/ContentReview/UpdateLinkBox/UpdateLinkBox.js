import { EditorState, Modifier } from 'draft-js';
import './UpdateLinkBox.css'

const UpdateLinkBox = ({ left, top, editorState, editedURL, setEditorState, setShowEditLinkBox, setCurrentLinkKey, setEditedURL }) => {
    const handleChangeLink = () => {
        if (!editedURL) {
            return;
        }

        let link = editedURL;

        // Add 'http://' to the inputURL if it doesn't have it
        if (!/^http(s)?:\/\//.test(link)) {
            link = 'http://' + link;
        }

        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const blockKey = selection.getStartKey();
        const block = contentState.getBlockForKey(blockKey);

        let linkStartOffset = null;
        let linkEndOffset = null;

        block.findEntityRanges(
            (charMetadata) => {
                const entityKey = charMetadata.getEntity();
                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
            },
            (start, end) => {
                if (selection.hasEdgeWithin(blockKey, start, end)) {
                    linkStartOffset = start;
                    linkEndOffset = end;
                }
            }
        );

        if (linkStartOffset !== null && linkEndOffset !== null) {
            const linkSelection = selection.merge({
                anchorOffset: linkStartOffset,
                focusOffset: linkEndOffset,
            });

            // Replace the old text with the new link URL
            const newContentState = Modifier.replaceText(contentState, linkSelection, link);
            const newContentStateWithEntity = newContentState.createEntity('LINK', 'MUTABLE', { url: link });
            const entityKey = newContentStateWithEntity.getLastCreatedEntityKey();

            // Apply the entity to the newly inserted text
            const newSelection = linkSelection.merge({ focusOffset: linkStartOffset + link.length });
            const finalContentState = Modifier.applyEntity(newContentStateWithEntity, newSelection, entityKey);

            const newState = EditorState.push(editorState, finalContentState, 'change-inline-style');
            setEditorState(newState);
        }

        setShowEditLinkBox(false);
        setCurrentLinkKey(null);
    };

    const handleRemoveLink = () => {
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const blockKey = selection.getStartKey();
        const block = contentState.getBlockForKey(blockKey);

        let linkStartOffset = null;
        let linkEndOffset = null;

        block.findEntityRanges(
            (charMetadata) => {
                const entityKey = charMetadata.getEntity();
                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
            },
            (start, end) => {
                if (selection.hasEdgeWithin(blockKey, start, end)) {
                    linkStartOffset = start;
                    linkEndOffset = end;
                }
            }
        );

        if (linkStartOffset !== null && linkEndOffset !== null) {
            const linkSelection = selection.merge({
                anchorOffset: linkStartOffset,
                focusOffset: linkEndOffset,
            });

            const newContentState = Modifier.removeRange(contentState, linkSelection, 'forward');
            const newState = EditorState.push(editorState, newContentState, 'remove-range');
            setEditorState(newState);
        }

        setShowEditLinkBox(false);
        setCurrentLinkKey(null);
    };

    return (
        <div
            data-role="positioned-container"
            className="wrapper_f1x2i2y1"
            style={{ left: left, top: top }}
        >
            <div className="update-link-box">
                <input
                    className="update-link-box-url-input update-link-box-url-holder update-link-box-link-base"
                    type="text"
                    placeholder="Update Link URL"
                    value={editedURL}
                    onChange={(e) => setEditedURL(e.target.value)}
                />
                <button className="update-link-box-button-text update-link-box-button-form update-link-box-button-appearance" onClick={handleChangeLink}>Change</button>
                <div className="vertical-divider"/>
                <button className="update-link-box-button-text update-link-box-button-form update-link-box-button-appearance" onClick={handleRemoveLink}>Remove</button>
            </div>
        </div>
    );
};

export default UpdateLinkBox;