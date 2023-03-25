import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from './../../components/Header/Header';
import Sidebar from './../../components/Sidebar/Sidebar';
import GradientBox from './../../components/TrendSection/GradientBox';
import Features from './../../components/Features/Features';
import LoginForm from './../../components/LoginForm/LoginForm';

function Home() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLoginButtonClick = (e) => {
    e.preventDefault();
    setLoginDialogOpen(true);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <Header onLoginClick={handleLoginButtonClick} />
      <LoginForm open={loginDialogOpen} handleClose={handleLoginDialogClose} />
      <GradientBox />
      <Features />
      <Sidebar open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </div>
  );
}

export default Home;