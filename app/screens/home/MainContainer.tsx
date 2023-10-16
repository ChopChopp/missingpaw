import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "./components/Home";
import Details from "./components/Details";
import Settings from "./components/Settings";

const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export const MainContainer = () => {
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
            } else if (route.name === detailsName) {
              iconName = focused ? "list" : "list-outline";
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
        <Tab.Screen name={detailsName} component={Details} />
        <Tab.Screen name={settingsName} component={Settings} />

        </Tab.Navigator>
  );
};
