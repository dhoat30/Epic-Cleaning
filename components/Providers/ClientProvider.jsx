'use client';
import { ThemeProvider } from '@mui/material/styles';
import {lightTheme } from "../../utils/themeSettings"
import { Suspense } from 'react';
import NavigationProgress from '../UI/NavigationProgress/NavigationProgress';

export default function ClientProvider({ children }) {
  return <ThemeProvider theme={lightTheme}>
    <Suspense fallback={null}>
      <NavigationProgress />
    </Suspense>
    {children}
  </ThemeProvider>;
}
