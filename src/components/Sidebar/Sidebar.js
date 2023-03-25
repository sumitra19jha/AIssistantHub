import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
});

const Sidebar = ({ open, handleDrawerToggle }) => {
    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/', tooltip: 'Home Page' },
        { text: 'Keyword Research', icon: <SearchIcon />, path: '/keyword-research', tooltip: 'Keyword Research' },
        // Add more menu items for each feature here
    ];

    return (
        <StyledDrawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={handleDrawerToggle}
        >
            <List>
                {menuItems.map((item, index) => (
                    <Tooltip title={item.tooltip} key={index}>
                      <ListItem button onClick={() => {
                        handleDrawerToggle();
                        // Implement navigation to item.path here, e.g., using React Router
                      }}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                      </ListItem>
                    </Tooltip>
                ))}
            </List>
        </StyledDrawer>
    );
};

export default Sidebar;
