import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import {
  addProductToCart,
  cartReducer,
  updateCartQuantity,
  removeProductFromCart,
} from './cart';
import { CartState } from './cart/reducer';
import { uiReducer } from './ui';
import { UiState } from './ui/reducer';
import { useAppDispatch } from './types/appTypes';

interface rootState {
  ui: UiState;
  cart: CartState;
}

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addProductToCart,
  effect: (action, listenerApi) => {
    const { cart } = listenerApi.getState() as rootState;
    Cookies.set('cart', JSON.stringify(cart.cart));
  },
});

listenerMiddleware.startListening({
  actionCreator: updateCartQuantity,
  effect: (action, listenerApi) => {
    const { cart } = listenerApi.getState() as rootState;
    Cookies.set('cart', JSON.stringify(cart.cart));
  },
});

listenerMiddleware.startListening({
  actionCreator: removeProductFromCart,
  effect: (action, listenerApi) => {
    const { cart } = listenerApi.getState() as rootState;
    Cookies.set('cart', JSON.stringify(cart.cart));
  },
});

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
