import React, { useState } from "react";
import CreatePostTab from "./CreatePostTab/CreatePostTab";
import Header from "./Header/Header";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import styles from "./SocialMediaPostDialog.module.css";


const SocialMediaPostDialog = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    return (loading ? <LoadingScreen /> :
        (<div className={styles.social_media_post_dialog_overlay}>
            <div className={styles.social_media_post_dialog}>
                <Header name="Social Media Post" onClose={onClose} />
                <div className={styles.dialog_content}>
                    <CreatePostTab loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </div>)
    );
};

export default SocialMediaPostDialog;
