import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const Logo = styled("img")({
    height: 40,
    marginRight: 16,
});

const MotionAppBar = motion(AppBar);

interface HeaderProps {
    restaurantName: string;
    logoUrl: string;
}

export const Header: React.FC<HeaderProps> = ({ restaurantName, logoUrl }) => {
    return (
        <MotionAppBar
            sx={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
            position="static"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <Toolbar>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Logo src={logoUrl} alt={`${restaurantName} logo`} />
                </motion.div>
                <Typography variant="h6" component="div">
                    {restaurantName}
                </Typography>
            </Toolbar>
        </MotionAppBar>
    );
};
