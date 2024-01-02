import * as React from "react";
import {SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme, View} from "react-native";
import ThemedText from "../../../helper/themedComponents/themedText/ThemedText";
import {useState} from "react";
import {DarkTheme, LightTheme} from "../../../helper/theme/Theme";
import YourPet from "./yourPet/YourPet";
import MissingPets from "./missingPets/MissingPets";

const Home = ({userData, fetchUserData}: any) => {

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
            <View style={styles.navContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('Missing pets')}>
                    {renderTextWithUnderline('Missing pets', selectedOption === 'Missing pets')}
                </TouchableOpacity>

                <ThemedText>/</ThemedText>

                <TouchableOpacity style={styles.button} onPress={() => handlePress('Your pet')}>
                    {renderTextWithUnderline('Your pet', selectedOption === 'Your pet')}
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {selectedOption === 'Your pet' && <YourPet userData={userData} fetchUserData={fetchUserData}/>}
                {selectedOption === 'Missing pets' && <MissingPets userData={userData}/>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        marginTop: 100,
        width: "100%",
    },
    navContainer: {
        flex: 1,
        gap: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: 'flex-start',
        maxHeight: 50,
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
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
    }
});

export default Home;