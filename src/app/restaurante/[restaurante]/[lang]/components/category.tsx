'use client'
import toTitle from "@/helpers/to-title";
import { Box, Drawer, Grid, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemButton, ListItemText, Typography, styled } from "@mui/material";
import Image from "next/image";
import genericImage from '@/../public/generic-dish.png';
import style from './category.module.css'
import { CategoryInterface, SubCategoryInterface } from "./category.d";
import React from "react";
import { SubCategory } from "./subcategory";
import { usePathname, useRouter } from "next/navigation";

const ImageListWithStyle = styled(ImageList)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
        opacity: 0.8,
    },
}));


export default function Category(props: CategoryInterface | SubCategoryInterface) {
    const { name, image = genericImage.src } = props;
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const pathname = usePathname();

    function onClick() {
        if ('subcategories' in props) {
            setOpen(true)
        } else if ('link' in props) {
            router.push(`${pathname}/${props.link}`)
        }
    }

    const DrawerContent = (
        <Box
            sx={{ width: 'auto', background: 'black' }}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
        >
            <Typography variant="subtitle2" color='white' sx={{ padding: '10px' }}>Seleccione la categoría de su preferencia</Typography>
            <Grid container spacing={2} rowSpacing={2} padding='10px'>
                {
                    'subcategories' in props ?
                        props.subcategories?.map((subcat, index) => (
                            <Grid key={index} item xs={4} sm={3} md={2}>
                                <SubCategory {...subcat} />
                            </Grid>
                        )) : null
                }
            </Grid>
        </Box>
    );

    return (
        <div>
            <ImageListWithStyle cols={1} variant="standard" onClick={onClick}>
                <ImageListItem>
                    <div className={style.outerBorder}>
                        <div className={style.innerBorder}>
                            <Image
                                alt="categoría"
                                src={image}
                                sizes="100vw"
                                width='100'
                                height='100'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>

                    <ImageListItemBar
                        title={toTitle(name)}
                        classes={{
                            title: style.categoryTitle
                        }}
                    />
                </ImageListItem>
            </ImageListWithStyle>
            <Drawer
                anchor='bottom'
                open={open}
                onClose={() => setOpen(false)}
            >
                {DrawerContent}
            </Drawer>
        </div>
    )
}