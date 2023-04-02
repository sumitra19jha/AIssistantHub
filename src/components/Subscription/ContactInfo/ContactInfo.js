import React from 'react';
import './ContactInfo.css'

export const ContactInfo = () => {
    return (
        <div className="contact-info">
            <h3>Contact Us</h3>
            <p className="contact-info__text">For sales or support inquiries, please contact us via email:</p>
            <ul className="contact-info__list">
                <li>Email: <a href="mailto:contact@vyaparkar.com">contact@vyaparkar.com</a></li>
            </ul>
        </div>
    );
};