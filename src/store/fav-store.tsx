import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { DishType } from "@/lib/models/dishes";

interface Product extends DishType {
    quantity: number;
}

interface FavState {
    products: Record<number, Product>;
    addProduct: (product: DishType) => void;
    addOneProduct: (id: number) => void;
    subProduct: (id: number) => void;
    removeProduct: (id: number) => void;
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
