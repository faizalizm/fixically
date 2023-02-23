import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout, reset } from '../features/auth/authSlice';

import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
}));

const NavUtil = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

export const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box
          component="img"
          sx={{
            width: 150,
          }}
          alt="Example Alt"
          src={require('../assets/brand/fixically-stretch.webp')}
        />
        <NavUtil>
          <Search>
            <InputBase placeholder="Search..."></InputBase>
          </Search>
          <UserBox id="hehe" onClick={(e) => setOpen(true)}>
            <AccountCircleOutlined />
            <Typography variant="h6">{user && user.name}</Typography>
            <ArrowDropDownOutlined />
          </UserBox>
        </NavUtil>
      </StyledToolbar>
      <Menu
        sx={{ mt: '55px' }}
        id="menu-appbar"
        // anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <MenuItem>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
