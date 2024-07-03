"use client";
import { Box } from "@mui/material";
import CustomIconButton from "../../components/category/custom-icon-button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <Box sx={{ position: "fixed", bottom: "15px", left: "15px" }}>
            <CustomIconButton
                size="large"
                aria-label="back"
                onClick={() => router.back()}
            >
                <ArrowBackIosNewIcon />
            </CustomIconButton>
        </Box>
    );
}
