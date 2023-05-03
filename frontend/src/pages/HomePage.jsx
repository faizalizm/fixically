import { Link } from 'react-router-dom';

import homepage from '../assets/illustration/homepage.png';
import lightwave from '../assets/illustration/lightwave.png';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CardBox, SubmitButton } from '../theme';

import {
  Autocomplete,
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
        <Grid
          container
          display="flex"
          alignItems="center"
          rowSpacing={8}
          columnSpacing={4}
        >
          <Grid
            item
            xs={4}
            gap={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <img src={homepage} alt="" />
            <Stack spacing={1}>
              <Typography variant="h3" textAlign="center">
                Search for a Fixie
              </Typography>
              <Typography variant="h6">
                Find a Fixie that suits your needs
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <CardBox>
              <Grid container columnSpacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h4">Location</Typography>
                  <Autocomplete
                    disablePortal
                    options={malaysiaState}
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
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
                <Typography variant="h4" sx={{ mb: 2 }}>
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
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
