import React, { useState } from "react";
import CreatePostTab from "./CreatePostTab/CreatePostTab";
import Header from "./Header/Header";
import "./SocialMediaPostDialog.css";


const SocialMediaPostDialog = ({ onClose }) => {
    return (
        <div className="social-media-post-dialog-overlay">
            <div className="social-media-post-dialog">
                <Header onClose={onClose} />
                <div className="dialog-content">
                    <CreatePostTab />
                </div>
            </div>
        </div>
    );
};

export default SocialMediaPostDialog;
