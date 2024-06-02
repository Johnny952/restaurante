import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import toTitle from "@/helpers/to-title";
import Link from "next/link";
import { CategoryAPI } from "@/app/api/get-categories.types";

export function SubCategory({ category_name, image, link }: CategoryAPI & { link: string }) {
    return (
        <Card elevation={0} sx={{ backgroundColor: 'black' }}>
            <Link href={link}>
                <CardActionArea>
                    <div style={{ borderRadius: '10%', border: '1px solid #9c27b0' }}>
                        <CardMedia
                            component='img'
                            alt='subcategoria'
                            image={image}
                            sx={{ borderRadius: '10%' }}
                        />
                    </div>
                    <CardContent>
                        <Typography variant="subtitle2" color='white' textAlign='center'>
                            {toTitle(category_name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}