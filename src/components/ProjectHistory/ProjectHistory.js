import React, { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import api from '../../services/api';
import './ProjectHistory.css';

const ProjectHistory = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProjects();
    }, [page]);

    const fetchProjects = async () => {
        api.get(`/dashboard/history/content?page=${page}&per_page=${perPage}`)
            .then((response) => {
                if (response.data.success) {
                    setProjects(response.data.history);
                    setTotalPages(response.data.pagination.total_pages);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
            });
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
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
                        {/* ... */}
                    </div>
                    <h2>No Project History</h2>
                    <p>There are no projects in your history. Start by creating a new project.</p>
                </div>
            )}
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectHistory;