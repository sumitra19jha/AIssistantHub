import React from "react";
import "./Editor.css"

const Editor = ({ selectedDocument, onDocumentSelect, onDocumentUpload }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        onDocumentUpload(file);
    };

    return (
        <div className="editor">
            <div className="editor-actions">
                <button onClick={() => onDocumentSelect(null)}>New Document</button>
                <input type="file" onChange={handleFileUpload} />
            </div>
            <div className="editor-content">
                <textarea
                    value={selectedDocument ? selectedDocument.content : ""}
                    onChange={(e) =>
                        onDocumentSelect({
                            id: selectedDocument ? selectedDocument.id : new Date().getTime(),
                            content: e.target.value,
                        })
                    }
                />
            </div>
        </div>
    );
};

export default Editor;
