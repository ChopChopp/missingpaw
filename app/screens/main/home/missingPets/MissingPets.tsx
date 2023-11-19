import * as React from "react";
import {SafeAreaView} from "react-native";
import ThemedText from "../../../../helper/themedText/ThemedText";

const MissingPets = ({userData}: any) => {

    return (
        <SafeAreaView>
            <ThemedText>
                MissingPets
            </ThemedText>
        </SafeAreaView>
    );
}

export default MissingPets;