import { FaGlobe, FaPencilAlt, FaEnvelopeOpenText, FaWrench } from 'react-icons/fa';
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


const FeatureItem = ({ icon, title, description }) => (
    <div className="feature-item">
        <div className="feature-item-icon-container">
            {icon}
        </div>
        <h3 className="feature-item-title">{title}</h3>
        <p className="feature-item-description">{description}</p>
    </div>
);

const DummyData = [
    {
        id: 1,
        icon: <FaGlobe style={{fontSize:"32px"}}/>,
        title: 'Real-time Internet Search',
        description: 'Proton AI crafts targeted, real-time content with powerful search and generative AI, engaging your users effectively.'
    },
    {
        id: 2,
        icon: <FaPencilAlt style={{fontSize:"32px"}}/>,
        title: 'Edit and Publish',
        description: 'Share feedback with Proton AI; our data-driven approach ensures tailored, captivating content for your audience.'
    },
    {
        id: 3,
        icon: <FaEnvelopeOpenText style={{fontSize:"32px"}}/>,
        title: 'Daily Pipelines',
        description: "Proton AI delivers curated content via email for review; share feedback, edit, and publish with ease."
    },
    {
        id: 4,
        icon: <FaWrench style={{fontSize:"32px"}}/>,
        title: 'Broad Capabilities',
        description: "Proton AI crafts diverse content—social media, blogs, newsletters, marketing emails—optimized for SEO success."
    },
];

export default Features;