import { useCallback } from 'react';
import { ICartProduct } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../types';
import {
  addProductToCart as addProductToCartAction,
  addCartFromCookies as addCartFromCookiesAction,
  updateCartQuantity as updateCartQuantityAction,
  removeProductFromCart as removeProductFromCartAction,
  addOrderSummary as addOrderSummaryAction,
  updateCartInCookies as updateCartInCookiesAction,
} from './actions';

export const useCart = () => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addProductToCart = useCallback(
    (product: ICartProduct) => {
      dispatch(addProductToCartAction(product));
      dispatch(addOrderSummaryAction());
      dispatch(updateCartInCookiesAction());
    },
    [dispatch]
  );

  const addCartFromCookies = useCallback(
    (cart: ICartProduct[]) => {
      dispatch(addCartFromCookiesAction(cart));
      dispatch(addOrderSummaryAction());
    },
    [dispatch]
  );

  const updateCartQuantity = useCallback(
    (product: ICartProduct, newQuantity: number) => {
      dispatch(updateCartQuantityAction(product, newQuantity));
      dispatch(addOrderSummaryAction());
      dispatch(updateCartInCookiesAction());
    },
    [dispatch]
  );

  const removeProductFromCart = useCallback(
    (product: ICartProduct) => {
      dispatch(removeProductFromCartAction(product));
      dispatch(addOrderSummaryAction());
      dispatch(updateCartInCookiesAction());
    },
    [dispatch]
  );

  return {
    ...cartState,
    addProductToCart,
    addCartFromCookies,
    updateCartQuantity,
    removeProductFromCart,
  };
};
