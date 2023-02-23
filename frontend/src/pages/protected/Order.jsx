import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';
import OrderForm from '../../components/OrderForm';
import OrderItem from '../../components/OrderItem';

import { getOrder, reset } from '../../features/order/orderSlice';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import {
  Box,
  Card,
  CardContent,
  Container,
  styled,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { DataGrid } from '@mui/x-data-grid';

import { YellowDiv } from '../../components/YellowDiv';
import { StatusChip } from '../../components/StatusChip';

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

  const columns = [
    {
      field: '_id',
      headerName: 'Order',
      minWidth: 100,
      flex: 1,
      headerClassName: 'firstCol',
    },
    {
      field: 'item',
      headerName: 'Service',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <ul className="flex">
          {params.value.map((item, index) => (
            <li key={index}>{item.brand}</li>
          ))}
        </ul>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      type: 'dateTime',
      minWidth: 250,
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => {
        return <StatusChip label={params.row.status} />;
      },
      headerClassName: 'lastCol',
    },
  ];

  // Custom Styling
  const TableCard = styled(Card)({
    padding: '20px 40px',
    boxShadow:
      '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
    borderRadius: '20px',
  });

  return (
    <>
      <UserNavbar />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: 'flex', gap: '20px' }}
      >
        <Box sx={{ height: '100%', width: '350px' }}>
          <Sidebar />
        </Box>
        <Box width="100%">
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 6 }}
          >
            Orders
          </Typography>
          <YellowDiv />

          <TableCard>
            <Typography
              variant="h3"
              color={theme.palette.black.main}
              sx={{ mt: 6 }}
            ></Typography>
            <CardContent sx={{ height: 700, width: '100%' }}>
              <Box
                sx={{
                  height: 700,
                  width: '100%',
                  '& .firstCol': {
                    borderRadius: '20px 0 20px 0',
                  },
                  '& .lastCol': {
                    borderRadius: '0 20px 20px 0',
                  },
                }}
              >
                <DataGrid
                  getRowId={(order) => order._id}
                  getRowHeight={() => 'auto'}
                  rows={order}
                  columns={columns}
                  sx={{
                    '&.MuiDataGrid-root': {
                      border: 'none',
                      boxShadow: 'none',
                    },
                    '.MuiDataGrid-columnHeader': {
                      backgroundColor: theme.palette.white.tableHeader,
                    },
                    '.MuiDataGrid-columnHeaderTitle': {
                      backgroundColor: theme.palette.white.tableHeader,
                      fontWeight: '800',
                      textTransform: 'uppercase',
                    },
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                      py: '22px',
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
              </Box>
            </CardContent>
          </TableCard>
        </Box>
      </Container>
    </>
  );
}

export default Order;
