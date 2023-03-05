import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login, reset } from '../features/auth/authSlice';

import { Navbar } from '../components/Navbar';
import { YellowDiv, SubmitButton } from '../theme';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  styled,
  useTheme,
  Button,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function AdminLogin() {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const { mail, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      mail,
      password,
      userType: 3,
    };

    dispatch(login(userData));
  };

  // Custom Styling
  const StyledCard = styled(Card)({
    display: 'flex',
    marginTop: '30px',
    padding: '20px 30px',
    boxShadow:
      '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
    borderRadius: '20px',
  });

  return (
    <>
      {/* <Navbar /> */}
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} sm={3}>
          <form onSubmit={onSubmit}>
            <Box>
              <Typography variant="h3" textAlign="center">
                Administrator Login
              </Typography>
              <StyledCard>
                <CardContent
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ mb: 2 }}
                      color={theme.palette.secondary.main}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      type="email"
                      id="email"
                      name="mail"
                      value={mail}
                      placeholder="Power PC Sdn. Bhd."
                      onChange={onChange}
                      size="small"
                      fullWidth
                    />
                    <Typography
                      variant="h5"
                      sx={{ mt: 5, mb: 2 }}
                      color={theme.palette.secondary.main}
                    >
                      Password
                    </Typography>
                    <TextField
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="********"
                      onChange={onChange}
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <SubmitButton
                    variant="contained"
                    type="submit"
                    sx={{ mt: 7 }}
                  >
                    Login
                  </SubmitButton>
                </CardContent>
              </StyledCard>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminLogin;
