import React from "react";
import {StyleSheet, useColorScheme, View,} from "react-native";
import ThemedText from "../../../../helper/themedComponents/themedText/ThemedText";
import {DarkTheme, LightTheme} from "../../../../helper/theme/Theme";

const SightingsView = ({sighting}: any) => {
    const separatorColor = useColorScheme() === 'dark' ? DarkTheme.colors.secondary : LightTheme.colors.secondary;

    const date = new Date(sighting.date).toLocaleString('de-CH', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    return (
        <View style={styles.container}>
            <ThemedText style={styles.innerText}>{date}</ThemedText>

            <View style={[styles.underline, {backgroundColor: separatorColor}]}/>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Location</ThemedText>
                <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={4}
                            style={styles.text}>{sighting.location}</ThemedText>
            </View>

            <View style={[styles.underline, {backgroundColor: separatorColor}]}/>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Description</ThemedText>
                <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={4}
                            style={styles.text}>{sighting.description}</ThemedText>
            </View>

            <View style={[styles.underline, {backgroundColor: separatorColor}]}/>

            <View style={styles.inner}>
                <ThemedText style={styles.label}>Reporter</ThemedText>
                <ThemedText selectable ellipsizeMode={'tail'} numberOfLines={2}
                            style={styles.text}>{sighting.reporter}</ThemedText>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#3a3a3c",
        backgroundColor: "#1c1c1e",
        marginVertical: 10,
    },
    text: {
        fontSize: 14,
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontStyle: "italic",
        paddingHorizontal: 10,
        flexBasis: "25%",
        alignSelf: "center",
    },
    inner: {
        flexDirection: "row",
    },
    innerText: {
        fontSize: 12,
        textAlign: "center",
    },
    underline: {
        height: .5,
        width: '95%',
        alignSelf: 'center',
    },
});

export default SightingsView;