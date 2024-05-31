import toTitle from "@/helpers/to-title";
import Background from "../../../components/background";
import RestaurantHeader from "../../../components/header";
import { dishes } from "../../constants/dishes";
import { Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import formatPrice from "@/helpers/format-price";
import MenuButton from "../../components/menu-button";
import BackButton from "../../components/back-button";

export default function DishPage({ params: { dish } }: { params: { dish: string } }) {
    return (
        <Background image={dishes[0].image || ""}>
            <RestaurantHeader title={toTitle(dishes[0].name)} />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12} sm={6} display='flex' justifyContent='center'>
                        <div style={{ borderRadius: '5%', border: '3px solid #9c27b0', display: 'inline-block' }}>
                            <Image
                                alt="plato"
                                src={dishes[0].image || ""}
                                sizes="100vw"
                                width='100'
                                height='100'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '5%',
                                    maxWidth: '300px'
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} textAlign='center'>
                                <Typography variant="body1">{dishes[0].description}</Typography>
                            </Grid>
                            <Grid item xs={12} textAlign='center'>
                                <Typography variant="h4">{formatPrice(dishes[0].price)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
            <MenuButton />
            <BackButton />
        </Background >
    )
}