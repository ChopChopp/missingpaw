import {DefaultTheme} from "@react-navigation/native";

const colors = {
    light: {
        primary: "#e8e8e8",
        secondary: "#ababab",
        border: "#5e5e65",
        backgroundModern: "#8e8e93",
        backgroundLight: "#d1d1d6",
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
        border: "#3a3a3c",
        backgroundModern: "#3a3a3c",
        backgroundLight: "#1c1c1e",
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
        border: colors.dark.border,
        background: colors.dark.background,
        backgroundModern: colors.dark.backgroundModern,
        backgroundLight: colors.dark.backgroundLight,
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
        border: colors.light.border,
        background: colors.light.background,
        backgroundModern: colors.light.backgroundModern,
        backgroundLight: colors.light.backgroundLight,
        tertiary: colors.light.tertiary,
        text: colors.light.text,
        error: colors.light.error,
        success: colors.light.success,
        warning: colors.light.warning,
        info: colors.light.info,
    },
};