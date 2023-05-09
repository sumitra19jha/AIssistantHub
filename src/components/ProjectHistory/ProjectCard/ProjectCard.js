import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';

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
        <div className={styles.project_card} onClick={onCardClick} ref={ref}>
            <div className={styles.project_card__gradient_overlay}></div>
            <div className={styles.project_card__header}>
                <div className={styles.project_card__project_type}>{type}</div>
                <div className={styles.project_card__project_date}>{created_at}</div>
            </div>
            <div className={styles.project_card__project_topic}>{topic}</div>
            <div className={styles.project_card__project_length}>{length}</div>
            <div className={styles.project_card__project_description}>{model_response}</div>
        </div>
    );
});

export default ProjectCard;
