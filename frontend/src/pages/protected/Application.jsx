import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getProfile } from '../../features/auth/authSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { CardBox, IconStack, YellowDiv } from '../../theme';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, useTheme } from '@mui/material';
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

function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else if (user.role != 'Fixie') {
      navigate('/dashboard');
    } else {
      dispatch(getProfile());
    }
  }, [navigate, isError, message, dispatch]);

  const createTime = user.application?.create_date
    ? new Date(user.application?.create_date).toLocaleTimeString()
    : '';

  const createDate = user.application?.create_date
    ? new Date(user.application?.create_date).toLocaleDateString()
    : '';

  const resultTime = user.application?.result_date
    ? new Date(user.application?.result_date).toLocaleTimeString()
    : '';

  const resultDate = user.application?.result_date
    ? new Date(user.application?.result_date).toLocaleDateString()
    : '';

  return (
    <>
      <UserNavbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={6} px={4}>
          <Typography variant="h1" sx={{ mt: 4 }}>
            Application Status
          </Typography>
          <YellowDiv />
          <CardBox>
            <Timeline
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.2,
                },
              }}
            >
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="h4" mb={1}>
                    {createTime}
                  </Typography>
                  <Typography variant="h4">{createDate}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: createTime
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent mb={8}>
                  <CardBox
                    sx={{
                      padding: '24px 32px',
                      gap: '0px',
                      backgroundColor: createTime
                        ? theme.palette.primary.main
                        : '',
                    }}
                    ml={2}
                    mr={8}
                  >
                    <Typography variant="h2">Submitted</Typography>
                    <IconStack>
                      <InfoIcon
                        sx={{
                          fontSize: 16,
                          mr: 1,
                          color: theme.palette.secondary.main,
                        }}
                      />
                      <Typography variant="h4">
                        Your information has been received
                      </Typography>
                    </IconStack>
                  </CardBox>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: createTime
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent mb={8}>
                  <CardBox
                    sx={{
                      padding: '24px 32px',
                      gap: '0px',
                      backgroundColor: createTime
                        ? theme.palette.primary.main
                        : '',
                    }}
                    ml={2}
                    mr={8}
                  >
                    <Typography variant="h2">Awaiting</Typography>
                    <IconStack>
                      <InfoIcon
                        sx={{
                          fontSize: 16,
                          mr: 1,
                          color: theme.palette.secondary.main,
                        }}
                      />
                      <Typography variant="h4">
                        Your account will be restricted until Approved
                      </Typography>
                    </IconStack>
                  </CardBox>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="h4" mb={1}>
                    {resultTime}
                  </Typography>
                  <Typography variant="h4">{resultDate}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: resultDate
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <CardBox
                    sx={{
                      padding: '24px 32px',
                      gap: '0px',
                      backgroundColor: resultDate
                        ? theme.palette.primary.main
                        : '',
                    }}
                    ml={2}
                    mr={8}
                  >
                    <Typography
                      variant="h2"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {user.application?.result_status
                        ? user.application?.result_status
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
                      <Typography variant="h4">
                        {user.application?.result_status == 'Approved'
                          ? 'Your details have been verified'
                          : user.application?.result_status == 'Rejected'
                          ? user.application?.reject_reason
                          : 'Your details are being processed'}
                      </Typography>
                    </IconStack>
                  </CardBox>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardBox>
        </Grid>
      </Grid>
    </>
  );
}

export default Application;
