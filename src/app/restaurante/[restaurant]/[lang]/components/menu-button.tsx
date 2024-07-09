"use client";
import { Box, Button, Typography } from "@mui/material";
import CustomIconButton from "./category/custom-icon-button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import { purple } from "@mui/material/colors";
import { usePathname, useRouter } from "next/navigation";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ShoppingCart from "./shopping-cart";
import FeedbackDrawer from "./feedback";
import useFavStore from "@/store/fav-store";
import AnimatedBadge from "./animations/animated-badge";
import CustomMenu from "./custom-menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CustomOptionButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
        backgroundColor: purple[700],
        transform: "scale(1.05)",
    },
    borderRadius: "50px",
    marginTop: "4px",
    marginBottom: "4px",
    padding: "8px 16px",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    justifyContent: "flex-end",
}));

function OptionButton({
    icon,
    label,
    onClick,
}: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}) {
    return (
        <CustomOptionButton
            variant="contained"
            startIcon={icon}
            onClick={onClick}
        >
            <Typography variant="subtitle2">{label}</Typography>
        </CustomOptionButton>
    );
}

export default function MenuButton() {
    const router = useRouter();
    const pathName = usePathname();

    const [open, setOpen] = React.useState(false);
    const [openFav, setOpenFav] = React.useState(false);
    const [openFeed, setOpenFeed] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const productCount = useFavStore((state) =>
        Object.values(state.products).reduce(
            (sum, product) => sum + product.quantity,
            0
        )
    );

    const [prevCount, setPrevCount] = React.useState(0);

    React.useEffect(() => {
        setPrevCount(productCount);
    }, [productCount]);

    const options = [
        {
            label: "Home",
            icon: <HomeIcon />,
            onClick: () =>
                router.push(pathName?.split("/").slice(0, 4).join("/") || "/"),
        },
        {
            label: "Idiomas",
            icon: <LanguageIcon />,
            onClick: () =>
                router.push(pathName?.split("/").slice(0, 3).join("/") || "/"),
        },
        {
            label: "Feedback",
            icon: <FeedbackIcon />,
            onClick: () => setOpenFeed(true),
        },
        // {
        //     label: 'Promociones',
        //     icon: <HourglassBottomIcon />,
        //     onClick: () => { },
        // },
    ];

    return (
        <Box sx={{ position: "fixed", bottom: "15px", right: "15px" }}>
            <Box sx={{ position: "relative" }}>
                <AnimatedBadge
                    key={productCount}
                    badgeContent={productCount}
                    color="secondary"
                    prevCount={prevCount}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    sx={{
                        "& .MuiBadge-badge": {
                            right: 3,
                            top: 3,
                        },
                    }}
                >
                    <CustomIconButton
                        size="large"
                        aria-label="menu"
                        onClick={handleClick}
                        sx={{
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </CustomIconButton>
                </AnimatedBadge>

                <CustomMenu open={open}>
                    {options.map((option, idx) => (
                        <OptionButton key={idx} {...option} />
                    ))}
                    <AnimatedBadge
                        key={productCount}
                        badgeContent={productCount}
                        color="secondary"
                        prevCount={prevCount}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        sx={{
                            "& .MuiBadge-badge": {
                                left: -12,
                                top: "50%",
                                transform: "translateY(-50%)",
                            },
                        }}
                    >
                        <Box sx={{ width: 12 }} />
                        <OptionButton
                            label="Carrito"
                            icon={<ShoppingCartIcon />}
                            onClick={() => setOpenFav(true)}
                        />
                    </AnimatedBadge>
                </CustomMenu>
            </Box>

            <ShoppingCart open={openFav} onClose={() => setOpenFav(false)} />
            <FeedbackDrawer
                open={openFeed}
                onClose={() => setOpenFeed(false)}
            />
        </Box>
    );
}
