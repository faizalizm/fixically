import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login, reset } from '../features/auth/authSlice';

import { CardBox, SubmitButton, YellowDiv } from '../theme';
import { Navbar } from '../components/Navbar';

import {
  CardContent,
  Container,
  Typography,
  TextField,
  useTheme,
  Box,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [userType, setUserType] = useState('Member');
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const { mail, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (userType === 'Member') {
        navigate('/orders');
      } else navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (e, newValue) => {
    setUserType(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      mail,
      password,
      userType,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: '5em' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={require('../assets/illustration/login.png')}
              alt="login illustration"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form onSubmit={onSubmit}>
              <Box>
                <Typography variant="h3">Login to your account</Typography>
                <YellowDiv />
                <Tabs
                  value={userType}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                  centered
                  sx={{ mb: 2 }}
                >
                  <Tab value="Member" label="Member Login" />
                  <Tab value="Fixie" label="Fixie Login" />
                </Tabs>
                <CardBox>
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
                        sx={{ mt: 3, mb: 2 }}
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
                </CardBox>
              </Box>
              <Box display="flex" sx={{ mt: 4 }} justifyContent="center">
                <Typography variant="h5" color={theme.palette.black.main}>
                  Not registered yet?&nbsp;
                </Typography>
                <Typography variant="h5" color={theme.palette.primary.main}>
                  <Link href="#" underline="none">
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
