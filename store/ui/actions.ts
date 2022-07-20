import { createAction } from '@reduxjs/toolkit';

const SET_MENU_OPEN = 'SET_MENU_OPEN';
const SET_AUTO_FOCUS = 'SET_AUTO_FOCUS';

export const setMenuOpen = createAction(SET_MENU_OPEN);
export const setAutoFocus = createAction(SET_AUTO_FOCUS);
