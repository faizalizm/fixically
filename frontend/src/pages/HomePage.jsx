import { Link } from 'react-router-dom';

import homepage_illustration from '../assets/illustration/homepage_illustration.png';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CardBox, SubmitButton } from '../theme';

import {
  Autocomplete,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const malaysiaState = [
  { label: 'Johor', stateNumber: 1 },
  { label: 'Kedah', stateNumber: 2 },
  { label: 'Kelantan', stateNumber: 3 },
  { label: 'Melaka', stateNumber: 4 },
  { label: 'Negeri Sembilan', stateNumber: 5 },
  { label: 'Pahang', stateNumber: 6 },
  { label: 'Pulau Pinang', stateNumber: 7 },
  { label: 'Perak', stateNumber: 8 },
  { label: 'Perlis', stateNumber: 9 },
  { label: 'Selangor', stateNumber: 10 },
  { label: 'Terengganu', stateNumber: 11 },
  { label: 'Sabah', stateNumber: 12 },
  { label: 'Sarawak', stateNumber: 13 },
  { label: 'Kuala Lumpur', stateNumber: 14 },
  { label: 'Labuan', stateNumber: 15 },
  { label: 'Putrajaya', stateNumber: 16 },
];

function HomePage() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container height="80vh">
          <Grid item xs={4}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <img src={homepage_illustration} alt="" />
              <Typography variant="h3" sx={{ mt: 4, mb: 4 }}>
                Search for a Fixie
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Find a Fixie that suits your needs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CardBox>
                <Grid container>
                  <Grid container item xs={6}>
                    <Typography variant="h4" sx={{ mb: 4 }}>
                      Location
                    </Typography>
                    <Stack direction="row">
                      <Autocomplete
                        disablePortal
                        options={malaysiaState}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="State" />
                        )}
                      />
                      <Autocomplete
                        disablePortal
                        options={malaysiaState}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="City" />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid container item xs={6}>
                    <Typography variant="h4" sx={{ mb: 4 }}>
                      Price
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography variant="h4" sx={{ mb: 4 }}>
                      Service
                    </Typography>
                    <Stack direction="row" spacing={4}>
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
                  </Grid>
                </Grid>
                <Stack>
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    Operating System
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox size="small" defaultChecked />}
                      label="Windows"
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Mac"
                    />
                  </FormGroup>

                  <SubmitButton
                    variant="contained"
                    type="submit"
                    component={Link}
                    to="/search/fixie"
                  >
                    Search
                  </SubmitButton>
                </Stack>
              </CardBox>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
