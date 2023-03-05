import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CardBox, YellowDiv } from '../theme';

import {
  Avatar,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function FixieProfile() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <CardBox mb={4}>
              <Grid container>
                <Grid item container xs={1} alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={require('../assets/avatar/member-avatar.webp')}
                  />
                </Grid>
                <Grid item container xs={8} direction="column">
                  <Typography variant="h4">Rextech PC Sdn. Bhd.</Typography>
                  <Typography variant="p">
                    Professional Gaming PC Builder
                  </Typography>
                </Grid>
                <Grid item container xs={3} justifyContent="flex-end">
                  4.9
                  <Stack alignItems="center" ml={2}>
                    <Rating name="read-only" value={5} readOnly />
                    <Typography variant="p">(87 Reviews)</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item container xs={4}>
                  <Typography variant="p">Windows • MacOS</Typography>
                </Grid>
                <Grid item container xs={8} justifyContent="flex-end">
                  <Typography variant="p">Kajang, Selangor</Typography>
                </Grid>
              </Grid>
            </CardBox>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="h3" mt={4}>
          Reviews
        </Typography>
        <YellowDiv />
        <Grid container direction="row" spacing={4} mb={4}>
          <Grid item xs={4}>
            <CardBox sx={{ gap: '16px' }}>
              <Typography variant="h4">Miss Katrina</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Typography variant="p" mr={1} fontWeight="bold">
                    4.9
                  </Typography>
                  <Rating name="read-only" value={5} readOnly />
                </Stack>
                <Typography variant="p">November 29, 2022</Typography>
              </Stack>
              <Typography variant="p" align="justify">
                “Bought from rextech even though there is a lot other seller
                near my area in gombak. They will entertain your questions
                either on fb or whatsapp. Fast response and highly recommended
                for those looking for custom built PC”
              </Typography>
            </CardBox>
          </Grid>
          <Grid item xs={4}>
            <CardBox sx={{ gap: '16px' }}>
              <Typography variant="h4">Miss Katrina</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Typography variant="p" mr={1} fontWeight="bold">
                    4.9
                  </Typography>
                  <Rating name="read-only" value={5} readOnly />
                </Stack>
                <Typography variant="p">November 29, 2022</Typography>
              </Stack>
              <Typography variant="p" align="justify">
                “Bought from rextech even though there is a lot other seller
                near my area in gombak. They will entertain your questions
                either on fb or whatsapp. Fast response and highly recommended
                for those looking for custom built PC”
              </Typography>
            </CardBox>
          </Grid>
          <Grid item xs={4}>
            <CardBox sx={{ gap: '16px' }}>
              <Typography variant="h4">Miss Katrina</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Typography variant="p" mr={1} fontWeight="bold">
                    4.9
                  </Typography>
                  <Rating name="read-only" value={5} readOnly />
                </Stack>
                <Typography variant="p">November 29, 2022</Typography>
              </Stack>
              <Typography variant="p" align="justify">
                “Bought from rextech even though there is a lot other seller
                near my area in gombak. They will entertain your questions
                either on fb or whatsapp. Fast response and highly recommended
                for those looking for custom built PC”
              </Typography>
            </CardBox>
          </Grid>
        </Grid>
        <Stack direction="row" alignItems="center">
          <CardBox sx={{ padding: '10px 56px' }}>
            <Typography variant="p">RAM</Typography>
          </CardBox>
          <CardBox sx={{ padding: '10px 56px' }}>
            <Typography variant="p">SSD</Typography>
          </CardBox>
          <CardBox sx={{ padding: '10px 56px' }}>
            <Typography variant="p">Motherboard</Typography>
          </CardBox>
        </Stack>
        <Divider />
      </Container>
      <Footer />
    </>
  );
}

export default FixieProfile;
