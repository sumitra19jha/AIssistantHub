import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = forwardRef(({ project }, ref) => {
    const { content_id, created_at, type, topic, length, model_response, html_form } = project;
    const history = useNavigate();

    const onCardClick = () => {
        history(
            `/content-review?generatedContent=${encodeURIComponent(
                html_form
            )}&contentId=${encodeURIComponent(content_id)}&topic=${encodeURIComponent(topic)}`
        );
    };

    return (
        <div className="project-card" onClick={onCardClick} ref={ref}>
            <div className="project-card__gradient-overlay"></div>
            <div className="project-card__header">
                <div className="project-card__project-type">{type}</div>
                <div className="project-card__project-date">{created_at}</div>
            </div>
            <div className="project-card__project-topic">{topic}</div>
            <div className="project-card__project-length">{length}</div>
            <div className="project-card__project-description">{model_response}</div>
        </div>
    );
});

export default ProjectCard;
