import React from "react";
import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View,} from "react-native";
import ThemedText from "../../../../helper/themedComponents/themedText/ThemedText";
import {DarkTheme, LightTheme} from "../../../../helper/theme/Theme";

const SightingsView = ({sighting, toggleDetailedView}: any) => {
    const theme = useColorScheme() === 'dark' ? DarkTheme.colors : LightTheme.colors;

    const date = new Date(sighting.date).toLocaleString('de-CH', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    })

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundLight}]}>
            <View style={{alignItems: "flex-start"}}>
                <TouchableOpacity style={[styles.backButton, {backgroundColor: theme.backgroundModern}]}
                                  onPress={() => toggleDetailedView()}>
                    <ThemedText>Back</ThemedText>
                </TouchableOpacity>
            </View>
            <View style={styles.inner}>
                <ThemedText style={styles.label}>Sighting date:</ThemedText>
                <View style={[styles.innerTextDate, {borderColor: theme.border}]}>
                    <ThemedText style={styles.dateText}>{date}</ThemedText>
                </View>
            </View>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Location</ThemedText>
                <ScrollView style={[styles.innerText, {borderColor: theme.border}]}>
                    <ThemedText selectable
                                style={styles.text}>{sighting.location}</ThemedText>
                </ScrollView>
            </View>

            <View style={[styles.inner, {marginTop: 10}]}>
                <ThemedText style={styles.label}>Description</ThemedText>
                <ScrollView style={[styles.innerText, {borderColor: theme.border}]}>

                    <ThemedText selectable
                                style={styles.text}>{sighting.description}</ThemedText>
                </ScrollView>
            </View>

            <View style={styles.inner}>
                <View style={styles.contactReport}>
                    <TouchableOpacity style={styles.btn}
                                      onPress={() => Linking.openURL('mailto:' + sighting.reporter)}>
                        <Text
                            style={styles.btnText}>Contact reporter</Text>
                    </TouchableOpacity>

                    <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={1}
                                style={styles.label}>Reporter: {sighting.reporter}</ThemedText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    innerContainer: {},
    textContainer: {
        backgroundColor: "yellow",
    },
    innerText: {
        flex: .9,
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 10,
    }, innerTextDate: {
        flex: .9,
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: "column",
        justifyContent: "center",
    },
    dateText: {
        fontSize: 14,
        textAlign: "center",
    },
    text: {
        fontSize: 14,
    },
    label: {
        fontSize: 14,
        fontStyle: "italic",
        alignSelf: "center",
    },
    inner: {
        flex: 1,
    },
    backButton: {
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 15,
        marginLeft: 15
    },
    btn: {
        marginTop: 15,
        paddingTop: 20,
        paddingRight: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 5,
        width: '95%',
        backgroundColor: '#ff3b30',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    contactReport: {
        alignItems: "center",
        gap: 10,

    }
});

export default SightingsView;