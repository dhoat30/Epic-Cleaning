'use client';
import { ThemeProvider } from '@mui/material/styles';
import {lightTheme } from "../../utils/themeSettings"

export default function ClientProvider({ children }) {
  return <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>;
}
