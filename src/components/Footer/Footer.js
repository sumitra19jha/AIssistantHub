import React from "react";
import HelpIcon from '@mui/icons-material/Help';
import "./Footer.css"

function Footer() {
    return (
        <div role="contentinfo" className="content-info">
            <div className="content-info__logo-container">
                <div className="content-info__links-container">
                    <a
                        className="content-info__link"
                        href="https://policies.google.com/privacy?hl=en-US"
                        aria-label="Privacy Opens a new tab"
                        target="_new"
                    >
                        Privacy
                    </a>
                    <a
                        className="content-info__link"
                        href="https://policies.google.com/terms?hl=en-US"
                        aria-label="Terms Opens a new tab"
                        target="_new"
                    >
                        Terms
                    </a>
                    <a
                        className="content-info__link"
                        href="mailto:sumitra19jha@gmail.com?body=Feedback"
                        aria-label="Email send to a new tab"
                        target="_new"
                    >
                        Send feedback
                    </a>
                    <a
                        className="content-info__link"
                        href="https://about.google?hl=en-US"
                        aria-label="About Opens a new tab"
                        target="_new"
                    >
                        About
                    </a>
                </div>
            </div>
            <div className="content-info__help-link-container">
                <a
                    className="content-info__link content-info__help-link"
                    href="https://support.google.com/trends?hl=en-US"
                    aria-label="Help Opens a new tab"
                    target="_new"
                >
                    <HelpIcon />
                    <span>Help</span>
                </a>
            </div>
        </div>
    );
}

export default Footer;
