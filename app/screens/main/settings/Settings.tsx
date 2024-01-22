import * as React from "react";
import {
    View,
    Button,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";

const auth = getAuth();

const Settings = ({userData}: any) => {
    if (!userData) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ThemedText style={styles.title}>Settings</ThemedText>
            <View style={styles.details}>
                <ThemedText style={styles.text}>Email: {userData.email}</ThemedText>
                <ThemedText style={styles.text}>First Name: {userData.firstName}</ThemedText>
                <ThemedText style={styles.text}>Last Name: {userData.lastName}</ThemedText>
            </View>
            <Button
                title={"Sign out"}
                onPress={() =>
                    signOut(auth)
                        .then(() => {
                            console.info("Sign out successful!");
                        })
                        .catch((error) => {
                            console.error("Sign out failed: " + error);
                        })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    details: {
        width: "80%",
        marginTop: 16,
        marginBottom: 16,
    },
});

export default Settings;