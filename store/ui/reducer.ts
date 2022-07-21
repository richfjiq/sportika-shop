import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isMenuOpen: boolean;
  isFocused: boolean;
}

const initialState: UiState = {
  isMenuOpen: false,
  isFocused: false,
};

const uiStore = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setAutoFocus: (state) => {
      state.isFocused = !state.isFocused;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMenuOpen, setAutoFocus } = uiStore.actions;
export default uiStore.reducer;
