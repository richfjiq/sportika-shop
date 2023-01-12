import { signOut } from 'next-auth/react';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { sportikaApi } from '../../api';
import { AuthUser } from './reducer';
import {
  IAddress,
  IUser,
  IUserUpdateData,
  IUserUpdatePassword,
} from '../../interfaces';

const USER_LOGIN = 'USER_LOGIN';
const CREATE_USER = 'CREATE_USER';
const CHECK_TOKEN_FROM_COOKIES = 'CHECK_TOKEN_FROM_COOKIES';
const USER_LOGOUT = 'USER_LOGOUT';
const LOGIN_NEXT_AUTH = 'LOGIN_NEXT_AUTH';
const LOGOUT_NEXT_AUTH = 'LOGOUT_NEXT_AUTH';
const GET_USER_ADDRESS = 'GET_USER_ADDRESS';
const CREATE_USER_ADDRESS = 'CREATE_USER_ADDRESS';
const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';

export interface UserData {
  email: string;
  password: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthUserResponse {
  token: string;
  user: {
    email: string;
    role: string;
    name: string;
  };
}

export const loginNextAuth = createAction(LOGIN_NEXT_AUTH, (user: AuthUser) => {
  return {
    payload: user,
  };
});

export const userLogin = createAsyncThunk(
  USER_LOGIN,
  async (userData: UserData, thunkApi) => {
    const { email, password } = userData;

    try {
      const { data } = await sportikaApi.post<AuthUserResponse>('/user/login', {
        email,
        password,
      });
      const { token } = data;
      Cookies.set('token', token);

      return data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  CREATE_USER,
  async (registerData: ICreateUser, thunkApi) => {
    const { name, email, password } = registerData;

    try {
      const { data } = await sportikaApi.post<AuthUserResponse>(
        '/user/register',
        {
          name,
          email,
          password,
        }
      );
      const { token } = data;

      return data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const checkToken = createAsyncThunk(
  CHECK_TOKEN_FROM_COOKIES,
  async (_, thunkApi) => {
    try {
      const { data } = await sportikaApi.get<AuthUserResponse>(
        '/user/validate-token'
      );
      const { token } = data;
      Cookies.set('token', token);
      return data.user;
    } catch (error) {
      Cookies.remove('token');

      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserAddress = createAsyncThunk(
  GET_USER_ADDRESS,
  async (userId: string, thunkApi) => {
    try {
      const { data } = await sportikaApi.get<IAddress[]>(
        `/user/address/${userId}`
      );
      if (data.length > 0) return data[0];
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createUserAddress = createAsyncThunk(
  CREATE_USER_ADDRESS,
  async (address: IAddress, { rejectWithValue }) => {
    try {
      const { data } = await sportikaApi.post<IAddress>(
        '/user/address',
        address
      );
      if (data) return data;
      return null;
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(error);
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  UPDATE_USER_ADDRESS,
  async (addressData: IAddress, { rejectWithValue }) => {
    try {
      const { data } = await sportikaApi.put<IAddress>(
        `/user/address/${addressData.user}`,
        {
          firstName: addressData.firstName,
          lastName: addressData.lastName,
          address: addressData.address,
          zip: addressData.zip,
          city: addressData.city,
          state: addressData.state,
          country: addressData.country,
          code: addressData.code,
          phone: addressData.phone,
        }
      );
      if (data) return data;
      return null;
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  UPDATE_USER_DATA,
  async (userData: IUserUpdateData, { rejectWithValue }) => {
    console.log({ userData });
    try {
      const { data } = await sportikaApi.put<IUser>(
        `/user/account/data/${userData.userId}`,
        {
          name: userData.name,
          email: userData.email,
          currentPassword: userData.currentPassword,
        }
      );
      if (data) return data;
      return null;
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(error);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  UPDATE_USER_PASSWORD,
  async (userData: IUserUpdatePassword, { rejectWithValue }) => {
    console.log({ userData });
    try {
      const { data } = await sportikaApi.put<IUser>(
        `/user/account/password/${userData.userId}`,
        {
          currentPassword: userData.currentPassword,
          newPassword: userData.newPassword,
          repeatPassword: userData.repeatPassword,
        }
      );
      if (data) return data;
      return null;
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAction(USER_LOGOUT, () => {
  Cookies.remove('cart');
  Cookies.remove('firstName');
  Cookies.remove('lastName');
  Cookies.remove('address');
  Cookies.remove('address2');
  Cookies.remove('zip');
  Cookies.remove('city');
  Cookies.remove('country');
  Cookies.remove('phone');
  return {
    payload: '',
  };
});

export const logoutNextAuth = createAction(LOGOUT_NEXT_AUTH, () => {
  Cookies.remove('cart');
  Cookies.remove('firstName');
  Cookies.remove('lastName');
  Cookies.remove('address');
  Cookies.remove('address2');
  Cookies.remove('zip');
  Cookies.remove('city');
  Cookies.remove('country');
  Cookies.remove('phone');
  Cookies.remove('code');

  signOut();

  return {
    payload: undefined,
  };
});
