// Custom Theme Provider component
'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';

export default function ThemeRegistry({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* resets the css */}
            {children}
        </ThemeProvider>
    );
}