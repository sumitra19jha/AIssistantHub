import React, { useState } from 'react';
import { Header, Segment, Accordion } from 'semantic-ui-react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQs.css';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleAccordionClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    return (
        <Segment basic className="explore__faq-container">
            <Header as="h2" textAlign="center" className="explore__faq-container__faq-header">
                Frequently Asked Questions
            </Header>
            <Accordion styled className="explore__faq-container__faq-accordion">
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleAccordionClick}
                >
                    {activeIndex === 0 ? <FaChevronUp className="explore__faq-container__faq-icon" /> : <FaChevronDown className="explore__faq-container__faq-icon" />}
                    What is our platform all about?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>
                        Our platform is an AI-powered content creation and optimization tool designed specifically for content marketers and digital marketing professionals. By leveraging cutting-edge artificial intelligence technology, we aim to streamline the content creation process, helping users generate high-quality, targeted, and engaging content with ease.

                        The platform offers a wide range of features tailored to the needs of content marketers, including content generation, SEO optimization, social media post creation, keyword research, content brief creation, and more. By incorporating these functionalities, our tool enables users to create content that not only resonates with their target audience but also adheres to best practices for search engine optimization.

                        Furthermore, our platform seamlessly integrates with popular content marketing tools like WordPress, HubSpot, and Mailchimp, simplifying users' workflows and making it easy for them to manage their content from a single, centralized location.

                        One of the platform's key strengths is its ability to generate content ideas, blog post titles, and social media captions based on user-provided keywords or topics, allowing content marketers to stay on top of trends and capitalize on emerging opportunities in their niche. Additionally, our platform helps users repurpose existing content into various formats, such as turning a blog post into a video script or an infographic, maximizing their content's reach and impact.

                        The platform also includes advanced analytics capabilities that provide insights into content performance, engagement, and areas for improvement. By integrating with analytics tools like Google Analytics, our tool allows users to make data-driven decisions and optimize their content for maximum effectiveness.

                        Lastly, we understand the importance of originality in content marketing. That's why our platform features a built-in plagiarism and duplicate content detection system, ensuring users can create unique and high-quality content that stands out in the competitive online landscape.

                        In summary, our platform is an all-in-one content marketing solution designed to help content marketers create, optimize, and manage their content more effectively, ultimately driving better results and a higher return on investment for their marketing efforts.
                    </p>
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={handleAccordionClick}
                >
                    <FaChevronDown className="explore__faq-container__faq-icon" />
                    How do I sign up for a free trial?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <p>
                        To sign up for a free trial of our platform, follow these simple steps:
                        <p></p>

                        <p>

                            <p>1. Visit our website and navigate to the <b>homepage</b> or the "Explore" page.</p>
                            <p>2. Look for the <b>"Signup for Free Trial" </b>or <b>"Log In"</b> button, typically located near the pricing plans or within the main navigation menu.</p>
                            <p>3. Click on the button, which will redirect you to a <b>Sign-up</b> or <b>Registration form</b>.</p>
                            <p>4. Fill out the required fields, including your <b>name</b>, <b>email address</b>, and any additional information requested. You may also need to create a <b>password</b> for your account.</p>
                            <p>5. Review the <b>Terms and Conditions</b>, and if you agree, check the box to confirm your acceptance.</p>
                            <p>6. Click on the <b>"Sign Up"</b> or <b>"Start Free Trial"</b> button to complete the registration process.</p>

                        </p>

                        Make sure to take full advantage of the free trial period to explore the platform's features and determine if it meets your content marketing needs. If you have any questions or need assistance, don't hesitate to reach out to the support team for help.
                    </p>
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={handleAccordionClick}
                >
                    <FaChevronDown className="explore__faq-container__faq-icon" />
                    What integrations do you support?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <p>
                        Our platform supports a variety of popular integrations to enhance the user experience and streamline your content marketing workflow. Some of the key integrations include:
                        <p></p>
                        <p>
                            <b>1. Content Management Systems (CMS):</b> We integrate with widely-used CMS platforms like WordPress and Joomla, allowing you to draft, edit, and publish content directly from our platform to your website.
                        </p>
                        <p>
                            <b>2. Marketing Automation Platforms:</b> Our platform seamlessly connects with marketing automation tools such as HubSpot, Marketo, and Mailchimp, enabling you to manage your email marketing campaigns and distribute content more efficiently.
                        </p>

                        <p>
                            <b>3. Social Media Management Tools:</b> We support integration with social media management platforms like Buffer, Hootsuite, and Sprout Social, making it easy for you to schedule and post your social media content without leaving our platform.
                        </p>

                        <p>
                            <b>4. SEO Tools:</b> Our platform integrates with popular SEO tools like Ahrefs, Moz, and SEMrush, providing valuable insights on keyword research, competitor analysis, and content optimization directly within our platform.
                        </p>
                        <p>
                            <b>5. Analytics Tools:</b> We offer integration with leading analytics tools like Google Analytics and Adobe Analytics, enabling you to track and measure the performance of your content and make data-driven decisions for optimization.
                        </p>
                        <p>
                            <b>6. Project Management and Collaboration Tools:</b> Our platform supports collaboration with tools such as Trello, Asana, and Slack, allowing you and your team to communicate and manage content projects efficiently.
                        </p>
                        <p>
                            Please note that the list of supported integrations may vary and expand over time. We continuously work on adding new integrations to improve our platform's functionality and help our users achieve better results in their content marketing efforts. If you have a specific integration in mind or need assistance with integrating our platform with your preferred tools, feel free to contact our support team for guidance.
                        </p>
                    </p>
                </Accordion.Content>
            </Accordion>
        </Segment>
    );
};

export default FAQs;
