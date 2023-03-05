import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CardBox, SubmitButton, YellowDiv } from '../theme';

import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function FixieSearch() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <form>
              <CardBox>
                <FormGroup>
                  <Typography variant="h5" mb={4}>
                    Operating System
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="h6">Windows</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="h6">Mac</Typography>}
                  />
                </FormGroup>
                <Box>
                  <Typography variant="h5" mb={4}>
                    Service
                  </Typography>
                  <Divider textAlign="left">
                    <Chip label="Hardware" />
                  </Divider>
                  <Stack direction="row" spacing={4} mt={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">RAM</Typography>}
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Battery</Typography>}
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={
                          <Typography variant="h6">Motherboard</Typography>
                        }
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={
                          <Typography variant="h6">Graphic Card</Typography>
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Wifi</Typography>}
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Storage</Typography>}
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Keyboard</Typography>}
                      />
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Touchpad</Typography>}
                      />
                    </FormGroup>
                  </Stack>
                  <Divider textAlign="left">
                    <Chip label="Software" />
                  </Divider>
                  <Stack direction="row" spacing={4} mt={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="h6">Reformat</Typography>}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={
                          <Typography variant="h6">Installation</Typography>
                        }
                      />
                    </FormGroup>
                  </Stack>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="h6">Backup & Restore</Typography>
                    }
                  />
                </Box>
                <FormGroup>
                  <Divider>
                    <Chip label="Star Rating" />
                  </Divider>
                  <Rating name="read-only" value={1} readOnly />
                  <Rating name="read-only" value={2} readOnly />
                  <Rating name="read-only" value={3} readOnly />
                  <Rating name="read-only" value={4} readOnly />
                  <Rating name="read-only" value={5} readOnly />
                </FormGroup>
              </CardBox>
            </form>
          </Grid>
          <Grid item xs={9} padding={5}>
            <Typography variant="h3">24 Fixie Found</Typography>
            <YellowDiv />
            <CardBox>
              <Grid container>
                <Grid item container xs={1} alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={require('../assets/avatar/member-avatar.webp')}
                  />
                </Grid>
                <Grid item container xs={8} direction="column">
                  <Typography variant="h4">Rextech PC Sdn. Bhd</Typography>
                  <Typography variant="p">
                    Professional Gaming PC Builder
                  </Typography>
                </Grid>
                <Grid item container xs={3} justifyContent="flex-end">
                  4.9
                  <Stack alignItems="center" ml={4}>
                    <Rating name="read-only" value={5} readOnly />
                    <Typography variant="p">(87 Reviews)</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item container xs={4}>
                  <Typography variant="p">Windows • MacOS</Typography>
                </Grid>
                <Grid item container xs={5} justifyContent="flex-end">
                  <Typography variant="p" mr={4}>
                    Kajang, Selangor
                  </Typography>
                </Grid>
                <Grid item container xs={3}>
                  <SubmitButton
                    variant="contained"
                    type="submit"
                    button
                    component={Link}
                    to="/fixieProfile"
                    fullWidth
                  >
                    View
                  </SubmitButton>
                </Grid>
              </Grid>
            </CardBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FixieSearch;
