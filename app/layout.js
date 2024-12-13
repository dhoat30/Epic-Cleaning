'use client'
//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Work_Sans } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../utils/themeSettings'
import Loading from '../components/UI/Loader/Loading'
import {useEffect, useState} from "react"



import { GoogleTagManager } from '@next/third-parties/google'

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})


export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust timing as needed
    return () => clearTimeout(timer);
  }, []);


  return (
    <html lang="en" className={`${work_sans.variable}`}>
      <GoogleTagManager gtmId="GTM-NDXM6D" />
      <body >
      {isLoading ?
<Loading/>
        :
        <ThemeProvider theme={lightTheme}>
        {/* Wrap main content with Suspense */}
          {children}
 
         </ThemeProvider>
        
        }

      </body>
    </html>
  )
}