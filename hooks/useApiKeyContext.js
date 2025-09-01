import { useContext } from "react";
import { ApiKeyContext } from "@/constants/Constants";

export function useApiKeyContext() {
    const context = useContext(ApiKeyContext);

    if (context === null || context === undefined) {
        throw new Error('useApiKeyContext must be used within an ApiKeyContextProvider');
    }

    return context;
}
