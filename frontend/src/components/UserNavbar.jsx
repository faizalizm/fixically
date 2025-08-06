import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, reset } from '../features/auth/authSlice';
import logoHorizontal from '../assets/brand/logoHorizontal.png';
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
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

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const NavUtil = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success('You have logged out', { autoClose: 3000 });
    navigate('/');
  };

  return (
    <AppBar position="sticky" key="navbar">
      <StyledToolbar>
        <Link to="/">
          <Box display="flex" alignItems="center">
            <img alt="Fixically Logo" src={logoHorizontal} width="150px" />
          </Box>
        </Link>
        <NavUtil>
          {/* <Search>
            <SearchIcon />
            <InputBase placeholder="Search..."></InputBase>
          </Search> */}
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
        <MenuItem onClick={() => navigate('/profile')}>
          <Typography variant="h4" textAlign="center">
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Typography variant="h4" textAlign="center">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
