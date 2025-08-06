import React from 'react';
import { useNavigate } from 'react-router-dom';

import addtocart from '../assets/illustration/addtocart.png';
import laptop from '../assets/illustration/laptop.png';
import lightwave from '../assets/illustration/lightwave.png';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

import { CardBox, SubmitButton, YellowDiv } from '../theme';
import {
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';

function About() {
  const theme = useTheme();
  const navigate = useNavigate();

  const gridStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container my={16}>
          <Grid item xs={6} sx={gridStyle} alignItems="center">
            <img src={addtocart} alt="Fixie Illustration" width="400px" />
          </Grid>
          <Grid item xs={6} sx={gridStyle} position="relative">
            <YellowDiv />
            <Typography variant="h1">
              We bring Fixies closer to you !
            </Typography>
            <Typography variant="h6" mt={4}>
              Fixically centralizes many of the laptop repair and service vendor{' '}
              <br />
              all over Malaysia for you to choose from.
            </Typography>
            <Box
              position="absolute"
              right="-840px"
              top="100px"
              maxWidth={`calc(100vw - ${840}px)`}
              sx={{ overflow: 'hidden' }}
            >
              <img src={lightwave} alt="Laptop Illustration" />
            </Box>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="h1" textAlign="center" my={16}>
          Fixically Features
        </Typography>
        <Grid container my={16}>
          <Grid
            item
            xs={6}
            sx={gridStyle}
            alignItems="center"
            position="relative"
          >
            <CardBox width="400px" sx={{ gap: '16px', padding: '32px 72px' }}>
              <Box display="flex" justifyContent="center" mb={2}>
                <img src={laptop} alt="Laptop Illustration" width="120px" />
              </Box>
              <hr />
              <Typography variant="h5">Laptop Brand</Typography>
              <TextField
                type="email"
                value="Asus Rog Strix Hero II"
                size="small"
                disabled
              />
              <Typography variant="h5">Laptop Model</Typography>
              <TextField type="email" value="GL-504GV" size="small" disabled />
              <Typography variant="h5">Describe the problem</Typography>
              <TextField
                type="email"
                value="My computer frequently goes bluescreen"
                size="small"
                multiline
                rows={3}
                disabled
              />
              <hr
                style={{
                  margin: 0,
                  padding: 0,
                  border: 0,
                  borderTop: `1px solid ${theme.palette.grey[300]}`,
                  width: '100%',
                }}
              />
              <SubmitButton
                variant="contained"
                type="submit"
                endIcon={<RightIcon />}
              >
                Request Quote
              </SubmitButton>
            </CardBox>
          </Grid>
          <Grid item xs={6} sx={gridStyle} pr={8}>
            <Typography variant="h1">Quotation Request</Typography>
            <CardBox mt={4}>
              <Typography variant="h6" textAlign="justify">
                You can request for a price quotation for problems that you are
                facing with your laptop, directly to your preferred Fixie.
              </Typography>
            </CardBox>
          </Grid>
        </Grid>
        <Grid container my={24}>
          <Grid item xs={6} sx={gridStyle} pl={8}>
            <Typography variant="h1">Order Services</Typography>
            <CardBox mt={4}>
              <Typography variant="h6" textAlign="justify">
                Mix and match from different services offered by Fixies to
                upgrade your laptop. Get the most out of your portable
                workspace.
              </Typography>
            </CardBox>
          </Grid>
          <Grid
            item
            xs={6}
            sx={gridStyle}
            alignItems="center"
            position="relative"
          >
            <CardBox width="400px" sx={{ gap: '16px', padding: '32px 48px' }}>
              <Grid container>
                <Grid item xs={8} spacing={32}>
                  <Typography variant="h2">32 GB RAM</Typography>
                  <Typography variant="h6">Patriot Signature Line</Typography>
                </Grid>
                <Grid item xs={4} sx={gridStyle} alignItems="end">
                  <Typography variant="h3">RM 420</Typography>
                </Grid>
              </Grid>
              <hr
                style={{
                  margin: '0 -48px',
                  padding: 0,
                  borderTop: `1px solid #E0E0E0`,
                }}
              />
              <Grid container>
                <Grid item xs={8} spacing={32}>
                  <Typography variant="h2">512 GB SSD</Typography>
                  <Typography variant="h6">Seagate One Touch</Typography>
                </Grid>
                <Grid item xs={4} sx={gridStyle} alignItems="end">
                  <Typography variant="h3">RM 360</Typography>
                </Grid>
              </Grid>
              <hr
                style={{
                  margin: '0 -48px',
                  padding: 0,
                  borderTop: `1px solid #E0E0E0`,
                }}
              />
              <Typography variant="h1" textAlign="center">
                Total
              </Typography>
              <Typography variant="h3" textAlign="center">
                RM 780.00
              </Typography>
              <SubmitButton variant="contained" endIcon={<RightIcon />}>
                Checkout
              </SubmitButton>
            </CardBox>
          </Grid>
        </Grid>
        <hr />
        <Grid container my={16}>
          <Grid item xs={12} sx={gridStyle} alignItems="center">
            <CardBox sx={{ gap: '16px', padding: '32px 72px' }}>
              <Typography textAlign="center" variant="h2" mb={1}>
                Discover more features by having
                <br /> your own Fixically Membership
              </Typography>
              <SubmitButton
                variant="contained"
                type="submit"
                onClick={() => navigate('/register/member')}
                endIcon={<RightIcon />}
              >
                Register Now
              </SubmitButton>
            </CardBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default About;
