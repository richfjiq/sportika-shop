import { useCallback } from 'react';

import { FormProduct } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../types';
import {
  updateProduct as updateProductAction,
  createProduct as createProductAction,
} from './actions';

export const useAdmin = () => {
  const adminState = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const updateProduct = useCallback(
    (product: FormProduct) => {
      dispatch(updateProductAction(product));
    },
    [dispatch]
  );

  const createProduct = useCallback(
    (product: FormProduct) => {
      dispatch(createProductAction(product));
    },
    [dispatch]
  );

  return {
    ...adminState,
    updateProduct,
    createProduct,
  };
};
