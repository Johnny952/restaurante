import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { SubCategoryInterface } from "./category.d";
import toTitle from "@/helpers/to-title";
import { useRouter, usePathname } from "next/navigation";

export function SubCategory({ name, image, link }: SubCategoryInterface) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Card elevation={0} sx={{ backgroundColor: 'black' }}>
            <CardActionArea onClick={() => router.push(`${pathname}/${link}`)}>
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
                        {toTitle(name)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}