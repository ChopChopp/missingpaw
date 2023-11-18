import * as React from "react";
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    StyleSheet, useColorScheme, Appearance,
} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {DarkTheme, LightTheme} from "../../../helper/theme/Theme";

const auth = getAuth();

export default function Settings({navigation, route}: any) {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;
    const {userData} = route.params;

    if (!userData) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    const styles = StyleSheet.create({
        text: {
            fontSize: 16,
            marginBottom: 8,
            color: textColor
        },
        title: {
            fontSize: 26,
            fontWeight: "bold",
            color: textColor
        }
    });

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text
                onPress={() => navigation.navigate("Home" as never)}
                style={styles.title}
            >
                从上图e拉走他😎
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


