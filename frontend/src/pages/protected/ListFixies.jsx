import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { allFixie, reset } from '../../features/fixie/fixieSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid } from '@mui/x-data-grid';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';

import { YellowDiv, StatusChip, CardBox, SubmitButton } from '../../theme';

function ListFixies() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { fixie, isLoading, isError, message } = useSelector(
    (state) => state.fixie
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate('/login');
    else if (user.role === 'Fixie') navigate('/dashboard');

    dispatch(allFixie());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
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

  return (
    <>
      <UserNavbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} px={4}>
          <Typography variant="h1" sx={{ mt: 4 }}>
            Fixies
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Typography variant="h3">{fixie.length} Fixie</Typography>
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
                    getRowId={(fixie) => fixie._id}
                    getRowHeight={() => 'auto'}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rows={fixie}
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

export default ListFixies;
