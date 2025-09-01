import { StyleSheet, useWindowDimensions } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import ApiKeyPage from "@/components/ApiKeyPage";
import Chat from "@/components/Chat";
import Images from "@/components/Images";
import Whisper from "@/components/Whisper";
import { Drawer } from "@/constants/Constants";

export default function DrawerNavigation() {
    const navigation = useNavigation();
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return <Drawer.Navigator initialRouteName="Chat" drawerContent={CustomDrawerContent} screenOptions={{ headerTintColor: "#FFF", headerStyle: { backgroundColor: "#0D0D0D" }, drawerType: isLargeScreen ? "permanent" : "front", headerLeft: isLargeScreen ? () => null : () => <Ionicons name="menu" size={24} color="white" style={styles.menu} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} /> }}>
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Images" component={Images} />
        <Drawer.Screen name="Whisper" component={Whisper} />
        <Drawer.Screen name="ApiKeyPage" component={ApiKeyPage} options={{ headerTitle: "API Key" }} />
    </Drawer.Navigator>;
}

const styles = StyleSheet.create({
    menu: {
        marginHorizontal: 14
    }
});
