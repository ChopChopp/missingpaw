import React from "react";
import {StyleSheet, View,} from "react-native";
import ThemedText from "../../../../helper/themedComponents/themedText/ThemedText";

const SightingsView = ({sighting}: any) => {
    return (
        <View style={styles.container}>

            <ThemedText>{"Report date: " + new Date(pet[0].missingSince).toLocaleString('de-CH', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })}</ThemedText>
            <ThemedText>{sighting.description}</ThemedText>
            <ThemedText>{sighting.location}</ThemedText>
            <ThemedText>{sighting.reporter}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 12,
        marginBottom: 8,
    },
});

export default SightingsView;