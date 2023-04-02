import { FaUser, FaClock, FaCheckCircle } from 'react-icons/fa';
import React from 'react';
import './Features.css';


const Features = () => (
    <div className="features">
        <div className="feature-container">
            <FeatureList />
        </div>
    </div>
);


const FeatureList = () => (
    <div className="feature-list">
        {DummyData.map(item => (
            <FeatureItem key={item.id} {...item} />
        ))}
    </div>
);

/**
 * A component that displays an individual feature item with an icon, title, and description.
 * @param {Object} props - The props for the component.
 * @param {Object} props.icon - The icon component to display.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.description - The description of the feature.
 */
const FeatureItem = ({ icon, title, description }) => (
    <div className="feature-item">
        <div className="feature-item-icon-container">
            {icon}
        </div>
        <h3 className="feature-item-title">{title}</h3>
        <p className="feature-item-description">{description}</p>
    </div>
);

// Define some dummy data for the feature list.
const DummyData = [
    {
        id: 1,
        icon: <FaUser />,
        title: 'AI-Driven Content Strategy Suite',
        description: 'Harness the power of AI to streamline your content marketing strategy with integrated topic and keyword research, content idea generation, and SEO optimization features. Discover trending topics, optimize content for search engines, and generate fresh ideas for blog posts, social media captions, and more.'
    },
    {
        id: 2,
        icon: <FaClock />,
        title: 'Comprehensive Content Creation',
        description: 'Enhance your content marketing efforts with our all-in-one platform that assists in content brief creation, social media post generation, content repurposing, and email/newsletter drafting. Seamlessly integrate with popular tools like WordPress, HubSpot, or Mailchimp, and maintain a consistent online presence across multiple channels.'
    },
    {
        id: 3,
        icon: <FaCheckCircle />,
        title: 'Content Performance & Originality Insights',
        description: "Boost your content's effectiveness by analyzing performance metrics with integrated analytics tools like Google Analytics. Ensure originality and avoid duplicate content issues with our built-in plagiarism checker. Gain valuable insights into engagement and areas for improvement to continuously refine your content marketing strategy."
    },
];

export default Features;