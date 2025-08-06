import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logout, reset } from '../features/auth/authSlice';
import logoHorizontal from '../assets/brand/logoHorizontal.png';
import logoVertical from '../assets/brand/logoVertical.png';
import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Button,
  Typography,
  Container,
} from '@mui/material';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {}, [user]);

  // const onLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   navigate('/');
  // };

  const handleRedirect = (e) => {
    navigate(e.currentTarget.value);
  };

  // Custom styling
  const StyledAppbar = styled(AppBar)({
    borderRadius: '0px 0px 10px 10px',
  });

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
  });

  const SpecialButton = styled(Button)({
    fontWeight: '600',
    color: 'white',
    marginLeft: '16px',
    padding: '8px 32px',
    borderRadius: '10px 20px 10px 20px',
  });

  const NavBox = styled(Box)({ display: 'flex', gap: '32px' });

  return (
    <>
      <Container>
        <StyledAppbar position="sticky" sx={{ mb: 4 }}>
          <StyledToolbar>
            <Link to="/">
              <Box display="flex" alignItems="center">
                <img alt="Fixically Logo" src={logoHorizontal} width="150px" />
              </Box>
            </Link>
            <NavBox>
              {/* <Button
                value="/services"
                variant="text"
                color="nav"
                onClick={handleRedirect}
              >
                <Typography variant="h6">Services</Typography>
              </Button> */}
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
              {user ? (
                <>
                  <SpecialButton
                    value="/dashboard"
                    variant="contained"
                    color="black"
                    onClick={handleRedirect}
                  >
                    Dashboard
                  </SpecialButton>
                </>
              ) : (
                <>
                  <Button
                    value="/login"
                    variant="text"
                    color="nav"
                    onClick={handleRedirect}
                  >
                    Login
                  </Button>
                  <SpecialButton
                    value="/register/member"
                    variant="contained"
                    color="black"
                    onClick={handleRedirect}
                  >
                    Register
                  </SpecialButton>
                </>
              )}
            </Box>
          </StyledToolbar>
        </StyledAppbar>
      </Container>
    </>
  );
};
