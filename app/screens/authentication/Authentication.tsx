import React, { useState } from "react";

import { StyleSheet, Button, SafeAreaView, Text } from "react-native";
import Login from "./login/Login";
import Register from "./register/Register";

const Authentication = ({}: any) => {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SIMÂO project</Text>

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
