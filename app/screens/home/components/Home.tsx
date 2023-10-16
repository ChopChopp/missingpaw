import * as React from "react";
import { View, Text } from "react-native";

import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<Record<string, object>>;
}

export default function Home({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home" as never)}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Home
      </Text>
    </View>
  );
}
