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
                        href="/PrivacyPolicy"
                        aria-label="Privacy Opens a new tab"
                        target="_new"
                    >
                        Privacy
                    </a>
                    <a
                        className="content-info__link"
                        href="/TermsOfService"
                        aria-label="Terms Opens a new tab"
                        target="_new"
                    >
                        Terms
                    </a>
                    <a
                        className="content-info__link"
                        href="mailto:info@assistanthub.in?body=Feedback"
                        aria-label="Email send to a new tab"
                        target="_new"
                    >
                        Send feedback
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
