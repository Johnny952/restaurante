import React, { useState } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Select,
    MenuItem,
    Rating,
    TextField,
    Button,
    ThemeProvider,
    createTheme,
    useMediaQuery,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import FeedbackIcon from "@mui/icons-material/Feedback";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple[300],
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
    },
});

const FeedbackDrawer = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const [feedbackType, setFeedbackType] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const isMobile = useMediaQuery(darkTheme.breakpoints.down("sm"));

    const handleSubmit = () => {
        console.log({ feedbackType, rating, comment });
        onClose();
        setFeedbackType("");
        setRating(0);
        setComment("");
    };

    const feedbackContent = (
        <Box
            sx={{
                width: isMobile ? "100vw" : "400px",
                padding: 3,
                height: isMobile ? "auto" : "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6">Enviar Feedback</Typography>
                <IconButton onClick={() => onClose()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="" disabled>
                    Seleccione el tipo de feedback
                </MenuItem>
                <MenuItem value="bug">Reporte de error</MenuItem>
                <MenuItem value="feature">Sugerencia de función</MenuItem>
                <MenuItem value="improvement">Mejora</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
            </Select>
            <Box sx={{ mb: 2 }}>
                <Typography component="legend">Calificación</Typography>
                <Rating
                    name="feedback-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue || 0);
                    }}
                />
            </Box>
            <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                placeholder="Escriba su feedback aquí"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: "auto" }}
            >
                Enviar Feedback
            </Button>
        </Box>
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => onClose()}
                PaperProps={{
                    sx: {
                        backgroundColor: "background.paper",
                        color: "text.primary",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        maxHeight: "90vh",
                        overflowY: "auto",
                        alignItems: "center",
                    },
                }}
            >
                {feedbackContent}
            </Drawer>
        </ThemeProvider>
    );
};

export default FeedbackDrawer;
