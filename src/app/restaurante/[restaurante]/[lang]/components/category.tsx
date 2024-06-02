import toTitle from "@/helpers/to-title";
import { Grid, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import genericImage from '@/../public/root.png';
import style from './category.module.css'
import React from "react";
import { SubCategory } from "./subcategory";
import ImageListWithStyle from "./image-list-with-style";
import { CategoryAPI } from "@/app/api/get-categories.types";
import { getCategories } from "@/app/api/get-categories";
import Image from "next/image";

export default async function Category(props: CategoryAPI & { restaurante: string, language: string }) {
    const { category_name, category, image = genericImage.src, restaurante, language } = props;
    console.log(category_name, category)
    const subcategories = (await getCategories(restaurante, language, category)).rows

    const DrawerContent = (
        <div>
            <Typography variant="subtitle2" color='white' sx={{ padding: '10px' }}>Seleccione la categoría de su preferencia</Typography>
            <Grid container spacing={2} rowSpacing={2} padding='10px'>
                {
                    subcategories.length > 0 ?
                        subcategories?.map((subcat, index) => (
                            <Grid key={index} item xs={4} sm={3} md={2}>
                                <SubCategory {...subcat} link={`${language}/${subcat.category}`} />
                            </Grid>
                        )) : null
                }
            </Grid>
        </div>
    );

    return (
        <ImageListWithStyle drawer={DrawerContent} hasSubcategories={subcategories.length > 0} link={`${language}/${category}`}>
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
                    title={toTitle(category_name)}
                    classes={{
                        title: style.categoryTitle
                    }}
                />
            </ImageListItem>
        </ImageListWithStyle>
    )
}