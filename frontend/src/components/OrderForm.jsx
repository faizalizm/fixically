import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../features/order/orderSlice';

function OrderForm() {
  const [order_status, setOrderStatus] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createOrder({ order_status }));
    setOrderStatus('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="order_status">Order</label>
          <input
            type="text"
            name="order_status"
            id="order_status"
            value={order_status}
            onChange={(e) => setOrderStatus(e.target.value)}
          />
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Order
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default OrderForm;
