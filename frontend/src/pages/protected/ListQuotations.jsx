import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';

import { getQuotation, reset } from '../../features/quotation/quotationSlice';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid } from '@mui/x-data-grid';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';

import { YellowDiv, StatusChip, SubmitButton, CardBox } from '../../theme';

function ListQuotations() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { quotation, isLoading, isError, message } = useSelector(
    (state) => state.quotation
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate('/login');
    else if (user.role === 'Admin') navigate('/dashboard');

    dispatch(getQuotation());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      field: 'problem',
      headerName: 'Problem',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
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
            to={'/quotations/' + params.row._id}
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

  // Custom Styling
  const StyledButton = styled(Button)({
    width: '100%',
    color: theme.palette.white.main,
  });

  return (
    <>
      <UserNavbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} px={4}>
          <Typography variant="h1" sx={{ mt: 4 }}>
            Quotation Requests
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
              <CardBox sx={{ gap: '8px' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Typography variant="h3">
                    {quotation.length} Quote Request
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    height: '65vh',
                    '& .firstCol': {
                      borderRadius: '20px 0 0 20px ',
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
                    getRowId={(quotation) => quotation._id}
                    getRowHeight={() => 'auto'}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    rows={quotation}
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

export default ListQuotations;
