import { THEME_ACTIONS } from '../constants/themeTypes';

const initialState = {
  currentTheme: 'light'
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return {
        ...state,
        currentTheme: newTheme
      };

    case THEME_ACTIONS.SET_THEME:
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
      return {
        ...state,
        currentTheme: action.payload
      };

    default:
      return state;
  }
};

export default themeReducer;