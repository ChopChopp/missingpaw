import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../../theme/Theme';

interface ThemedTextProps {
    children: ReactNode;
    style?: TextStyle;
}

const ThemedText: React.FC<ThemedTextProps> = ({ children, style }) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    return (
        <Text style={[styles.themedText, { color: textColor }, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    themedText: {
        fontSize: 16,
        paddingVertical: 5, // Adjust vertical padding to control height
    },
});

export default ThemedText;
