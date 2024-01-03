import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextStyle, useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from '../../theme/Theme';

interface ThemedTextProps {
    children: ReactNode,
    style?: TextStyle,
    selectable?: boolean,
    numberOfLines?: number,
    ellipsizeMode?: any
}

const ThemedText: React.FC<ThemedTextProps> = ({children, style, selectable, numberOfLines, ellipsizeMode}) => {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;

    return (
        <Text selectable={selectable}
              ellipsizeMode={ellipsizeMode}
              numberOfLines={numberOfLines}
              style={[styles.themedText, {color: textColor}, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    themedText: {
        fontSize: 16,
        paddingVertical: 5,
    },
});

export default ThemedText;
