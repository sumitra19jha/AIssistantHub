import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";
import { FaImage, FaCopy, FaBold, FaItalic, FaUnderline, FaList, FaAlignJustify, FaLink } from "react-icons/fa";
import "./Toolbar.css";

const Toolbar = ({ contentData, setEditorState, editorState, handleLink }) => {
    const handleImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const src = reader.result;
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src });
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

                setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
            };

            reader.readAsDataURL(file);
        };
    };


    const isStyleActive = (style) => {
        const currentInlineStyle = editorState.getCurrentInlineStyle();
        return currentInlineStyle.has(style);
    };

    const handleBold = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    const handleItalic = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    const handleUnderline = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
    };

    const handleUnorderedList = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
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
                    <FaImage className="toolbar-icon" onClick={handleImage} />
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