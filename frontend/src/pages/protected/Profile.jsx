import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateFixie, reset } from '../../features/fixie/fixieSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CardBox, SmallTextField, SubmitButton, YellowDiv } from '../../theme';
import { Stack, TextField, Typography, useTheme, styled } from '@mui/material';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    mail: user.mail,
    password: user.password,
    password2: user.password2,
    owner_name: user.owner_name,
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
    owner_name,
    description,
    ssm,
    address,
    state,
    city,
  } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
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

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      let updateData;

      // registerType == 'fixie'
      //   ? (updateData = {
      //       name,
      //       phone,
      //       mail,
      //       password,
      //       password2,
      //       owner_name,
      //       description,
      //       ssm,
      //       address,
      //       state,
      //       city,
      //       userType: 'fixie',
      //     })
      //   : (updateData = {
      //       name,
      //       mail,
      //       password,
      //       phone,
      //       userType: 'member',
      //     });

      // dispatch(updateFixie(updateData));
    }
  };

  // Custom Styling
  const StyledGrid = styled(Grid)({
    display: 'flex',
    minHeight: '64px',
    alignItems: 'center',
  });

  return (
    <>
      <UserNavbar />
      <Grid container spacing={0}>
        <Grid item xs={2} height="100%">
          <Sidebar />
        </Grid>
        <Grid item xs={10} px={4}>
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 4 }}
          >
            Profile
          </Typography>
          <YellowDiv />
          <form onSubmit={onSubmit}>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <CardBox sx={{ gap: '8px' }}>
                  <Typography variant="h4">Fixie Details</Typography>
                  <Stack direction="row" alignItems="center" mb={2}>
                    <InfoIcon
                      sx={{
                        fontSize: 16,
                        mr: 1,
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color={theme.palette.secondary.main}
                    >
                      This will be visible to your customer
                    </Typography>
                  </Stack>
                  <Grid container>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">
                        SSM Registration Number
                      </Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            {ssm}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="ssm"
                            value={ssm}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Fixie Name</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Fixie Description</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Fixie Address</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Fixie State</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Fixie City</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                  </Grid>
                  {/* <StyledDivider /> */}
                  <Typography variant="h4" mt={4}>
                    Account Details
                  </Typography>
                  <Stack direction="row" alignItems="center" mb={2}>
                    <InfoIcon
                      sx={{
                        fontSize: 16,
                        mr: 1,
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color={theme.palette.secondary.main}
                    >
                      This will be used as your login information
                    </Typography>
                  </Stack>
                  <StyledGrid container>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Name</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                            name="owner_name"
                            value={owner_name}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Email</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
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
                    </StyledGrid>
                    <StyledGrid item xs={4}>
                      <Typography variant="h5">Password</Typography>
                    </StyledGrid>
                    <StyledGrid item xs={8}>
                      {!updating ? (
                        <>
                          <Typography
                            variant="h5"
                            color={theme.palette.secondary.main}
                          >
                            Change Password
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SmallTextField
                            type="text"
                            name="password"
                            value={password}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        </>
                      )}
                    </StyledGrid>
                  </StyledGrid>
                  <Stack direction="row" justifyContent="end">
                    <SubmitButton
                      variant="contained"
                      type="submit"
                      sx={{ mt: 4, paddingX: '64px' }}
                      endIcon={<RightIcon />}
                      onClick={() => setUpdating(!updating)}
                    >
                      Update
                    </SubmitButton>
                  </Stack>
                </CardBox>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
