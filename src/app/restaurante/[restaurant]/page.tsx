import { Box, Container, List } from "@mui/material";
import RestaurantHeader from "./components/header/header";
import Background from "./components/background/background";
import { getByLink } from "@/app/api/languages/get";
import { notFound } from "next/navigation";
import { RestaurantPageProps } from "./page.d";
import IdiomButton from "@/app/restaurante/[restaurant]/components/idiom-button";
import toTitle from "@/helpers/to-title";
import { getBackground } from "@/app/api/restaurants/get";
import IdiomContainerWrapper from "./components/animation/idiom-container-wrapper";
import ResponsiveNavigation from "./components/response-navigation";

export default async function RestaurantPage({
    params: { restaurant },
}: RestaurantPageProps) {
    const responses = await Promise.all([
        getByLink(restaurant),
        getBackground(restaurant),
    ]);
    const languages = responses[0];
    if (languages.length === 0 || responses[1].length === 0) {
        notFound();
    }
    const mainBg = responses[1][0].background;
    const logo = responses[1][0].image;

    return (
        <Background image={mainBg}>
            <RestaurantHeader image={logo} />
            <Container>
                <IdiomContainerWrapper>
                    <Box display="flex" justifyContent="center">
                        <List sx={{ width: "100%" }}>
                            {languages.map((idiom, idx) => (
                                <IdiomButton
                                    key={idx}
                                    link={`${restaurant}/${idiom.link}`}
                                    name={toTitle(idiom.name) || ""}
                                />
                            ))}
                        </List>
                    </Box>
                </IdiomContainerWrapper>
            </Container>
            <ResponsiveNavigation
                disableBack={true}
                disableCategories={true}
                disableLanguage={true}
            />
        </Background>
    );
}
