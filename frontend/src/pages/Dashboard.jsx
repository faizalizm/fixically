import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OrderForm from '../components/OrderForm';
import OrderItem from '../components/OrderItem';
import Spinner from '../components/Spinner';
import { getOrder, reset } from '../features/order/orderSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { member } = useSelector((state) => state.auth);
  const { order, isLoading, isError, message } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!member) {
      navigate('/login');
    }

    dispatch(getOrder());

    return () => {
      dispatch(reset());
    };
  }, [member, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {member && member.name}</h1>
        <p>Order List</p>
      </section>

      <OrderForm />

      <section className="content">
        {order.length > 0 ? (
          <div className="goals">
            {order.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <h3>No order found</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
