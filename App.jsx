import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import ApiKeyContextProvider from "@/components/ApiKeyContextProvider";
import RootNavigator from "@/components/RootNavigator";

export default function App() {
    return <ApiKeyContextProvider>
        <RootSiblingParent>
            <StatusBar style="light" />
            <RootNavigator />
        </RootSiblingParent>
    </ApiKeyContextProvider>;
}
