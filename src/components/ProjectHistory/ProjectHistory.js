// Import dependencies
import React, { useEffect, useState, useContext, useRef } from 'react';

import api from '../../services/api';
import useSession from '../useToken';
import EmptyComponent from './EmptyComponent';
import styles from './ProjectHistory.module.css';
import ProjectCard from './ProjectCard/ProjectCard';
import { ProjectContext } from '../../context/ProjectContext';

// Main component
const ProjectHistory = () => {
    // Define constants and state variables
    const perPage = 12;
    const session = useSession();

    const lastProjectCardRef = useRef();
    const lastSeoProjectCardRef = useRef();

    const [page, setPage] = useState(1);
    const [pageSeo, setPageSeo] = useState(1);

    const [firstLoadingProjects, setFirstLoadingProjects] = useState(true);
    const [firstLoadingSeoProjects, setFirstLoadingSeoProjects] = useState(true);

    const {
        projects, setProjects,
        totalPages, setTotalPages,
        seoProjects, setSeoProjects,
        totalPagesSeo, setTotalPagesSeo
    } = useContext(ProjectContext);

    // Add a new state variable for the active tab and SEO projects
    const [activeTab, setActiveTab] = useState('projects');

    // Fetch projects when the page changes
    useEffect(() => {
        fetchProjects();
    }, [page]);

    // Fetch SEO projects when the page changes
    useEffect(() => {
        fetchSeoProjects();
    }, [pageSeo]);

    // Intersection observer to handle infinite scrolling for projects
    useEffect(() => {
        if (activeTab !== 'projects') return;

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
    }, [projects, totalPages, activeTab]);

    // Intersection observer to handle infinite scrolling for SEO projects
    useEffect(() => {
        if (activeTab !== 'seo') return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && pageSeo < totalPagesSeo) {
                    setPageSeo((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (lastSeoProjectCardRef.current) {
            observer.observe(lastSeoProjectCardRef.current);
        }

        return () => {
            if (lastSeoProjectCardRef.current) {
                observer.unobserve(lastSeoProjectCardRef.current);
            }
        };
    }, [seoProjects, totalPagesSeo, activeTab]);

    // Fetch projects from the API
    const fetchProjects = async () => {
        if (page > totalPages && !firstLoadingProjects) { return; }
        api.get(`/dashboard/history/content?page=${page}&per_page=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    setProjects((prevProjects) => [...prevProjects, ...response.data.history]);
                    setTotalPages(response.data.pagination.total_pages);
                    setFirstLoadingProjects(false);
                } else {
                    alert(response.data.message);
                    setFirstLoadingProjects(false);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
                setFirstLoadingProjects(false);
            });
    };

    // Fetch SEO projects from the API
    const fetchSeoProjects = async () => {
        if (pageSeo > totalPagesSeo && !firstLoadingSeoProjects) { return; }
        // Fetch SEO projects using the API and update the seoProjects state
        api.get(`/dashboard/history/seo?page=${pageSeo}&per_page=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    setSeoProjects(prevSeoProjects => [...prevSeoProjects, ...response.data.seo_projects]);
                    setTotalPagesSeo(response.data.pagination.total_pages);
                    setFirstLoadingSeoProjects(false);
                } else {
                    alert(response.data.message);
                    setFirstLoadingSeoProjects(false);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
                setFirstLoadingSeoProjects(false);
            });
    };

    // Render the component
    return (
        <>
            {projects.length > 0 || seoProjects.length > 0 ? (
                <>
                    {/* Render the tabs */}
                    <div className={styles.tabs}>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`${styles.tab_button} ${activeTab === 'projects' ? styles.active : ''}`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('seo')}
                            className={`${styles.tab_button} ${activeTab === 'seo' ? styles.active : ''}`}
                        >
                            SEO
                        </button>
                    </div>

                    {/* Render the projects or SEO data based on the active tab */}
                    <div className={styles.project_history}>
                        {
                            (activeTab === 'projects' ? projects : seoProjects).map((project, index) => (
                                <ProjectCard
                                    key={project.id} // 'project.id' should be the actual unique identifier
                                    cardType={activeTab === 'projects' ? 'project' : 'seo'}
                                    project={project}
                                    ref={index === (activeTab === 'projects' ? projects : seoProjects).length - 1
                                        ? (activeTab === 'projects' ? lastProjectCardRef : lastSeoProjectCardRef)
                                        : null}
                                />
                            ))
                        }
                    </div>
                </>
            ) : (
                <EmptyComponent />
            )}
        </>
    );
};

// Export the component
export default ProjectHistory;
