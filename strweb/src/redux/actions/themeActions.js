import { THEME_ACTIONS } from '../constants/themeTypes';

export const toggleTheme = () => ({
  type: THEME_ACTIONS.TOGGLE_THEME
});

export const setTheme = (theme) => ({
  type: THEME_ACTIONS.SET_THEME,
  payload: theme
});