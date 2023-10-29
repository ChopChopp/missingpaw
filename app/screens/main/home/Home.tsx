import * as React from "react";
import {View} from "react-native";
import {NavigationProp} from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<Record<string, object>>;
}

export default function Home({navigation, route}: any) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        </View>
    );
}
