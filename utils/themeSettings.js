import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 

export const lightTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: '#043b51',
        },
        secondary: {
            main: '#0B9E6A',


        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-montserrat)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '3.3rem',
            fontWeight: 800,
            color: "var(--light-primary)",
            lineHeight: "100%",
            // textTransform: "uppercase",
            '@media (max-width:900px)': {
                fontSize: '2rem',
            },
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem',
            lineHeight: "3.4rem",
            color: "var(--light-on-surface)",

            '@media (max-width:600px)': {
                fontSize: '2.5rem',
                lineHeight: "2.8rem",

            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--light-on-surface)",
            '@media (max-width:600px)': {
                fontSize: '1.7rem',
                lineHeight: "2.2rem",

            },
        },
        h4: {
            fontWeight: 500,
            color: "var(--light-on-surface)",
            fontSize: '1.4rem',
            letterSpacing: "-0.02rem",
            fontWeight: 600,
            lineHeight: "130%",

        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
                        fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',

            color: "var(--light-on-surface)",

        },

        h6: {
 color: "var( --light-on-surface-variant)", 
             lineHeight: "140%",
            fontWeight: 400,
                        fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',

        },
        body1: {
            fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
            letterSpacing: "-0.02rem",
            color: "var( --light-on-surface-variant)", 
            lineHeight: "160%",
            fontSize: "1rem",
            fontWeight: 400,
        },
        body2: {
            fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
        },
        subtitle1: {
            color: "var(--light-on-surface)",
            fontWeight: 500,
        }

    },
    components: {
        MuiButton: {

            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    color: "var(--light-on-primary)",
                    paddingRight: "24px",
                    paddingLeft: "24px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    fontSize: "1rem",
                    gap: "4px",
                    boxShadow: "none",
                    transform: "translateY(0) scale(1)",
                    transition: "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, color 180ms ease, border-color 180ms ease",
                    '&:hover': {
                        transform: "translateY(-2px) scale(1.02)",
                        boxShadow: "0 10px 24px color-mix(in srgb, var(--light-primary) 18%, transparent)",
                    },
                    '&:active': {
                        transform: "translateY(0) scale(0.99)",
                        boxShadow: "none",
                    },
                },
                contanied: { 
                    backgroundColor: "red !important"
                }, 
                outlined: {
                    border: "1px solid var(--light-secondary)",
                    color: "var(--light-secondary)",

                },
                text: {
                    borderRadius: "0",
                    paddingLeft: "0",
                    paddingRight: "0",
                    boxShadow: "none",
                    transform: "none",
                        color: "var(--light-primary)",
                    fontWeight: 600, 
                    '& .MuiButton-endIcon': {
                        transition: "transform 180ms ease",
                    },
                    '&:hover': {
                        backgroundColor: "transparent",
                        color: "var(--light-secondary)",
                        boxShadow: "none",
                        transform: "none",
                        '& .MuiButton-endIcon': {
                            transform: "translateX(4px)",
                        },
                    },
                    '&:active': {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        transform: "none",
                    },
                    '&.Mui-focusVisible': {
                        backgroundColor: "transparent",
                        outline: "2px solid color-mix(in srgb, var(--light-secondary) 35%, transparent)",
                        outlineOffset: "4px",
                    },
                },
            }
        },
        MuiPickersDay: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                    color: "white", 
                  backgroundColor: '#007239', // your secondary.main color
                  '&:hover': {
                    backgroundColor: 'rgb(49, 106, 66)', // darker secondary
                  },
                },
              },
            },
          },
          MuiClockNumber: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  backgroundColor: '#007239',
                  color: '#fff',
                },
              },
            },
          },
          MuiClockPointer: {
            styleOverrides: {
              root: {
                backgroundColor: '#007239', // clock hand
              },
              thumb: {
                border: '14px solid #007239', // clock knob in the middle
              },
            },
          },
          MuiClock: {
            styleOverrides: {
              pin: {
                backgroundColor: '#007239', // clock pin in the center
              },
            },
          },
    }
});


export const theme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#91CEF4',
        },
        secondary: {
            main: '#98D4A4',


        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-montserrat)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 700,
            color: "var(--dark-primary)",
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 700,
            color: "var(--dark-on-surface)",
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--dark-on-surface)",
        },
        h4: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",

            color: "var(--dark-on-surface)",

        },

        h6: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            color: "var(--dark-on-surface)",
                        fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',


        },
        body1: {
            fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
            fontWeight: 350,
            color: "var( --dark-on-surface-variant)"
        },
        body2: {
            fontFamily: 'var(--font-inter), "Segoe UI", sans-serif',
            fontWeight: 300,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--dark-on-surface)",

        }

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    textTransform: "none",
                    gap: "4px",
                    transform: "translateY(0) scale(1)",
                    transition: "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, color 180ms ease, border-color 180ms ease",
                    '&:hover': {
                        transform: "translateY(-2px) scale(1.02)",
                        boxShadow: "0 10px 24px color-mix(in srgb, var(--dark-primary) 22%, transparent)",
                    },
                    '&:active': {
                        transform: "translateY(0) scale(0.99)",
                        boxShadow: "none",
                    },
                },
                text: {
                    borderRadius: "0",
                    paddingLeft: "0",
                    paddingRight: "0",
                    boxShadow: "none",
                    transform: "none",
                    '& .MuiButton-endIcon': {
                        transition: "transform 180ms ease",
                    },
                    '&:hover': {
                        backgroundColor: "transparent",
                        color: "var(--dark-secondary)",
                        boxShadow: "none",
                        transform: "none",
                        '& .MuiButton-endIcon': {
                            transform: "translateX(4px)",
                        },
                    },
                    '&:active': {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        transform: "none",
                    },
                    '&.Mui-focusVisible': {
                        backgroundColor: "transparent",
                        outline: "2px solid color-mix(in srgb, var(--dark-primary) 35%, transparent)",
                        outlineOffset: "4px",
                    },
                },
            }
        }, 
        
    }
});
