import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface SnackbarState {
    open: boolean;
    severity: "success" | "info" | "warning" | "error";
    text: string;
    setOpenError: (text: string) => void;
    setOpenSuccess: (text: string) => void;
    close: () => void;
}

const useSnackStore = create<SnackbarState>()(
    devtools(
        persist(
            (set) => ({
                open: false,
                severity: "success",
                text: "",
                setOpenError: (text: string) =>
                    set((state) => ({ open: true, severity: "error", text })),
                setOpenSuccess: (text: string) =>
                    set((state) => ({ open: true, severity: "success", text })),
                close: () => set((state) => ({ open: false })),
            }),
            {
                name: "snack-storage",
            }
        )
    )
);

export default useSnackStore;
