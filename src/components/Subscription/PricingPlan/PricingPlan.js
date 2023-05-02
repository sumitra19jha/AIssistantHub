import React from 'react';
import "./PricingPlan.css";
import { FaCheck, FaTimes } from 'react-icons/fa';

export const PricingPlan = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$19.99',
            billingCycle: 'per month',
            features: [
                { "header": "No of User", value: '1 user', 'isAvailable': true },
                { "header": "Capacity", value: 'Unlimited content generation', 'isAvailable': true },
                { "header": "SEO optimization", value: 'Basic', 'isAvailable': true },
                { "header": "Integration", value: '5 social media accounts', 'isAvailable': true },
                { "header": "Research", value: 'Not included', 'isAvailable': false },
                { "header": "Analytics", value: 'Not included', 'isAvailable': false },
                { "header": "Support", value: 'Email Support', 'isAvailable': true },
                { "header": "Manager", value: 'Dedicated account manager', 'isAvailable': false },
            ],
            recommended: false,
        },

        {
            name: 'Pro',
            price: '$49.99',
            billingCycle: 'per month',
            features: [
                { "header": "No of User", value: '5 user', 'isAvailable': true },
                { "header": "Capacity", value: 'Unlimited content generation', 'isAvailable': true },
                { "header": "SEO optimization", value: 'Advanced', 'isAvailable': true },
                { "header": "Integration", value: '15 social media accounts', 'isAvailable': true },
                { "header": "Research", value: 'Keyword research tools', 'isAvailable': true },
                { "header": "Analytics", value: 'Content analytics', 'isAvailable': true },
                { "header": "Support", value: 'Priority email support', 'isAvailable': true },
                { "header": "Manager", value: 'Not included', 'isAvailable': false },
            ],
            recommended: true,
        },

        {
            name: 'Enterprise',
            price: 'Custom',
            billingCycle: 'Contact us',
            features: [
                { "header": "No of User", value: 'Custom', 'isAvailable': true },
                { "header": "Capacity", value: 'Unlimited content generation', 'isAvailable': true },
                { "header": "SEO optimization", value: 'Advanced', 'isAvailable': true },
                { "header": "Integration", value: 'Unlimited', 'isAvailable': true },
                { "header": "Research", value: 'Keyword research tools', 'isAvailable': true },
                { "header": "Analytics", value: 'Content analytics', 'isAvailable': true },
                { "header": "Support", value: 'Email & Phone support', 'isAvailable': true },
                { "header": "Manager", value: 'Dedicated account manager', 'isAvailable': true },
            ],
            recommended: false,
        }
    ];

    return (
        <div className="explore__pricing-plan">
            <h3 className="explore__pricing-plan__pricing-plan-title">Choose a plan that best fits your need</h3>
            <div className="explore__pricing-plan__pricing-plan-grid">
                {plans.map((plan, idx) => (
                    <div className={`explore__pricing-plan__pricing-plan-card ${plan.recommended ? 'recommended' : ''}`} key={idx}>
                        <h4 className="explore__pricing-plan__pricing-plan-card-title">{plan.name}</h4>
                        <p className="explore__pricing-plan__pricing-plan-card-price">{plan.price} {plan.billingCycle}</p>
                        <ul className="explore__pricing-plan__pricing-plan-card-features">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} style={{ display: "flex" }}>
                                    {feature.isAvailable ? <FaCheck color='green' style={{ marginRight: "1em", fontSize: "18px" }} /> : <FaTimes color='red' style={{ marginRight: "1em", fontSize: "18px" }} />}
                                    <h3 style={{ marginRight: "10px", fontSize: "18px" }}>{feature.header}:</h3>
                                    <p>{feature.value}</p>
                                </div>
                            ))}
                        </ul>
                        <button className="explore__pricing-plan__pricing-plan-card-button">Subscribe</button>
                    </div>
                ))}
            </div>
        </div>
    );
};