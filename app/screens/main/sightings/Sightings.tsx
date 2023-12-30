import React from "react";
import {SafeAreaView,} from "react-native";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";

const Sightings = ({route}: any) => {
    const {userData} = route.params;

    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ThemedText>
                {userData.firstName}
            </ThemedText>
        </SafeAreaView>
    );
}

export default Sightings;