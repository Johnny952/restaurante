import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { } from "@redux-devtools/extension";

interface IncompleteProduct {
    id: string
    name: string
    link: string
    price: number
}

interface Product extends IncompleteProduct {
    quantity: number
}

interface FavState {
    products: Record<string, Product>;
    addProduct: (product: IncompleteProduct) => void;
    subProduct: (id: string) => void;
    removeProduct: (id: string) => void;
}

const useFavStore = create<FavState>()(
    devtools(
        persist(
            (set) => ({
                products: {},
                addProduct: (product) => set((state) => {
                    const storedProduct = state.products[product.id];
                    return {
                        products: {
                            ...state.products,
                            [product.id]: storedProduct
                                ? { ...storedProduct, quantity: storedProduct.quantity + 1 }
                                : { ...product, quantity: 1 }
                        }
                    };
                }),
                subProduct: (id) => set((state) => {
                    const storedProduct = state.products[id];
                    if (!storedProduct) return state;
                    if (storedProduct.quantity > 1) {
                        return {
                            products: {
                                ...state.products,
                                [id]: { ...storedProduct, quantity: storedProduct.quantity - 1 }
                            }
                        };
                    } else {
                        const { [id]: _, ...rest } = state.products;
                        return { products: rest };
                    }
                }),
                removeProduct: (id) => set((state) => {
                    const { [id]: _, ...rest } = state.products;
                    return { products: rest };
                }),
            }),
            {
                name: "favorite-storage",
            }
        )
    )
);

export default useFavStore;