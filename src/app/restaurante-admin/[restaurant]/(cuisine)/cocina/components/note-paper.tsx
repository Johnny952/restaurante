// components/NotePaper.tsx
import React from "react";
import { Paper, Box, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
    background: "#fff9dc",
    padding: theme.spacing(6, 2, 2, 2),
    position: "relative",
    minHeight: "300px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.5)",
    borderRadius: "0 0 4px 4px",
}));

const HolePunch = styled(Box)({
    position: "absolute",
    top: "-10px",
    width: "8px",
    height: "20px",
    borderRadius: "10px 10px 10px 10px",
    background: "rgba(0, 0, 0, 1)",
    boxShadow: "inset 0 -2px 5px rgba(0,0,0,,0.1)",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-5px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        left: "-2px",
        right: "10px",
        height: "12px",
        width: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 -5px 5px rgba(0,0,0,0.1)",
    },
});

interface NotePaperProps {
    children: React.ReactNode;
}

export const NotePaper: React.FC<NotePaperProps> = ({ children }) => {
    return (
        <StyledPaper elevation={3}>
            {[10, 40, 70, 100, 130, 160, 190, 220, 250, 280].map((left) => (
                <HolePunch key={left} sx={{ left: `${left}px` }} />
            ))}
            {children}
        </StyledPaper>
    );
};
