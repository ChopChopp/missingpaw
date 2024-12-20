import React, {useState} from "react";
import {FIREBASE_AUTH} from "../../../../FirebaseConfig";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {signInWithEmailAndPassword} from "firebase/auth";

import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ActivityIndicator, useColorScheme,
} from "react-native";
import {DarkTheme, LightTheme} from "../../../helper/theme/Theme";

const Login = () => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.info("Logged in successfully for user " + response.user.uid);
        } catch (error: any) {
            alert("Sign in  failed: " + error);
            console.error("Failure", "Sign in  failed: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.inner}
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            keyboardOpeningTime={0}
        >
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={[styles.input, {color: textColor}]}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, {color: textColor}]}
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
            />

            <View style={styles.actionContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <>
                        <Button title="Login" onPress={signIn}/>
                    </>
                )}
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
    input: {
        width: "80%",
        height: 48,
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginBottom: 16,
    },
    actionContainer: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Login;
