import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiKeyContext } from "@/constants/Constants";

export default function ApiKeyContextProvider({ children }) {
    const [state, setState] = useState("");

    useEffect(() => {
        const loadKey = async () => {
            const key = await AsyncStorage.getItem("key");
            if (key === null) {
                setKey("");
            } else {
                setKey(key);
            }
        };
        loadKey();
    }, []);

    const setKey = async (key) => {
        setState(key);
        await AsyncStorage.setItem("key", key);
    };

    return <ApiKeyContext.Provider value={{ state, setKey }}>
        {children}
    </ApiKeyContext.Provider>;
}
