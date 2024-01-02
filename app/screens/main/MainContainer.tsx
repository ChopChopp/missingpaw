import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./home/Home";
import Sightings from "./sightings/Sightings";
import Settings from "./settings/Settings";

const homeName = "Home";
const sightingsName = "Sightings";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export const MainContainer = ({userData, fetchUserData}: any) => {

    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused}: {
                    focused: boolean;
                    color: string;
                    size: number;
                }) => {
                    let iconName;
                    if (route.name === homeName) {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === sightingsName) {
                        iconName = focused ? "eye" : "eye-outline";
                    } else if (route.name === settingsName) {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return (
                        <Ionicons
                            name={iconName || ""}
                            size={focused ? 25 : 20}
                            color={focused ? "#5f7ae3" : "grey"}
                            text-color={"grey"}
                        />
                    );
                },
                tabBarActiveTintColor: '#5f7ae3',
                tabBarInactiveTintColor: 'grey'
            })}
        >
            <Tab.Screen name={homeName} key={homeName}>
                {(props) => <Home {...props} userData={userData} fetchUserData={fetchUserData}/>}
            </Tab.Screen>
            <Tab.Screen name={sightingsName} key={sightingsName}>
                {(props) => <Sightings {...props} userData={userData} />}
            </Tab.Screen>
            <Tab.Screen name={settingsName} key={settingsName}>
                {(props) => <Settings {...props} userData={userData}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
};
