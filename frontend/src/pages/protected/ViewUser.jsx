import { useEffect, useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { profileFixie } from '../../features/fixie/fixieSlice';
import { profileMember } from '../../features/member/memberSlice';
import { updateProfile } from '../../features/auth/authSlice';

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
  TextField,
} from '@mui/material';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';

function ViewFixie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { fixie_id, member_id } = useParams();

  const { user } = useSelector((state) => state.auth);

  let userData;
  if (fixie_id) {
    userData = useSelector((state) => state.fixie);
  } else if (member_id) {
    userData = useSelector((state) => state.member);
  }

  const { fixie, member, isLoading, isError, message } = userData;

  const [updating, setUpdating] = useState(false);
  const [confirmation, setConfirmation] = useState({
    profile: false,
    password: false,
    status: false,
    status_value: '',
  });
  const [formData, setFormData] = useState({
    role: '',
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
    application: '',
  });

  const {
    role,
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
    application,
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      if (fixie_id) {
        dispatch(profileFixie(fixie_id));
      } else {
        dispatch(profileMember(member_id));
      }
    }
  }, [navigate, isError, message, dispatch]);

  useEffect(() => {
    if (fixie_id && fixie) {
      setFormData((prevState) => ({
        ...prevState,
        role: 'Fixie',
        name: fixie.name,
        phone: fixie.phone,
        mail: fixie.mail,
        password: '',
        password2: '',
        owner: fixie.owner,
        description: fixie.description,
        ssm: fixie.ssm,
        address: fixie.address,
        state: fixie.state,
        city: fixie.city,
        application: fixie.application,
      }));
    }
  }, [fixie]);

  useEffect(() => {
    if (member_id && member) {
      setFormData((prevState) => ({
        ...prevState,
        role: 'Member',
        name: member.name,
        phone: member.phone,
        mail: member.mail,
        password: '',
        password2: '',
      }));
    }
  }, [member]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();

    let updateData;

    if (role === 'Fixie') {
      updateData = {
        id: fixie_id,
        role: 'Fixie',
        name,
        phone,
        mail,
        owner,
        ssm,
        description,
        address,
        state,
        city,
      };
    } else {
      updateData = {
        id: member_id,
        role: 'Member',
        name,
        mail,
        phone,
      };
    }

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
      let updateData;

      if (role === 'Fixie') {
        updateData = {
          id: fixie_id,
          role: 'Fixie',
          password: password,
        };
      } else {
        updateData = {
          id: member_id,
          role: 'Member',
          password: password,
        };
      }

      dispatch(updateProfile(updateData));

      setFormData({
        ...formData,
        password: '',
        password2: '',
      });

      toast.success('Password successfully updated');
    }
  };

  const saveStatus = (e) => {
    e.preventDefault();

    let updateData = {
      id: fixie_id,
      role: 'Fixie',
      application: {
        status: confirmation.status_value,
        result_date: new Date(),
        reject_reason: '',
      },
    };

    dispatch(updateProfile(updateData));
    toast.success('Fixie status successfully updated');
    dispatch(profileFixie(fixie_id));
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
            {role === 'Fixie' ? 'Fixie' : 'Member'} Profile
          </Typography>
          <YellowDiv />
          <CardBox sx={{ gap: '0px' }}>
            <Typography variant="h2">
              {role === 'Fixie' ? 'Fixie' : 'Member'} Details
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
                {role === 'Fixie'
                  ? "This is the Fixie's company information"
                  : "This is the Member's profile"}
              </Typography>
            </IconStack>
            <form onSubmit={(e) => saveProfile(e)}>
              <Grid container mt={2}>
                {role === 'Fixie' ? (
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
                {role == 'Fixie' ? (
                  <>
                    <Grid sx={gridStyle} item xs={4}>
                      <Typography variant="h5">
                        SSM Registration Number
                      </Typography>
                    </Grid>
                    <Grid sx={gridStyle} item xs={8}>
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
                      onClick={() => {
                        setConfirmation((prevState) => ({
                          ...prevState,
                          profile: false,
                        }));
                      }}
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
                  sx={{ mt: 4, paddingX: '32px' }}
                  endIcon={<RightIcon />}
                  onClick={() => {
                    setConfirmation((prevState) => ({
                      ...prevState,
                      password: true,
                    }));
                  }}
                >
                  Save Changes
                </SubmitButton>
                <Dialog
                  open={confirmation.password}
                  onClose={() =>
                    setConfirmation((prevState) => ({
                      ...prevState,
                      password: false,
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
                      onClick={() => {
                        setConfirmation((prevState) => ({
                          ...prevState,
                          password: false,
                        }));
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        savePassword(e);
                        setConfirmation((prevState) => ({
                          ...prevState,
                          password: false,
                        }));
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </form>
          </CardBox>
        </Grid>

        {/* Fixie Application */}
        {role === 'Fixie' ? (
          <>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                color={theme.palette.black.main}
                sx={{ mt: 4 }}
              >
                Review {role === 'Fixie' ? 'Fixie' : 'Member'}
              </Typography>
              <YellowDiv />
              <CardBox sx={{ gap: '0px' }}>
                <Typography variant="h2">Fixie Application Status</Typography>
                <IconStack>
                  <InfoIcon
                    sx={{
                      fontSize: 16,
                      mr: 1,
                      color: theme.palette.secondary.main,
                    }}
                  />
                  <Typography variant="h6">
                    Fixie will be notified via email for any status update
                  </Typography>
                </IconStack>
                <Timeline
                  sx={{
                    mt: 2,
                    [`& .${timelineOppositeContentClasses.root}`]: {
                      flex: 0.3,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}>
                        {application?.create_date
                          ? new Date(
                              application?.create_date
                            ).toLocaleTimeString()
                          : ''}
                      </Typography>
                      <Typography variant="h4">
                        {application?.create_date
                          ? new Date(
                              application?.create_date
                            ).toLocaleDateString()
                          : ''}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Submitted</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Fixie information received
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}></Typography>
                      <Typography variant="h4"></Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Awaiting</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Waiting for Admin approval
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}>
                        {application?.result_date
                          ? new Date(
                              application?.result_date
                            ).toLocaleTimeString()
                          : ''}
                      </Typography>
                      <Typography variant="h4">
                        {application?.result_date
                          ? new Date(
                              application?.result_date
                            ).toLocaleDateString()
                          : ''}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor: application?.result_date
                            ? theme.palette.primary.main
                            : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">
                        {application?.status === 'APPROVED'
                          ? 'Approved'
                          : application?.status === 'REJECTED'
                          ? 'Rejected'
                          : 'Approved / Rejected'}
                      </Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          {application?.status == 'APPROVED'
                            ? 'Fixie details have been verified'
                            : application?.status == 'REJECTED'
                            ? application?.reject_reason
                            : 'Fixie details are being processed'}
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
                {application?.status != 'APPROVED' &&
                application?.status != 'REJECTED' ? (
                  <>
                    <Grid container justifyContent="flex-end">
                      <SubmitButton
                        variant="contained"
                        sx={{
                          mt: 4,
                          paddingX: '32px',
                          backgroundColor: theme.palette.secondary.textField,
                          color: theme.palette.black.main,
                        }}
                        onClick={() => {
                          setConfirmation((prevState) => ({
                            ...prevState,
                            status: true,
                            status_value: 'reject',
                          }));
                        }}
                      >
                        Reject
                      </SubmitButton>
                      <SubmitButton
                        variant="contained"
                        sx={{ mt: 4, ml: 2, paddingX: '32px' }}
                        onClick={() => {
                          setConfirmation((prevState) => ({
                            ...prevState,
                            status: true,
                            status_value: 'approve',
                          }));
                        }}
                      >
                        Approve
                      </SubmitButton>
                      <Dialog
                        open={confirmation.status}
                        onClose={() =>
                          setConfirmation((prevState) => ({
                            ...prevState,
                            status: false,
                          }))
                        }
                      >
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <span>
                              Are you sure you want to{' '}
                              {confirmation.status_value} Fixie application ?
                            </span>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              setConfirmation((prevState) => ({
                                ...prevState,
                                status: false,
                              }));
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={(e) => {
                              saveStatus(e);
                              setConfirmation((prevState) => ({
                                ...prevState,
                                status: false,
                              }));
                            }}
                          >
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                ) : (
                  ''
                )}
              </CardBox>
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>
    </>
  );
}

export default ViewFixie;
