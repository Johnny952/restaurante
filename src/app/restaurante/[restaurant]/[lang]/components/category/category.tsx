import toTitle from "@/helpers/to-title";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import genericImage from "@/../public/root.png";
import style from "./category.module.css";
import React from "react";
import ImageListWithStyle from "./image-list-with-style";
import { CategoryAPI } from "@/app/api/categories/index.types";
import { getALlChildrenByLink } from "@/app/api/categories/get";
import { ImageAsync } from "@/components/image-async";
import SubCategoriesDrawer from "./subcategories-drawer";
import CategoryWrapper from "./category-wrapper";

export default async function Category(
    props: CategoryAPI & { restaurante: string; language: string }
) {
    const {
        name,
        link,
        image = genericImage.src,
        restaurante,
        language,
    } = props;
    const subcategories = await getALlChildrenByLink(
        restaurante,
        language,
        link
    );

    return (
        <ImageListWithStyle
            drawer={
                <SubCategoriesDrawer
                    subcategories={subcategories}
                    language={language}
                />
            }
            hasSubcategories={subcategories.length > 0}
            link={`${language}/${link}`}
        >
            <CategoryWrapper>
                <ImageListItem>
                    <div className={style.outerBorder}>
                        <div className={style.innerBorder}>
                            <ImageAsync
                                alt="categoría"
                                src={image}
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
                        title={toTitle(name)}
                        classes={{
                            title: style.categoryTitle,
                        }}
                    />
                </ImageListItem>
            </CategoryWrapper>
        </ImageListWithStyle>
    );
}
