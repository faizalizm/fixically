import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';

import { getReview, reset } from '../../features/review/reviewSlice';
import { Sidebar } from '../../components/Sidebar';

import { useTheme } from '@mui/system';
import {
  Box,
  Button,
  Card,
  CardContent,
  styled,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid } from '@mui/x-data-grid';

import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';

import { YellowDiv, StatusChip } from '../../theme';

function Reviews() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { review, isLoading, isError, message } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getReview());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const columns = [
    {
      field: '_id',
      headerName: 'Review',
      headerClassName: 'firstCol',
      flex: 1,
    },
    {
      field: 'member_id',
      headerName: 'Member',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'star',
      headerName: 'Star Rating',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'text',
      headerName: 'Review',
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

  // Custom Styling
  const TableCard = styled(Card)({
    padding: '20px 40px',
    boxShadow:
      '-1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
    borderRadius: '20px',
  });

  const StyledButton = styled(Button)({
    width: '100%',
    color: theme.palette.white.main,
  });

  return (
    <>
      <UserNavbar />
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant="h3"
            color={theme.palette.black.main}
            sx={{ mt: 6 }}
          >
            Reviews
          </Typography>
          <YellowDiv />

          <Grid container spacing={2}>
            <Grid xs={10}>
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
                      getRowId={(review) => review._id}
                      getRowHeight={() => 'auto'}
                      rowsPerPageOptions={[5, 10, 20]}
                      rows={review}
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
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell':
                          {
                            py: '22px',
                          },
                      }}
                    />
                  </Box>
                </CardContent>
              </TableCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Reviews;
