import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from './../../components/Header/Header';
import Sidebar from './../../components/Sidebar/Sidebar';
import GradientBox from './../../components/TrendSection/GradientBox';
import Features from './../../components/Features/Features';
import AuthDialog from '../../components/AuthDialog/AuthDialog';

function Home() {
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAuthDialogClose = () => {
        setAuthDialogOpen(false);
    };

    const handleAuthDialogOpen = () => {
        setAuthDialogOpen(true);
    };

    return (
        <div>
            <CssBaseline />
            <Header onLoginClick={handleAuthDialogOpen} />
            <AuthDialog open={authDialogOpen} handleClose={handleAuthDialogClose} />
            <GradientBox />
            <Features />
            <Sidebar open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
        </div>
    );
}

export default Home;