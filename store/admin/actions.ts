import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { sportikaApi } from '../../api';
import { FormProduct } from '../../interfaces';

const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const updateProduct = createAsyncThunk(
  UPDATE_PRODUCT,
  async (product: FormProduct, thunkApi) => {
    try {
      const { data } = await sportikaApi({
        url: '/admin/products',
        method: 'PUT',
        data: product,
      });

      return {
        payload: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  CREATE_PRODUCT,
  async (product: FormProduct, thunkApi) => {
    try {
      const { data } = await sportikaApi({
        url: '/admin/products',
        method: 'POST',
        data: product,
      });

      return {
        payload: '',
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }

      return thunkApi.rejectWithValue(error);
    }
  }
);
