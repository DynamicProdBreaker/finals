import { View, StyleSheet } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function CustomDrawerContent(props) {
    return <View style={styles.top}>
        <DrawerContentScrollView {...props}>
            <DrawerItem label="GPT" labelStyle={styles.label} icon={() => <Ionicons name="create-outline" size={24} color="white" />} onPress={() => props.navigation.navigate("Chat")} />
            <DrawerItem label="DALL-E" labelStyle={styles.label} icon={() => <Ionicons name="image-outline" size={24} color="white" />} onPress={() => props.navigation.navigate("Images")} />
            <DrawerItem label="Whisper" labelStyle={styles.label} icon={() => <Ionicons name="mic-outline" size={24} color="white" />} onPress={() => props.navigation.navigate("Whisper")} />
        </DrawerContentScrollView>

        <View style={styles.footer}>
            <DrawerItem label="API Key" labelStyle={styles.label} icon={() => <Ionicons name="key-outline" size={24} color="white" />} onPress={() => props.navigation.navigate("ApiKeyPage")} />
            <DrawerItem label="Usage" labelStyle={styles.label} icon={() => <Ionicons name="podium-outline" size={24} color="white" />} onPress={() => openBrowserAsync("https://platform.openai.com/account/usage")} />
        </View>
    </View>;
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: '#171717',
        padding: 8,
        paddingTop: 16,
    },
    label: {
        color: "#FFF",
    },
    footer: {
        borderTopColor: "#FFFFFF33",
        borderTopWidth: 1,
        marginBottom: 20,
        paddingTop: 10,
    }
});
