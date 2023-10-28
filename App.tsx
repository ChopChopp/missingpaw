import React, { useEffect, useState } from "react";
import Authentication from "./app/screens/authentication/Authentication";
import { User, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "./FirebaseConfig";
import { MainContainer } from "./app/screens/main/MainContainer";
import { get, ref } from "firebase/database";

const Stack = createNativeStackNavigator();
const InsideSatck = createNativeStackNavigator();

function InsideLayout({ userData }: { userData: Object | null }) {
  return (
    <InsideSatck.Navigator>
      <InsideSatck.Screen
        name="Main"
        component={MainContainer}
        initialParams={{ userData: userData }}
      />
    </InsideSatck.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (uid: string) => {
    const userRef = ref(FIREBASE_DATABASE, "users/" + uid);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData(null);
        alert("No data available for this user.");
        console.log("No data available for this user.");
      }
    } catch (error) {
      alert("Error fetching user data:" + error);
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    user !== null && fetchUserData(user.uid);
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        {user ? (
          <Stack.Screen
            name="Home"
            component={(props: any) => <InsideLayout {...props} userData={userData} />}
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
