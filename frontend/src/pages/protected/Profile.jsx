import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  updateProfile,
  getProfile,
  reset,
} from '../../features/auth/authSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  CardBox,
  IconStack,
  SmallTextField,
  SubmitButton,
  YellowDiv,
} from '../../theme';
import {
  Stack,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [updating, setUpdating] = useState(false);
  const [confirmation, setConfirmation] = useState({
    profile: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    mail: user.mail,
    password: '',
    password2: '',
    owner: user.owner,
    description: user.description,
    ssm: user.ssm,
    address: user.address,
    state: user.state,
    city: user.city,
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

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();

    let updateData;

    if (user.role === 'Fixie') {
      updateData = {
        name,
        phone,
        mail,
        description,
        address,
        state,
        city,
      };
    } else {
      updateData = {
        name,
        mail,
        phone,
      };
    }

    if (user.role === 'Fixie') updateData.role = 'Fixie';
    else if (user.role === 'Member') updateData.role = 'Member';
    else if (user.role === 'Admin') updateData.role = 'Admin';

    dispatch(updateProfile(updateData));
    toast.success('Profile successfully updated');
  };

  const savePassword = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else if (
      password.length < 6 ||
      password.length > 20 ||
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      toast.error(
        <div>
          Password must be at least :<br /> • 6 to 20 characters
          <br /> • One alphabet character
          <br /> • One number
        </div>
      );
    } else {
      let updateData = { password: password };

      dispatch(updateProfile(updateData));

      setFormData({
        ...formData,
        password: '',
        password2: '',
      });

      toast.success('Password successfully updated');
    }
  };

  // Custom Styling
  const gridStyle = {
    display: 'flex',
    minHeight: '48px',
    alignItems: 'center',
  };

  return (
    <>
      <UserNavbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={6} px={4}>
          <Typography
            variant="h1"
            color={theme.palette.black.main}
            sx={{ mt: 4 }}
          >
            Profile
          </Typography>
          <YellowDiv />
          <CardBox sx={{ gap: '0px' }}>
            <Typography variant="h2">
              {user.role === 'Admin'
                ? 'Admin Details'
                : user.role === 'Fixie'
                ? 'Fixie Details'
                : 'Member Details'}
            </Typography>
            <IconStack>
              <InfoIcon
                sx={{
                  fontSize: 16,
                  mr: 1,
                  color: theme.palette.secondary.main,
                }}
              />
              <Typography variant="h6" color={theme.palette.secondary.main}>
                {user.role === 'Fixie'
                  ? 'This will be visible to your customer'
                  : 'This will be used to identify you'}
              </Typography>
            </IconStack>
            <form onSubmit={(e) => saveProfile(e)}>
              <Grid container mt={2}>
                {user.role === 'Fixie' ? (
                  <>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Owner Name</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      <Typography
                        variant="h5"
                        color={theme.palette.secondary.main}
                      >
                        {owner}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {user.role == 'Fixie' ? (
                  <>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">
                        SSM Registration Number
                      </Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      <Typography
                        variant="h5"
                        color={theme.palette.secondary.main}
                      >
                        {ssm}
                      </Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie Name</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {name}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie Description</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {description}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="description"
                            value={description}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie Number</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {phone}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie Address</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {address}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="address"
                            value={address}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie State</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {state}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="state"
                            value={state}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Fixie City</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {city}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="city"
                            value={city}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Email</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {mail}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="mail"
                            value={mail}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Name</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {name}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">Phone Number</Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {phone}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
              <Stack direction="row" justifyContent="end">
                <SubmitButton
                  variant="contained"
                  // type="submit"
                  sx={{ mt: 4, paddingX: '32px' }}
                  endIcon={<RightIcon />}
                  onClick={() => {
                    if (!updating) {
                      setUpdating(true);
                    } else {
                      setConfirmation((prevState) => ({
                        ...prevState,
                        profile: true,
                      }));
                    }
                  }}
                >
                  {!updating ? 'Update' : 'Save Changes'}
                </SubmitButton>
                <Dialog
                  open={confirmation.profile}
                  onClose={() =>
                    setConfirmation((prevState) => ({
                      ...prevState,
                      profile: false,
                    }))
                  }
                >
                  <DialogTitle>Confirm</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure to update your account details ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        setConfirmation((prevState) => ({
                          ...prevState,
                          profile: false,
                        }))
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        saveProfile(e);
                        setConfirmation((prevState) => ({
                          ...prevState,
                          profile: false,
                        }));
                        setUpdating(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </form>
            <Typography variant="h2" mt={4}>
              Password Details
            </Typography>
            <IconStack>
              <InfoIcon
                sx={{
                  fontSize: 16,
                  mr: 1,
                  color: theme.palette.secondary.main,
                }}
              />
              <Typography variant="h6" color={theme.palette.secondary.main}>
                This will be used with your email as login information
              </Typography>
            </IconStack>

            <form onSubmit={(e) => savePassword(e)}>
              <Grid
                sx={{
                  display: 'flex',
                  minHeight: '48px',
                  alignItems: 'center',
                }}
                container
                mt={2}
              >
                <Grid sx={gridStyle} item xs={4}>
                  <Typography variant="h5">New Password</Typography>
                </Grid>
                <Grid sx={gridStyle} item xs={8}>
                  <SmallTextField
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    minHeight: '48px',
                    alignItems: 'center',
                  }}
                  item
                  xs={4}
                >
                  <Typography variant="h5">Confirm Password</Typography>
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    minHeight: '48px',
                    alignItems: 'center',
                  }}
                  item
                  xs={8}
                >
                  <SmallTextField
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="end">
                <SubmitButton
                  variant="contained"
                  type="submit"
                  sx={{ mt: 4, paddingX: '32px' }}
                  endIcon={<RightIcon />}
                >
                  Save Changes
                </SubmitButton>
              </Stack>
            </form>
          </CardBox>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
