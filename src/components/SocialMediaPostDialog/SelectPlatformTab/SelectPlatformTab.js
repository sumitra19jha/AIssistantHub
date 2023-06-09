import React from "react";
import { FaLinkedin, FaTwitter, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import styles from "./SelectPlatformTab.module.css";

const SelectPlatformTab = ({ onPlatformSelect, selectedPlatform }) => {
    return (
        <div className={styles.platform_tab}>
            <div className={styles.platform_cards}>
                <PlatformCard
                    icon={<FaLinkedin />}
                    platform="LinkedIn"
                    onSelect={onPlatformSelect}
                    selected={selectedPlatform === "LinkedIn"}
                />
                <ComingSoonPlatformCard
                    icon={<FaTwitter />}
                    platform="Twitter"
                />
                <ComingSoonPlatformCard
                    icon={<FaFacebookSquare />}
                    platform="Facebook"
                />
                <ComingSoonPlatformCard
                    icon={<FaInstagram />}
                    platform="Instagram"
                />
            </div>
        </div>
    );
};

const PlatformCard = ({ icon, platform, onSelect, selected }) => {
    const cardClassName = `${styles.platform_card} ${selected ? styles.platform_card_selected : ""}`;
    return (
        <div className={cardClassName} onClick={() => onSelect(platform)}>
            <div className={styles.platform_card_icon}>{icon}</div>
            <div className={styles.platform_card_name}>{platform}</div>
        </div>
    );
};

const ComingSoonPlatformCard = ({ icon, platform }) => {
    const cardClassName = `${styles.platform_card} ${styles.platform_card_coming_soon}`;
    return (
        <div className={cardClassName}>
            <div className={styles.platform_card_icon}>{icon}</div>
            <div className={styles.platform_card_name}>{platform}</div>
            <div className={styles.platform_card_coming_soon_label}>Coming Soon</div>
        </div>
    );
};

export default SelectPlatformTab;