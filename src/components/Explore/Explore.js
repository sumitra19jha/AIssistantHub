import React from 'react';
import { FaLaptopCode, FaTasks, FaRocket, FaShieldAlt } from 'react-icons/fa';

import HeroSection from './HeroSection/HeroSection';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import UseCases from './UseCases/UseCases';
import DemoSection from './DemoSection/DemoSection';
import IntegrationPartners from './Integration/Integration';
import { PricingPlan } from '../Subscription/PricingPlan/PricingPlan';
import FAQs from './FAQs/FAQs';

const ExplorePage = () => {
    const heroImage = 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/hero-header.jpg';

    const integrations = [
        { logo: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/WordPress-logotype-wmark.png', name: 'WordPress', description: 'Publish your content on your WordPress site.' },
        { logo: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/buffer.png', name: 'Buffer', description: 'Share your content on Buffer.' },
        { logo: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/mailchimp-logo.jpeg', name: 'Mailchimp', description: 'Integrate with your Mailchimp account.' },
        { logo: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/semrush-logo.png', name: 'SEMrush', description: 'Integrate with your SEMrush account.' },
        { logo: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/goggle-analytics-logo.png', name: 'Google Analytics', description: 'Integrate with your Google Analytics account.' },
    ];

    const featureIcons = [
        { name: 'Content Management', icon: FaTasks, description: 'Manage all your content in one place.' },
        { name: 'SEO Tools', icon: FaRocket, description: 'Optimize your content for search engines.' },
        { name: 'Social Media Integration', icon: FaShieldAlt, description: 'Share your content on all your social media channels.' },
        { name: 'Analytics', icon: FaLaptopCode, description: 'Track your content performance and ROI.' },
    ];

    const useCaseImages = [
        { image: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/blog-marketing.jpg', title: 'Blog Post Promotion', description: "Boost your blog's visibility and reach by implementing a comprehensive promotion strategy that includes search engine optimization, social media sharing, influencer outreach, and content syndication. By targeting the right audience and utilizing various online channels, you can drive traffic and engagement to your blog posts, ultimately increasing your site's authority and generating valuable leads for your business." },
        { image: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/social-media.jpg', title: 'Social Media Campaigns', description: "Harness the power of social media to engage your audience, build brand awareness, and drive conversions by creating compelling campaigns that showcase your unique brand story. By incorporating eye-catching visuals, timely content, and interactive elements, you can foster a strong online community that shares and engages with your content. Monitor and optimize your campaigns to ensure maximum impact and return on investment." },
        { image: 'https://pigeon-website-images.s3.us-east-2.amazonaws.com/email-marketing.jpg', title: 'Email Marketing', description: "Utilize email marketing as an effective means to strengthen customer relationships, drive sales, and nurture leads. By delivering personalized, timely, and relevant content to your subscribers—such as newsletters, promotional offers, and educational materials—you can maintain ongoing engagement and foster brand loyalty. Track and analyze your email marketing efforts to continuously improve performance and enhance the overall experience for your audience." },
    ];

    return (
        <div style={{ backgroundColor: "white" }}>
            {/* Hero section */}
            <HeroSection heroImage={heroImage} />

            {/* Feature highlights section */}
            <KeyFeatures featureIcons={featureIcons} />

            {/* Use cases and success stories section */}
            <UseCases useCaseImages={useCaseImages} />

            {/* Demo or walkthrough section */}
            <DemoSection />

            {/* Integration partners section */}
            <IntegrationPartners integrations={integrations} />

            {/* Pricing and plans section */}
            <PricingPlan />

            {/* FAQs or knowledge base section */}
            <FAQs />

        </div>
    );
};

export default ExplorePage;



