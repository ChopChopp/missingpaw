import React, {useEffect, useState} from "react";
import Authentication from "./app/screens/authentication/Authentication";
import {User, onAuthStateChanged} from "firebase/auth";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "./FirebaseConfig";
import {MainContainer} from "./app/screens/main/MainContainer";
import {get, ref} from "firebase/database";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#8f8f8f",
    },
}

const InsideLayout = ({userData}: any) => {
    return (
        <InsideStack.Navigator screenOptions={{ headerShown: false}}>
            <InsideStack.Screen
                name="Main"
                initialParams={{userData: userData}}
                children={(props) => <MainContainer {...props}/>}
            />
        </InsideStack.Navigator>
    );
};

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
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName="Authentication" screenOptions={{ headerShown: false,}}>
                {user && userData ? (
                    <Stack.Screen
                        name="Home"
                        options={{headerShown: false}}
                    >
                        {(props) => <InsideLayout {...props} userData={userData}/>}
                    </Stack.Screen>

                ) : (
                    <Stack.Screen
                        name="Authentication"
                        options={{headerShown: false}}
                    >
                        {(props) => <Authentication {...props} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
