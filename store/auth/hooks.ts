import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../types';
import {
  UserData,
  userLogin as userLoginAction,
  createUser as createUserAction,
  checkToken as checkTokenAction,
  userLogout as userLogoutAction,
  ICreateUser,
} from './actions';

export const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userLogin = useCallback(
    (userData: UserData) => {
      dispatch(userLoginAction(userData));
    },
    [dispatch]
  );

  const createUser = useCallback(
    (registerData: ICreateUser) => {
      dispatch(createUserAction(registerData));
    },
    [dispatch]
  );

  const checkToken = useCallback(() => {
    dispatch(checkTokenAction());
  }, [dispatch]);

  const userLogout = useCallback(() => {
    dispatch(userLogoutAction());
  }, [dispatch]);

  return {
    ...authState,
    userLogin,
    createUser,
    checkToken,
    userLogout,
  };
};
