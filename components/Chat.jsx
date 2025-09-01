import { View, Text, StyleSheet, TextInput, Pressable, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/hooks/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { USER } from "@/constants/Constants";
import user from '@/assets/images/user.png';
import gpt from '@/assets/images/ai.png';

export default function Chat() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const { getCompletion, messages } = useApi();
    const flatListRef = useRef(null);

    const send = async () => {
        const content = text.trim();
        if (content.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
            setText("");
            setLoading(true);
            await getCompletion(content);
            setLoading(false);
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    };

    const render = ({ item }) => {
        const isUser = item.role === USER;
        return <View style={[styles.message, isUser ? styles.person : styles.response]}>
            <Image source={isUser ? user : gpt} style={styles.image} />
            <Text style={styles.text} selectable>{item.content}</Text>
        </View>;
    };

    return <SafeAreaView style={styles.safe} edges={["bottom"]}>
        <FlatList ref={flatListRef} data={messages} renderItem={render} keyExtractor={(item, index) => index.toString()} ListFooterComponent={ loading ? <ActivityIndicator style={styles.footer} /> : null } />
        <View style={styles.input}>
            <View style={styles.wrapper}>
                <TextInput style={styles.entry} value={text} onChangeText={setText} placeholder="Message" placeholderTextColor={"#FFF7"} editable={!loading} multiline />
            </View>
            <Pressable style={styles.send} onPress={send} disabled={loading}>
                <Ionicons name="send" size={24} color="white" />
            </Pressable>
        </View>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    input: {
        flexDirection: "row",
        padding: 8,
    },
    wrapper: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#2F2F2F",
        borderRadius: 16,
        minHeight: 40,
        backgroundColor: "#242424",
        justifyContent: "center",
        paddingHorizontal: 12,
    },
    entry: {
        color: "#FFF",
        fontSize: 16,
    },
    send: {
        backgroundColor: '#18191a',
        borderRadius: 99,
        padding: 12,
        marginLeft: 8,
        alignSelf: "flex-end",
        borderWidth: 2,
        borderColor: "#2F2F2F",
    },
    message: {
        gap: 12,
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    person: {
        backgroundColor: "#212121",
    },
    response: {
        backgroundColor: "#0D0D0D",
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap",
        color: "#FFF",
        alignSelf: "center"
    },
    footer: {
        marginTop: 20,
    },
});
