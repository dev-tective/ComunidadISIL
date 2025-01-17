import {useContext} from "react";
import {AppContext} from "../AppContext.tsx";

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext debe ser usado dentro de un AppProvider");
    }
    return context;
}