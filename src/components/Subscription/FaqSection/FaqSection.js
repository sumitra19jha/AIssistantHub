import React from 'react';
import './FaqSection.css'

export const FaqSection = () => {
    const faqs = [
        {
            question: 'How do I sign up for a subscription plan?',
            answer:
                'To sign up for a subscription plan, simply visit our Subscription Page, choose the plan that best suits your needs, and follow the steps to create your account and complete the payment process.',
        },
        {
            question: 'What are the benefits of upgrading to a paid subscription?',
            answer: 'Upgrading to a paid subscription unlocks premium features such as advanced SEO optimization, keyword research tools, content analytics, and priority support, which help you create and optimize content more effectively.',
        },
        {
            question: 'Can I cancel my subscription at any time?',
            answer: "Yes, you can cancel your subscription at any time. When you cancel, your subscription will remain active until the end of your current billing cycle, and you won't be charged again for the next billing period.",
        },
        {
            question: 'Is my data secure on the platform?',
            answer: 'We take data security very seriously. Our platform uses industry-standard encryption and security measures to protect your information. Your data is stored securely and is only accessible by authorized personnel.',
        },
    ];


    return (
        <section className="faq-section">
            <div className="container">
                <h2 className="faq-section-title">Frequently Asked Questions</h2>
                <div className="row">
                    {faqs.map((faq, idx) => (
                        <div className="col-md-6" key={idx}>
                            <div className="faq-item">
                                <h3 className="faq-question">{faq.question}</h3>
                                <p className="faq-answer">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};