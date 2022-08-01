import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import { cartReducer } from './cart';
import { uiReducer } from './ui';
import { authReducer } from './auth';
import { adminReducer } from './admin';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
