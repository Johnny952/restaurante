import toTitle from "@/helpers/to-title";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import genericImage from "@/../public/root.png";
import style from "./category.module.css";
import React from "react";
import ImageListWithStyle from "./image-list-with-style";
import { ImageAsync } from "@/components/image-async";
import CategoryWrapper from "./category-wrapper";
import { CategoryType } from "@/lib/models/categories";

export default async function Category(props: CategoryType) {
    const {
        category_name,
        category_link,
        category_image = genericImage.src,
    } = props;

    return (
        <ImageListWithStyle link={category_link}>
            <CategoryWrapper>
                <ImageListItem>
                    <div className={style.outerBorder}>
                        <div className={style.innerBorder}>
                            <ImageAsync
                                alt="categoría"
                                src={category_image}
                                sizes="100vw"
                                width={100}
                                height={100}
                                priority={true}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </div>
                    </div>

                    <ImageListItemBar
                        title={toTitle(category_name)}
                        classes={{
                            title: style.categoryTitle,
                        }}
                    />
                </ImageListItem>
            </CategoryWrapper>
        </ImageListWithStyle>
    );
}
