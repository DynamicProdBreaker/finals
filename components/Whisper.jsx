import { Alert, View, Text, StyleSheet, Pressable, ActivityIndicator, Image, TextInput, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "@/hooks/useApi";
import { USER } from "@/constants/Constants";
import user from '@/assets/images/user.png';
import gpt from '@/assets/images/ai.png';

export default function Whisper() {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(null);

    const { speechToText, getCompletion, messages } = useApi();
    const flatListRef = useRef(null);

    // Start audio recording
    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
        } catch (err) {
            Alert.alert("Error starting recording:", err);
        }
    };

    // Stop audio recording and handle speech-to-text conversion
    const stopRecording = async () => {
        if (!recording) return;

        setRecording(null);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });

        upload();
    };

    // Handle audio file upload and speech-to-text conversion
    const upload = async () => {
        const uri = recording?.getURI();
        if (uri.length > 0) {
            setLoading(true);
            const result = await speechToText(uri);

            if (result?.error?.message) {
                Alert.alert("Error", result.error.message);
            } else {
                if (result !== null && result !== undefined) {
                    setText(result.text);
                }
            }

            setLoading(false);
        }
    };

    // Handle sending a user message
    const send = async () => {
        if (text.trim().length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });

            const message = text.trim();
            setText("");
            setLoading(true);
            await getCompletion(message);
            setLoading(false);

            flatListRef.current?.scrollToEnd({ animated: true });
        }
    };

    // Render a single message in the chat
    const render = ({ item }) => {
        const isUser = item.role === USER;

        return <View style={[styles.message, isUser ? styles.user : styles.response]}>
            <Image source={isUser ? user : gpt} style={styles.image} />
            <Text style={styles.rendered} selectable>{item.content}</Text>
        </View>;
    };


    return <SafeAreaView style={styles.safe} edges={["bottom"]}>
        <FlatList ref={flatListRef} data={messages} renderItem={render} keyExtractor={(item, index) => index.toString()} ListFooterComponent={loading ? <ActivityIndicator style={styles.footer} /> : null} />
        <View style={styles.input}>
            <View style={styles.wrapper}>
                <TextInput style={styles.text} value={text} onChangeText={setText} placeholder="Message" placeholderTextColor={"#FFF7"} editable={!loading && !recording} multiline />
            </View>
            <Pressable style={[styles.button, { backgroundColor: recording ? "#840F15" : "#18191A" }]} onPress={recording ? stopRecording : startRecording}>
                <Ionicons name="mic" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.button} onPress={send} disabled={loading || recording != null}>
                <Ionicons name="send" size={24} color="white" />
            </Pressable>
        </View>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#0D0D0D",
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
    text: {
        color: "#FFF",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#18191A",
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
    user: {
        backgroundColor: "#212121",
    },
    response: {
        backgroundColor: "#0D0D0D",
    },
    image: {
        width: 40,
        height: 40,
    },
    rendered: {
        fontSize: 16,
        flex: 1,
        flexWrap: "wrap",
        color: "#FFF",
        alignSelf: "center",
    },
    footer: {
        marginTop: 20,
    },
});
