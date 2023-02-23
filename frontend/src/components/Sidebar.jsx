import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export const Sidebar = () => {
  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const [openManage, setopenManage] = useState(true);
  const [openAccount, setopenAccount] = useState(true);

  return (
    <Grid item xs={2} sm={2}>
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
            <InboxIcon />
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
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Reviews')}
            >
              <ListItemText primary="Reviews" inset />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Quote Request')}
            >
              <ListItemText primary="Quote Request" inset />
            </ListItemButton>
            <ListItemButton
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
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(e) => setSelectedPage('Profile')}
            >
              <ListItemText primary="Profile" inset />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Log Out" inset />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Grid>
  );
};
