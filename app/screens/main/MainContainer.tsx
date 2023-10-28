import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./home/Home";
import Profile from "./profile/Profile";

const homeName = "Home";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export const MainContainer = ({ route }: any) => {
  const { userData } = route.params;

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({
          focused,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }
          return (
            <Ionicons
              name={iconName || ""}
              size={focused ? 25 : 20}
              color={focused ? "#5f7ae3" : "grey"}
            />
          );
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen
        name={settingsName}
        component={Profile}
        initialParams={{ userData: userData }}
      />
    </Tab.Navigator>
  );
};
