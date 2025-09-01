import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import DrawerNavigation from "@/components/DrawerNavigation";

export default function RootNavigator() {
    return <NavigationIndependentTree>
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    </NavigationIndependentTree>;
}
