import React, {useState, useEffect} from "react";
import {StyleSheet, Button, SafeAreaView, Text, useColorScheme, Alert} from "react-native";
import Login from "./login/Login";
import Register from "./register/Register";
import {DarkTheme, LightTheme} from "../../helper/theme/Theme";
import TermsAndConditions from "./termsAndConditions/TermsAndConditions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Authentication = ({fetchUserData}: any) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;
    const [showRegister, setShowRegister] = useState(true);
    const [accepted, setAccepted] = useState(false);

    const acceptTerms = async () => {
        try {
            await AsyncStorage.setItem('termsAccepted', 'true');
            setAccepted(true)
        } catch (error) {
            Alert.alert("An error occurred while storing terms accepted data. " +
                "Please report to application support.", "" + error);
        }
    };

    useEffect(() => {
        const checkTermsAccepted = () => {
            try {
                AsyncStorage.getItem('termsAccepted').then(value => value && setAccepted(true));
            } catch (error) {
                Alert.alert(
                    "An error occurred while retrieving terms accepted data. " +
                    "Please report to application support.",
                    "" + error
                );
            }
        };

        checkTermsAccepted();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!accepted ?
                <TermsAndConditions acceptTerms={acceptTerms}/>
                :
                <>
                    <Text style={[styles.title, {color: textColor}]}>Missing Paw</Text>
                    {showRegister ? <Register fetchUserData={fetchUserData}/> : <Login fetchUserData={fetchUserData}/>}
                    <Button
                        title={showRegister ? "Switch to Login" : "Switch to Register"}
                        onPress={() => setShowRegister(!showRegister)}
                    /></>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
    },
});

export default Authentication;
