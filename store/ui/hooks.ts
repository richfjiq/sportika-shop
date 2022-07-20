import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../types';

import {
  setAutoFocus as setAutoFocusAction,
  setMenuOpen as setMenuOpenAction,
} from './reducer';

export const useUi = () => {
  const uiState = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const setMenuOpen = useCallback(() => {
    dispatch(setMenuOpenAction());
  }, [dispatch]);

  const setAutoFocus = useCallback(() => {
    dispatch(setAutoFocusAction());
  }, [dispatch]);

  return {
    ...uiState,
    setMenuOpen,
    setAutoFocus,
  };
};
