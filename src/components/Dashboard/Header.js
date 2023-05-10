import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import useSession from '../useToken';
import classes from './Header.module.css';

const Header = () => {
    const session = useSession();
    const [point, setPoint] = useState(1);

    useEffect(() => {
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        api.get(`/user/points`, {
            headers: {
                "Authorization": `Bearer ${session.session}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    setPoint(response.data.points);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                alert("Some issue occurred!");
            });
    };

    return (
        <header className={classes.header}>
            <div/>
            <div>
                <span className={classes.header__credits}>Credits Left: {point}</span>
                <i className={classes.header__user_icon}></i>
            </div>
        </header>
    );
};

export default Header;