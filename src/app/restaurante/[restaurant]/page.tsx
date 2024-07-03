import { Box, Container, List } from "@mui/material";
import RestaurantHeader from "./components/header/header";
import Background from "./components/background/background";
import { getByLink } from "@/app/api/languages/get";
import { notFound } from "next/navigation";
import { RestaurantPageProps } from "./page.d";
import IdiomButton from "@/app/restaurante/[restaurant]/components/idiom-button";
import toTitle from "@/helpers/to-title";
import { getBackground } from "@/app/api/restaurants/get";

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

    return (
        <Background image={mainBg}>
            <RestaurantHeader restaurant={restaurant} />
            <Container>
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
            </Container>
        </Background>
    );
}
