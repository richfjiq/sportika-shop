import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct } from '../../interfaces';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const LOAD_CART_FROM_COOKIES = 'LOAD_CART_FROM_COOKIES';

export const addProductToCart = createAction(ADD_PRODUCT_TO_CART);
export const loadCartFromCookies = createAction(LOAD_CART_FROM_COOKIES);
