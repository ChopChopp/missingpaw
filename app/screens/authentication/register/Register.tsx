import React, {useState} from "react";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../../../../FirebaseConfig";
import {ref, set} from "firebase/database";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ActivityIndicator, useColorScheme,
} from "react-native";
import {DarkTheme, LightTheme} from "../../../helper/theme/Theme";

const Register = ({fetchUserData}: any) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;
    const auth = FIREBASE_AUTH;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState("");

    const signUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const uid = response.user.uid;

            const userData = {
                id: uid,
                firstName: firstName,
                lastName: lastName,
                email: email,
            };

            const userRef = ref(FIREBASE_DATABASE, "users/" + uid);
            await set(userRef, userData);
            fetchUserData(uid);

            console.info("User created and data saved!");

        } catch (error: any) {
            console.error("Sign up  failed: " + error);
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
            extraScrollHeight={focus === "email" ? 100 : 50}
            keyboardOpeningTime={0}
        >
            <>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="First name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                    onFocus={() => setFocus("firstname")}
                />
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    autoCapitalize="none"
                    keyboardType="default"
                    onFocus={() => setFocus("lastname")}
                />
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => setFocus("email")}
                />
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry
                    onFocus={() => setFocus("password")}
                />
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChangeText={(password) => setConfirmPassword(password)}
                    secureTextEntry
                    onFocus={() => setFocus("confirmPassword")}
                />

                <View style={styles.actionContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff"/>
                    ) : (
                        <>
                            <Button title="Create account" onPress={signUp}/>
                        </>
                    )}
                </View>
            </>
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

export default Register;
