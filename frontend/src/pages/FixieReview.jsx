import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { searchFixie } from '../features/fixie/fixieSlice';
import { findReview, reset } from '../features/review/reviewSlice';

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

function FixieReview() {
  const dispatch = useDispatch();
  const { fixie_id } = useParams();
  const { review, isLoading, isError, message } = useSelector(
    (state) => state.review
  );
  const { fixie } = useSelector((state) => state.fixie);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(searchFixie(fixie_id));
    dispatch(findReview(fixie_id));
    return () => {
      dispatch(reset());
    };
  }, [fixie_id, isError, message, dispatch]);

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
                  <Typography variant="h2">{fixie.name}</Typography>
                  <Typography variant="p">{fixie.description}</Typography>
                </Grid>
                <Grid item container xs={3} justifyContent="flex-end">
                  {fixie.average_rating?.toFixed(1) || 0}
                  <Stack alignItems="center" ml={2}>
                    <Rating
                      name="read-only"
                      value={fixie.average_rating || 0}
                      readOnly
                    />
                    <Typography variant="p">
                      ({fixie.review_count} reviews)
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
                <Grid item container xs={8} justifyContent="flex-end">
                  <Typography variant="p">
                    {`${fixie.city}, ${fixie.state}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardBox>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="h1" mt={4}>
          Reviews
        </Typography>
        <YellowDiv />
        <Grid container direction="row" spacing={4} mb={4}>
          <Grid item xs={8}>
            {review.length > 0 ? (
              <>
                {review.map((review) => (
                  <CardBox sx={{ gap: '16px' }} mb={3} key={review._id}>
                    <Typography variant="h4">{review.member.name}</Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" alignItems="center">
                        <Typography variant="p" mr={1} fontWeight="bold">
                          {review.star.toFixed(1)}
                        </Typography>
                        <Rating name="read-only" value={review.star} readOnly />
                      </Stack>
                      <Typography variant="p">
                        {new Date(review.createdAt).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Typography>
                    </Stack>
                    <Typography variant="p" align="justify">
                      “{review.text}”
                    </Typography>
                  </CardBox>
                ))}
              </>
            ) : (
              <Grid item xs={12}>
                <CardBox sx={{ gap: '16px' }}>
                  <Typography variant="h4" textAlign="center">
                    No reviews yet
                  </Typography>
                </CardBox>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FixieReview;
