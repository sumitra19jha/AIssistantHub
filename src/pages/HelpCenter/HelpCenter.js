import React, { useState } from "react";
import "./HelpCenter.css";
import Sidebar from "../../components/Dashboard/Sidebar";

const HelpCenter = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="help-center">
            <Sidebar />
            <div className="help-center-main">
                <div className="help-center-content">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-container">
                        {/* Add your FAQ components or data here */}
                        <FaqItem question="How do I create a new project?" answer="To create a new project, click on the 'New Project' button on the dashboard and follow the prompts." />
                        <FaqItem question="What types of files can I upload?" answer="You can upload .txt, .pdf, .doc, and .docx files for content generation." />
                        <FaqItem question="How can I optimize my content for SEO?" answer="Use the SEO Optimization feature in the dashboard to analyze and optimize your content for search engines." />
                    </div>

                    <h2>Tutorials and Guides</h2>
                    <div className="tutorials-guides-container">
                        {/* Add your tutorial and guide components or data here */}
                        <TutorialGuideItem title="Getting Started with the Platform" link="#" />
                        <TutorialGuideItem title="Creating a New Project" link="#" />
                        <TutorialGuideItem title="Optimizing Your Content for SEO" link="#" />
                    </div>

                    <h2>Troubleshooting</h2>
                    <div className="troubleshooting-container">
                        {/* Add your troubleshooting components or data here */}
                        <TroubleshootingItem issue="I can't upload my file" solution="Make sure the file is in a supported format (.txt, .pdf, .doc, or .docx) and try again." />
                        <TroubleshootingItem issue="My content is not optimized for SEO" solution="Use the SEO Optimization feature to analyze and optimize your content for search engines." />
                    </div>

                    <h2>Glossary</h2>
                    <div className="glossary-container">
                        {/* Add your glossary components or data here */}
                        <GlossaryItem term="SEO" definition="Search Engine Optimization is the process of improving the quality and quantity of website traffic from search engines." />
                        <GlossaryItem term="Content Generation" definition="The process of creating relevant and valuable content for a specific audience or purpose." />
                    </div>

                    <h2>Contact Us</h2>
                    {/* Add your contact information here */}
                    <p>Email: support@example.com</p>
                    <p>Phone: +1 (555) 123-4567</p>

                    <h2>Community Forums</h2>
                    <div className="community-forums-container">
                        {/* Add your community forum components or data here */}
                        <CommunityForumItem title="General Discussion" link="#" />
                        <CommunityForumItem title="Tips and Tricks" link="#" />
                        <CommunityForumItem title="Feature Requests" link="#" />
                    </div>

                    <h2>Product Documentation</h2>
                    <div className="product-documentation-container">
                        {/* Add your product documentation components or data here */}
                        <ProductDocumentationItem title="User Manual" link="#" />
                        <ProductDocumentationItem title="API Documentation" link="#" />
                        <ProductDocumentationItem title="Changelog" link="#" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Dummy components for FAQ, Tutorials, Troubleshooting, Glossary, and Community Forums
const FaqItem = ({ question, answer }) => (
    <div className="faq-item">
        <h3>{question}</h3>
        <p>{answer}</p>
    </div>
);

const TutorialGuideItem = ({ title, link }) => (
    <div className="tutorial-guide-item">
        <a href={link}>{title}</a>
    </div>
);

const TroubleshootingItem = ({ issue, solution }) => (
    <div className="troubleshooting-item">
        <h3>{issue}</h3>
        <p>{solution}</p>
    </div>
);

const GlossaryItem = ({ term, definition }) => (
    <div className="glossary-item">
        <h3>{term}</h3>
        <p>{definition}</p>
    </div>
);

const CommunityForumItem = ({ title, link }) => (
    <div className="community-forum-item">
        <a href={link}>{title}</a>
    </div>
);

const ProductDocumentationItem = ({ title, link }) => (
    <div className="product-documentation-item">
        <a href={link}>{title}</a>
    </div>
);



export default HelpCenter;
