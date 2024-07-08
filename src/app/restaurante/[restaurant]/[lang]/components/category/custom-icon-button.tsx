"use client";
import { IconButton, IconButtonProps } from "@mui/material";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export default styled(IconButton)<IconButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    transition: 'all 0.3s ease-in-out',
    "&:hover": {
        backgroundColor: purple[700],
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px rgba(156, 39, 176, 0.4)',
    },
}));