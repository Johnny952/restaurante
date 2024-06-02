'use client'
import { Box, Drawer, ImageList, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";

const NewImageList = styled(ImageList)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
        opacity: 0.8,
    },
}));

export default function ImageListWithStyle(props: { children: NonNullable<React.ReactNode>, drawer: ReactElement, hasSubcategories: boolean, link: string }) {
    const { children, drawer, hasSubcategories, link } = props;
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    function onClick() {
        if (hasSubcategories) {
            setOpen(true)
        } else {
            router.push(link)
        }
    }

    return (
        <div>
            <NewImageList cols={1} variant="standard" onClick={onClick}>
                {children}
            </NewImageList>
            <Drawer
                anchor='bottom'
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{ width: 'auto', background: 'black' }}
                    role="presentation"
                    onClick={() => setOpen(false)}
                    onKeyDown={() => setOpen(false)}
                >
                    {drawer}
                </Box>
            </Drawer>
        </div>
    )
}