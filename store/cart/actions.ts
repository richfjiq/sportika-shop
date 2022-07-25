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
const LOAD_ADDRESS_FROM_COOKIES = 'LOAD_ADDRESS_FROM_COOKIES';
const ADD_ADDRESS = 'ADD_ADDRESS';

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
