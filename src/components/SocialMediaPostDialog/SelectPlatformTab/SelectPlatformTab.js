import React from "react";
import { FaLinkedin, FaTwitter, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import "./SelectPlatformTab.css";

const SelectPlatformTab = ({ onPlatformSelect, selectedPlatform }) => {
    return (
        <div className="platform-tab">
            <div className="platform-cards">
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
    const cardClassName = `platform-card${selected ? " platform-card-selected" : ""}`;
    return (
        <div className={cardClassName} onClick={() => onSelect(platform)}>
            <div className="platform-card-icon">{icon}</div>
            <div className="platform-card-name">{platform}</div>
        </div>
    );
};

export default SelectPlatformTab;