import { Box, Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import RestaurantHeader from "./components/header";
import Background from "./components/background";
import baseBackgroundImage from "@/../public/main-bg.png"
import Link from "next/link";
import { getLanguages } from "@/app/api/get-languages";
import { notFound } from "next/navigation";

const idioms = [
    {
        name: 'Español',
        link: 'es',
    },
    {
        name: 'English',
        link: 'en',
    },
    {
        name: 'French',
        link: 'fr',
    }
]

export default async function RestaurantePage({ params: { restaurante } }: { params: { restaurante: string } }) {
    const languages = (await getLanguages(restaurante)).rows.map((row) => row.language);
    if (languages.length === 0) {
        notFound();
    }
    return (
        <Background image={baseBackgroundImage.src}>
            <RestaurantHeader />
            <Container>
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: '100%' }}>
                        {
                            idioms.filter((idiom) => languages.includes(idiom.link)).map((idiom, idx) => (
                                <ListItem disablePadding key={idx}>
                                    <div style={{ textAlign: 'center', width: '100%' }}>
                                        <Link href={`${restaurante}/${idiom.link}`} style={{ color: 'white', colorScheme: 'dark', textDecoration: 'none' }}>
                                            <ListItemButton>
                                                <ListItemText primary={idiom.name} sx={{ textAlign: 'center' }} primaryTypographyProps={{
                                                    fontSize: 20,
                                                    fontWeight: 'medium',
                                                    letterSpacing: 0,
                                                }} />
                                            </ListItemButton>
                                        </Link>
                                    </div>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Container>
        </Background>
    )
}