import Background from "../components/background";
import baseBackgroundImage from "@/../public/main-bg.png"
import RestaurantHeader from "../components/header";
import { Container, Grid } from "@mui/material";
import Category from "./components/category";
import { CategoryInterface, SubCategoryInterface } from "./components/category.d";
import MenuButton from "./components/menu-button";

export const mainCategories: (CategoryInterface | SubCategoryInterface)[] = [
    {
        name: 'aperitivos',
        image: '/categories/aperitivos.png',
        subcategories: [
            {
                name: 'coctel o aperitivo',
                link: 'coctel',
                image: '/categories/coctel.png',
            },
            {
                name: 'aperitivo con macerado',
                link: 'macerado',
                image: '/categories/macerado.png'
            },
            {
                name: 'sour premium',
                link: 'sour',
                image: '/categories/sour.png'
            }
        ],
    },
    {
        name: 'entrada',
        image: '/categories/entrada.png',
        subcategories: [
            {
                name: 'ceviche',
                link: 'ceviche',
                image: '/categories/ceviche.png'
            },
            {
                name: 'chicharrones',
                link: 'chicharrones',
                image: '/categories/chicharrones.png'
            },
            {
                name: 'piqueos',
                link: 'piqueos',
                image: '/categories/piqueos.png'
            },
            {
                name: 'sopas',
                link: 'sopas',
                image: '/categories/sopas.png'
            },
            {
                name: 'tiraditos',
                link: 'tiraditos',
                image: '/categories/tiraditos.png'
            }
        ],
    },
    {
        name: 'ensaladas',
        image: '/categories/ensaladas.png',
        link: 'ensaladas',
    },
    {
        name: 'platos principales',
        image: '/categories/platos-principales.png',
        subcategories: [
            {
                name: 'acompañamientos',
                link: 'acompañamientos',
                image: '/categories/acompanamientos.png'
            },
            {
                name: 'arroces y risotos',
                link: 'arroces',
                image: '/categories/arroces.png'
            },
            {
                name: 'aves',
                link: 'aves',
                image: '/categories/aves.png'
            },
            {
                name: 'carnes',
                link: 'carnes',
                image: '/categories/carnes.png'
            },
            {
                name: 'causas',
                link: 'causas',
                image: '/categories/causas.png'
            },
            {
                name: 'gratinados',
                link: 'gratinados',
                image: '/categories/gratinados.png'
            },
            {
                name: 'pastas',
                link: 'pastas',
                image: '/categories/pastas.png'
            },
            {
                name: 'pescados y mariscos',
                link: 'pescados',
                image: '/categories/pescados.png'
            },
            {
                name: 'tacu tacu',
                link: 'tacu-tacu',
                image: '/categories/tacu-tacu.png'
            },
        ],
    },
    {
        name: 'menu niños',
        image: '/categories/menu-ninos.png',
        link: 'menu-ninos',
    },
    {
        name: 'postres',
        image: '/categories/postres.png',
        link: 'postres',
    },
    {
        name: 'bebestibles',
        image: '/categories/bebestibles.png',
        subcategories: [
            {
                name: 'cervezas',
                link: 'cervezas',
                image: '/categories/cervezas.png'
            },
            {
                name: 'destilados',
                link: 'destilados',
                image: '/categories/destilados.png'
            },
            {
                name: 'bebidas',
                link: 'bebidas',
                image: '/categories/bebidas.png'
            },
        ],
    },
    {
        name: 'bajativos',
        image: '/categories/bajativos.png',
        link: 'bajativos',
    },
    {
        name: 'café e infusiones',
        image: '/categories/cafe-infusiones.png',
        link: 'cafe-e-infusiones',
    },
    {
        name: 'bebidas de happy hour',
        image: '/categories/happy-hour.png',
        link: 'happy-hour',
    },
    {
        name: 'vinos',
        image: '/categories/vinos.png',
        subcategories: [
            {
                name: 'cabernet suavignon',
                link: 'cabernet-suavignon',
                image: '/categories/cabernet-suavignon.png'
            },
            {
                name: 'carmenere',
                link: 'carmenere',
                image: '/categories/carmenere.png'
            },
            {
                name: 'chardonay',
                link: 'chardonay',
                image: '/categories/chardonay.png'
            },
            {
                name: 'espumantes',
                link: 'espumantes',
                image: '/categories/espumantes.png'
            },
            {
                name: 'grandes vinos',
                link: 'grandes-vinos',
                image: '/categories/grandes-vinos.png'
            },
            {
                name: 'malbec',
                link: 'malbec',
                image: '/categories/malbec.png'
            },
            {
                name: 'merlot',
                link: 'merlot',
                image: '/categories/merlot.png'
            },
            {
                name: 'suavignon blanc',
                link: 'suavignon-blanc',
                image: '/categories/suavignon-blanc.png'
            },
            {
                name: 'syrah',
                link: 'syrah',
                image: '/categories/syrah.png'
            },
            {
                name: 'viognier',
                link: 'viognier',
                image: '/categories/viognier.png'
            },
        ],
    },
]

export default function LanguagePage({ params }: { params: { language: string } }) {
    return (
        <Background image={baseBackgroundImage.src}>
            <RestaurantHeader title="BIENVENIDO/A" />
            <Container sx={{ paddingY: '60px' }}>
                <Grid container spacing={1} rowSpacing={1}>
                    {
                        mainCategories.map((category, idx) => (
                            <Grid item xs={6} sm={4} md={2} key={idx}>
                                <Category {...category} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>

            <MenuButton />
        </Background>
    )
}