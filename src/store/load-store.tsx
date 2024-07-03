import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { } from "@redux-devtools/extension";

interface LoadState {
    loading: boolean;
    toggleLoading: () => void;
    setLoading: (newState: boolean) => void;
}

const useLoadStore = create<LoadState>()(
    devtools(
        persist(
            (set) => ({
                loading: false,
                toggleLoading: () =>
                    set((state) => ({ loading: !state.loading })),
                setLoading: (newState) =>
                    set((state) => ({ loading: newState })),
            }),
            {
                name: "load-storage",
            }
        )
    )
);

export default useLoadStore;
