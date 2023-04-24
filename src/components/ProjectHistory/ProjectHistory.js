import React, { useEffect, useState, useContext, useRef } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import { ProjectContext } from '../../context/ProjectContext';
import api from '../../services/api';
import './ProjectHistory.css';

const ProjectHistory = () => {
    const [firstloading, setFirstLoading] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 12;
    const { projects, setProjects, totalPages, setTotalPages } = useContext(ProjectContext);
    const lastProjectCardRef = useRef();

    useEffect(() => {
        fetchProjects();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && page < totalPages) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (lastProjectCardRef.current) {
            observer.observe(lastProjectCardRef.current);
        }
        
        return () => {
            if (lastProjectCardRef.current) {
                observer.unobserve(lastProjectCardRef.current);
            }
        };
    }, [projects, totalPages]);

    const fetchProjects = async () => {
        if (page > totalPages && !firstloading) { return; }
        api.get(`/dashboard/history/content?page=${page}&per_page=${perPage}`)
            .then((response) => {
                if (response.data.success) {
                    setProjects((prevProjects) => [...prevProjects, ...response.data.history]);
                    setTotalPages(response.data.pagination.total_pages);
                    setFirstLoading(false);
                } else {
                    alert(response.data.message);
                    setFirstLoading(false);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
                setFirstLoading(false);
            });
    };

    return (
        <div className="project-history">
            {projects.length > 0 ? (
                projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        ref={index === projects.length - 1 ? lastProjectCardRef : null}
                    />
                ))
            ) : (
                <div className="no-project-history">
                    <div className="no-project-history-icon">
                        {/* ... */}
                    </div>
                    <h2>No Project History</h2>
                    <p>There are no projects in your history. Start by creating a new project.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectHistory;