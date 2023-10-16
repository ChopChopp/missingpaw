import * as React from "react";
import { View, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";

const auth = getAuth();

type Props = {
  navigation: NavigationProp<Record<string, object>>;
};

export default function Settings({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home" as never)}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Settings
      </Text>
      <Button
        title={"Sign out"}
        onPress={() =>
          signOut(auth)
            .then(() => {
              alert("Sign out successful!");
            })
            .catch((error) => {
              alert("Sign out failed: " + error);
            })
        }
      />
    </View>
  );
}
