import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__content">
                <h1 className="hero__title">Dummy Title</h1>
                <p className="hero__subtitle">Dummy subtitle</p>
                <button className="hero__cta">Get Grammarly</button>
            </div>
        </section>
    );
};

export default Hero;
