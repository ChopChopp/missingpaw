import * as React from "react";
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import {getAuth, signOut} from "firebase/auth";

const auth = getAuth();

export default function Profile({navigation, route}: any) {
    const {userData} = route.params;

    if (!userData) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text
                onPress={() => navigation.navigate("Home" as never)}
                style={{fontSize: 26, fontWeight: "bold"}}
            >
                Settings
            </Text>
            <Button
                title={"Sign out"}
                onPress={() =>
                    signOut(auth)
                        .then(() => {
                            alert("Sign out successful!");
                        })
                        .catch((error) => {
                            alert("Sign out failed: " + error);
                        })
                }
            />
            <Text style={styles.text}>ID: {userData.id}</Text>
            <Text style={styles.text}>Email: {userData.email}</Text>
            <Text style={styles.text}>First Name: {userData.firstName}</Text>
            <Text style={styles.text}>Last Name: {userData.lastName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
});
