import * as React from "react";
import {SafeAreaView} from "react-native";
import ThemedText from "../../../../helper/themedText/ThemedText";

const YourPet = ({userData}: any) => {
    console.log(userData)
    console.log(userData.email)
    return (
        <SafeAreaView>
            <ThemedText>
                YourPet
            </ThemedText>
        </SafeAreaView>
    );
};

export default YourPet;
