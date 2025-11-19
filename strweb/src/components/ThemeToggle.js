import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/actions/themeActions';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.currentTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="theme-toggle">
      <button 
        onClick={handleToggle}
        className={`theme-btn ${currentTheme}`}
        title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      >
        {currentTheme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

export default ThemeToggle;