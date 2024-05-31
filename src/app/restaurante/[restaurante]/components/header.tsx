import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import logoImage from "@/../public/logo.png"

const logoWidth = 500;
const logoHeight = 500;

export default function RestaurantHeader({ title = "LANGUAGES" }: { title?: string }) {
    return (
        <div style={{
            boxShadow: 'inset 0px 100px 50px 0px rgba(0,0,0,0.70)',
        }}>
            <Container>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Image src={logoImage} alt="Logo" width={Math.floor(logoWidth / 2)} height={Math.floor(logoHeight / 2)} />
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