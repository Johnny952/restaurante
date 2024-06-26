import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Link from "next/link";
import { CategoryAPI } from "@/app/api/categories/index.types";
import { ImageAsync } from "@/components/image-async";

export function SubCategory({
    name,
    image,
    link,
}: CategoryAPI & { link: string }) {
    return (
        <Card elevation={0} sx={{ backgroundColor: "black" }}>
            <Link href={link}>
                <CardActionArea>
                    <div
                        style={{
                            borderRadius: "10%",
                            border: "1px solid #9c27b0",
                        }}
                    >
                        <ImageAsync
                            alt="subcategoria"
                            src={image}
                            sizes="100vw"
                            width={100}
                            height={100}
                            priority={true}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10%",
                            }}
                        />
                    </div>
                    <CardContent>
                        <Typography
                            variant="subtitle2"
                            color="white"
                            textAlign="center"
                        >
                            {toTitle(name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}
