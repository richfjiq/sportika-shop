import { useCallback } from 'react';
import { IAddress } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../types';
import {
  UserData,
  userLogin as userLoginAction,
  createUser as createUserAction,
  checkToken as checkTokenAction,
  userLogout as userLogoutAction,
  loginNextAuth as loginNextAuthAction,
  logoutNextAuth as logoutNextAuthAction,
  getUserAddress as getUserAddressAction,
  createUserAddress as createUserAddressAction,
  ICreateUser,
} from './actions';
import { AuthUser } from './reducer';

export const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const loginNextAuth = useCallback(
    (user: AuthUser) => {
      dispatch(loginNextAuthAction(user));
    },
    [dispatch]
  );

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

  const getUserAddress = useCallback(
    (userId: string) => {
      dispatch(getUserAddressAction(userId));
    },
    [dispatch]
  );

  const createUserAddress = useCallback(
    (address: IAddress) => {
      dispatch(createUserAddressAction(address));
    },
    [dispatch]
  );

  const checkToken = useCallback(() => {
    dispatch(checkTokenAction());
  }, [dispatch]);

  const userLogout = useCallback(() => {
    dispatch(userLogoutAction());
  }, [dispatch]);

  const logoutNextAuth = useCallback(() => {
    dispatch(logoutNextAuthAction());
  }, [dispatch]);

  return {
    ...authState,
    userLogin,
    createUser,
    checkToken,
    userLogout,
    loginNextAuth,
    logoutNextAuth,
    getUserAddress,
    createUserAddress,
  };
};
