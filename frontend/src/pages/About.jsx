import React from 'react';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

import { CardBox, YellowDiv } from '../theme';
import { Box, CardContent, Container, Typography } from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function About() {
  const boxStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container height="80vh">
          <Grid item container xs={6}>
            <Box sx={boxStyle}>
              <YellowDiv alignItems="flex-start" />
              <Typography variant="h2" color="initial">
                We bring Fixies closer to you !
              </Typography>
              <Typography variant="h6" color="initial">
                Fixically centralizes many of the laptop repair and service
                vendor <br />
                all over Malaysia for you to choose from.
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={6}>
            <Box sx={boxStyle}>
              <Grid container spacing={6}>
                <Grid item container xs={6} mt={4} spacing={2}>
                  <CardBox>
                    <CardContent>
                      <Typography gutterBottom variant="h4">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardBox>
                  <CardBox>
                    <CardContent>
                      <Typography gutterBottom variant="h4">
                        Hardware
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardBox>
                </Grid>
                <Grid item container xs={6} spacing={2}>
                  <CardBox>
                    <CardContent>
                      <Typography gutterBottom variant="h4">
                        Software
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardBox>
                  <CardBox>
                    <CardContent>
                      <Typography gutterBottom variant="h4">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardBox>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default About;
