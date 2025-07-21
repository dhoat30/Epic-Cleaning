import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 
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
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 600,
            color: "var(--dark-on-surface)",
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 600,
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

        },
        body1: {
            fontWeight: 350,
            letterSpacing: "0.02rem",
            color: "var( --dark-on-surface-variant)"
        },
        body2: {
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

                }
            }
        }, 
        
    }
});

export const lightTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(31 101 135)',
        },
        secondary: {
            main: '#007239',


        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 600,
            color: "var(--light-on-surface)",

            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 600,
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

        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",

            color: "var(--light-on-surface)",

        },

        h6: {
            color: "var(--light-on-surface)",
        },
        body1: {

            color: "var( --light-on-surface-variant)"
        },
        body2: {

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
                    paddingRight: "32px",
                    paddingLeft: "32px",
                },
                outlined: {
                    border: "1px solid var(--light-primary)",
                    color: "var(--light-primary)",

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