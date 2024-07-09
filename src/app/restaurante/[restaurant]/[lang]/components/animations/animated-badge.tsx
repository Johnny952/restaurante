import React from "react";
import { Badge, BadgeProps } from "@mui/material";
import { styled, SxProps, Theme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { AnimatePresence, motion } from "framer-motion";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        transition: "all 0.3s",
        "&.MuiBadge-invisible": {
            transform: "scale(0)",
        },
    },
}));

interface AnimatedBadgeProps extends Omit<BadgeProps, "sx"> {
    prevCount?: number;
    sx?: SxProps<Theme>;
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
    prevCount,
    sx,
    ...props
}) => {
    const badgeContent = props.badgeContent;

    return (
        <StyledBadge
            {...props}
            badgeContent={
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={props.key}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {badgeContent}
                    </motion.div>
                </AnimatePresence>
            }
            sx={deepmerge(
                {
                    "& .MuiBadge-badge": {
                        position: "absolute",
                        overflow: "hidden",
                    },
                },
                sx || {}
            )}
        >
            {props.children}
        </StyledBadge>
    );
};

export default AnimatedBadge;
