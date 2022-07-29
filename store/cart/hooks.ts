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
  loadAddressFromCookies as loadAddressFromCookiesAction,
  addAddress as addAddressAction,
  createOrder as createOrderAction,
  orderCreated as orderCreatedAction,
  IAddAddress,
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

  const loadAddressFromCookies = useCallback(() => {
    dispatch(loadAddressFromCookiesAction());
  }, [dispatch]);

  const addAddress = useCallback(
    ({ address, country, code }: IAddAddress) => {
      dispatch(addAddressAction({ address, country, code }));
    },
    [dispatch]
  );

  const createOrder = useCallback(() => {
    dispatch(createOrderAction());
  }, [dispatch]);

  const setOrderCreated = useCallback(
    (id: string) => {
      dispatch(orderCreatedAction(id));
    },
    [dispatch]
  );

  return {
    ...cartState,
    addProductToCart,
    addCartFromCookies,
    updateCartQuantity,
    removeProductFromCart,
    loadAddressFromCookies,
    addAddress,
    createOrder,
    setOrderCreated,
  };
};
