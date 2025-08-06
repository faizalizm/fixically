import React, { useEffect, useState, forwardRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchFixie, reset } from '../features/fixie/fixieSlice';
import { createOrder } from '../features/order/orderSlice';
import { findReview } from '../features/review/reviewSlice';
import { searchService } from '../features/service/serviceSlice';
import { createQuotation } from '../features/quotation/quotationSlice';

import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

import laptop from '../assets/illustration/laptop.png';

import {
  CardBox,
  IconStack,
  SmallTextField,
  SubmitButton,
  YellowDiv,
} from '../theme';
import RightIcon from '@mui/icons-material/ChevronRightOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

function FixieProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { fixie_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { review } = useSelector((state) => state.review);
  const { fixie, isLoading, isError, message } = useSelector(
    (state) => state.fixie
  );
  const { service } = useSelector((state) => state.service);

  const [quotation, setQuotation] = useState({});
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState({});
  const [confirmation, setConfirmation] = useState({
    login: user ? true : false,
    promptLogin: false,
    quotation: false,
    order: false,
  });

  const handleIncrement = (service) => {
    setCart((prevCart) => ({
      ...prevCart,
      [service._id]: {
        count: (prevCart[service._id]?.count || 0) + 1,
        name: prevCart[service._id]?.name || service.name,
        price: prevCart[service._id]?.price || service.price,
      },
    }));

    setTotal((prevTotal) => prevTotal + service.price);
  };

  const handleDecrement = (service) => {
    if (cart[service._id] && cart[service._id]?.count > 0) {
      setCart((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [service._id]: {
            count: (prevCart[service._id]?.count || 0) - 1,
            name: prevCart[service._id]?.name || service.name,
            price: prevCart[service._id]?.price || service.price,
          },
        };

        // Delete properties if count becomes 0 or less
        if (updatedCart[service._id].count <= 0) {
          delete updatedCart[service._id];
        }

        return updatedCart;
      });

      setTotal((prevTotal) => prevTotal - service.price);
    }
  };

  const handleChange = (e) => {
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(cart);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(searchFixie(fixie_id));
    dispatch(searchService(fixie_id));
    dispatch(findReview(fixie_id));
    return () => {
      dispatch(reset());
    };
  }, [fixie_id, isError, message, dispatch]);

  const submitQuotation = (e) => {
    let quoteRequest = quotation;
    quoteRequest.fixie_id = fixie_id;
    quoteRequest.member_id = user._id;

    console.log(quotation);
    dispatch(createQuotation(quotation));
    navigate('/quotations');
  };

  const submitOrder = (e) => {
    e.preventDefault();

    let item = Object.keys(cart).map((key) => {
      return {
        service_id: key,
        quantity: cart[key].count,
        price: cart[key].price,
      };
    });

    let orderRequest = {
      item: item,
      fixie_id: fixie_id,
      total: total,
    };

    console.log(orderRequest);
    dispatch(createOrder(orderRequest));
    navigate('/orders');
  };

  // Custom Styling
  const gridStyle = {
    p: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

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
        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Typography variant="h1">Reviews</Typography>
          <SubmitButton
            variant="contained"
            component={Link}
            to={'/fixie/reviews/' + fixie_id}
            sx={{ width: '160px' }}
          >
            Read More
          </SubmitButton>
        </Stack>
        <YellowDiv />
        <Grid container direction="row" spacing={4} mb={4}>
          {review?.length > 0 ? (
            <>
              {review.map((review) => (
                <Grid item xs={4} key={review._id}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h2">{review.member.name}</Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" alignItems="center">
                        {/* <Typography variant="p" mr={1} fontWeight="bold">
                          {review.star.toFixed(1)}
                        </Typography> */}
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
                </Grid>
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
        <Divider />
        <Grid container spacing={8}>
          <Grid item xs={8}>
            <Stack direction="row" alignItems="center" my={4}>
              {service[1]?.length > 0 ? (
                <>
                  {service[1].map((service) => (
                    <CardBox sx={{ padding: '10px 56px', mr: 4 }} key={service}>
                      <Typography variant="p">{service}</Typography>
                    </CardBox>
                  ))}
                </>
              ) : (
                <>
                  <Stack direction="column">
                    <Typography variant="h1">Services</Typography>
                    <YellowDiv />
                    <CardBox sx={{ gap: '16px' }}>
                      <Typography variant="h4" textAlign="center">
                        No service offered yet
                      </Typography>
                    </CardBox>
                  </Stack>
                </>
              )}
            </Stack>
            {service[1]?.map((category) => (
              <>
                <Box key={category}>
                  <Typography variant="h1">{category}</Typography>
                  <YellowDiv />

                  {service[0]?.length > 0 ? (
                    <>
                      {service[0]?.map(
                        (service) =>
                          service.category == category && (
                            <CardBox
                              key={service._id}
                              my={4}
                              sx={{ gap: '16px' }}
                            >
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Stack>
                                  <Typography variant="h3" mb={2}>
                                    {service.name}
                                  </Typography>
                                  <Typography variant="p">
                                    • {service.desc_1}
                                  </Typography>
                                  <Typography variant="p">
                                    • {service.desc_2}
                                  </Typography>
                                  <Typography variant="p">
                                    • {service.desc_3}
                                  </Typography>
                                </Stack>
                                <Stack
                                  display="flex"
                                  direction="column"
                                  alignItems="center"
                                >
                                  <Typography variant="h3">
                                    RM {service.price.toFixed(2)}
                                  </Typography>
                                  <ButtonGroup
                                    aria-label="outlined primary button group"
                                    sx={{ mt: 2 }}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => handleDecrement(service)}
                                    >
                                      -
                                    </Button>
                                    <Button
                                      disabled={cart[service._id]?.count === 0}
                                      sx={{ minWidth: '32px' }}
                                    >
                                      {cart[service._id]?.count.toString() ??
                                        '0'}
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleIncrement(service)}
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
                                </Stack>
                              </Stack>
                            </CardBox>
                          )
                      )}
                    </>
                  ) : (
                    <h3>No service found</h3>
                  )}
                </Box>
              </>
            ))}
          </Grid>
          <Grid item xs={4}>
            {/* Cart */}
            <Typography variant="h1" mt={4}>
              Cart
            </Typography>
            <YellowDiv />
            <CardBox sx={{ gap: '16px' }}>
              {Object.entries(cart).map(([serviceId, cartItem]) => (
                <>
                  <Grid container>
                    <Grid item xs={8} key={serviceId} sx={{ p: 0 }}>
                      <Typography variant="h5" textAlign="justify">
                        {cartItem.name}
                      </Typography>
                      <Typography variant="h6">
                        x {cartItem.count} pieces
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={gridStyle} alignItems="end">
                      <Typography variant="h5">
                        RM {(cartItem.price * cartItem.count).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <hr
                    style={{
                      margin: '0 -48px',
                      padding: 0,
                      borderTop: `1px solid #E0E0E0`,
                    }}
                  />
                </>
              ))}
              {Object.keys(cart).length < 1 ? (
                <>
                  <Typography variant="h3" textAlign="center">
                    Your cart is empty
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h1" textAlign="center">
                    Total {}
                  </Typography>
                  <Typography variant="h3" textAlign="center">
                    RM {total.toFixed(2)}
                  </Typography>
                  <SubmitButton
                    variant="contained"
                    endIcon={<RightIcon />}
                    onClick={(e) => {
                      if (confirmation.login) {
                        submitOrder(e);
                      } else {
                        setConfirmation((prevState) => ({
                          ...prevState,
                          promptLogin: true,
                        }));
                      }
                    }}
                  >
                    Checkout
                  </SubmitButton>
                </>
              )}
            </CardBox>

            {/* Request Quotation */}
            <Typography variant="h1" mt={8}>
              Request Quote
            </Typography>
            <YellowDiv />
            <form onSubmit={submitQuotation}>
              <CardBox sx={{ gap: '16px' }}>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img src={laptop} alt="Laptop Illustration" width="120px" />
                </Box>
                <hr
                  style={{
                    margin: '0 -48px',
                    padding: 0,
                    borderTop: `1px solid #E0E0E0`,
                  }}
                />
                <Typography variant="h5">Laptop Brand</Typography>
                <SmallTextField
                  type="text"
                  name="brand"
                  value={quotation.brand || ''}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
                <Typography variant="h5" mt={0}>
                  Laptop Model
                </Typography>
                <SmallTextField
                  type="text"
                  name="model"
                  value={quotation.model || ''}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
                <Typography variant="h5" mt={0}>
                  Laptop Problem
                </Typography>
                <SmallTextField
                  type="text"
                  name="problem"
                  value={quotation.problem || ''}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
                <Typography variant="h5" mt={0}>
                  Describe the problem
                </Typography>
                <SmallTextField
                  type="text"
                  name="description"
                  value={quotation.description || ''}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
                <hr
                  style={{
                    margin: '0 -48px',
                    padding: 0,
                    borderTop: `1px solid #E0E0E0`,
                  }}
                />
                <SubmitButton
                  variant="contained"
                  endIcon={<RightIcon />}
                  sx={{ mt: 1 }}
                  onClick={() => {
                    if (confirmation.login) {
                      setConfirmation((prevState) => ({
                        ...prevState,
                        quotation: true,
                      }));
                    } else {
                      setConfirmation((prevState) => ({
                        ...prevState,
                        promptLogin: true,
                      }));
                    }
                  }}
                >
                  Request Quote
                </SubmitButton>
                <Dialog
                  open={confirmation.quotation}
                  onClose={() =>
                    setConfirmation((prevState) => ({
                      ...prevState,
                      quotation: false,
                    }))
                  }
                >
                  <DialogTitle>Confirm your laptop details</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      • {quotation.brand} <br />• {quotation.model}
                      <br />• {quotation.problem}
                      <br />• {quotation.description}
                      <br />• {quotation.brand}
                      <br />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setConfirmation((prevState) => ({
                          ...prevState,
                          quotation: false,
                        }));
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        submitQuotation(e);
                        setConfirmation((prevState) => ({
                          ...prevState,
                          quotation: false,
                        }));
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
                <IconStack alignSelf="center">
                  <InfoIcon
                    sx={{
                      fontSize: 16,
                      mr: 1,
                      color: theme.palette.secondary.main,
                    }}
                  />
                  <Typography variant="h6" color={theme.palette.secondary.main}>
                    Fixie will respond to your request
                  </Typography>
                </IconStack>
              </CardBox>
            </form>
          </Grid>
        </Grid>
        <Dialog
          open={confirmation.promptLogin}
          onClose={() =>
            setConfirmation((prevState) => ({
              ...prevState,
              promptLogin: false,
            }))
          }
        >
          <DialogTitle>Login or Register</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You must sign in or sign up as a Member to proceed
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                navigate('/register/member');
                setConfirmation((prevState) => ({
                  ...prevState,
                  promptLogin: false,
                }));
              }}
            >
              Register
            </Button>
            <Button
              onClick={(e) => {
                navigate('/login');
                setConfirmation((prevState) => ({
                  ...prevState,
                  promptLogin: false,
                }));
              }}
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}

export default FixieProfile;
