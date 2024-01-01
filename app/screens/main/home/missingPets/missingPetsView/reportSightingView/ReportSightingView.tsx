import React, {useEffect, useState} from "react";
import {
    ActivityIndicator, SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, useColorScheme,
    View,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DarkTheme, LightTheme} from "../../../../../../helper/theme/Theme";

const ReportSightingView = ({setShowReportSightingView}: any) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const [location, setLocation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState("");

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSubmitDisabled(location == "" || description == "" || date !== "");
        console.log(submitDisabled)
    }, [location, description, date]);

    const handleSubmitSighting = () => {
        console.log("handleSubmitSighting");
        setLoading(true);

        if (location === "" || description === "" || date === "") {
            alert("Please fill out all fields!");
            setLoading(false);
            return;
        }
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.inner}
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            keyboardOpeningTime={0}
        >
            <Text style={styles.title}>Location</Text>
            <TextInput
                style={[styles.input, {color: textColor}]}
                placeholder="Location where you saw the pet"
                value={location}
                onChangeText={(text) => setLocation(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, {color: textColor}]}
                placeholder="Description of the sighting and the pet"
                value={description}
                onChangeText={(text) => setDescription(text)}
                keyboardType="default"
            />
            <TextInput
                style={[styles.input, {color: textColor}]}
                placeholder="Date of the sighting"
                value={date}
                onChangeText={(text) => setDate(text)}
                keyboardType="default"
            />

            <View style={styles.actionContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <TouchableOpacity disabled={submitDisabled}
                                      style={[styles.btn, submitDisabled ? styles.btnDisabled : styles.btnEnabled]}
                                      onPress={() => handleSubmitSighting()}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>

        </KeyboardAwareScrollView>
    );
}

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
        width: "100%",
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
    btn: {
        marginTop: 15,
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        backgroundColor: '#ff3b30',
    },
    btnDisabled: {
        backgroundColor: '#ff3b30',
        opacity: 0.5
    },
    btnEnabled: {
        backgroundColor: '#ff3b30',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default ReportSightingView;
