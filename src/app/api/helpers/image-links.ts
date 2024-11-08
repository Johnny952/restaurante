export function generateRestaurantLogoLink(restaurantLink: string) {
    return `restaurant/${restaurantLink}/logo.png`;
}

export function generateRestaurantImgLink(restaurantId: string) {
    return `restaurant/${restaurantId}/base-img.png`;
}

export function generateCategoryLink(restaurantId: string, categoryId: string) {
    return `restaurant/${restaurantId}/category/${categoryId}.png`;
}

export function generateDishLink(restaurantId: string, dishId: string) {
    return `restaurant/${restaurantId}/dish/${dishId}.png`;
}
