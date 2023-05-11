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
                <PlatformCard
                    icon={<FaTwitter />}
                    platform="Twitter"
                    onSelect={onPlatformSelect}
                    selected={selectedPlatform === "Twitter"}
                />
                <PlatformCard
                    icon={<FaFacebookSquare />}
                    platform="Facebook"
                    onSelect={onPlatformSelect}
                    selected={selectedPlatform === "Facebook"}
                />
                <PlatformCard
                    icon={<FaInstagram />}
                    platform="Instagram"
                    onSelect={onPlatformSelect}
                    selected={selectedPlatform === "Instagram"}
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

export default SelectPlatformTab;