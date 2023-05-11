import React from "react";
import styles from "./PipelineSelection.module.css";

const PipelineSelection = ({ onCreatePipelineChange, createPipeline }) => {
    return (
        <div className={styles.pipeline_selection}>
            <div
                className={`${styles.pipeline_option} ${!createPipeline ? styles.selected : ""}`}
                onClick={() => onCreatePipelineChange(false)}
            >
                <div className={styles.pipeline_checkbox}>
                    <div className={`${styles.checkbox_inner} ${!createPipeline ? styles.checked : ""}`} />
                </div>
                <div className={styles.pipeline_text}>
                    <div className={styles.pipeline_title}>I want to create one post.</div>
                    <div className={styles.pipeline_subtitle}>Based on your instruction and feedback, your post will be generated. Proton will not interact with you on daily basis through emails.</div>
                </div>
            </div>
            <div
                className={`${styles.pipeline_option} ${createPipeline ? styles.selected : ""}`}
                onClick={() => onCreatePipelineChange(true)}
            >
                <div className={styles.pipeline_checkbox}>
                    <div className={`${styles.checkbox_inner} ${createPipeline ? styles.checked : ""}`} />
                </div>
                <div className={styles.pipeline_text}>
                    <div className={styles.pipeline_title}>Receive post on period basis</div>
                    <div className={styles.pipeline_subtitle}>Based on your instruction and feedback, your post will be generated on period basis and updated.</div>
                </div>
            </div>
        </div>
    );
};

export default PipelineSelection;
