import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IAddress } from '../../interfaces';

import {
  checkToken,
  createUser,
  createUserAddress,
  getUserAddress,
  loginNextAuth,
  logoutNextAuth,
  userLogin,
} from './actions';

export interface AuthUser {
  email: string;
  role: string;
  name: string;
  _id?: string;
  type?: string;
}

export interface AuthState {
  loading: boolean;
  loadingAddress: boolean;
  error?: boolean | string;
  isLoggedIn: boolean;
  user?: AuthUser;
  shippingAddress: IAddress | null;
}

const initialState: AuthState = {
  loading: false,
  loadingAddress: false,
  error: undefined,
  isLoggedIn: false,
  user: undefined,
  shippingAddress: null,
};

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginNextAuth, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    });
    builder.addCase(logoutNextAuth, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.isLoggedIn = true;
      state.user = payload;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(checkToken.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(checkToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.isLoggedIn = true;
      state.user = payload;
    });
    builder.addCase(getUserAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAddress.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.shippingAddress = payload;
    });
    builder.addCase(createUserAddress.pending, (state) => {
      state.loadingAddress = true;
    });
    builder.addCase(createUserAddress.fulfilled, (state, { payload }) => {
      state.loadingAddress = false;
      state.shippingAddress = payload;
    });
    builder.addMatcher(
      isAnyOf(
        userLogin.rejected,
        createUser.rejected,
        checkToken.rejected,
        getUserAddress.rejected,
        createUserAddress.rejected
      ),
      (state, action) => {
        const message: string = action.payload as string;
        state.loading = false;
        state.error = message || true;
      }
    );
  },
});

export default authStore.reducer;
