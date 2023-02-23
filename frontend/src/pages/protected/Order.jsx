import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';
import OrderForm from '../../components/OrderForm';
import OrderItem from '../../components/OrderItem';

import { getOrder, reset } from '../../features/order/orderSlice';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import { Card, CardContent, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { DataGrid } from '@mui/x-data-grid';
import { YellowDiv } from '../../components/YellowDiv';

function Order() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getOrder());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  const columns = [
    { field: '_id', headerName: 'Order', width: 150 },
    { field: 'item.brand', headerName: 'Service', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'createdAt', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  // Custom Styling
  const TableCard = styled(Card)({
    display: 'flex',
    padding: '20px 40px',
    boxShadow:
      '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
    borderRadius: '20px',
    gap: '32px',
    alignItems: 'stretch',
  });

  return (
    <>
      <UserNavbar />
      <Grid container spacing={6}>
        <Sidebar />
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 6 }}
          >
            Orders
          </Typography>
          <YellowDiv />

          <TableCard>
            <CardContent sx={{ height: 700, width: '100%' }}>
              <DataGrid
                getRowId={(order) => order._id}
                rows={order}
                columns={columns}
                sx={{
                  boxShadow: 2,
                  '& .MuiDataGrid-cell:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
              {/* {order.length > 0 ? (
                <div className="goals">
                  {order.map((order) => (
                    <OrderItem key={order._id} order={order} />
                  ))}
                </div>
              ) : (
                <h3>No order found</h3>
              )} */}
            </CardContent>
          </TableCard>
        </Grid>
      </Grid>
    </>
  );
}

export default Order;
