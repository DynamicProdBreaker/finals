import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { openBrowserAsync } from "expo-web-browser";
import { useApiKeyContext } from "@/hooks/useApiKeyContext";

export default function ApiKeyPage() {
    const { state, setKey } = useApiKeyContext();
    const [input, setInput] = useState(state);

    const saveKey = async () => {
        if (input.trim().length > 0) {
            setKey(input);
            Toast.show("API key saved", { duration: Toast.durations.SHORT });
        }
    };

    const deleteKey = async () => {
        setKey("");
        setInput("");
        Toast.show("API key removed", { duration: Toast.durations.SHORT });
    };

    const press = () => {
        if (state.length > 0) {
            deleteKey();
        } else {
            saveKey();
        }
    };

    return <View style={styles.top}>
        <Text>
            To access GPT, add an API key. API keys can be obtained from
            {" "}
            <Text style={styles.link} onPress={() => openBrowserAsync("https://platform.openai.com/api-keys")}>
                https://platform.openai.com/api-keys
            </Text>
            .
        </Text>
        <TextInput value={input} onChangeText={setInput} placeholder='Enter your API key' autoCorrect={false} autoCapitalize='none' style={styles.input} editable={state.length === 0} />
        <Pressable onPress={press} style={styles.button}>
            <Text style={styles.text}>
                {state.length > 0 ? 'Remove' : 'Save'}
            </Text>
        </Pressable>
    </View>;
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: "#0D0D0D",
    },
    label: {
        fontSize: 16,
        color: "#FFF",
    },
    link: {
        color: "#0F66CC",
        textDecorationLine: "underline",
    },
    input: {
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#2F2F2F",
        borderRadius: 8,
        padding: 8,
        marginVertical: 24,
        backgroundColor: "#FFF",
    },
    button: {
        backgroundColor: "#18191A",
        borderColor: "#2F2F2F",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
        alignSelf: "center",
        borderWidth: 2,
    },
    text: {
        color: '#fff',
        textAlign: "center",
        fontSize: 16,
    },
});
