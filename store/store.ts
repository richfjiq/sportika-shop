import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { uiReducer } from './ui';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
