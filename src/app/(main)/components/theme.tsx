import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF6B35', // Naranja vibrante
        },
        secondary: {
            main: '#4ECB71', // Verde vibrante
        },
        background: {
            default: '#121212', // Negro elegante
            paper: '#1E1E1E', // Gris muy oscuro
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 500,
        },
        h6: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 500,
        },
        body1: {
            fontFamily: '"Merriweather", serif',
        },
        body2: {
            fontFamily: '"Merriweather", serif',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px',
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '15px',
                },
            },
        },
    },
});

export default theme;