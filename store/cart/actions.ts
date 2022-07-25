import { createAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { store } from '..';
import { ICartProduct } from '../../interfaces';

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const ADD_CART_FROM_COOKIES = 'ADD_CART_FROM_COOKIES';
const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const ADD_ORDER_SUMMARY = 'ADD_ORDER_SUMMARY';
const UPDATE_CART_IN_COOKIES = 'UPDATE_CART_IN_COOKIES';

export const updateCartInCookies = createAction(UPDATE_CART_IN_COOKIES, () => {
  const state = store.getState();
  Cookies.set('cart', JSON.stringify(state.cart.cart));
  return {
    payload: '',
  };
});

export const addProductToCart = createAction(
  ADD_PRODUCT_TO_CART,
  (product: ICartProduct) => {
    return {
      payload: product,
    };
  }
);

export const addCartFromCookies = createAction(
  ADD_CART_FROM_COOKIES,
  (cart: ICartProduct[]) => {
    return {
      payload: cart,
    };
  }
);

export const updateCartQuantity = createAction(
  UPDATE_CART_QUANTITY,
  (product: ICartProduct, newQuantity: number) => {
    return {
      payload: {
        product,
        newQuantity,
      },
    };
  }
);

export const removeProductFromCart = createAction(
  REMOVE_PRODUCT_FROM_CART,
  (product: ICartProduct) => {
    return {
      payload: product,
    };
  }
);

export const addOrderSummary = createAction(ADD_ORDER_SUMMARY, () => {
  const { cart } = store.getState();
  const numberOfItems = cart.cart.reduce(
    (prev, current) => current.quantity + prev,
    0
  );
  const subTotal = cart.cart.reduce(
    (prev, current) => current.price * current.quantity + prev,
    0
  );
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

  const orderSummary = {
    numberOfItems,
    subTotal,
    tax: subTotal * taxRate,
    total: subTotal * (taxRate + 1),
  };

  return {
    payload: orderSummary,
  };
});
