import { Box, Container, List } from "@mui/material";
import RestaurantHeader from "./components/header/header";
import Background from "./components/background/background";
import { getRestLanguages } from "@/app/api/languages/get-languages";
import { notFound } from "next/navigation";
import { getRoot } from "@/app/api/categories/get-categories";
import { RestaurantePageProps } from "./page.d";
import IdiomButton from "@/app/restaurante/[restaurante]/components/idiom-button";
import toTitle from "@/helpers/to-title";

export default async function RestaurantePage({
    params: { restaurante },
}: RestaurantePageProps) {
    const responses = await Promise.all([
        getRestLanguages(restaurante),
        getRoot(restaurante),
    ]);
    const languages = responses[0].rows;
    const mainBg = responses[1].rows;
    if (languages.length === 0 || mainBg.length === 0) {
        notFound();
    }
    return (
        <Background image={mainBg[0].image}>
            <RestaurantHeader restaurante={restaurante} />
            <Container>
                <Box display="flex" justifyContent="center">
                    <List sx={{ width: "100%" }}>
                        {languages.map((idiom, idx) => (
                            <IdiomButton
                                key={idx}
                                link={`${restaurante}/${idiom.link}`}
                                name={toTitle(idiom.name) || ""}
                            />
                        ))}
                    </List>
                </Box>
            </Container>
        </Background>
    );
}
