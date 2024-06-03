import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { HeaderInterface } from "./header.d";
import { getRestaurante } from "../../api/get-restaurante";
import { notFound } from "next/navigation";
import { ImageAsync } from "../image-async";
import Image from "next/image";

const logoWidth = 500;
const logoHeight = 500;

export default async function RestaurantHeader({ title = "LANGUAGES", restaurante }: HeaderInterface) {
    const restauranteInformation = (await getRestaurante(restaurante)).rows
    if (restauranteInformation.length === 0) {
        notFound()
    }
    return (
        <div style={{
            boxShadow: 'inset 0px 100px 50px 0px rgba(0,0,0,0.70)',
        }}>
            <Container>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Box width={Math.floor(logoWidth / 2)} height={Math.floor(logoHeight / 2)}>
                                <ImageAsync
                                    src={restauranteInformation[0].image}
                                    alt="Logo"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    sizes="100vw"
                                    width={100}
                                    height={100}
                                    priority={true}
                                    radius="15"
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" textAlign='center'>
                            <Typography variant="h5">{title}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider variant="fullWidth" sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', paddingY: '20px' }} />
        </div>

    )
}