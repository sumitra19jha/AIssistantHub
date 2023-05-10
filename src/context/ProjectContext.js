import { createContext, useState } from 'react';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [seoProjects, setSeoProjects] = useState([]);
    const [totalPagesSeo, setTotalPagesSeo] = useState(0);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, totalPages, setTotalPages, seoProjects, setSeoProjects, totalPagesSeo, setTotalPagesSeo }}>
            {children}
        </ProjectContext.Provider>
    );
};

export { ProjectContext, ProjectProvider };
