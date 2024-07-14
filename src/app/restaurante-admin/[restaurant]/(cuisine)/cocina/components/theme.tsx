import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2C3E50", // Azul oscuro
            light: "#34495E",
        },
        secondary: {
            main: "#E74C3C", // Rojo
        },
        background: {
            default: "#ECF0F1", // Gris muy claro
            paper: "#FFFFFF",
        },
        text: {
            primary: "#2C3E50", // Azul oscuro
            secondary: "#7F8C8D", // Gris medio
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});
