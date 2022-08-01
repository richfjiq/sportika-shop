import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createProduct, updateProduct } from './actions';

interface AdminState {
  loading: boolean;
  error?: boolean | string;
  productUpdated: boolean;
}

const initialState: AdminState = {
  loading: false,
  error: undefined,
  productUpdated: false,
};

const adminStore = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
    });
    builder.addMatcher(
      isAnyOf(updateProduct.rejected, createProduct.rejected),
      (state, action) => {
        const message: string = action.payload as string;
        state.loading = false;
        state.error = message || true;
      }
    );
  },
});

export default adminStore.reducer;
