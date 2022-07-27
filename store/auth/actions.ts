import { signOut } from 'next-auth/react';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { sportikaApi } from '../../api';
import { AuthUser } from './reducer';

const USER_LOGIN = 'USER_LOGIN';
const CREATE_USER = 'CREATE_USER';
const CHECK_TOKEN_FROM_COOKIES = 'CHECK_TOKEN_FROM_COOKIES';
const USER_LOGOUT = 'USER_LOGOUT';
const LOGIN_NEXT_AUTH = 'LOGIN_NEXT_AUTH';
const LOGOUT_NEXT_AUTH = 'LOGOUT_NEXT_AUTH';

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
      // Cookies.set('token', token);

      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error instanceof AxiosError) {
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
      // Cookies.set('token', token);

      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error instanceof AxiosError) {
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

      if (axios.isAxiosError(error) && error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
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
  Cookies.remove('token');
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

  signOut();

  return {
    payload: undefined,
  };
});
