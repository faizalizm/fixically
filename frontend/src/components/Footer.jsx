import React from 'react';

import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        my: 8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container>
        <Grid container px={20} py={6}>
          <Grid item xs={8}>
            <Typography variant="h1">Fixically</Typography>
            <Typography variant="h6">Solution for your laptop needs</Typography>
            <Stack mt={4} direction="row" spacing={4}>
              <Box>
                <Typography variant="h2">Member</Typography>
                <Typography variant="p">Become a member</Typography>
              </Box>
              <Box>
                <Typography variant="h2">Fixie</Typography>
                <Typography variant="p">Become a Fixie</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h2">Support Service</Typography>
                <Typography variant="p">admin@fixically.com</Typography>
              </Box>
              <Box>
                <Typography variant="h2">Contact Hotline</Typography>
                <Typography variant="p">+60 16 589 5625</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Divider />
            <Stack direction="row" justifyContent="center" spacing={4} mt={4}>
              <img
                src={require('../assets/icon/linkedin.webp')}
                alt="LinkedIn Icon"
              />
              <img
                src={require('../assets/icon/twitter.webp')}
                alt="Twitter Icon"
              />
              <img
                src={require('../assets/icon/instagram.webp')}
                alt="Instagram Icon"
              />
              <img
                src={require('../assets/icon/youtube.webp')}
                alt="Youtube Icon"
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
