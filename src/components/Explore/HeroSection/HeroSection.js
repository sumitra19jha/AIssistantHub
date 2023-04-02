import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import "./HeroSection.css"
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = ({heroImage}) => {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-content">
                <Header as='h1'>Your Ultimate Content Marketing Platform</Header>
                <Header as='h3'>Take your content marketing to the next level with our all-in-one platform.</Header>
                <Button primary size='huge' className="cta-button">
                    Sign Up for Free Trial
                    <FiArrowRight style={{ marginLeft: '10px' }} />
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;