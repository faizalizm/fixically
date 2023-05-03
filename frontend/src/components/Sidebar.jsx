import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, reset } from '../features/auth/authSlice';

import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const [openManage, setopenManage] = useState(true);
  const [openAccount, setopenAccount] = useState(true);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <List component="nav">
        {/* Dashboard */}
        <ListItemButton
          button
          component={Link}
          to="/dashboard"
          selected={selectedPage === 'Dashboard'}
          onClick={(e) => setSelectedPage('Dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Manage */}
        <ListItemButton onClick={(e) => setopenManage(!openManage)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Manage" />
          {openManage ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/orders"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Orders')}
            >
              <ListItemText primary="Orders" inset />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/reviews"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Reviews')}
            >
              <ListItemText primary="Reviews" inset />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/quotations"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Quote Request')}
            >
              <ListItemText primary="Quote Request" inset />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/services"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Services')}
            >
              <ListItemText primary="Services" inset />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Account */}
        <ListItemButton onClick={(e) => setopenAccount(!openAccount)}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/application"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Application')}
            >
              <ListItemText primary="Application" inset />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/profile"
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Profile')}
            >
              <ListItemText primary="Profile" inset />
            </ListItemButton>
            <ListItemButton onClick={onLogout} sx={{ pl: 4 }}>
              <ListItemText primary="Log Out" inset />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
};
