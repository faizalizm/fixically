import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { searchFixie, reset } from '../features/fixie/fixieSlice';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

import { CardBox, SubmitButton, YellowDiv } from '../theme';
import {
  Autocomplete,
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
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function FixieSearch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fixie, isLoading, isError, message } = useSelector(
    (state) => state.fixie
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    state: searchParams.get('state'),
    category: searchParams.get('category')
      ? [searchParams.get('category')]
      : [],
    os: searchParams.get('os') ? [searchParams.get('os')] : [],
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    setSearchParams({
      state: searchData.state,
      category: searchData.category,
      os: searchData.os,
    });

    // const params = new URLSearchParams();
    // if (searchData.state) params.set('state', searchData.state);

    // if (Array.isArray(searchData.category)) {
    //   if (searchData.category.length)
    //     params.set('category', searchData.category.join(','));
    // } else {
    //   if (searchData.category) params.set('category', searchData.category);
    // }

    // if (Array.isArray(searchData.os)) {
    //   if (searchData.os.length) params.set('os', searchData.os.join(','));
    // } else {
    //   if (searchData.os) params.set('os', searchData.os);
    // }
    dispatch(searchFixie(searchData));
    // return () => {
    //   dispatch(reset());
    // };
  }, [searchData, isError, message, dispatch]);

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

  console.log(searchData);

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <form>
              <CardBox>
                <FormGroup>
                  <Typography variant="h5" mb={2}>
                    Location
                  </Typography>
                  <Autocomplete
                    name="state"
                    options={malaysiaState}
                    onChange={onChangeState}
                    defaultValue={searchData.state}
                    renderInput={(params) => (
                      <TextField {...params} label="Choose state" />
                    )}
                    disablePortal
                    freeSolo={false}
                  />
                </FormGroup>
                <FormGroup>
                  <Typography variant="h5">Category</Typography>
                  {/* <Divider textAlign="left">
                    <Chip label="Hardware" />
                  </Divider> */}
                  <Stack direction="row" spacing={1}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="Processor"
                            checked={searchData.category.includes('Processor')}
                            onChange={onChangeCategory}
                          />
                        }
                        label={<Typography variant="h6">Processor</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="Storage"
                            checked={searchData.category.includes('Storage')}
                            onChange={onChangeCategory}
                          />
                        }
                        label={<Typography variant="h6">Storage</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="Peripherals"
                            checked={searchData.category.includes(
                              'Peripherals'
                            )}
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
                            checked={searchData.category.includes('Battery')}
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
                            checked={searchData.category.includes('Memory')}
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
                            checked={searchData.category.includes('Display')}
                            onChange={onChangeCategory}
                          />
                        }
                        label={<Typography variant="h6">Display</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="Connectivity"
                            checked={searchData.category.includes(
                              'Connectivity'
                            )}
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
                            checked={searchData.category.includes('Audio')}
                            onChange={onChangeCategory}
                          />
                        }
                        label={<Typography variant="h6">Audio</Typography>}
                      />
                    </FormGroup>
                  </Stack>
                </FormGroup>
                <FormGroup>
                  <Typography variant="h5">Operating System</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="Windows"
                        onChange={onChangeOs}
                        defaultChecked={
                          searchParams &&
                          searchParams.get('os') &&
                          searchParams.get('os').includes('Windows')
                        }
                      />
                    }
                    label={<Typography variant="h6">Windows</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="Mac"
                        onChange={onChangeOs}
                        defaultChecked={
                          searchParams &&
                          searchParams.get('os') &&
                          searchParams.get('os').includes('Mac')
                        }
                      />
                    }
                    label={<Typography variant="h6">Mac</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="Others"
                        onChange={onChangeOs}
                        defaultChecked={
                          searchParams &&
                          searchParams.get('os') &&
                          searchParams.get('os').includes('Others')
                        }
                      />
                    }
                    label={<Typography variant="h6">Others</Typography>}
                  />
                </FormGroup>
                <FormGroup>
                  <Typography variant="h5" mb={2}>
                    Star rating
                  </Typography>
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
            <Typography variant="h1">{fixie.length} Fixie Found</Typography>
            <YellowDiv />
            {fixie.length > 0
              ? fixie.map((fixie) => (
                  <Box key={fixie._id}>
                    <form onSubmit={() => navigate(`/fixie/${fixie._id}`)}>
                      <CardBox my={4}>
                        <Grid container>
                          <Grid item container xs={1} alignItems="center">
                            <Avatar
                              alt="Remy Sharp"
                              src={require('../assets/avatar/member-avatar.webp')}
                            />
                          </Grid>
                          <Grid item container xs={8} direction="column">
                            <Typography variant="h2">{fixie.name}</Typography>
                            <Typography variant="p">
                              {fixie.description}
                            </Typography>
                          </Grid>
                          <Grid item container xs={3} justifyContent="flex-end">
                            {fixie.average_rating?.toFixed(1) || 0}
                            <Stack alignItems="center" ml={2}>
                              <Rating
                                name="read-only"
                                value={fixie.average_rating || 0}
                                readOnly
                              />
                              <Typography variant="p" mt={1}>
                                ({fixie.review_count || 0} reviews)
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                          <Grid item container xs={4}>
                            <Typography variant="p">
                              {fixie.os_support?.join(' • ')}
                            </Typography>
                          </Grid>
                          <Grid item container xs={5} justifyContent="flex-end">
                            <Typography variant="p" mr={4}>
                              {`${fixie.city}, ${fixie.state}`}
                            </Typography>
                          </Grid>
                          <Grid item container xs={3}>
                            <SubmitButton
                              variant="contained"
                              type="submit"
                              fullWidth
                            >
                              View
                            </SubmitButton>
                          </Grid>
                        </Grid>
                      </CardBox>
                    </form>
                  </Box>
                ))
              : 'No fixie found'}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FixieSearch;
