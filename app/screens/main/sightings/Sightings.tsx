import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, View,} from "react-native";
import SightingsView from "./sightingsView/SightingView";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";

const Sightings = ({userData}: any) => {

    useEffect(() => {
        console.log(userData.pet !== undefined && userData.pet[0] !== undefined && userData.pet[0].sightings !== undefined && userData.pet[0].sightings[0].description);
        console.log(userData);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {userData.pet === undefined ? <ThemedText>You have no pet</ThemedText>
                : userData.pet[0].sightings === undefined ? <ThemedText>You have no sightings reported</ThemedText>
                    : userData.pet[0].sightings.map((sighting: object) => {
                        return <SightingsView
                            sighting={sighting}
                        />
                    })
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Sightings;