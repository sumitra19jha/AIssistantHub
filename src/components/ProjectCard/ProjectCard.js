import React from 'react';
import { useNavigate } from "react-router-dom";
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const { content_id, created_at, type, topic, length, model_response, html_form } = project;
    const history = useNavigate();

    const onCardClick = ()=>{
        history(`/content-review?generatedContent=${encodeURIComponent(html_form)}&contentId=${encodeURIComponent(content_id)}&topic=${encodeURIComponent(topic)}`);
    }

    return (
        <div className="project-card" onClick={onCardClick}>
            <div className="project-gradient-overlay"></div>
            <div className="project-header">
                <div className="project-type">{type}</div>
                <div className="project-date">{created_at}</div>
            </div>
            <div className="project-topic">{topic}</div>
            <div className="project-length">{length}</div>
            <div className="project-description">
                {model_response}
            </div>
        </div>
    );
};

export default ProjectCard;
