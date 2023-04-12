import React, { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import api from '../../services/api';
import './ProjectHistory.css';

const ProjectHistory = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        api.get('/dashboard/history/content')
            .then((response) => {
                if (response.data.success) {
                    setProjects(response.data.history);
                } else {
                    alert(response.data.message);
                }

            })
            .catch((error) => {
                alert("Some issue occured!");
            });
    };

    return (
        <div className="project-history">
            {projects.length > 0 ? (
                projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))
            ) : (
                <div className="no-project-history">
                    <div className="no-project-history-icon">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="folder"
                            className="svg-inline--fa fa-folder fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M464 128H272l-64-64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48zM48 432V112h192v80c0 13.3 10.7 24 24 24h200v216H48z"
                            ></path>
                        </svg>
                    </div>
                    <h2>No Project History</h2>
                    <p>There are no projects in your history. Start by creating a new project.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectHistory;
