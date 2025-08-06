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

function ListServices() {
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

    if (!user || user.role != 'Fixie') navigate('/login');
    else if (user.role === 'Admin') navigate('/dashboard');

    dispatch(getService());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
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
      field: 'View',
      headerName: '',
      renderCell: (params) => {
        return (
          <SubmitButton
            variant="contained"
            onClick={() => navigate('/services/' + params.row._id)}
            endIcon={<NavigateNextOutlined />}
            fullWidth
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
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} px={4}>
          <Typography variant="h1" sx={{ mt: 4 }}>
            Services
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
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
                    getRowId={(service) => service._id}
                    getRowHeight={() => 'auto'}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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

export default ListServices;
