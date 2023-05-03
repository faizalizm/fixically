import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import reviewReducer from '../features/review/reviewSlice';
import quotationReducer from '../features/quotation/quotationSlice';
import serviceReducer from '../features/service/serviceSlice';
import fixieReducer from '../features/fixie/fixieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    review: reviewReducer,
    quotation: quotationReducer,
    service: serviceReducer,
    fixie: fixieReducer,
  },
});
