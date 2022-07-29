import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  checkToken,
  createUser,
  loginNextAuth,
  logoutNextAuth,
  userLogin,
} from './actions';

export interface AuthUser {
  email: string;
  role: string;
  name: string;
  _id?: string;
}

export interface AuthState {
  loading: boolean;
  error?: boolean | string;
  isLoggedIn: boolean;
  user?: AuthUser;
}

const initialState: AuthState = {
  loading: false,
  error: undefined,
  isLoggedIn: false,
  user: undefined,
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
      state.isLoggedIn = true;
      state.user = payload;
    });
    builder.addCase(checkToken.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    }),
      builder.addCase(checkToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.isLoggedIn = true;
        state.user = payload;
      });
    builder.addMatcher(
      isAnyOf(userLogin.rejected, createUser.rejected, checkToken.rejected),
      (state, action) => {
        const message: string = action.payload as string;
        state.loading = false;
        state.error = message || true;
      }
    );
  },
});

export default authStore.reducer;
