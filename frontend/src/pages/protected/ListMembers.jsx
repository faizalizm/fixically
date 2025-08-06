import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { allMember, reset } from '../../features/member/memberSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid } from '@mui/x-data-grid';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';

import { YellowDiv, StatusChip, CardBox, SubmitButton } from '../../theme';

function ListMembers() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { member, isLoading, isError, message } = useSelector(
    (state) => state.member
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate('/login');
    else if (user.role === 'Fixie') navigate('/dashboard');

    dispatch(allMember());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      field: '_id',
      headerName: 'Member ID',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      headerName: 'Member',
      renderCell: (params) => {
        return (
          <>
            {params.row.name}
            <br />
            {params.row.mail}
          </>
        );
      },
      flex: 1,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
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
            to={'/members/' + params.row._id}
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
            Members
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Typography variant="h3">{member.length} Member</Typography>
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
                    getRowId={(member) => member._id}
                    getRowHeight={() => 'auto'}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rows={member}
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

export default ListMembers;
