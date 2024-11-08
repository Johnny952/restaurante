import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    textTransform: "none",
                },
            },
        },
    },
});

export default theme;
