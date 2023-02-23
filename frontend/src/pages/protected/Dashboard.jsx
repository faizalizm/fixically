import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { UserNavbar } from '../../components/UserNavbar';
import OrderForm from '../../components/OrderForm';
import OrderItem from '../../components/OrderItem';

import { getOrder, reset } from '../../features/order/orderSlice';
import { Sidebar } from '../../components/Sidebar';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <>
      <UserNavbar />
      <Grid container spacing={2}>
        <Sidebar />
        <Grid item xs={12} sm={6}>
          Dashboard here
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
