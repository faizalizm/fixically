import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import { CardBox, SubmitButton, YellowDiv } from '../theme';
import { Navbar } from '../components/Navbar';

import {
  Container,
  Typography,
  TextField,
  styled,
  useTheme,
  Box,
  Divider,
  alpha,
  Link,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerType } = useParams();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    mail: '',
    password: '',
    password2: '',
    owner: '',
    description: '',
    ssm: '',
    address: '',
    state: '',
    city: '',
  });

  const {
    name,
    phone,
    mail,
    password,
    password2,
    owner,
    description,
    ssm,
    address,
    state,
    city,
  } = formData;

  const { member, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || member) {
      navigate('/');
    }

    dispatch(reset());
  }, [member, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      let registerData;

      registerType == 'fixie'
        ? (registerData = {
            name,
            phone,
            mail,
            password,
            password2,
            owner,
            description,
            ssm,
            address,
            state,
            city,
            application: { submit_date: Date.now() },
            userType: 'fixie',
          })
        : (registerData = {
            name,
            mail,
            password,
            phone,
            userType: 'member',
          });

      dispatch(register(registerData));
    }
  };

  // Custom Styling
  const StyledDivider = styled(Divider)({
    borderColor: alpha(theme.palette.black.main, 0.5),
    borderRightWidth: '2px',
    borderRadius: '20px',
  });

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1">
              {registerType == 'fixie'
                ? 'Fixie Registration'
                : 'Member Registration'}
            </Typography>
            <YellowDiv />
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={onSubmit}>
              {registerType == 'fixie' ? (
                <CardBox sx={{ padding: '40px 50px' }}>
                  <Grid container spacing={4} columns={13}>
                    <Grid item xs={4}>
                      <Typography variant="h2" sx={{ mb: 4 }}>
                        Owner's Detail
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Name
                      </Typography>
                      <TextField
                        type="text"
                        id="owner"
                        name="owner"
                        value={owner}
                        placeholder="Ali Bin Abu"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Email
                      </Typography>
                      <TextField
                        type="email"
                        id="mail"
                        name="mail"
                        value={mail}
                        placeholder="abc@gmail.com"
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
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        placeholder="********"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="center">
                      <StyledDivider orientation="vertical" variant="middle" />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h2" sx={{ mb: 4 }}>
                        Shop Detail
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Fixie Name
                      </Typography>
                      <TextField
                        type="text"
                        id="name"
                        name="name"
                        value={name}
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
                        Fixie Description
                      </Typography>
                      <TextField
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        placeholder="Your laptop is our duty"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Fixie Contact Number
                      </Typography>
                      <TextField
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        placeholder="012 345 6789"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        SSM Registration Number
                      </Typography>
                      <TextField
                        type="text"
                        id="ssm"
                        name="ssm"
                        value={ssm}
                        placeholder="1234567-X"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h2"
                          sx={{ mb: 4 }}
                          color={theme.palette.white.background}
                        >
                          a
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ mb: 2 }}
                          color={theme.palette.secondary.main}
                        >
                          Fixie Address
                        </Typography>
                        <TextField
                          type="text"
                          id="address"
                          name="address"
                          value={address}
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
                          State
                        </Typography>
                        <TextField
                          type="text"
                          id="state"
                          name="state"
                          value={state}
                          placeholder="Selangor"
                          onChange={onChange}
                          size="small"
                          fullWidth
                        />
                        <Typography
                          variant="h5"
                          sx={{ mt: 3, mb: 2 }}
                          color={theme.palette.secondary.main}
                        >
                          Fixie City
                        </Typography>
                        <TextField
                          type="text"
                          id="city"
                          name="city"
                          value={city}
                          placeholder="Kajang"
                          onChange={onChange}
                          size="small"
                          fullWidth
                        />
                      </Box>
                      <SubmitButton variant="contained" type="submit">
                        Apply Now
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </CardBox>
              ) : (
                <CardBox sx={{ width: '80%', padding: '40px 50px' }}>
                  <Grid container spacing={4} columns={9}>
                    <Grid item xs={4}>
                      <Typography variant="h2">Personal Detail</Typography>
                      <Typography variant="p" mb={2}>
                        This detail will be used for Fixie to identify you
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Name
                      </Typography>
                      <TextField
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Ali Bin Abu"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Phone
                      </Typography>
                      <TextField
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        placeholder="012 345 6789"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="center">
                      <StyledDivider orientation="vertical" variant="middle" />
                    </Grid>
                    <Grid item xs={4} display="flex" flexDirection="column">
                      <Typography variant="h2">Credentials</Typography>
                      <Typography variant="p" mb={2}>
                        This will be used as your login information
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Email
                      </Typography>
                      <TextField
                        type="email"
                        id="mail"
                        name="mail"
                        value={mail}
                        placeholder="abc@gmail.com"
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
                      <Typography
                        variant="h5"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.palette.secondary.main}
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        placeholder="********"
                        onChange={onChange}
                        size="small"
                        fullWidth
                      />
                      <SubmitButton
                        variant="contained"
                        type="submit"
                        sx={{ mt: 4 }}
                      >
                        Register
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </CardBox>
              )}
            </form>
          </Grid>
          <Grid item display="flex" xs={12} mt={4}>
            <Typography variant="h5" color={theme.palette.black.main}>
              Already registered?&nbsp;
            </Typography>
            <Typography variant="h5" color={theme.palette.primary.main}>
              <Link href="#">Login to your account</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Register;
