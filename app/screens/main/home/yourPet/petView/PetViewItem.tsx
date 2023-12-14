import React from "react";
import {StyleSheet, View, Image, useWindowDimensions} from "react-native";
import ThemedText from "../../../../../helper/themedText/ThemedText";

const PetViewItem = ({item}: any) => {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            {item.id === 1 ? (
                <View style={{flex: 0.3}}>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <ThemedText style={styles.description}>Age: {item.age}</ThemedText>
                    <ThemedText style={styles.description}>Breed: {item.breed}</ThemedText>
                    <ThemedText style={styles.description}>Color: {item.color}</ThemedText>
                    <ThemedText style={styles.description}>Type: {item.type}</ThemedText>
                </View>
            ) : (
                <View style={styles.petContainer}>
                    <ThemedText style={styles.title}>{item.name}</ThemedText>
                    <Image source={{uri: item.imageUrl}} style={styles.image}/>
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        textAlign: "center"
    },
    description: {
        fontWeight: "300",
        paddingHorizontal: 64,
        textAlign: "center"
    },
    petContainer: {
        justifyContent: "center",
        backgroundColor: "#8e8e93",
    }
});

export default PetViewItem;
