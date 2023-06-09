// Import dependencies
import React, { useEffect, useState, useRef } from 'react';

import EmptyComponent from './EmptyComponent';
import styles from './ProjectHistory.module.css';
import ProjectCard from './ProjectCard/ProjectCard';
import CreateCard from './CreateCard/CreateCard';

import ContentGenerationDialog from '../ContentCreationDialog/ContentGenerationDialog';
import SeoOptimisationDialog from '../SeoOptimisationDialog/SeoOptimisationDialog';
import SocialMediaPostDialog from '../SocialMediaPostDialog/SocialMediaPostDialog';

import useProjects from './useProjects';
import useSeoProjects from './useSeoProjects';

// Main component
const ProjectHistory = () => {
    // Define constants and state variables
    const perPage = 20;

    const lastProjectCardRef = useRef();
    const lastSeoProjectCardRef = useRef();

    const {
        projects, totalPages, page, setPage
    } = useProjects(perPage);

    const {
        seoProjects, totalPagesSeo, pageSeo, setPageSeo
    } = useSeoProjects(perPage);

    // Add a new state variable for the active tab and SEO projects
    const [activeTab, setActiveTab] = useState('projects');
    const [showContentGenerationDialog, setShowContentGenerationDialog] = useState(false);
    const [showSeoOptimisationDialog, setShowSeoOptimisationDialog] = useState(false);
    const [showSocialMediaPostDialog, setShowSocialMediaPostDialog] = useState(false);

    const handleSocialMediaPostOptionClick = () => {
        setShowSocialMediaPostDialog(true);
    };

    const handleSeoOptionClick = () => {
        setShowSeoOptimisationDialog(true);
    };

    const handleCloseSocialMediaPostDialog = () => {
        setShowSocialMediaPostDialog(false);
    };

    const handleCloseContentGenerationDialog = () => {
        setShowContentGenerationDialog(false);
    };

    const handleCloseSeoContentGenerationDialog = () => {
        setShowSeoOptimisationDialog(false);
    };

    const renderDialogs = () => {
        return (
            <>
                {showContentGenerationDialog && (
                    <ContentGenerationDialog onClose={handleCloseContentGenerationDialog} />
                )}
                {showSeoOptimisationDialog && (
                    <SeoOptimisationDialog onClose={handleCloseSeoContentGenerationDialog} />
                )}
                {showSocialMediaPostDialog && (
                    <SocialMediaPostDialog onClose={handleCloseSocialMediaPostDialog} />
                )}
            </>
        );
    };

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


    // Render the component
    return (
        <>
            {projects.length > 0 || seoProjects.length > 0 ? (
                <>
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

                    <div className={styles.project_history}>

                        <CreateCard
                            cardType={activeTab === 'projects' ? 'project' : 'seo'}
                            onClick={activeTab === 'projects' ? handleSocialMediaPostOptionClick : handleSeoOptionClick}
                        />

                        {
                            (activeTab === 'projects' ? projects : seoProjects).map((project, index) => (
                                <ProjectCard
                                    key={project.content_id}
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
                <EmptyComponent
                    handleSeoOptionClick={handleSeoOptionClick}
                    handleSocialMediaPostOptionClick={handleSocialMediaPostOptionClick}
                />
            )}
            {renderDialogs()}
        </>
    );
};

// Export the component
export default ProjectHistory;
