import { Box, Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import RestaurantHeader from "../../components/header/header";
import Background from "../../components/background";
import Link from "next/link";
import { getLanguages } from "@/app/api/get-languages";
import { notFound } from "next/navigation";
import { getRoot } from "@/app/api/get-categories";
import { RestaurantePageProps } from "./page.d";
import { motion } from "framer-motion";
import IdiomButton from "@/app/components/idiom-button";

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

export default async function RestaurantePage({ params: { restaurante } }: RestaurantePageProps) {
    const responses = await Promise.all([
        getLanguages(restaurante),
        getRoot(restaurante),
    ])
    const languages = responses[0].rows.map((row) => row.language);
    const mainBg = responses[1].rows
    if (languages.length === 0 || mainBg.length === 0) {
        notFound();
    }
    return (
        <Background image={mainBg[0].image}>
            <RestaurantHeader restaurante={restaurante} />
            <Container>
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: '100%' }}>
                        {
                            idioms.filter((idiom) => languages.includes(idiom.link)).map((idiom, idx) => (
                                <IdiomButton key={idx} link={`${restaurante}/${idiom.link}`} name={idiom.name} />
                            ))
                        }
                    </List>
                </Box>
            </Container>
        </Background>
    )
}