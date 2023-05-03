import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';
import OrderForm from '../../components/OrderForm';
import OrderItem from '../../components/OrderItem';

import { getOrder, reset } from '../../features/order/orderSlice';
import { Sidebar } from '../../components/Sidebar';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CardBox, YellowDiv } from '../../theme';
import { Stack, Typography, useTheme } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

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
    {
      field: '_id',
      headerName: 'Order',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'item',
      headerName: 'Service',
      renderCell: (params) => (
        <ul className="flex">
          {params.value.map((item, index) => (
            <li key={index}>{item.brand}</li>
          ))}
        </ul>
      ),
      flex: 1,
      sortable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return <StatusChip label={params.row.status} />;
      },
      flex: 1,
    },
    {
      field: 'View',
      headerName: '',
      renderCell: (params) => {
        return (
          <StyledButton
            variant="contained"
            component={Link}
            to={'/order/' + params.row._id}
            endIcon={<NavigateNextOutlined />}
          >
            View
          </StyledButton>
        );
      },
      headerClassName: 'lastCol',
      flex: 1,
      sortable: false,
    },
  ];

  return (
    <>
      <UserNavbar />
      <Grid container spacing={4}>
        <Grid item xs={2} height="100%">
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 4 }}
          >
            Dashboard
          </Typography>
          <YellowDiv />
          <Grid container>
            <Grid item xs={3}>
              <CardBox sx={{ gap: '16px' }}>
                <Typography variant="h4">Monthly Orders</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                    35
                  </Typography>

                  <Typography
                    variant="h5"
                    color={theme.palette.fluctuate.decrease}
                  >
                    -20.0%
                  </Typography>
                </Stack>
                <Typography variant="h6">RM 4036.00</Typography>
              </CardBox>
            </Grid>
            <Grid item xs={3}>
              <CardBox sx={{ gap: '16px' }}>
                <Typography variant="h4">Weekly Orders</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                    7
                  </Typography>

                  <Typography
                    variant="h5"
                    color={theme.palette.fluctuate.increase}
                  >
                    +40.0%
                  </Typography>
                </Stack>
                <Typography variant="h6">RM 1374.00</Typography>
              </CardBox>
            </Grid>
            <Grid item xs={3}>
              <CardBox sx={{ gap: '16px' }}>
                <Typography variant="h4">Daily Orders</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                    1
                  </Typography>

                  <Typography
                    variant="h5"
                    color={theme.palette.fluctuate.decrease}
                  >
                    -50.0%
                  </Typography>
                </Stack>
                <Typography variant="h6">RM 420.00</Typography>
              </CardBox>
            </Grid>
          </Grid>

          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 4 }}
          >
            Recent Orders
          </Typography>
          <YellowDiv />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
