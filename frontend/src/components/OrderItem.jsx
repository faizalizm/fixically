import { useDispatch } from 'react-redux';
import { deleteOrder } from '../features/order/orderSlice';

function OrderItem({ order }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(order.createdAt).toLocaleString('en-US')}</div>
      <h2>{order.order_status}</h2>
      <button
        onClick={() => dispatch(deleteOrder(order._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default OrderItem;
