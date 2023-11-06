import {DefaultTheme} from "@react-navigation/native";

const colors = {
    light: {
        primary: "#e8e8e8",
        secondary: "#ababab",
        background: "#f2f2f7",
        tertiary: "#696969",
        text: "#000000",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffff00",
        info: "#0000ff",
    }, dark: {
        primary: "#707070",
        secondary: "#868686",
        background: "#000000",
        tertiary: "#c9c9c9",
        text: "#efefef",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffff00",
        info: "#0000ff",
    }
}

export const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.dark.primary,
        secondary: colors.dark.secondary,
        background: colors.dark.background,
        tertiary: colors.dark.tertiary,
        text: colors.dark.text,
        error: colors.dark.error,
        success: colors.dark.success,
        warning: colors.dark.warning,
        info: colors.dark.info,
    },
};

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.light.primary,
        secondary: colors.light.secondary,
        background: colors.light.background,
        tertiary: colors.light.tertiary,
        text: colors.light.text,
        error: colors.light.error,
        success: colors.light.success,
        warning: colors.light.warning,
        info: colors.light.info,
    },
};