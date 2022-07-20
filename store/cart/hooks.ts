import { useCallback } from 'react';
import { ICartProduct } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../types';

import { addProductToCart as addProductToCartAction } from './reducer';

export const useCart = () => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addProductToCart = useCallback(
    (obj: ICartProduct) => {
      dispatch(addProductToCartAction(obj));
    },
    [dispatch]
  );
  return {
    ...cartState,
    addProductToCart,
  };
};
