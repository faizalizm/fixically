import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

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
import { searchFixie, reset } from '../features/fixie/fixieSlice';

function FixieSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { fixie, isLoading, isError, message } = useSelector(
    (state) => state.fixie
  );

  const [searchData, setSearchData] = useState({
    state: '',
    city: '',
    service: {},
    os: {},
  });

  useEffect(() => {
    const osKeys = Object.keys(searchData.os).filter(
      (key) => searchData.os[key]
    );
    const serviceKeys = Object.keys(searchData.service).filter(
      (key) => searchData.service[key]
    );

    const params = new URLSearchParams(searchParams.toString());

    if (osKeys.length > 0) {
      params.set('os', osKeys.join(','));
    } else {
      params.delete('os');
    }

    if (serviceKeys.length > 0) {
      params.set('service', serviceKeys.join(','));
    } else {
      params.delete('service');
    }

    setSearchParams(params);

    dispatch(searchFixie(location.search));

    return () => {
      dispatch(reset());
    };
  }, [searchData]);

  console.log(fixie);

  const onClick = (e) => {
    const { name, checked, value } = e.target;
    setSearchData((prevState) => ({
      ...prevState,
      [name]: checked
        ? { ...prevState[name], [value]: true }
        : Object.fromEntries(
            Object.entries(prevState[name]).filter(([k, v]) => k !== value)
          ),
    }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <form>
              <CardBox>
                <FormGroup>
                  <Typography variant="h5">Operating System</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="os"
                        value="windows"
                        onClick={onClick}
                      />
                    }
                    label={<Typography variant="h6">Windows</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="os"
                        value="mac"
                        onClick={onClick}
                      />
                    }
                    label={<Typography variant="h6">Mac</Typography>}
                  />
                </FormGroup>
                <FormGroup>
                  <Typography variant="h5" mb={2}>
                    Service
                  </Typography>
                  <Divider textAlign="left">
                    <Chip label="Hardware" />
                  </Divider>
                  <Stack direction="row" spacing={1} mt={1}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="ram"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">RAM</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="battery"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Battery</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="motherboard"
                            onClick={onClick}
                          />
                        }
                        label={
                          <Typography variant="h6">Motherboard</Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="graphic"
                            onClick={onClick}
                          />
                        }
                        label={
                          <Typography variant="h6">Graphic Card</Typography>
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="wifi"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Wifi</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="storage"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Storage</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="keyboard"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Keyboard</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="touchpad"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Touchpad</Typography>}
                      />
                    </FormGroup>
                  </Stack>
                  <Divider textAlign="left">
                    <Chip label="Software" />
                  </Divider>
                  <Stack direction="row" spacing={1} mt={1}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="reformat"
                            onClick={onClick}
                          />
                        }
                        label={<Typography variant="h6">Reformat</Typography>}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            name="service"
                            value="installation"
                            onClick={onClick}
                          />
                        }
                        label={
                          <Typography variant="h6">Installation</Typography>
                        }
                      />
                    </FormGroup>
                  </Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        name="service"
                        value="backup&restore"
                        onClick={onClick}
                      />
                    }
                    label={
                      <Typography variant="h6">Backup & Restore</Typography>
                    }
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
            <Typography variant="h3">24 Fixie Found</Typography>
            <YellowDiv />
            {fixie.length > 0 ? (
              <CardBox>
                {fixie.map((fixie) => {
                  <>
                    <Grid container>
                      <Grid
                        item
                        container
                        xs={1}
                        alignItems="center"
                        key={fixie._id}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={require('../assets/avatar/member-avatar.webp')}
                        />
                      </Grid>
                      <Grid item container xs={8} direction="column">
                        <Typography variant="h4">
                          Rextech PC Sdn. Bhd
                        </Typography>
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
                  </>;
                })}
              </CardBox>
            ) : (
              'nogoal'
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FixieSearch;
