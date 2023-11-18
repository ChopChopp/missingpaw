import * as React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme, View} from "react-native";
import ThemedText from "../../../helper/themedText/ThemedText";
import {useState} from "react";
import {DarkTheme, LightTheme} from "../../../helper/theme/Theme";

export default function Home() {
    const textColor = useColorScheme() === 'dark' ? DarkTheme.colors.text : LightTheme.colors.text;
    const [selectedOption, setSelectedOption] = useState<string | null>("Your pet");

    const handlePress = (option: string) => {
        setSelectedOption(option);
    };

    const renderTextWithUnderline = (text: string, isSelected: boolean) => (
        <View style={styles.textContainer}>
            <ThemedText style={isSelected ? styles.selectedText : styles.unselectedText}>
                {text}
            </ThemedText>
            {isSelected && <View style={[styles.underline, {backgroundColor: textColor}]}/>}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('Missing pets')}>
                {renderTextWithUnderline('Missing pets', selectedOption === 'Missing pets')}
            </TouchableOpacity>

            <ThemedText>/</ThemedText>

            <TouchableOpacity style={styles.button} onPress={() => handlePress('Your pet')}>
                {renderTextWithUnderline('Your pet', selectedOption === 'Your pet')}
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: 'flex-start',
        marginTop: 120,
    },
    button: {
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    textContainer: {
        alignItems: 'center',
    },
    selectedText: {
        fontWeight: 'bold',
    },
    unselectedText: {
        color: 'grey',
    },
    underline: {
        height: 2,
        backgroundColor: 'black',
        width: '75%',
        marginTop: 5,
        alignSelf: 'center',
    },
});