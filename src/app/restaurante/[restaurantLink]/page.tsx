import { Box, Container, List } from "@mui/material";
import RestaurantHeader from "../components/header/header";
import Background from "../components/background";
import IdiomButton from "@/app/restaurante/components/idiom-button";
import toTitle from "@/helpers/to-title";
import IdiomContainerWrapper from "../components/animation/idiom-container-wrapper";
import ResponsiveNavigation from "../components/response-navigation";
import { getByLink } from "@/lib/services/restaurant";
import NotFound from "../components/errors/not-found";
import VirtualTableLogo from "@/../public/logo.png";
import { getAllByRestaurantLink } from "@/lib/services/language";

interface Props {
    params: {
        restaurantLink: string;
    };
}

export default async function RestaurantPage({
    params: { restaurantLink },
}: Props) {
    const responses = await Promise.all([
        getAllByRestaurantLink(restaurantLink),
        getByLink(restaurantLink),
    ]);
    const languages = responses[0];
    const restaurant = responses[1];
    if (
        ("error" in languages && languages.status === 404) ||
        ("error" in restaurant && restaurant.status === 404)
    ) {
        return (
            <NotFound
                backLink="/"
                title="Restaurante no encontrado"
                description="Lo sentimos, este restaurante no existe."
                image={VirtualTableLogo.src}
            />
        );
    }
    if ("error" in languages || "error" in restaurant) {
        return null;
    }

    return (
        <Background image={restaurant.background_image || ""}>
            <RestaurantHeader image={restaurant.logo || ""} />
            <Container>
                <IdiomContainerWrapper>
                    <Box display="flex" justifyContent="center">
                        <List sx={{ width: "100%" }}>
                            {languages.map((idiom, idx) => (
                                <IdiomButton
                                    divKey={idx}
                                    key={idx}
                                    link={`${restaurant.link}/${idiom.language_code}`}
                                    name={toTitle(idiom.language_name) || ""}
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
                emptyCart={true}
            />
        </Background>
    );
}
