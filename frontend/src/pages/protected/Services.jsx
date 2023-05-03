import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getService, reset } from '../../features/service/serviceSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { YellowDiv, CardBox, SubmitButton } from '../../theme';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import { useTheme } from '@mui/system';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid } from '@mui/x-data-grid';

function Services() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { service, isLoading, isError, message } = useSelector(
    (state) => state.service
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getService());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      field: '_id',
      headerName: 'Service',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'speed',
      headerName: 'Speed',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
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
      field: 'View',
      headerName: '',
      renderCell: (params) => {
        return (
          <SubmitButton
            variant="contained"
            onClick={() => navigate('/services/' + params.row._id)}
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
            sx={{ mt: 6 }}
          >
            Service
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h3">
                    {service.length} Services
                  </Typography>
                  <Stack>
                    <SubmitButton
                      variant="contained"
                      onClick={() => navigate('/services/create')}
                      endIcon={<AddIcon />}
                    >
                      Create New Service
                    </SubmitButton>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    height: 700,
                    '& .firstCol': {
                      borderRadius: '20px 0 20px 0',
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
                    getRowId={(service) => service._id}
                    getRowHeight={() => 'auto'}
                    rowsPerPageOptions={[5, 10, 20]}
                    rows={service}
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

export default Services;
