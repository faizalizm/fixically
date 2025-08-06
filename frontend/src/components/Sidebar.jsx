import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const [openManage, setopenManage] = useState(true);
  const [openAccount, setopenAccount] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success('You have logged out', { autoClose: 3000 });
    navigate('/');
  };

  return (
    <>
      <List component="nav">
        {user.role === 'Fixie' && user.application.status != 'APPROVED' ? (
          ''
        ) : (
          <>
            {/* Dashboard */}
            {user.role !== 'Member' ? (
              <>
                <ListItemButton
                  selected={selectedPage === 'Dashboard'}
                  onClick={(e) => {
                    setSelectedPage('Dashboard');
                    navigate('/dashboard');
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </>
            ) : (
              ''
            )}

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
                {user.role == 'Admin' ? (
                  <>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      selected={selectedPage === 'Fixies'}
                      onClick={(e) => {
                        setSelectedPage('Fixies');
                        navigate('/fixies');
                      }}
                    >
                      <ListItemText primary="Fixie" inset />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      selected={selectedPage === 'Members'}
                      onClick={(e) => {
                        setSelectedPage('Members');
                        navigate('/members');
                      }}
                    >
                      <ListItemText primary="Members" inset />
                    </ListItemButton>
                  </>
                ) : (
                  ''
                )}
                {user.role !== 'Admin' ? (
                  <>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      selected={selectedPage === 'Orders'}
                      onClick={(e) => {
                        setSelectedPage('Orders');
                        navigate('/orders');
                      }}
                    >
                      <ListItemText primary="Orders" inset />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      selected={selectedPage === 'Reviews'}
                      onClick={(e) => {
                        setSelectedPage('Reviews');
                        navigate('/reviews');
                      }}
                    >
                      <ListItemText primary="Reviews" inset />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={(e) => {
                        setSelectedPage('Quote Request');
                        navigate('/quotations');
                      }}
                    >
                      <ListItemText primary="Quote Request" inset />
                    </ListItemButton>
                    {user.role === 'Fixie' ? (
                      <>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={(e) => {
                            setSelectedPage('Services');
                            navigate('/services');
                          }}
                        >
                          <ListItemText primary="Services" inset />
                        </ListItemButton>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </List>
            </Collapse>
          </>
        )}

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
            {user.role === 'Fixie' ? (
              <>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={(e) => {
                    setSelectedPage('Application');
                    navigate('/application');
                  }}
                >
                  <ListItemText primary="Application" inset />
                </ListItemButton>
              </>
            ) : (
              ''
            )}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={(e) => {
                setSelectedPage('Profile');
                navigate('/profile');
              }}
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
