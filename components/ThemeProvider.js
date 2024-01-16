'use client';
// components/ThemeProvider.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    document.body.classList.toggle('darkmode', isDarkMode);
    // console.log('Dark Mode effect enabled');
  }, [isDarkMode]);

  return children;
};

export default ThemeProvider;
