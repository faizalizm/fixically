import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Button,
  Typography,
  Container,
} from '@mui/material';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, reset } from '../features/auth/authSlice';

const StyledAppbar = styled(AppBar)({
  borderRadius: '0px 0px 10px 10px',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const RegisterButton = styled(Button)({
  fontWeight: '600',
  color: 'white',
  borderRadius: '10px 20px 10px 20px',
});

const NavBox = styled(Box)({ display: 'flex', gap: ' 32px' });

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleRedirect = (e) => {
    navigate(e.currentTarget.value);
  };

  return (
    <>
      <Container sx={{ height: '88px' }}>
        <StyledAppbar position="sticky">
          <StyledToolbar>
            <Link to="/">
              <Box
                component="img"
                alt="Example Alt"
                src={require('../assets/brand/fixically-stretch.webp')}
                sx={{
                  width: 150,
                }}
              />
            </Link>
            <NavBox>
              <Button
                value="/services"
                variant="text"
                color="nav"
                onClick={handleRedirect}
              >
                <Typography variant="h6">Services</Typography>
              </Button>
              <Button
                value="/about"
                variant="text"
                color="nav"
                onClick={handleRedirect}
              >
                <Typography variant="h6">About</Typography>
              </Button>
              <Button
                value="/register/fixie"
                variant="text"
                color="nav"
                onClick={handleRedirect}
              >
                <Typography variant="h6">Become a Fixie</Typography>
              </Button>
            </NavBox>
            <Box>
              <Button
                value="/login"
                variant="text"
                color="nav"
                onClick={handleRedirect}
              >
                Login
              </Button>
              <RegisterButton
                value="/register/member"
                variant="contained"
                color="black"
                disableElevation
                onClick={handleRedirect}
              >
                Register
              </RegisterButton>
            </Box>
          </StyledToolbar>
        </StyledAppbar>
      </Container>
    </>
  );
};
