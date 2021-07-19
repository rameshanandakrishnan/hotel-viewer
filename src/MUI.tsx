import React from 'react';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import StylesProvider from '@material-ui/styles/StylesProvider';
import createTheme from '@material-ui/core/styles/createTheme';
import { createGenerateClassName } from '@material-ui/core/styles';

const commonFontFamilies = [
  'Open Sans',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
];
const baseFonts = ['Montserrat', ...commonFontFamilies].join(',');

const generateClassName = createGenerateClassName({
  seed: 'oc-conversions',
});

const MUI: React.FC = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#374785',
        contrastText: '#000',
      },
      secondary: {
        main: '#f76c6c',
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: baseFonts,
    },
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default MUI;
