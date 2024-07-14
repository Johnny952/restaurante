import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface IncompleteProduct {
    id: string;
    name: string;
    link: string;
    price: number;
    image: string;
    restaurant: string;
    language: string;
    category: string;
}

interface Product extends IncompleteProduct {
    quantity: number;
}

interface FavState {
    products: Record<string, Product>;
    addProduct: (product: IncompleteProduct) => void;
    addOneProduct: (id: string) => void;
    subProduct: (id: string) => void;
    removeProduct: (id: string) => void;
    clear: () => void;
}

const useFavStore = create<FavState>()(
    devtools(
        persist(
            (set) => ({
                products: {},
                addProduct: (product) =>
                    set((state) => {
                        const storedProduct = state.products[product.id];
                        return {
                            products: {
                                ...state.products,
                                [product.id]: storedProduct
                                    ? {
                                          ...storedProduct,
                                          quantity: storedProduct.quantity + 1,
                                      }
                                    : { ...product, quantity: 1 },
                            },
                        };
                    }),
                addOneProduct: (id) =>
                    set((state) => {
                        const storedProduct = state.products[id];
                        if (storedProduct) {
                            return {
                                products: {
                                    ...state.products,
                                    [id]: {
                                        ...storedProduct,
                                        quantity: storedProduct.quantity + 1,
                                    },
                                },
                            };
                        }
                        return state;
                    }),
                subProduct: (id) =>
                    set((state) => {
                        const storedProduct = state.products[id];
                        if (!storedProduct) return state;
                        if (storedProduct.quantity > 1) {
                            return {
                                products: {
                                    ...state.products,
                                    [id]: {
                                        ...storedProduct,
                                        quantity: storedProduct.quantity - 1,
                                    },
                                },
                            };
                        } else {
                            const { [id]: _, ...rest } = state.products;
                            return { products: rest };
                        }
                    }),
                removeProduct: (id) =>
                    set((state) => {
                        const { [id]: _, ...rest } = state.products;
                        return { products: rest };
                    }),
                clear: () =>
                    set((state) => {
                        return { products: {} };
                    }),
            }),
            {
                name: "favorite-storage",
            }
        )
    )
);

export default useFavStore;
