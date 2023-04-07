import React, { useState } from 'react';
import "./ContentArea.css"
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { FaSave, FaFileExport, FaCopy, FaShareAlt } from 'react-icons/fa';

const ContentArea = ({ showSidebar, setShowSidebar, contentData }) => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    const handleInputChange = (key, value) => {
        // setContent({ ...content, [key]: value });
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const handleSave = () => {
        //code to save the edited content
    };

    const handleExport = () => {
        //code to export the content in various formats
    };

    const handleBold = () => {
        document.execCommand("bold", false, null);
        setBold(!bold);
    };

    const handleItalic = () => {
        document.execCommand("italic", false, null);
        setItalic(!italic);
    };

    const handleUnderline = () => {
        document.execCommand("underline", false, null);
        setUnderline(!underline);
    };

    return (
        <div className="right-part">
            <div className="content-review">
                <div className='row-alignment'>
                    <button
                        className={showSidebar ? "close-icon" : "menu-icon"}
                        onClick={showSidebar ? closeSidebar : toggleSidebar}>
                        {showSidebar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                    </button>
                    <h1 className="title">Content Review</h1>
                    <p></p>
                </div>

                <div className="formatted-content-display">
                    <div className="formatting-options">
                        <button className={bold ? "formatting-button active" : "formatting-button"} onClick={handleBold}><strong>B</strong></button>
                        <button className={italic ? "formatting-button active" : "formatting-button"} onClick={handleItalic}><em>I</em></button>
                        <button className={underline ? "formatting-button active" : "formatting-button"} onClick={handleUnderline}><u>U</u></button>
                    </div>
                    <p
                        contentEditable="true"
                        className="paragraph"
                        onBlur={(e) => handleInputChange("paragraph", e.target.innerHTML)}
                        dangerouslySetInnerHTML={{ __html: contentData }}>
                    </p>
                </div>

                <div className={showSidebar ? "save-and-export-options" : "save-and-export-options-without-sidebar"}>
                    <button className="save-button" onClick={handleSave}><FaSave size={20} /> Save</button>
                    <button className="export-button" onClick={handleExport}><FaFileExport size={20} /> Export</button>
                    <button className="copy-button"><FaCopy size={20} /> Copy</button>
                    <button className="share-button"><FaShareAlt size={20} /> Share</button>
                </div>
            </div>
        </div>
    );
}

export default ContentArea;