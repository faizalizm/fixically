import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getDashboard } from '../../features/auth/authSlice';
import { getOrder, reset } from '../../features/order/orderSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { allFixie } from '../../features/fixie/fixieSlice';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CardBox, StatusChip, SubmitButton, YellowDiv } from '../../theme';
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth);

  let userData;
  if (user.role === 'Admin') {
    userData = useSelector((state) => state.fixie);
  } else {
    userData = useSelector((state) => state.order);
  }

  const { fixie, order, isLoading, isError, message } = userData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else if (user.role == 'Fixie') {
      dispatch(getDashboard());
      dispatch(getOrder());
    } else if (user.role == 'Admin') {
      dispatch(getDashboard());
      dispatch(allFixie('pending'));
    } else if (user.role == 'Member') {
      navigate('/profile');
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  const fixieColumns = [
    {
      field: '_id',
      headerName: 'Fixie ID',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'ssm',
      headerName: 'SSM Number',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      headerName: 'Address',
      renderCell: (params) => {
        return (
          <>
            {params.row.city}, {params.row.state}
          </>
        );
      },
      flex: 1,
      sortable: false,
    },
    {
      field: 'View',
      headerName: '',
      renderCell: (params) => {
        return (
          <SubmitButton
            variant="contained"
            sx={{ width: '100%' }}
            component={Link}
            to={'/fixies/' + params.row._id}
            endIcon={<NavigateNextOutlined />}
          >
            View
          </SubmitButton>
        );
      },
      headerClassName: 'lastCol',
      flex: 1,
      sortable: false,
    },
  ];

  const orderColumns = [
    {
      field: '_id',
      headerName: 'Order',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'Items',
      headerName: 'Service',
      renderCell: (params) => {
        return (
          <>
            <ul className="flex">
              {params.row.item.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </>
        );
      },
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
          <SubmitButton
            variant="contained"
            component={Link}
            to={'/orders/' + params.row._id}
            endIcon={<NavigateNextOutlined />}
          >
            View
          </SubmitButton>
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
            {user.role === 'Fixie' ? (
              <>
                <Grid item xs={3}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h4">Monthly Orders</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                        {user.monthlyOrders}
                      </Typography>
                      <Typography variant="h5">orders</Typography>
                    </Stack>
                    <Typography variant="h6">
                      RM {user.monthlyGrandTotal?.toFixed(2)}
                    </Typography>
                  </CardBox>
                </Grid>
                <Grid item xs={3}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h4">Weekly Orders</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                        {user.weeklyOrders}
                      </Typography>
                      <Typography variant="h5">orders</Typography>
                    </Stack>
                    <Typography variant="h6">
                      RM {user.weeklyGrandTotal?.toFixed(2)}
                    </Typography>
                  </CardBox>
                </Grid>
                <Grid item xs={3}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h4">Daily Orders</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                        {user.dailyOrders}
                      </Typography>
                      <Typography variant="h5">orders</Typography>
                    </Stack>
                    <Typography variant="h6">
                      RM {user.dailyGrandTotal?.toFixed(2)}
                    </Typography>
                  </CardBox>
                </Grid>
              </>
            ) : user.role === 'Admin' ? (
              <>
                <Grid item xs={3}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h4">Registered Fixie</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                        {user.fixieCount}
                      </Typography>

                      <Typography
                        variant="h5"
                        color={theme.palette.fluctuate.increase}
                      >
                        + {user.fixieCountWeek} this week
                      </Typography>
                    </Stack>
                  </CardBox>
                </Grid>
                <Grid item xs={3}>
                  <CardBox sx={{ gap: '16px' }}>
                    <Typography variant="h4">Registered Member</Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h3" sx={{ fontSize: '2.5em' }}>
                        {user.memberCount}
                      </Typography>

                      <Typography
                        variant="h5"
                        color={theme.palette.fluctuate.increase}
                      >
                        + {user.memberCountWeek} this week
                      </Typography>
                    </Stack>
                  </CardBox>
                </Grid>
              </>
            ) : (
              ' '
            )}
          </Grid>

          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 4 }}
          >
            {user.role === 'Admin' ? 'Pending Approval' : 'Recent Orders'}
          </Typography>
          <YellowDiv />
          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Typography variant="h3">
                    {user.role === 'Admin'
                      ? fixie.length + ' Fixie'
                      : order.length + ' Orders'}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    height: '65vh',
                    '& .firstCol': {
                      borderRadius: '20px 0 0 20px',
                    },
                    '& .lastCol': {
                      borderRadius: '0 20px 20px 0',
                    },
                    '& .MuiDataGrid-cell:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  <DataGrid
                    getRowId={(order) => order._id}
                    getRowHeight={() => 'auto'}
                    rowsPerPageOptions={[5, 10, 20]}
                    rows={user.role === 'Admin' ? fixie : order}
                    columns={
                      user.role === 'Admin' ? fixieColumns : orderColumns
                    }
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
                      // '.MuiDataGrid-columnSeparator': {
                      //   display: 'none',
                      // },
                      '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        py: '22px',
                      },
                    }}
                  />
                </Box>
              </CardBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
