import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { findOrder, updateOrder, reset } from '../../features/order/orderSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { YellowDiv, CardBox, IconStack, SubmitButton } from '../../theme';
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

function ViewOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { order_id } = useParams();

  const [confirmation, setConfirmation] = useState({
    updateStatus: false,
    status_value: '',
  });

  const { user } = useSelector((state) => state.auth);
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  const [formData, setFormData] = useState({
    _id: '',
    member_id: '',
    status: '',
    total: '',
    item: '',
    member_name: '',
    member_phone: '',
    member_mail: '',
  });

  const {
    _id,
    member_id,
    status,
    total,
    item,
    member_name,
    member_phone,
    member_mail,
  } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(findOrder(order_id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (order_id && order) {
      setFormData((prevState) => ({
        ...prevState,
        _id: order._id,
        member_id: order.member_id,
        status: order.status,
        total: order.total,
        item: order.item,
        member_name: order.member_name,
        member_phone: order.member_phone,
        member_mail: order.member_mail,
      }));
    }
  }, [order]);

  // Custom Styling
  const StyledGrid = styled(Grid)({
    display: 'flex',
    minHeight: '48px',
    alignItems: 'center',
  });

  const columns = [
    {
      field: '_id',
      headerName: 'Service ID',
      headerClassName: 'firstCol',
      flex: 1,
      // renderCell: (params) => (
      //   <Typography variant="h4">{params.row.service_name}</Typography>
      // ),
    },
    // {
    //   field: 'item',
    //   headerName: 'Item',
    //   headerClassName: 'firstCol',
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Stack spacing={1}>
    //       {params.value.map((item) => (
    //         <Typography variant="h4" key={item._id}>
    //           {item.name}
    //         </Typography>
    //       ))}
    //     </Stack>
    //   ),
    // },
    {
      field: 'name',
      headerName: 'name',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      // renderCell: (params) => (
      //   <Typography variant="h3">2{/*params.quantity*/}</Typography>
      // ),
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      // renderCell: (params) => (
      //   <Typography variant="h4">RM {params.row.total}</Typography>
      // ),
    },
  ];

  const saveStatus = (e) => {
    e.preventDefault();

    let updateData = {
      id: order_id,
      status: confirmation.status_value,
    };

    dispatch(updateOrder(updateData));
    toast.success('Order status successfully updated');
    dispatch(findOrder(order_id));
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
            Order
          </Typography>
          <Typography variant="h4">#{order_id}</Typography>
          <YellowDiv />
          <CardBox sx={{ gap: '0px' }}>
            <Grid container columnSpacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  borderRight: '1px solid #bdbdbd',
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
                          {order.member_name}
                        </Typography>
                      </StyledGrid>
                      <StyledGrid item xs={4}>
                        <Typography variant="h5">Phone</Typography>
                      </StyledGrid>
                      <StyledGrid item xs={8}>
                        <Typography variant="h5">
                          {order.member_phone}
                        </Typography>
                      </StyledGrid>
                    </Grid>
                    {/* divider */}
                    <Grid item mt={4}>
                      <Typography variant="h2">Order Details</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          List of items to prepare
                        </Typography>
                      </IconStack>
                      <Box
                        mt={4}
                        mr={4}
                        sx={{
                          '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                          },
                        }}
                      >
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="p" fontWeight="bold">
                              Item
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="p" fontWeight="bold">
                              Quantity
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="p" fontWeight="bold">
                              Price
                            </Typography>
                          </Grid>
                        </Grid>
                        {order &&
                          order.item &&
                          order.item.map((item) => (
                            <Grid container key={item._id} sx={{ mt: 2 }}>
                              <Grid item xs={6}>
                                <Typography variant="p">{item.name}</Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="p">
                                  {item.quantity}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="p">
                                  RM {item.price.toFixed(2)}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2">Order Status</Typography>
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
                      <Typography variant="h4">Order Created</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Order has been created
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
                            order.status == 'RECEIVED' ||
                            order.status == 'IN PROGRESS' ||
                            order.status == 'READY FOR PICKUP' ||
                            order.status == 'COMPLETED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Laptop Received</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Laptop has been dropped off
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
                            order.status == 'IN PROGRESS' ||
                            order.status == 'READY FOR PICKUP' ||
                            order.status == 'COMPLETED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">In Progress</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Laptop is being serviced
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
                            order.status == 'READY FOR PICKUP' ||
                            order.status == 'COMPLETED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Ready for Pickup</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">
                          Laptop is ready to be collected
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
                            order.status == 'COMPLETED'
                              ? theme.palette.primary.main
                              : '',
                        }}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent mb={4}>
                      <Typography variant="h4">Completed</Typography>
                      <IconStack>
                        <InfoIcon
                          sx={{
                            fontSize: 16,
                            mr: 1,
                            color: theme.palette.secondary.main,
                          }}
                        />
                        <Typography variant="h6">Order is completed</Typography>
                      </IconStack>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
                {status !== 'COMPLETED' && user.role == 'Fixie' ? (
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
                        Update Order Status
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
                            Are you sure to update order status
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
                )}
              </Grid>
            </Grid>
          </CardBox>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewOrder;
