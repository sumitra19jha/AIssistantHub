import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaSave, FaDownload } from 'react-icons/fa'; // Import icons from react-icons library
import "./SEOEditor.css"

const SEOEditor = () => {
    const [content, setContent] = useState(''); // State for the content of the text area
    const [score, setScore] = useState(0); // State for the SEO score

    const handleContentChange = (event) => {
        setContent(event.target.value); // Update the content state on text area change
        // Calculate the SEO score based on the content and update the score state
        const newScore = calculateScore(event.target.value);
        setScore(newScore);
    };

    const calculateScore = (content) => {
        // Calculate the SEO score based on the content
        // ...
        return Math.round(Math.random() * 100); // Random score for demonstration purposes
    };

    const getScoreColor = () => {
        if (score >= 70) {
            return "#4caf50"; // Good score color
        } else if (score >= 50) {
            return "#ffc107"; // Caution score color
        } else {
            return "#f44336"; // Issue score color
        }
    };

    const handleScoreIconClick = (icon) => {
        const icons = document.querySelectorAll('.score-icons svg'); // Get all score icons
        icons.forEach((item) => {
            item.classList.remove('active'); // Remove "active" class from all icons
        });
        icon.classList.add('active'); // Add "active" class to clicked icon
    };

    return (
        <>
            <nav className="navbar">
                <a href="/seo-optimisation-report" className="navbar-brand">SEO Optimization Report</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/seo-editor/save" className="nav-link">Save <FaSave /></a>
                    </li>
                    <li className="nav-item">
                        <a href="seo-editor/editor" className="nav-link">Export <FaDownload /></a>
                    </li>
                </ul>
            </nav>
            <div className="seo-editor">
                <div className="seo-report">
                    <h2>SEO Score</h2>
                    <div className="score">
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${score}%`, backgroundColor: getScoreColor() }}>
                                <span className="progress-bar tooltip">{score}</span>
                            </div>
                        </div>
                        <div className="score-icons">
                            <FaCheckCircle className="good" onClick={(e) => handleScoreIconClick(e.target)} />
                            <FaInfoCircle className="caution" onClick={(e) => handleScoreIconClick(e.target)} />
                            <FaExclamationCircle className="issue" onClick={(e) => handleScoreIconClick(e.target)} />
                        </div>
                    </div>
                    <div className="report-details">
                        {/* Collapsible sections or tooltips for detailed explanations and recommendations */}
                        <div className="section">
                            <h3>Title Tag</h3>
                            <span className="score good">Good</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio euismod, blandit nunc eu, blandit elit. Sed vitae velit eget enim blandit ornare. Donec eu porttitor justo. </p>
                        </div>
                        <div className="section">
                            <h3>Meta Description</h3>
                            <span className="score caution">Caution</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio euismod, blandit nunc eu, blandit elit. Sed vitae velit eget enim blandit ornare. Donec eu porttitor justo. </p>
                        </div>
                        <div className="section">
                            <h3>Header Tags</h3>
                            <span className="score issue">Issue</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio euismod, blandit nunc eu, blandit elit. Sed vitae velit eget enim blandit ornare. Donec eu porttitor justo. </p>
                        </div>
                    </div>
                </div>
                <div className="editor">
                    <h2>Content Editor</h2>
                    <div className="editing-features">
                        {/* Add basic text editing functionality and the ability to add or remove sections */}
                        <button className="bold"><b>B</b></button>
                        <button className="italic"><i>I</i></button>
                        <button className="underline"><u>U</u></button>
                    </div>
                    <div
                        className="editable-area"
                        contentEditable={true}
                        onInput={handleContentChange}
                        dangerouslySetInnerHTML={{ __html: content }} // Use dangerouslySetInnerHTML to display the formatted content
                    />
                </div>
            </div>
        </>
    );

};

export default SEOEditor;