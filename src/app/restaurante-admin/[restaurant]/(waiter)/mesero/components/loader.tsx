import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
    return (
        <Backdrop sx={{ color: "#fff", zIndex: 999999 }} open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
