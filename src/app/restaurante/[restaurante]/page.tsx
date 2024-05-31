'use client'
import { Box, Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import RestaurantHeader from "./components/header";
import Background from "./components/background";
import baseBackgroundImage from "@/../public/main-bg.png"
import { useRouter, usePathname } from "next/navigation";


const idioms = [
    {
        name: 'Español',
        link: 'es',
    },
    {
        name: 'English',
        link: 'en',
    }
]

export default function RestaurantePage({ params }: { params: { restaurante: string } }) {
    const router = useRouter();
    const pathName = usePathname();
    return (
        <Background image={baseBackgroundImage.src}>
            <RestaurantHeader />
            <Container>
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: '100%' }}>
                        {
                            idioms.map((idiom, idx) => (
                                <ListItem disablePadding key={idx}>
                                    <ListItemButton onClick={() => router.push(`${pathName}/${idiom.link}`)}>
                                        <ListItemText primary={idiom.name} sx={{ textAlign: 'center' }} primaryTypographyProps={{
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                            letterSpacing: 0,
                                        }} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Container>
        </Background>
    )
}