import React, { useState, useRef } from "react";
import { getApp } from "firebase/app";
import { FIREBASE_AUTH } from "../../../../../FirebaseConfig";

import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

const app = getApp();

const PhoneRegistration = () => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const auth = FIREBASE_AUTH;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={{ margin: 10, textAlign: "left" }}>Enter phone number</Text>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification={true}
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="+41 12 345 67 89"
        keyboardType="numeric"
        textContentType="telephoneNumber"
        // onFocus={() => setFocus("phone")}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              "+41786682242",
              recaptchaVerifier.current!
            );
            setVerificationId(verificationId);
            window.alert("Verification code has been sent to your phone.");
          } catch (err) {
            window.alert("ERROR: " + err);
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            // const currentUser = firebase.auth().currentUser;
            // currentUser.linkWithCredential(phoneCredential);
            window.alert("Phone authentication successful 👍");
          } catch (err) {
            window.alert(err);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "80%",
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  actionContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PhoneRegistration;
