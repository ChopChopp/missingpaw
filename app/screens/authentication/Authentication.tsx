import React, { useState } from "react";

import {StyleSheet, Button, SafeAreaView, Text, useColorScheme} from "react-native";
import Login from "./login/Login";
import Register from "./register/Register";
import {DarkTheme, LightTheme} from "../../helper/theme/Theme";

const Authentication = ({}: any) => {
  const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;
  const [showRegister, setShowRegister] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, {color: textColor}]}>Missing Paw</Text>

      {showRegister ? <Register /> : <Login />}
      <Button
        title={showRegister ? "Switch to Login" : "Switch to Register"}
        onPress={() => setShowRegister(!showRegister)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Authentication;
