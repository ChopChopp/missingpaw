import React, {useState} from "react";

import {
    View,
    Button,
    ActivityIndicator,
    StyleSheet, TouchableOpacity, Text, Alert,
} from "react-native";
import {getAuth, signOut, deleteUser, reauthenticateWithCredential} from "firebase/auth";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";
import {ref, remove} from "firebase/database";
import {FIREBASE_DATABASE} from "../../../../FirebaseConfig";
import firebase from "firebase/compat";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

const auth = getAuth();
const user = auth.currentUser;

const Settings = ({userData}: any) => {
    const [loading, setLoading] = useState(false);
    if (!userData) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    const promptForReauthentication = async () => {
        if (user) {
            Alert.prompt(
                "Reauthentication required",
                "Please enter your password to continue",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: (password: any) => {
                            const email: any = user.email
                            const credential: any = EmailAuthProvider.credential(email, password);

                            reauthenticateWithCredential(user, credential).then(() => {
                                console.info("Reauthentication successful");
                                handleDelete();
                            }).catch((error) => {
                                console.error("Reauthentication failed: " + error);
                                Alert.alert("Reauthentication failed", "Please try again");
                            })
                        },
                    },
                ],
                "secure-text"
            );
        }
    }

    const handleDelete = async () => {
        if (user) {
            setLoading(true);

            const userRef = ref(FIREBASE_DATABASE, "users/" + userData.id);
            remove(userRef).then(() => {
                console.info("User data deleted");
            }).catch((error) => {
                console.error("User data deletion failed: " + error);
            });

            deleteUser(user)
                .then(() => {
                    console.info("User deletion successful");
                    Alert.alert("Success", "Your account has been deleted.")
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("User deletion failed: " + error);
                    Alert.alert("Failure", "User account was not deleted: " + error)
                    setLoading(false);
                });
        } else {
            console.error("No user to delete");
        }
    };


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

            <TouchableOpacity style={styles.deleteBtn}
                              onPress={promptForReauthentication}>
                <Text
                    style={styles.btnText}>Delete Account</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#0000ff" style={{position: "absolute"}}/>}
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
    deleteBtn: {
        marginTop: 15,
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        width: '90%',
        backgroundColor: '#ff3b30',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default Settings;