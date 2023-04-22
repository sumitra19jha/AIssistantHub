import React from "react";
import "./PipelineSelection.css";

const PipelineSelection = ({ onCreatePipelineChange, createPipeline }) => {
    return (
        <div className="pipeline-selection">
            <div
                className={`pipeline-option ${!createPipeline ? "selected" : ""}`}
                onClick={() => onCreatePipelineChange(false)}
            >
                <div className="pipeline-checkbox">
                    <div className={`checkbox-inner ${!createPipeline ? "checked" : ""}`} />
                </div>
                <div className="pipeline-text">
                    <div className="pipeline-title">I want to create one post.</div>
                    <div className="pipeline-subtitle">Based on your instruction and feedback, your post will be generated. Proton will not interact with you on daily basis through emails.</div>
                </div>
            </div>
            <div
                className={`pipeline-option ${createPipeline ? "selected" : ""}`}
                onClick={() => onCreatePipelineChange(true)}
            >
                <div className="pipeline-checkbox">
                    <div className={`checkbox-inner ${createPipeline ? "checked" : ""}`} />
                </div>
                <div className="pipeline-text">
                    <div className="pipeline-title">Receive post on period basis</div>
                    <div className="pipeline-subtitle">Based on your instruction and feedback, your post will be generated on period basis and updated.</div>
                </div>
            </div>
        </div>
    );
};

export default PipelineSelection;
