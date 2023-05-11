import { useState, useEffect } from 'react';
import api from '../../services/api';
import useSession from '../useToken';

const useSeoProjects = (perPage = 12) => {
    const session = useSession();
    const [seoProjects, setSeoProjects] = useState([]);
    const [totalPagesSeo, setTotalPagesSeo] = useState(0);
    const [pageSeo, setPageSeo] = useState(1);
    const [firstLoadingSeoProjects, setFirstLoadingSeoProjects] = useState(true);

    useEffect(() => {
        fetchSeoProjects();
    }, [pageSeo]);

    const fetchSeoProjects = async () => {
        if (pageSeo > totalPagesSeo && !firstLoadingSeoProjects) { return; }
        api.get(`/dashboard/history/seo?page=${pageSeo}&per_page=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    if (pageSeo === 1) {
                        setSeoProjects(response.data.seo_projects);
                    } else {
                        setSeoProjects(prevSeoProjects => [...prevSeoProjects, ...response.data.seo_projects]);
                    }
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


    return { seoProjects, totalPagesSeo, pageSeo, setPageSeo };
};

export default useSeoProjects;