import { View, Text,StyleSheet, TextInput, Pressable, ActivityIndicator, Image, Dimensions, FlatList, Platform } from "react-native";
import React, { useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { USER } from "@/constants/Constants";

export default function Images() {

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const { generateImage, messages } = useApi();
    const flatListRef = useRef(null);

    const generate = async () => {
        if (text.trim().length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });

            const message = text.trim();
            setText('');
            setLoading(true);
            await generateImage(message);
            setLoading(false);

            flatListRef.current?.scrollToEnd({ animated: true });
        }
    };

    const render = ({ item }) => {
        const isUser = item.role === USER;

        return <View style={[styles.holder, isUser ? styles.user : styles.response]}>
            {isUser ?
                <Text style={styles.message} selectable>{item.content}</Text>
                :
                item.content.startsWith("https") ?
                    <Image style={styles.image} source={{ uri: item.content }} />
                    :
                    <Text style={styles.message} selectable>{item.content}</Text>
            }
        </View>;
    };

    return <SafeAreaView style={styles.safe} edges={['bottom']}>
        <FlatList ref={flatListRef} data={messages} renderItem={render} keyExtractor={(item, index) => index.toString()} ListFooterComponent={loading ? <ActivityIndicator style={styles.footer} /> : null} />
        <View style={styles.input}>
            <View style={styles.wrapper}>
                <TextInput style={styles.text} value={text} onChangeText={setText} placeholder="/imagine" placeholderTextColor={"#FFF7"} editable={!loading} multiline />
            </View>
            <Pressable style={styles.send} onPress={generate} disabled={loading}>
                <Ionicons name="image" size={24} color="white" />
            </Pressable>
        </View>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    input: {
        flexDirection: 'row',
        padding: 8,
    },
    wrapper: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#2F2F2F',
        borderRadius: 16,
        minHeight: 40,
        backgroundColor: '#242424',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    send: {
        backgroundColor: '#18191a',
        borderRadius: 99,
        padding: 12,
        marginLeft: 8,
        alignSelf: 'flex-end',
        borderWidth: 2,
        borderColor: '#2F2F2F',
    },
    holder: {
        gap: 12,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    user: {
        backgroundColor: '#212121',
    },
    response: {
        backgroundColor: '#0D0D0D',
    },
    image: {
        width: Dimensions.get('window').width - 24,
        height: Dimensions.get('window').width - 24,
    },
    message: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
        color: '#fff',
        alignSelf: 'center'
    },
    footer: {
        marginTop: 20,
    },
});
