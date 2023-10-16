import React, { useEffect, useState } from "react";
import Authentication from "./app/screens/authentication/Authentication";
import { User, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { MainContainer } from "./app/screens/home/MainContainer";
const Stack = createNativeStackNavigator();
const InsideSatck = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideSatck.Navigator>
      <InsideSatck.Screen name="Main" component={MainContainer} />
    </InsideSatck.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user)
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        {user && !user.phoneNumber === undefined ? (
          <Stack.Screen
            name="Home"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
