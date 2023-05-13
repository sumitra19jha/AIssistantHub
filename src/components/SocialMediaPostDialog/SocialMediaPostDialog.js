import React from "react";

import CreatePostTab from "./CreatePostTab/CreatePostTab";
import Header from "./Header/Header";
import styles from "./SocialMediaPostDialog.module.css";


const SocialMediaPostDialog = ({ onClose }) => {
    return <div className={styles.social_media_post_dialog_overlay}>
        <div className={styles.social_media_post_dialog}>
            <Header name="Social Media Post" onClose={onClose} />
            <div className={styles.dialog_content}>
                <CreatePostTab />
            </div>
        </div>
    </div>;
};

export default SocialMediaPostDialog;
