import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CardBox, YellowDiv } from '../../theme';
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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  return (
    <>
      <UserNavbar />
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 6 }}
          >
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
                <TimelineOppositeContent color={theme.palette.secondary.main}>
                  {user.application.submit_date
                    ? new Date(
                        user.application.submit_date
                      ).toLocaleTimeString() +
                      new Date(
                        user.application.submit_date
                      ).toLocaleDateString()
                    : ''}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: user.application.submit_date
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Submitted
                  </Typography>
                  <Typography>Your information has been received</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  color={theme.palette.secondary.main}
                ></TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: user.application.submit_date
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Awaiting
                  </Typography>
                  <Typography>An admin will cater your application</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color={theme.palette.secondary.main}>
                  {user.application.result_date
                    ? new Date(
                        user.application.result_date
                      ).toLocaleTimeString() +
                      new Date(
                        user.application.result_date
                      ).toLocaleDateString()
                    : ''}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      backgroundColor: user.application.result_date
                        ? theme.palette.primary.main
                        : '',
                    }}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6" component="span">
                    Approved/Rejected
                  </Typography>
                  <Typography>Your details are being processed</Typography>
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
