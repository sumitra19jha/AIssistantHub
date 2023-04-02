import React, { useState } from 'react';
import "./ContentArea.css"
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { FaSave, FaFileExport, FaCopy, FaShareAlt } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

const ContentArea = ({showSidebar, setShowSidebar}) => {
    const [content, setContent] = useState({
        heading: 'Heading',
        subheading: 'Subheading',
        paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod justo ac elit vestibulum, vitae ultrices tortor blandit. Curabitur nec semper nulla. Sed sit amet dolor vel elit dictum vehicula ut eget nibh. Sed auctor non ligula sed venenatis. Cras eget augue arcu. Duis sed fermentum metus. Morbi varius augue in ligula pharetra, ut interdum massa posuere. Nulla facilisi. Fusce eleifend quam eget nibh posuere, vitae lobortis neque imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod justo ac elit vestibulum, vitae ultrices tortor blandit. Curabitur nec semper nulla. Sed sit amet dolor vel elit dictum vehicula ut eget nibh. Sed auctor non ligula sed venenatis. Cras eget augue arcu. Duis sed fermentum metus. Morbi varius augue in ligula pharetra, ut interdum massa posuere. Nulla facilisi. Fusce eleifend quam eget nibh posuere, vitae lobortis neque imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod justo ac elit vestibulum, vitae ultrices tortor blandit. Curabitur nec semper nulla. Sed sit amet dolor vel elit dictum vehicula ut eget nibh. Sed auctor non ligula sed venenatis. Cras eget augue arcu. Duis sed fermentum metus. Morbi varius augue in ligula pharetra, ut interdum massa posuere. Nulla facilisi. Fusce eleifend quam eget nibh posuere, vitae lobortis neque imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod justo ac elit vestibulum, vitae ultrices tortor blandit. Curabitur nec semper nulla. Sed sit amet dolor vel elit dictum vehicula ut eget nibh. Sed auctor non ligula sed venenatis. Cras eget augue arcu. Duis sed fermentum metus. Morbi varius augue in ligula pharetra, ut interdum massa posuere. Nulla facilisi. Fusce eleifend quam eget nibh posuere, vitae lobortis neque imperdiet.`,
        subSubheading: 'Sub-Subheading',
        listItems: ['List Item 1', 'List Item 2', 'List Item 3'],
        finalParagraph: `Sed pellentesque justo vel augue euismod, et eleifend eros fringilla. Aliquam erat volutpat. Donec a mi sed libero lacinia ultrices. Donec blandit nibh sit amet eros bibendum, quis malesuada nulla tristique. Fusce non luctus tortor. Nunc id dui id lectus convallis rhoncus. Donec at ultrices velit, vel facilisis massa. Phasellus bibendum semper arcu, ut luctus velit rhoncus ut. Nam tristique, diam id aliquet fermentum, mauris dolor consequat leo, vel suscipit mauris purus eu justo.`
    });

    const handleInputChange = (key, value) => {
        setContent({ ...content, [key]: value });
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

    const requestNewContent = async (section) => {
        try {
            // Replace with your API endpoint for fetching new content
            const response = await fetch(`https://api.example.com/suggestions/${section}`);
            const data = await response.json();

            if (data && data.suggestion) {
                handleInputChange(section, data.suggestion);
            } else {
                console.error("No suggestion received");
            }
        } catch (error) {
            console.error("Error fetching new content:", error);
        }
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
                </div>

                <div className="formatted-content-display">
                    <h1
                        contentEditable="true"
                        className="heading"
                        onBlur={(e) => handleInputChange("heading", e.target.innerText)}>
                        {content.heading}
                    </h1>
                    <button
                        onClick={() => requestNewContent('heading')}
                        className="refresh-button">
                        <MdRefresh size={25} />
                    </button>

                    <h2
                        contentEditable="true"
                        className="subheading"
                        onBlur={(e) => handleInputChange("subheading", e.target.innerText)}>
                        {content.subheading}
                    </h2>
                    <p
                        contentEditable="true"
                        className="paragraph"
                        onBlur={(e) => handleInputChange("paragraph", e.target.innerText)}>
                        {content.paragraph}
                    </p>
                    <h2
                        contentEditable="true"
                        className="subheading"
                        onBlur={(e) => handleInputChange("subSubheading", e.target.innerText)}>
                        {content.subSubheading}
                    </h2>
                    <ul>
                        {content.listItems.map((item, index) => (
                            <li
                                key={index}
                                contentEditable="true"
                                className="list-item"
                                onBlur={(e) => {
                                    const newListItems = [...content.listItems];
                                    newListItems[index] = e.target.innerText;
                                    handleInputChange("listItems", newListItems);
                                }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <h3
                        contentEditable="true"
                        className="sub-subheading"
                        onBlur={(e) => handleInputChange("subSubheading", e.target.innerText)}>
                        {content.subSubheading}
                    </h3>
                    <p
                        contentEditable="true"
                        className="paragraph"
                        onBlur={(e) => handleInputChange("finalParagraph", e.target.innerText)}>
                        {content.finalParagraph}
                    </p>
                    <button
                        onClick={() => requestNewContent('paragraph')}
                        className="refresh-button">
                        <MdRefresh size={25} />
                    </button>
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