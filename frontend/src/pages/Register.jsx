import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import { YellowDiv } from '../theme';
import { Navbar } from '../components/Navbar';

import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  styled,
  useTheme,
  Button,
  Box,
  Divider,
  alpha,
  Link,
} from '@mui/material';

function Register() {
  const { registerType } = useParams();

  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    password: '',
    password2: '',
    phone: '',
  });

  const { name, mail, password, password2, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const memberData = {
        name,
        mail,
        password,
        phone,
      };

      dispatch(register(memberData));
    }
  };

  // Custom Styling
  const StyledCard = styled(Card)({
    display: 'flex',
    padding: '40px 50px',
    boxShadow:
      '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
    borderRadius: '20px',
    gap: '32px',
    alignItems: 'stretch',
  });

  const StyledDivider = styled(Divider)({
    borderColor: alpha(theme.palette.black.main, 0.5),
    borderRightWidth: '2px',
    borderRadius: '20px',
  });

  const StyledButton = styled(Button)({
    width: '100%',
    color: theme.palette.white.main,
    alignSelf: 'flex-end',
  });

  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <Typography variant="h3">
            {registerType == 'fixie'
              ? 'Fixie Registration'
              : 'Member Registration'}
          </Typography>
          <YellowDiv />
          <form onSubmit={onSubmit}>
            <StyledCard>
              <CardContent display="flex" sx={{ width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
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
              </CardContent>
              <CardContent>
                <StyledDivider orientation="vertical" variant="middle" />
              </CardContent>
              <CardContent display="flex" sx={{ width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
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
                  Fixie Contact Number
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
                  SSM Registration Number
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
              </CardContent>
              <CardContent
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ mb: 4 }}>
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
                    State
                  </Typography>
                  <TextField
                    type="text"
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
                    Fixie City
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
                </Box>
                <StyledButton variant="contained" type="submit">
                  Apply Now
                </StyledButton>
              </CardContent>
            </StyledCard>
          </form>
        </Box>
        <Box display="flex" sx={{ mt: 4 }}>
          <Typography variant="h5" color={theme.palette.black.main}>
            Already registered?&nbsp;
          </Typography>
          <Typography variant="h5" color={theme.palette.primary.main}>
            <Link href="#">Login to your account</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Register;
