import { useState } from "react";
import { Alert } from "react-native";
import { OpenAI } from "openai";
import { useApiKeyContext } from "@/hooks/useApiKeyContext";
import { USER, GPT } from "@/constants/Constants";

export function useApi() {
    const [messages, setMessages] = useState([]);
    const { state } = useApiKeyContext();

    const getCompletion = async (content) => {
        if (state.length === 0) {
            Alert.alert("Error: No API key found");
        } else {
            const message = { content, role: USER };
            const history = [...messages, message];
            setMessages(history);

            try {
                const api = new OpenAI({ apiKey: state });
                const completion = await api.chat.completions.create({ model: "gpt-5", messages: history });
                const raw = completion.choices[0].message.content?.trim();
                const response = { content: "An error occurred", rule: GPT };
                if (raw !== null || raw !== undefined || raw.length > 0) {
                    response.content = raw;
                }
                setMessages((previous) => [...previous, response]);
            } catch (err) {
                const msg = err instanceof Error ? err.message : "An error occurred";
                const response = { content: msg, role: GPT };
                setMessages((previous) => [...previous, response]);
            }
        }
    };

    const generateImage = async (content) => {

        if (state.length === 0) {
            Alert.alert("Error: No API key found");
        } else {
            const message = { content, role: USER };

            const history = [...messages, message];
            setMessages(history);

            try {
                const api = new OpenAI({ apiKey: state });
                const response = await api.images.generate({
                    model: "dall-e-3",
                    prompt: content,
                    n: 1,
                    size: "1024x1024",
                });

                const image = {
                    content: "An error occurred",
                    role: GPT,
                };

                const raw = response.data[0]?.url;

                if (raw !== null || raw !== undefined || raw.length > 0) {
                    response.content = raw;
                }

                setMessages((previous) => [...previous, image]);

            } catch (err) {
                const msg = {
                    content: err instanceof Error ? err.message : "An error occurred",
                    role: GPT,
                };

                setMessages((previous) => [...previous, msg]);
            }
        }
    };

    const speechToText = async (audio) => {

        if (state.length === 0) {
            Alert.alert("Error: No API key found");
        } else {
            try {
                const form = new FormData();
                const data = {
                    uri: audio,
                    type: "audio/mp4",
                    name: "audio/m4a",
                };

                // (For a different model: https://platform.openai.com/docs/models)
                form.append("model", "whisper-1");
                form.append("file", data);

                const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${state}`,
                        "Content-Type": "multipart/form-data",
                    },
                    body: form,
                });

                return response.json();

            } catch (err) {
                Alert.alert("Error in recognizing speech: ", err);
            }
        }
    };

    return { messages, getCompletion, generateImage, speechToText };
}
