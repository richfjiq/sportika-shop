import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICartProduct } from '../../interfaces';
import {
  addAddress,
  addCartFromCookies,
  addOrderSummary,
  addProductToCart,
  loadAddressFromCookies,
  removeProductFromCart,
  updateCartQuantity,
} from './actions';

export interface CartState {
  isCartLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  code: string;
  phone: string;
}

const initialState: CartState = {
  isCartLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

const cartStore = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCart, (state, action) => {
      const matchProductIndex = state.cart.findIndex(
        (product) =>
          product &&
          product.slug === action.payload.slug &&
          product.size === action.payload.size
      );

      if (matchProductIndex === -1) {
        state.cart = [...state.cart, action.payload];
      } else {
        state.cart[matchProductIndex].quantity += action.payload.quantity;
        state.cart = [...state.cart];
      }
    });
    builder.addCase(addCartFromCookies, (state, action) => {
      state.cart = action.payload;
      state.isCartLoaded = true;
    });
    builder.addCase(updateCartQuantity, (state, action) => {
      const cart = state.cart.map((product) => {
        if (product._id !== action.payload.product._id) return product;
        if (product.size !== action.payload.product.size) return product;

        product.quantity = action.payload.newQuantity;
        return product;
      });

      state.cart = cart;
    });
    builder.addCase(removeProductFromCart, (state, action) => {
      const newState = state.cart.filter((product) => {
        if (
          product._id === action.payload._id &&
          product.size === action.payload.size
        )
          return;

        return product;
      });

      state.cart = newState;
    });
    builder.addCase(addOrderSummary, (state, action) => {
      state.numberOfItems = action.payload.numberOfItems;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
      state.total = action.payload.total;
    });
    builder.addCase(loadAddressFromCookies, (state, action) => {
      state.shippingAddress = action.payload;
    });
    builder.addCase(addAddress, (state, action) => {
      state.shippingAddress = action.payload;
    });
  },
});

export default cartStore.reducer;
