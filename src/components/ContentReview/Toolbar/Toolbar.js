import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";
import { FaImage, FaCopy, FaBold, FaItalic, FaUnderline, FaList, FaAlignJustify, FaLink } from "react-icons/fa";
import styles from "./Toolbar.module.css";

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
        <div className={styles.toolbar}>
            <div className={styles.toolbar_portion}>
                <div className={styles.toolbar_group}>
                    <FaBold
                        className={`${styles.toolbar_icon} ${isStyleActive("BOLD") ? styles.toolbar_icon_active : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleBold();
                        }}
                    />
                    <FaItalic
                        className={`${styles.toolbar_icon} ${isStyleActive("ITALIC") ? styles.toolbar_icon_active : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleItalic();
                        }}
                    />
                    <FaUnderline
                        className={`${styles.toolbar_icon} ${isStyleActive("UNDERLINE") ? styles.toolbar_icon_active : ""}`}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            handleUnderline();
                        }}
                    />
                </div>
                <div className={styles.vertical_divider}></div>
                <div className={styles.toolbar_group}>
                    <FaList className={styles.toolbar_icon} onClick={handleUnorderedList} />
                    <FaAlignJustify className={styles.toolbar_icon} />
                </div>
                <div className={styles.vertical_divider}></div>
                <div className={styles.toolbar_group}>
                    <FaLink className={styles.toolbar_icon} onMouseDown={handleLink} />
                    <FaImage className={styles.toolbar_icon} onClick={handleImage} />
                </div>
            </div>
            <div className={styles.toolbar_portion}>
                <div className={styles.toolbar_group}>
                    <button className={styles.copy_button} onClick={handleCopy}><FaCopy className={styles.toolbar_icon} /> Copy</button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;