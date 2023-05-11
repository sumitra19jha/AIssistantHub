import { useState, useEffect } from 'react';
import api from '../../services/api';
import useSession from '../useToken';

const useProjects = (perPage = 12) => {
    const session = useSession();
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [firstLoadingProjects, setFirstLoadingProjects] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, [page]);

    const fetchProjects = async () => {
        if (page > totalPages && !firstLoadingProjects) { return; }
        api.get(`/dashboard/history/content?page=${page}&per_page=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    if (page === 1) {
                        setProjects(response.data.history);
                    } else {
                        setProjects((prevProjects) => [...prevProjects, ...response.data.history]);
                    }
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


    return { projects, totalPages, page, setPage };
};

export default useProjects;