import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import Sidebar from './../../components/Sidebar/Sidebar';
import GradientBox from './../../components/TrendSection/GradientBox';
import Features from './../../components/Features/Features';

function Home() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div style={{minHeight:"100vh"}}>
            <CssBaseline />
            <GradientBox />
            <Features />
            <Sidebar open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
        </div>
    );
}

export default Home;