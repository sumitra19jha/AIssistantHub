import React, { useEffect, useState, useContext, useRef } from 'react';
import ProjectCard from './ProjectCard/ProjectCard';
import { ProjectContext } from '../../context/ProjectContext';
import useSession from '../useToken';
import api from '../../services/api';
import EmptyComponent from './EmptyComponent';
import styles from './ProjectHistory.module.css';

const ProjectHistory = () => {
    const perPage = 12;
    const session = useSession();
    const lastProjectCardRef = useRef();
    const [page, setPage] = useState(1);
    const [firstloading, setFirstLoading] = useState(true);
    const { projects, setProjects, totalPages, setTotalPages } = useContext(ProjectContext);

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
        api.get(`/dashboard/history/content?page=${page}&per_page=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
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
        <>
            {projects.length > 0 ? (<div className={styles.project_history}>
                {
                    projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            ref={index === projects.length - 1 ? lastProjectCardRef : null}
                        />
                    ))
                }
            </div>) : <EmptyComponent />}
        </>
    );
};

export default ProjectHistory;