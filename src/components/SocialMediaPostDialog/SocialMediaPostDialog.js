import React, { useState } from "react";
import CreatePostTab from "./CreatePostTab/CreatePostTab";
import Header from "./Header/Header";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./SocialMediaPostDialog.css";


const SocialMediaPostDialog = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    return (loading ? <LoadingScreen /> :
        (<div className="social-media-post-dialog-overlay">
            <div className="social-media-post-dialog">
                <Header name="Social Media Post" onClose={onClose} />
                <div className="dialog-content">
                    <CreatePostTab loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </div>)
    );
};

export default SocialMediaPostDialog;
