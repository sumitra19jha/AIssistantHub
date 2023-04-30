import React from 'react';
import { CssBaseline } from '@mui/material';
import GradientBox from './../../components/TrendSection/GradientBox';
import Features from './../../components/Features/Features';

function Home() {
    return (
        <div style={{minHeight:"100vh"}}>
            <CssBaseline />
            <GradientBox />
            <Features />
        </div>
    );
}

export default Home;