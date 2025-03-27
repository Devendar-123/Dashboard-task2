import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 180, flexShrink: 0}} >
      <List sx={{width:180}} style={{backgroundColor:"#c5c7c3",height:"100vh"}} >
        <ListItem button component={Link} to="/">
        <DashboardIcon/>
          <ListItemText primary="Dashboard" style={{padding:"6px"}}/>
        </ListItem>
        <ListItem button component={Link} to="/users">
        <GroupIcon/>
          <ListItemText primary="Users" style={{padding:"6px"}}/>
        </ListItem>
        <ListItem button component={Link} to="/reports">
        <ReportIcon/>
          <ListItemText primary="Reports" style={{padding:"6px"}}/>
        </ListItem>
        <ListItem button component={Link} to="/settings">
        <SettingsIcon/>
          <ListItemText primary="Settings" style={{padding:"6px"}}/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

