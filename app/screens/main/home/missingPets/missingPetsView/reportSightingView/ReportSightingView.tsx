import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DarkTheme, LightTheme} from "../../../../../../helper/theme/Theme";
import ThemedText from "../../../../../../helper/themedComponents/themedText/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker"
import {ref, push, child, update} from "firebase/database";
import {FIREBASE_DATABASE} from "../../../../../../../FirebaseConfig";

let width = Dimensions.get('window').width;

const ReportSightingView = ({setShowReportSightingView, userData, userWithMissingPet}: any) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    const [location, setLocation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = useState(new Date());

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSubmitDisabled(location == "" || description == "");
    }, [location, description, date]);

    const handleDate = (_event: any, selectedDate: any) => {
        setDate(selectedDate);
    };

    const handleSubmitSighting = () => {
        setLoading(true);

        if (location === "" || description === "") {
            alert("Please fill out all fields!");
            setLoading(false);
            return;
        }

        const updates: any = {};
        let sightingKey = push(child(ref(FIREBASE_DATABASE), "users/" + userWithMissingPet.id + "/pet/0/sightings")).key

        updates["users/" + userWithMissingPet.id + "/pet/0/sightings/" + sightingKey] = {
            description: description,
            location: location,
            date: date,
            reporter: userData.email,
            seen: false,
        };

        update(ref(FIREBASE_DATABASE), updates).then(() => {
            Alert.alert("Reported", "Your sighting has been reported.\nThank you for your help!")
            setLoading(false)
        }).catch((error) => {
            Alert.alert("Error", "Failed to report your sighting.\n\nPlease try again." + error)
            console.error("Failed to report sighting:", error);
            setLoading(false)
        });

        setShowReportSightingView(false);
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.inner}
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            keyboardOpeningTime={0}
        >
            <View style={styles.backBtnContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => setShowReportSightingView(false)}>
                    <ThemedText>Back</ThemedText>
                </TouchableOpacity>
            </View>
            <ThemedText style={styles.title}>Report sighting of {userWithMissingPet.pet[0].name}</ThemedText>
            <ThemedText style={styles.label}>Location where you saw the pet</ThemedText>
            <TextInput
                style={[styles.input, {color: textColor}]}
                value={location}
                onChangeText={(text) => setLocation(text)}
                multiline={true}
                keyboardType="default"
                numberOfLines={4}
            />
            <ThemedText style={styles.label}>Description of the sighting and the pet</ThemedText>
            <TextInput
                style={[styles.input, {color: textColor}]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline={true}
                keyboardType="default"
                numberOfLines={4}
            />
            <ThemedText style={styles.label}>Date of the sighting</ThemedText>
            <DateTimePicker
                minimumDate={new Date(2023, 0, 1)}
                maximumDate={new Date()}
                testID="dateTimePicker"
                value={date}
                mode={'datetime'}
                onChange={handleDate}
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
        width: width,
    },
    inner: {
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
        marginTop: 32,
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 100,
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
    },
    backButton: {
        backgroundColor: "#8e8e93",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    backBtnContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
});

export default ReportSightingView;
