import React, { useState } from 'react';
import { PricingPlan } from '../../components/Subscription/PricingPlan/PricingPlan';
import { FaqSection } from '../../components/Subscription/FaqSection/FaqSection';
import { ContactInfo } from '../../components/Subscription/ContactInfo/ContactInfo';
import { CtaButton } from '../../components/Subscription/CtaButton/CtaButton';
import AuthDialog from '../../components/AuthDialog/AuthDialog';
import './SubscriptionPage.css'

export const SubscriptionPage = () => {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    const handleFreeTrialClick = () => {
        console.log('Start free trial button clicked!');
        setAuthDialogOpen(true);

    }

    return (
        <div className="container">
            <header className="subscription-header" style={{ marginBottom: "0px" }}>
                <div className="subscription-header-bg" />
                <h1 className="subscription-header-title">Unlock the Power of AI-Driven Content</h1>
                <h2 className="subscription-header-subtitle">Select a plan and enhance your content marketing strategy today</h2>
                <div className="subscription-header-cta">
                    <CtaButton onClick={handleFreeTrialClick}>Get Started Now</CtaButton>
                    <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} />
                </div>
            </header>

            <main className="main">
                <PricingPlan />
                <FaqSection />
                <ContactInfo />
            </main>
        </div>
    );
};