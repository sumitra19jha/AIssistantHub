import React, { useState } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { FiArrowRight } from 'react-icons/fi';
import "./HeroSection.css";
import AuthDialog from '../../AuthDialog/AuthDialog';

const HeroSection = ({ heroImage }) => {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    const handleFreeTrialClick = () => {
        setAuthDialogOpen(true);
    }

    return (
        <section className="explore__hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="explore__hero-section__hero-content">
                <Header as='h1'>Your Ultimate Content Marketing Platform</Header>
                <Header as='h3'>Take your content marketing to the next level with our all-in-one platform.</Header>
                <Button primary size='huge' className="explore__hero-section__cta-button" onClick={handleFreeTrialClick}>
                    Sign Up for Free Trial
                    <FiArrowRight style={{ marginLeft: '10px' }} />
                </Button>
                <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} />
            </div>
        </section>
    );
};

export default HeroSection;