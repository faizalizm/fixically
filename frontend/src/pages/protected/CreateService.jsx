import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createService, reset } from '../../features/service/serviceSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import InfoIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CardBox, StyledTextField, SubmitButton, YellowDiv } from '../../theme';
import { InputAdornment, Stack, Typography, useTheme } from '@mui/material';

function CreateService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { service_id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    category: '',
    tag: '',
    brand: '',
    type: '',
    capacity: '',
    speed: '',
    price: '',
    labour: '',
  });

  const { category, tag, brand, type, capacity, speed, price, labour } =
    formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let serviceData;

    serviceData = {
      category,
      tag,
      brand,
      type,
      capacity,
      speed,
      price,
      labour,
    };

    dispatch(createService(serviceData));
  };

  return (
    <>
      <UserNavbar />
      <Grid container spacing={0}>
        <Grid item xs={2} height="100%">
          <Sidebar />
        </Grid>
        <Grid item xs={7} px={4}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              color={theme.palette.black.main}
              sx={{ mt: 6 }}
            >
              {service_id ? `Service #${service_id}` : 'Create New Service'}
            </Typography>
            <YellowDiv />
            <CardBox sx={{ gap: '8px' }}>
              <Grid container columnSpacing={16}>
                <Grid item xs={6} borderRight={1}>
                  <Typography variant="h4">Service Details</Typography>
                  <Stack direction="row" alignItems="center" mt={1}>
                    <InfoIcon
                      sx={{
                        fontSize: 16,
                        mr: 1,
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color={theme.palette.secondary.main}
                    >
                      This will be visible to customer on your service list
                    </Typography>
                  </Stack>
                  <Typography variant="h5" mt={4} mb={1}>
                    Category
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="category"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Tag
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="tag"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Brand
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="brand"
                    placeholder="test"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Type
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="type"
                    placeholder="test"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Capacity
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="capacity"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Speed
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="speed"
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Stack>
                    <Typography variant="h4">Pricing Details</Typography>
                    <Stack direction="row" alignItems="center" mt={1}>
                      <InfoIcon
                        sx={{
                          fontSize: 16,
                          mr: 1,
                          color: theme.palette.secondary.main,
                        }}
                      />
                      <Typography
                        variant="h6"
                        color={theme.palette.secondary.main}
                      >
                        The labour cost will added on top of the price
                      </Typography>
                    </Stack>
                    <Typography variant="h5" mt={4} mb={1}>
                      Price
                    </Typography>
                    <StyledTextField
                      type="number"
                      name="price"
                      onChange={onChange}
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">RM</InputAdornment>
                        ),
                      }}
                    />
                    <Typography variant="h5" mt={2} mb={1}>
                      Labour
                    </Typography>
                    <StyledTextField
                      type="number"
                      name="labour"
                      onChange={onChange}
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">RM</InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                  <Stack>
                    <SubmitButton variant="contained" type="submit">
                      Confirm Details
                    </SubmitButton>
                  </Stack>
                </Grid>
              </Grid>
            </CardBox>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateService;
