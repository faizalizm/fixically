import { Link, useNavigate } from 'react-router-dom';

import homepage from '../assets/illustration/homepage.png';
import lightwave from '../assets/illustration/lightwave.png';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CardBox, SubmitButton, YellowDiv } from '../theme';

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
import { useState } from 'react';

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
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    state: '',
    category: [],
    os: ['Windows'],
  });

  const onChangeState = (e, value) => {
    setSearchData((prevState) => ({
      ...prevState,
      state: value?.label,
    }));
  };

  const onChangeCategory = (e, value) => {
    setSearchData((prevState) => ({
      ...prevState,
      category: e.target.checked
        ? [...prevState.category, e.target.name]
        : prevState.category.filter((category) => category !== e.target.name),
    }));
  };

  const onChangeOs = (e, value) => {
    setSearchData((prevState) => ({
      ...prevState,
      os: e.target.checked
        ? [...prevState.os, e.target.name]
        : prevState.os.filter((os) => os !== e.target.name),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchData.state) params.set('state', searchData.state);
    if (searchData.category.length)
      params.set('category', searchData.category.join(','));
    if (searchData.os.length) params.set('os', searchData.os.join(','));

    navigate(`/search?${params.toString()}`);
  };

  console.log(searchData);

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
          my={8}
          mb={12}
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
              <Typography variant="h2" textAlign="center">
                Search for a Fixie
              </Typography>
              <Typography variant="h4" textAlign="center">
                Find a Fixie that suits your needs
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <CardBox>
              <form onSubmit={onSubmit}>
                <Grid container columnSpacing={4} rowSpacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h3" mb={1}>
                      Location
                    </Typography>
                    <Autocomplete
                      name="state"
                      options={malaysiaState}
                      onChange={onChangeState}
                      renderInput={(params) => (
                        <TextField {...params} label="Choose state" />
                      )}
                      disablePortal
                      freeSolo={false}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" mb={1}>
                      Category
                    </Typography>
                    <Stack direction="row" spacing={4}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Processor"
                              onChange={onChangeCategory}
                            />
                          }
                          label={
                            <Typography variant="h6">Processor</Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Storage"
                              onChange={onChangeCategory}
                            />
                          }
                          label={<Typography variant="h6">Storage</Typography>}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Peripherals"
                              onChange={onChangeCategory}
                            />
                          }
                          label={
                            <Typography variant="h6">Peripherals</Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Battery"
                              onChange={onChangeCategory}
                            />
                          }
                          label={<Typography variant="h6">Battery</Typography>}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Memory"
                              onChange={onChangeCategory}
                            />
                          }
                          label={<Typography variant="h6">Memory</Typography>}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Display"
                              onChange={onChangeCategory}
                            />
                          }
                          label={<Typography variant="h6">Display</Typography>}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Connectivity"
                              onChange={onChangeCategory}
                            />
                          }
                          label={
                            <Typography variant="h6">Connectivity</Typography>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="Audio"
                              onChange={onChangeCategory}
                            />
                          }
                          label={<Typography variant="h6">Audio</Typography>}
                        />
                      </FormGroup>
                    </Stack>
                  </Grid>
                </Grid>
                <Typography variant="h3" mt={4} mb={1}>
                  Operating System
                </Typography>
                <Stack direction="row" spacing={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="Windows"
                        onChange={onChangeOs}
                        defaultChecked
                      />
                    }
                    label={<Typography variant="h6">Windows</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox size="small" name="Mac" onChange={onChangeOs} />
                    }
                    label={<Typography variant="h6">Mac</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="Others"
                        onChange={onChangeOs}
                      />
                    }
                    label={<Typography variant="h6">Others</Typography>}
                  />
                </Stack>
                <SubmitButton variant="contained" type="submit" sx={{ mt: 2 }}>
                  Search
                </SubmitButton>
              </form>
            </CardBox>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1">Category</Typography>
            <YellowDiv />
            <Grid container columnSpacing={8} mt={4}>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Processor</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Memory</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Storage</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Display</Typography>
                </CardBox>
              </Grid>
            </Grid>
            <Grid container columnSpacing={8} mt={4}>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Peripherals</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Connectivity</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Battery</Typography>
                </CardBox>
              </Grid>
              <Grid item xs={3}>
                <CardBox>
                  <Typography variant="h3">Audio</Typography>
                </CardBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
