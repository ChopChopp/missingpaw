import React from "react";
import {ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View,} from "react-native";
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
        <ScrollView style={[styles.container, {backgroundColor: theme.backgroundLight}]} contentContainerStyle={styles.innerContainer}>
            <View style={{alignItems: "flex-start"}}>
                <TouchableOpacity style={[styles.backButton, {backgroundColor: theme.backgroundModern}]} onPress={() => toggleDetailedView()}>
                    <ThemedText>Back</ThemedText>
                </TouchableOpacity>
            </View>
            <View style={styles.inner}>
                <ThemedText style={styles.label}>Sighting date:</ThemedText>
                <View style={[styles.innerTextDate, {borderColor: theme.border}]}>
                    <ThemedText style={styles.text}>{date}</ThemedText>
                </View>
            </View>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Location</ThemedText>
                <View style={[styles.innerText, {borderColor: theme.border}]}>
                    <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={4}
                                style={styles.text}>{sighting.location}</ThemedText>
                </View>
            </View>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Description</ThemedText>
                <View style={[styles.innerText, {borderColor: theme.border}]}>

                    <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={4}
                                style={styles.text}>{sighting.description}</ThemedText>
                </View>
            </View>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Reporter</ThemedText>
                <View style={[styles.innerTextReporter, {borderColor: theme.border}]}>

                    <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={2}
                                style={styles.text}>{sighting.reporter}</ThemedText>
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    innerContainer: {
        flex: 1,
    },
    textContainer: {
        backgroundColor: "yellow",
    },
    innerText: {
        flex: .9,
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
    }, innerTextDate: {
        flex: .9,
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: "column",
        justifyContent: "center",
    },
    innerTextReporter: {
    flex: .9,
        borderWidth: 1,
        marginHorizontal: 10,
        justifyContent: "flex-end",
},
    text: {
        fontSize: 14,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontStyle: "italic",
        alignSelf: "center",
    },
    inner: {
        flex: .2,
    },
    backButton: {
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 10
    },
});

export default SightingsView;