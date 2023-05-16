import React, { useState } from "react";
import AuthDialog from '../../components/AuthDialog/AuthDialog';
import styles from "./Hero.module.css";

function Hero({ setSession }) {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    const handleAuthDialogOpen = () => {
        setAuthDialogOpen(true);
    };

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };
    return (
        <section className={styles.hero}>
            <div className={styles.hero_content}>
                <h1>High-Quality Research & Content Creation</h1>
                <p>Using LLMs to revolutionize your social media presence</p>
                <button className={styles.cta_btn} onClick={handleAuthDialogOpen}>Get Started</button>
                <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} setSession={setSession} />
            </div>
        </section>
    );
}

export default Hero;
