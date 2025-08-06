import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  findQuotation,
  updateQuotation,
  reset,
} from '../../features/quotation/quotationSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import {
  YellowDiv,
  CardBox,
  IconStack,
  SubmitButton,
  SmallTextField,
} from '../../theme';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';

function ViewQuotation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { quotation_id } = useParams();

  const [confirmation, setConfirmation] = useState({
    updateStatus: false,
    status_value: '',
  });

  const { user } = useSelector((state) => state.auth);
  const { quotation, isLoading, isError, message } = useSelector(
    (state) => state.quotation
  );

  const [formData, setFormData] = useState({
    _id: '',
    member_id: '',
    status: '',
    brand: '',
    model: '',
    problem: '',
    description: '',
    feedback: '',
    price: '',
  });

  const {
    _id,
    member_id,
    status,
    brand,
    model,
    problem,
    description,
    feedback,
    price,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(findQuotation(quotation_id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (quotation_id && quotation) {
      setFormData((prevState) => ({
        ...prevState,
        _id: quotation._id,
        member_id: quotation.member_id,
        status: quotation.status,
        brand: quotation.brand,
        model: quotation.model,
        problem: quotation.problem,
        description: quotation.description,
        feedback: quotation.feedback,
      }));
    }
  }, [quotation]);

  // Custom Styling
  const StyledGrid = styled(Grid)({
    display: 'flex',
    minHeight: '48px',
    alignItems: 'center',
  });

  const saveStatus = (e) => {
    e.preventDefault();

    let updateData = {
      id: quotation_id,
      status: confirmation.status_value,
    };

    dispatch(updateQuotation(updateData));
    toast.success('Quotation status successfully updated');
    dispatch(findQuotation(quotation_id));
  };

  return (
    <>
      <UserNavbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} px={4}>
          <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
            Quotation
          </Typography>
          <Typography variant="h4">#{quotation_id}</Typography>
          <YellowDiv />
          <CardBox sx={{ gap: '0px' }}>
            <Grid container columnSpacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  bquotationRight: '1px solid #bdbdbd',
                }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h2">Customer Details</Typography>
                    <IconStack>
                      <InfoIcon
                        sx={{
                          fontSize: 16,
                          mr: 1,
                          color: theme.palette.secondary.main,
                        }}
                      />
                      <Typography variant="h6">
                        This is to identify your customer
                      </Typography>
                    </IconStack>
                    <Grid container mt={2}>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Name</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">
                          {quotation.member_name}
                        </Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Phone</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">
                          {quotation.member_phone}
                        </Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Laptop Brand</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">{quotation.brand}</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Laptop Problem</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">
                          {quotation.problem}
                        </Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Description</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">
                          {quotation.description}
                        </Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Feedback</Typography>
                      </StyledGrid>
                      <Grid item xs={8}>
                        {quotation.feedback || user.role != 'Fixie' ? (
                          <>
                            <StyledGrid item xs={4}>
                              <Typography variant="h5">
                                {quotation.feedback
                                  ? quotation.feedback
                                  : '- No feedback yet'}
                              </Typography>
                            </StyledGrid>
                          </>
                        ) : (
                          <SmallTextField
                            type="text"
                            name="feedback"
                            value={feedback}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        )}
                      </Grid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Offer Price</Typography>
                      </StyledGrid>
                      <Grid item xs={8}>
                        {quotation.price || user.role != 'Fixie' ? (
                          <>
                            <StyledGrid item xs={4}>
                              <Typography variant="h5">
                                {quotation.price
                                  ? quotation.price
                                  : '- No feedback yet'}
                              </Typography>
                            </StyledGrid>
                          </>
                        ) : (
                          <SmallTextField
                            type="number"
                            name="price"
                            value={price}
                            onChange={onChange}
                            size="small"
                            fullWidth
                          />
                        )}
                      </Grid>
                    </Grid>
                    {!quotation.feedback && user.role == 'Fixie' ? (
                      <>
                        <Stack direction="row" justifyContent="end">
                          <SubmitButton
                            variant="contained"
                            sx={{ mt: 4 }}
                            onClick={() => {
                              dispatch(updateQuotation(formData));
                              toast.success('Quotation updated');
                              navigate('/quotations');
                            }}
                          >
                            Send Quote
                          </SubmitButton>
                        </Stack>
                      </>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2">Quotation Status</Typography>
                <IconStack>
                  <InfoIcon
                    sx={{
                      fontSize: 16,
                      mr: 1,
                      color: theme.palette.secondary.main,
                    }}
                  />
                  <Typography variant="h6">
                    Customer will be notified via email for any status update
                  </Typography>
                </IconStack>
                <Timeline
                  sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                      flex: 0.2,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}>
                        {true}
                      </Typography>
                      <Typography variant="h4">{true}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor: true
                            ? theme.palette.primary.main
                            : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Quotation Created</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Quotation has been created
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}>
                        {true}
                      </Typography>
                      <Typography variant="h4">{true}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor:
                            status == 'OFFERED' ||
                            status == 'ACCEPTED' ||
                            status == 'CANCELED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Offer Price</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Fixie offers price range for the service
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography variant="h4" mb={1}>
                        {true}
                      </Typography>
                      <Typography variant="h4">{true}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          backgroundColor:
                            status == 'IN PROGRESS' ||
                            status == 'READY FOR PICKUP' ||
                            status == 'COMPLETED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">
                        Customer Accept/Reject
                      </Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Customer will chose to accept or reject the offer
                        </Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
                {/* {status !== 'COMPLETED' && user.role == 'Fixie' ? (
                  <>
                    <Grid container justifyContent="flex-end">
                      <SubmitButton
                        variant="contained"
                        sx={{ mt: 4 }}
                        onClick={() => {
                          setConfirmation((prevState) => ({
                            ...prevState,
                            updateStatus: true,
                            status_value:
                              status === 'CREATED'
                                ? 'RECEIVED'
                                : status === 'RECEIVED'
                                ? 'IN PROGRESS'
                                : status === 'IN PROGRESS'
                                ? 'READY FOR PICKUP'
                                : status === 'READY FOR PICKUP'
                                ? 'COMPLETED'
                                : 'CREATED',
                          }));
                        }}
                      >
                        Update Quotation Status
                      </SubmitButton>

                      <Dialog
                        open={confirmation.updateStatus}
                        onClose={() =>
                          setConfirmation((prevState) => ({
                            ...prevState,
                            updateStatus: false,
                          }))
                        }
                      >
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure to update quotation status to{' '}
                            {confirmation.status_value} ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              setConfirmation((prevState) => ({
                                ...prevState,
                                updateStatus: false,
                              }));
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={(e) => {
                              saveStatus(e);
                              setConfirmation((prevState) => ({
                                ...prevState,
                                updateStatus: false,
                              }));
                              setFormData((prevState) => ({
                                ...prevState,
                                status: confirmation.status_value.toUpperCase(),
                              }));
                            }}
                          >
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                ) : (
                  ''
                )} */}
              </Grid>
            </Grid>
          </CardBox>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewQuotation;
