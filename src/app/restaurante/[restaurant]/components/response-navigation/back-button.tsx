"use client";
import { Box } from "@mui/material";
import CustomIconButton from "./custom-icon-button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

export default function BackButton({
    disabled = false,
    onClickCallback = () => { },
}: {
    disabled?: boolean;
    onClickCallback?: () => void;
}) {
    const router = useRouter();
    function onClick() {
        onClickCallback()
        router.back()
    }
    return (
        <Box sx={{ position: "fixed", bottom: "15px", left: "15px" }}>
            <CustomIconButton
                size="large"
                aria-label="back"
                onClick={onClick}
                disabled={disabled}
            >
                <ArrowBackIosNewIcon />
            </CustomIconButton>
        </Box>
    );
}
