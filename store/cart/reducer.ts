import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICartProduct } from '../../interfaces';

interface CartState {
  cart: ICartProduct[];
}

const initialState: CartState = {
  cart: [],
};

const cartStore = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const currentState = state.cart;
      const matchProductIndex = currentState.findIndex(
        (product) =>
          product &&
          product.slug === action.payload.slug &&
          product.size === action.payload.size
      );

      console.log(matchProductIndex);

      if (matchProductIndex === -1) {
        state.cart = [...state.cart, action.payload];
      } else {
        currentState[matchProductIndex].quantity =
          currentState[matchProductIndex].quantity + action.payload.quantity;

        state.cart = [...currentState];
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { addProductToCart } = cartStore.actions;
export default cartStore.reducer;
