import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  createService,
  findService,
  reset,
  updateService,
} from '../../features/service/serviceSlice';

import { UserNavbar } from '../../components/UserNavbar';
import { Sidebar } from '../../components/Sidebar';

import { CardBox, StyledTextField, SubmitButton, YellowDiv } from '../../theme';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { InputAdornment, Stack, Typography, useTheme } from '@mui/material';

function CreateService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { service_id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { service, isLoading, isError, message } = useSelector(
    (state) => state.service
  );

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    desc_1: '',
    desc_2: '',
    desc_3: '',
    price: '',
    stock: '',
  });

  const { category, name, desc_1, desc_2, desc_3, stock, price } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (service_id) {
        dispatch(findService(service_id));
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (service_id && service) {
      setFormData((prevState) => ({
        ...prevState,
        category: service.category,
        name: service.name,
        desc_1: service.desc_1,
        desc_2: service.desc_2,
        desc_3: service.desc_3,
        price: service.price,
        stock: service.stock,
      }));
    }
  }, [service]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const onSubmit = ;

  return (
    <>
      <UserNavbar />
      <Grid container spacing={0}>
        <Grid item xs={2} height="100%">
          <Sidebar />
        </Grid>
        <Grid item xs={7} px={4}>
          <form>
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
                    value={category}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Name
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Description 1
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="desc_1"
                    value={desc_1}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Description 2
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="desc_2"
                    value={desc_2}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Description 3
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="desc_3"
                    value={desc_3}
                    onChange={onChange}
                    size="small"
                    fullWidth
                  />
                  <Typography variant="h5" mt={2} mb={1}>
                    Stock
                  </Typography>
                  <StyledTextField
                    type="text"
                    name="stock"
                    value={stock}
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
                      value={price}
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
                    <SubmitButton
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        let serviceData;

                        serviceData = {
                          category,
                          name,
                          desc_1,
                          desc_2,
                          desc_3,
                          stock,
                          price,
                        };

                        if (service_id) {
                          serviceData.id = service_id;
                          dispatch(updateService(serviceData));
                          toast.success('Service successfully updated');
                          navigate('/services');
                        } else {
                          dispatch(createService(serviceData));
                          toast.success('Service successfully created');
                          navigate('/services');
                        }
                      }}
                    >
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
