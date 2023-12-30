import React, {ReactNode} from 'react';
import {Text, Linking, StyleSheet, TextStyle} from 'react-native';

interface ThemedLinkProps {
    children: ReactNode;
    style?: TextStyle;
    url: string;
}

const ThemedLink: React.FC<ThemedLinkProps> = ({children, style, url}) => {

    return (
        <Text style={[styles.themedText, style]}
              onPress={() => Linking.openURL(url)}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    themedText: {
        fontSize: 16,
        paddingVertical: 5,
        color: "#0066CC"
    },
});

export default ThemedLink;
