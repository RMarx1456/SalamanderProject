import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
    type: 'light',
    primary: {
      main: '#ff8900',
      light: '#ff9d32',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#f32f79',
      light: '#ff7f7f',
    },
    error: {
      main: '#ffbc00',
      light: '#ffe7a6',
      dark: '#926900',
    },
    warning: {
      main: '#00afaf',
      light: '#67e6e6',
      dark: '#004e4e',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    divider: '#a66e07',
    },
})

export default theme;