import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { store } from '..';
import { sportikaApi } from '../../api';
import { ICartProduct, IOrder } from '../../interfaces';

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const ADD_CART_FROM_COOKIES = 'ADD_CART_FROM_COOKIES';
const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const ADD_ORDER_SUMMARY = 'ADD_ORDER_SUMMARY';
const UPDATE_CART_IN_COOKIES = 'UPDATE_CART_IN_COOKIES';
const LOAD_ADDRESS_FROM_COOKIES = 'LOAD_ADDRESS_FROM_COOKIES';
const ADD_ADDRESS = 'ADD_ADDRESS';
const CREATE_ORDER = 'CREATE_ORDER';
const SET_ORDER_CREATED = 'SET_ORDER_CREATED';
const NEW_ORDER_CREATED = 'NEW_ORDER_CREATED';

export interface IAddAddress {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    code: string;
    phone: string;
  };
  country: string;
  code: string;
}

export const addAddress = createAction(
  ADD_ADDRESS,
  ({ address, country, code }: IAddAddress) => {
    Cookies.set('firstName', address.firstName);
    Cookies.set('lastName', address.lastName);
    Cookies.set('address', address.address);
    Cookies.set('address2', address.address2 || '');
    Cookies.set('zip', address.zip);
    Cookies.set('city', address.city);
    Cookies.set('country', country);
    Cookies.set('code', code);
    Cookies.set('phone', address.phone);

    return {
      payload: {
        ...address,
        country,
        code,
      },
    };
  }
);

export const loadAddressFromCookies = createAction(
  LOAD_ADDRESS_FROM_COOKIES,
  () => {
    const firstName = Cookies.get('firstName');

    if (!firstName) {
      return {
        payload: undefined,
      };
    }

    const lastName = Cookies.get('lastName') || '';
    const address = Cookies.get('address') || '';
    const address2 = Cookies.get('address2') || '';
    const zip = Cookies.get('zip') || '';
    const city = Cookies.get('city') || '';
    const country = Cookies.get('country') || '';
    const code = Cookies.get('code') || '';
    const phone = Cookies.get('phone') || '';

    const shippingAddress = {
      firstName,
      lastName,
      address,
      address2,
      zip,
      city,
      country,
      code,
      phone,
    };

    return {
      payload: shippingAddress,
    };
  }
);

export const updateCartInCookies = createAction(UPDATE_CART_IN_COOKIES, () => {
  const { cart } = store.getState();
  Cookies.set('cart', JSON.stringify(cart.cart));
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

export const orderCreated = createAction(
  SET_ORDER_CREATED,
  (orderId: string) => {
    Cookies.remove('cart');

    return {
      payload: orderId,
    };
  }
);

export const newOrderCreated = createAction(
  NEW_ORDER_CREATED,
  (value: boolean) => {
    return {
      payload: value,
    };
  }
);

export const createOrder = createAsyncThunk(
  CREATE_ORDER,
  async (_, thunkApi) => {
    const { cart, auth } = store.getState();

    if (!cart.shippingAddress) {
      throw new Error('There is not shipping address');
    }

    const body = {
      orderItems: cart.cart,
      shippingAddress: cart.shippingAddress,
      numberOfItems: cart.numberOfItems,
      subTotal: cart.subTotal,
      tax: cart.tax,
      total: cart.total,
      isPaid: false,
    };

    try {
      const { data } = await sportikaApi.post<IOrder>('/orders', body);
      return data._id || '';
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
