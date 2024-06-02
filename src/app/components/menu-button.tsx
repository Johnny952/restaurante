'use client'
import { Box, BoxProps, Button, Fade, Popper, Typography } from "@mui/material";
import CustomIconButton from "./category/custom-icon-button";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import { purple } from "@mui/material/colors";
import { usePathname, useRouter } from "next/navigation";
import FavoriteIcon from '@mui/icons-material/Favorite';

const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    padding: '15px'
}))

const CustomOptionButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
    borderRadius: '50px',
    marginTop: '4px',
    marginBottom: '4px'
}));

function OptionButton({ icon, label, onClick }: { icon: ReactNode, label: string, onClick: () => void }) {
    return (
        <CustomOptionButton
            variant="contained"
            startIcon={icon}
            onClick={onClick}
        >
            <Typography variant="subtitle2">{label}</Typography>
        </CustomOptionButton>
    )
}

export default function MenuButton() {
    const router = useRouter();
    const pathName = usePathname();

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const options = [
        {
            label: 'Home',
            icon: <HomeIcon />,
            onClick: () => router.push(pathName?.split('/').slice(0, 4).join('/') || '/'),
        },
        {
            label: 'Idiomas',
            icon: <LanguageIcon />,
            onClick: () => router.push(pathName?.split('/').slice(0, 3).join('/') || '/'),
        },
        {
            label: 'Favoritos',
            icon: <FavoriteIcon />,
            onClick: () => { },
        },
        // {
        //     label: 'Promociones',
        //     icon: <HourglassBottomIcon />,
        //     onClick: () => { },
        // },
    ]

    return (
        <Box sx={{ position: 'fixed', bottom: '15px', right: '15px' }}>
            <CustomIconButton size='large' aria-label="menu" onClick={handleClick}>
                {
                    open
                        ? <CloseIcon />
                        : <MenuIcon />
                }
            </CustomIconButton>

            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <CustomBox>
                            {
                                options.map((option, idx) => (
                                    <OptionButton key={idx} {...option} />
                                ))
                            }
                        </CustomBox>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}