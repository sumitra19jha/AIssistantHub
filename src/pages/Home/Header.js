import React, { useState } from "react";
import AuthDialog from '../../components/AuthDialog/AuthDialog';
import styles from "./Header.module.css";

function Header({setSession}) {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const handleAuthDialogOpen = () => {
        setAuthDialogOpen(true);
    };

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>AIssistantHub</div>
            <nav>
                <ul className={styles.nav_links}>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                </ul>
            </nav>
            <button className={styles.login_btn} onClick={handleAuthDialogOpen}>Login</button>
            <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} setSession={setSession} />
        </header>
    );
}

export default Header;
